# Overview

This document specifies the Interchain Transactions module for the Neutron network.

The Interchain Transactions module manages the creation of IBC Accounts and executing interchain transactions on behalf
of CosmWasm smart contracts. The current implementation allows a smart contract to:

1. Register multiple interchain accounts on a remote zone using an existing IBC connection;
2. Execute transactions with multiple messages on a remote zone;
3. Process the `OnChanOpenAck`, `Acknowledgement` and `Timeout` events as they are delivered by a relayer.

## IBC events

Registering an interchain account or executing an interchain transaction are asynchronous actions. In most cases, the
respective handlers of the Interchain Transactions module immediately return an empty successful response. The "real"
response (with information about the status of execution on a remote zone) is later delivered in a separate IBC packet
by a relayer. We call such packets the **IBC events**.

A smart contract that tries to register an interchain account or to execute an interchain transaction naturally expects
to receive the IBC events related to these actions. The Interchain Transactions module solves this task by passing these
IBC events to the smart contract using
a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453)
and a custom [message scheme](https://github.com/neutron-org/neutron/blob/v1.0.4/x/contractmanager/types/sudo.go). You can find a
complete list of IBC events for each module message in the [messages](./messages) section.

> **Note**: if your Sudo handler fails, the acknowledgment will be marked as processed inside the IBC module anyway.
> The module designed this way to avoid
> make most IBC relayers try to submit the acknowledgment over and over again. And since the ICA channels are `ORDERED`,
> ACKs must be processed in the same order as corresponding transactions were sent, meaning no further acknowledgments
> will be process until the previous one processed successfully. In addition, if sudo handler fails, we save the packetId
> failed to be processed with contract manager's failures [state](../contract-manager/state.md). It is possible to suppress
> Sudo handler fails by using [cachedContext](#sudo-handlers) with th handlers.
>
> **Note**: there is no dedicated event for a closed channel (ICA disables all messages related to closing the channels)
> . Your channel, however, can still be closed if a packet timeout occurs; thus, if you are notified about a packet
> timeout, you can be sure that the affected channel was closed. Please note that it is generally a good practice to set
> the packet timeout for your interchain transactions to a really large value.
>
> If the timeout occurs anyway, you can just
> execute [RegisterInterchainAccount message]( /neutron/modules/interchain-txs/messages#msgregisterinterchainaccount) again to
> recover access to your interchain account.

## Sudo Handlers

Before calling a sudo handler, we create a child context [cachedCtx](#cachedctx), with which we call this handler.
Calling a handler via a child context has 2 purposes:

1. Suppress the sudo handler error itself, and mark the ibc acknowledgement packet as received and processed. Other way, the error makes relayer send an acknowledgement again and again. Information about an unsuccessfully processed ack is stored in [state](../contract-manager/state.md).
2. Suppress out of gas panic triggered by sudo handler operation

### CachedCtx

CachedCtx is created with `gas limit = gas limit in the parent context - GasReserve`, where `GasReserve` is a constant equal to 15000.
This reserve gas is needed to guarantee that [Failure](../contract-manager/state.md) is saved, for example in case a contract has used all the gas it is entitled to and ended with an out of gas panic.

## Failed interchain txs

Not every interchaintx executes succesfully on a remote network. Some of them fail to execute with errors and then you get ibc acknowledgement with `Error` type. The error is passed into the caller contract via sudo call with SudoMsg::Error [variant](../../../tutorials/cosmwasm-ica.md#ibc-events)

Unfortunately, to avoid the nondeterminism associated with error text generation, the error text is severely truncated by [redact down](https://github.com/cosmos/ibc-go/blob/v7.3.1/modules/apps/27-interchain-accounts/host/ibc_module.go#L115) to the error code without any additional details, before converting into AcknowledgementError.

Find the error text is possible if host chain includes ibc-go v7.2.3+, v7.3.2+, v8.0.1+, v8.1+ which include patch [5541](https://github.com/cosmos/ibc-go/pull/5541)
`<binary> q interchain-accounts host packet-events <channel-id> <seq-id>`

Where:

- `binary` is a binary on the chain you are working with (the remote chain)
- `seq-id` - sequence ID of the IBC message sent to the remote chain. The seq-id is returned to the contract in the [SubmitTx](./messages.md#response) response
- `channel-id` is the ID of the ICA's channel on the remote chain's side. You should know it from registration [procedure](../../../tutorials/cosmwasm-ica.md#2-register-an-interchain-account) via `SudoMsg::OpenAck` from `counterparty_channel_id` field. If you missed it you can always get counterparty channel-id with CLI command `neutrond q ibc channel end <src-port> <src-channel-id>`
- `src-channel-id` is the channel you intechain account associated with.
- `src-port` is the port you interchain account is associated with.
You should know both `src-channel-id` and `src-port` from registration [procedure](../../../tutorials/cosmwasm-ica.md#2-register-an-interchain-account). Also `src-port` is `icacontroller-<contract_address>.<ica_id>` where `ica_id` defined by you during ica registration.

Output example (filtered events):

```json
{
"type": "ibccallbackerror-ics27_packet",
"attributes": [
    {
    "key": "ibccallbackerror-module",
    "value": "interchainaccounts",
    "index": true
    },
    {
    "key": "ibccallbackerror-host_channel_id",
    "value": "channel-2",
    "index": true
    },
    {
    "key": "ibccallbackerror-success",
    "value": "false",
    "index": true
    },
    {
    "key": "ibccallbackerror-error",
    "value": "invalid validator address: decoding bech32 failed: invalid separator index -1: invalid address",
    "index": true
    }
]
}
```

On earlier versions of ibc-go it's barely possible to get full text error due to [patch](https://github.com/cosmos/ibc-go/commit/fdbb508c1ca68811206d7175fb9e202c1611a43e).

In the IBC error acknowledgement you get ABCI error and a code, e.g. `codespace: wasm, code: 5`
where codespace usually is `ModuleName`, and `code` is uniq code for the module. `codespace` and `code` pair uniq for the whole app. You can find the error description in source code. Usualy all the error of the module are [placed](https://github.com/CosmWasm/wasmd/blob/5f444cd9d393513e534cbfa9a0e938295c4e84e1/x/wasm/types/errors.go#L25) in `x/<module>/types/errors.go` where `module` is the module where the error was thrown

## Relaying

Neutron introduces smart-contract level callbacks for IBC packets. From an IBC relayer's perspective, this means that
custom application logic can be executed when a packet is submitted to Neutron, which can potentially drain the
relayer's funds. This naturally brings us to a situation in which protocols would prefer to set up their own relayers
and restrict the channels they are willing to relay for. For example,
in [Hermes](https://github.com/informalsystems/ibc-rs) you can do this by adding a `chains.packet_filter` config:

```toml
[chains.packet_filter]
policy = 'allow'
list = [
    # allow relaying only for chanels created by a certain contract  
    ['icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq*', '*'],
]
```

> Note: you can have a look at the `MsgRegisterInterchainQuery` documentation in the [Messages](messages.md) chapter
> to learn how IBC port naming works.

Please refer to the [IBC Relaying](../../../relaying/ibc-relayer.md) section for full IBC relaying documentation.
