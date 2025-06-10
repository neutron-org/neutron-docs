# Overview

This document explains the `interchainqueries` module for the Neutron network.

Interchain Queries allow developers to get verifiable data from other blockchains. This feature is essential for creating secure cross-chain applications. The module uses Merkle proofs and IBC clients to confirm the accuracy of the data retrieved directly from the storage of the target blockchain. It allows any smart contract to register Interchain Queries without needing any special module on the target blockchain.

## Table of contents

- [Overview](/neutron/modules/interchain-queries/overview) — a high-level description of the module.
- [API](/neutron/modules/interchain-queries/api) — details about the module's interface, including endpoints, message models, and emitted events.
- [Explanation](/neutron/modules/interchain-queries/explanation) — an explanation of the module's concepts and the reasoning behind its design choices.
- [How To](/neutron/modules/interchain-queries/how-to) — short guides on performing basic operations with the module.
- [Known Bugs](/neutron/modules/interchain-queries/known-bugs) — a list of known issues in the module.

## Concepts

A smart contract can register an Interchain Query to regularly fetch data from a remote chain's state and process it in any way it needs. There are two types of Interchain Queries:

- **Key-Value Query (KV Query)**: This type retrieves values from the Cosmos-SDK KV-storage on a remote chain, using a set of keys. It can be used to get account balances, governance proposals, staking information, smart contract states, or any other data stored in the remote chain's KV-storage. Learn more about how KV queries work [here](/neutron/modules/interchain-queries/explanation#how-do-kv-interchain-queries-work).

- **Transactions Query (TX Query)**: This type finds transactions on a remote chain based on a set of parameters and conditions (called a transaction filter). For example, it can find transactions that happened before a specific block height, transactions sent to a certain recipient, or any other condition that can be defined using emitted events. Learn more about how TX queries work [here](/neutron/modules/interchain-queries/explanation#how-do-tx-interchain-queries-work).

Interchain Queries, like IBC, rely on an intermediary infrastructure called an [Interchain Query relayer](/neutron/modules/interchain-queries/explanation#what-is-an-interchain-query-relayer) to serve smart contracts. The relayer is responsible for collecting the requested information (along with cryptographic proofs to verify its validity) based on the parameters of the Interchain Query. It then delivers this data to the `interchainqueries` module, which forwards it to the smart contracts for processing.  

This entire process is called Interchain Query execution, and the step where the data is delivered is known as Interchain Query result submission. The `interchainqueries` module provides endpoints and emits specific events to make the relayer's job easier. You can find more details about these events and endpoints in the [API section](/neutron/modules/interchain-queries/api).

An Interchain Query relayer submits a query result using the [SubmitQueryResult](/neutron/modules/interchain-queries/api#submitqueryresult) endpoint of the `interchainqueries` module. Through this endpoint, the `interchainqueries` module verifies the result and triggers the corresponding [sudo handler](/neutron/modules/interchain-queries/api#sudo) in the smart contract that owns the Interchain Query. The smart contract uses this handler to process the query result, reacting to the new data received from the target chain.

Another similarity between the `interchainqueries` module and IBC is the use of IBC clients. All Interchain Queries involve reading data from a remote chain's storage, and this data is verified against the `ConsensusState` of an IBC client connected to that chain. During result submission, the `interchainqueries` module checks the submitted storage values using the provided proofs, comparing them against the `ConsensusState` of the IBC client on the Neutron side. This ensures that the authenticity of the retrieved data is guaranteed by the IBC protocol.