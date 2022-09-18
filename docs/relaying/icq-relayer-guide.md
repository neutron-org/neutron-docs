# Interchain Queries Relayer Guide

## Overview

[Interchain Queries](/neutron-core/interchain-queries/overview) allow smart contracts to make queries to a remote chain. An ICQ Relayer is a required component for making them possible. It acts as a facilitator between the Neutron chain and a querying chain, gathering queries that are needed to be performed from the Neutron, actually performing them, and eventually making the results available for the Neutron's smart contracts. These three main responsibilities are described in details below.

If you are a smart contracts developer and up to develop your dApp on Neutron, you will most likely need your own ICQ Relayer to manage your Interchain Queries. 

### Queries gathering

All registered Interchain Queries and their parameters are stored in the eponymous module and available by its query interface. The Relayer utilises the module's interface in order to initialise the performing list of queries. This is how the Relayer maintains the list of queries to be executed:

- on initialisation, the ICQ module `RegisteredQueries` query is executed with the `RELAYER_REGISTRY_ADDRESSES` parameter used for the `Owners` field;
- during the rest of the run, the Relayer listens to the ICQ module's `query_update` and `query_removed` events and modifies the queries list and parameters correspondingly.

The Relayer also listens to the Neutron's `NewBlockHeader` events that are used as a trigger for queries execution. Since each query has its own `update_period`, the Relayer tracks queries execution height and executes only the queries which update time has come.

### Queries execution

When the update time comes for a query, the Relayer runs the specified query on the remote chain:
* in case of a KV-query, the Relayer just [reads](https://github.com/neutron-org/cosmos-query-relayer/blob/4542045ab24d2735890e70d4dc525677d5f30c8a/internal/proof/proof_impl/get_storage_values.go#L11)
necessary KV-keys from the remote chain's storage with [Merkle Proofs](https://github.com/cosmos/cosmos-sdk/blob/ae77f0080a724b159233bd9b289b2e91c0de21b5/docs/interfaces/lite/specification.md). Neutron will need these proofs to [verify](https://github.com/neutron-org/neutron/blob/49c33ff43122cb12ee20e98493e0e2439a94f928/x/interchainqueries/keeper/msg_server.go#L217) validity of KV-results on results submission;
* in case of a TX-query, the Relayer makes a query to the target chain's [Tendermint RPC](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html#querying-transactions) 
to search transactions by message types, events and attributes which were emitted during transactions execution and were 
[indexed](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html) by Tendermint. More about Tx query parameters syntax [in the dedicated section](/neutron-core/interchain-queries/messages#register-interchain-query). When Relayer submits transactions search results to Neutron's chain, it **DOES NOT** include events into result (even if events were used for the query), because [events are not deterministic](https://github.com/tendermint/tendermint/blob/bff63aec83a4cfbb3bba253cfa04737fb21dacb4/types/results.go#L47), therefore they can break blockchain consensus.

### Results submission

Relayer submits a query result by simply sending it to the Neutron's Interchain Queries module which handles it either by storing the result in the blockchain state (KV queries) or passing it to the smart contract that has registered the query (TX queries). This means that it's the Relayer who pays gas for these actions. Note that KV queries submission are straightforward and therefore cheap whereas TX ones also include smart contract call and their cost may vary significantly.

## Configuration

### Neutron node settings
TODO

### Target chain node settings
TODO

### Relayer application settings

## Install Dependencies
TODO

## Build And Setup
TODO