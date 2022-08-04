# Overview

This document specifies the Interchain Transactions module for the Neutron network.

The Interchain Transactions module manages the creation of IBC Accounts and executing interchain transactions on behalf of CosmWasm smart contracts. The current implementation allows a smart contract to:

1. Register multiple Interchain Accounts on a remote zone using an existing IBC connection;
2. Execute transactions with multiple messages on a remote zone;
3. Process the `OnChanOpenAck`, `Acknowledgement` and `Timeout` events as they are delivered by a relayer.

The `OnChanOpenAck`, `Acknowledgement` and `Timeout` events are passed to the smart contract using a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453).