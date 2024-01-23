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

1. Suppress the sudo handler error itself, and mark the ibc acknowledgement packet as received and processed. Other way, the error makes relayer send an acknowledgement again and again
2. Suppress out of gas panic triggered by sudo handler operation
3. Information about an unsuccessfully processed ack is stored in [state](../contract-manager/state.md).

### CachedCtx

CachedCtx is created with `gas limit = gas limit in the parent context - GasReserve`, where `GasReserve` is a constant equal to 15000.
This reserve gas is needed to guarantee that [Failure](../contract-manager/state.md) is saved, for example in case a contract has used all the gas it is entitled to and ended with an out of gas panic.

## Failed interchain txs

Not every interchaintx executes succesfully on a remote network. Some of them fails to execute with errors and then you get ibc acknowledgement with `Error` type. In this case, in order to get additional details about the transaction parameters as well as details about the error, you can use the commands `<binary> q interchain-accounts host packet-events <channel-id> <seq-id>`
Where:

- `channel-id` is the id of the channel on the host side of the interchain accounts
- `seq-id` - seq of the ibc message received on the host

For example `gaiad q interchain-accounts host packet-events channel-736 1` is a transaction `fund community pool from neutron unclaimed airdrop` on `cosmoshub-4` chain. Because this command is just an alias for the transaction search functionality, it searches for the transaction using the following keys `recv_packet.packet_dst_channel = <channel-id> AND recv_packet.packet_dst_port = <port> AND recv_packet. packet_sequence = <seq-id>`. The node you are accessing may not have this transaction, due to the fact that it was included in the block a long time ago and it has already been removed by the pruning procedure.

Unfortunately, to avoid the nondeterminism associated with error test generation, the error text is severely truncated by redact down to the error code without any additional details, before being saved to the state on the host interchain account side of the module.
And even the `<binary> q interchain-accounts host packet-events` command is unable to show the full error text
If you really lack information about the error for diagnostics, you can look at the validator/node logs at the moment of transaction execution. All necessary information will be there.

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
