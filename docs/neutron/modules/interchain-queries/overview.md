# Overview

This document specifies the `interchainqueries` module for the Neutron network.

Interchain Queries let developers retrieve verifiable data from distant blockchains — they’re crucial to building secure cross-chain applications. The implementation uses merkle proofs and IBC clients to verify data it retrieves directly from the target blockchain’s storage. It enables any smart-contract to register Interchain Queries and does not require any specific module on the target chain.

## Table of contents

- [Overview](/neutron/modules/interchain-queries/overview) — high level description of the module;
- [API](/neutron/modules/interchain-queries/api) — description of the module's interface with endpoints, message models, emitted events;
- [Explanation](/neutron/modules/interchain-queries/explanation) — explanation of the module concepts and design resolution justifications;
- [How To](/neutron/modules/interchain-queries/how-to) — brief guides on how to do basic operations with the module; 
- [Known Bugs](/neutron/modules/interchain-queries/known-bugs) — list of known bugs in the module.

## Concepts

A smart-contract can register an Interchain Query to periodically retrieve some data from remote chain's state and to process the retrieved data in arbitrary way. There are two types of Interchain Queries:
* Key-Value query (KV query) - to read values from Cosmos-SDK KV-storage on remote chain which are stored under a set of keys. It can be balances of accounts, governance proposals, different staking info, smart contracts' state, and literally anything from a remote chain's KV-storage. Read more about how KV queries work by the [link](/neutron/modules/interchain-queries/explanation#how-do-kv-interchain-queries-work);
* Transactions query (TX query) - to find transactions on a remote chain by a list of parameters and equations (so called transactions filter) like transactions happened before some specific height, transactions sent to some specific recipient, or anything else that can be formed into a condition described by emitted events. Read more about how TX queries work by the [link](/neutron/modules/interchain-queries/explanation#how-do-tx-interchain-queries-work).

Interchain Queries, similar to IBC, requires an intermediary infrastructure called an [Interchain Query relayer](/neutron/modules/interchain-queries/explanation#what-is-an-interchain-query-relayer) that serves smart contracts. It's supposed to gather info (and cryptographic proofs that the info is valid) defined in Interchain Query parameters from a remote chain's state, and pass it to the `interchainqueries` module and, through that, to smart contracts for handling. The whole process is called Interchain Query execution, and the passing part is called Interchain Query result submission. The `interchainqueries` module has endpoints and events emission designated to facilitate relayer's work. Read more about the emitted events and endpoints in the [API section](/neutron/modules/interchain-queries/api).

An Interchain Query relayer should submit a query result via the [SubmitQueryResult](/neutron/modules/interchain-queries/api#submitqueryresult) endpoint of the `interchainqueries` module. In scope of this endpoint, the `interchainqueries` module does result verification and calls the designated [sudo handler](/neutron/modules/interchain-queries/api#sudo) of the smart contract that is the owner of the Interchain Query. During this handler the smart contract is supposed to process the query result, i.e. to react on fresh data coming from the target chain.

One other similarity between the `interchainqueries` module and IBC is IBC clients usage. All Interchain Queries are about reading some data from a remote chain's storage, and the retrieved data is verified against ConsensusState of an IBC client to that chain. On result submission, the `interchainqueries` module verifies the storage values being submitted using the proofs being submitted against the Neutron side IBC client's ConsensusState, and therefore relies on the IBC protocol in terms of retrieved data authenticity.
