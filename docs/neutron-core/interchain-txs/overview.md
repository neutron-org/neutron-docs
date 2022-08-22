# Overview

This document specifies the Interchain Transactions module for the Neutron network.

The Interchain Transactions module manages the creation of IBC Accounts and executing interchain transactions on behalf of CosmWasm smart contracts. The current implementation allows a smart contract to:

1. Register multiple interchain accounts on a remote zone using an existing IBC connection;
2. Execute transactions with multiple messages on a remote zone;
3. Process the `OnChanOpenAck`, `Acknowledgement` and `Timeout` events as they are delivered by a relayer.

## IBC events

Registering an interchain account or executing an interchain transaction are asynchronous actions. In most cases, the respective handlers of the Interchain Transactions module immediately return an empty successful response. The "real" response (with information about the status of execution on a remote zone) is later delivered in a separate IBC packet by a relayer. We call such packets the **IBC events**.

A smart contract that tries to register an interchain account or to execute an interchain transaction naturally expects to receive the IBC events related to these actions. The Interchain Transactions module solves this task by passing these IBC events to the smart contract using a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453) and a custom [message scheme](https://github.com/neutron-org/neutron/blob/master/internal/sudo/sudo.go). You can find a complete list of IBC events for each module message in the [messages](./messages) section.

## Relaying

Neutron introduces smart-contract level callbacks for IBC packets. From an IBC relayer's perspective, this means that custom application logic can be executed when a packet is submitted to Neutron, which can potentially drain the relayer's funds. This naturally brings us to a situation in which protocols would prefer to set up their own relayers and restrict the channels they are willing to relay for. For example, in [Hermes](https://github.com/informalsystems/ibc-rs) you can do this by adding a `chains.packet_filter` config:

```toml
[chains.packet_filter]
policy = 'allow'
list = [
    # allow relaying only for chanels created by a certain contract  
    ['icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq*', '*'],
]
```

> Note: you can have a look at the `MsgRegisterInterchainQuery` documentation in the [Messages](./messages.md) chapter to learn how IBC port naming works.

Please refer to the [IBC Relaying](../../relaying/ibc-relayer-guide.md) section for full IBC relaying documentation.
