# Overview

This document specifies the Interchain Transactions module for the Neutron network.

The Interchain Transactions module manages the creation of IBC Accounts and executing interchain transactions on behalf of CosmWasm smart contracts. The current implementation allows a smart contract to:

1. Register multiple interchain accounts on a remote zone using an existing IBC connection;
2. Execute transactions with multiple messages on a remote zone;
3. Process the `OnChanOpenAck`, `Acknowledgement` and `Timeout` events as they are delivered by a relayer.

## IBC events

Registering an interchain account or executing an interchain transaction are asynchronous actions. In most cases, the respective handlers of the Interchain Transactions module immediately return an empty successful response. The "real" response (with information about the status of execution on a remote zone) is later delivered in a separate IBC packet by a relayer. We call such packets the **IBC events**.

A smart contract that tries to register an interchain account or to execute an interchain transaction naturally expects to receive the IBC events related to these actions. The Interchain Transactions module solves this task by passing these IBC events to the smart contract using a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453) and a custom [message scheme](https://github.com/neutron-org/neutron/blob/master/internal/sudo/sudo.go). You can find a complete list of IBC events for each module message in the [messages](./messages) section.

RELAYER FILTERING & SHIT.