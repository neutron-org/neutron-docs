# Overview

## Abstract

This document specifies the ICQ (**I**nter**C**hain **Q**ueries) module for the Neutron network.

The ICQ module implements a mechanism to retrieve data from remote chains connected to Neutron via IBC.

## Concepts

A smart-contract can register two types of Interchain Query for particular chain with some query payload and `update_period`:
* Key-Value query (KV-query) - to read **values** from Cosmos-SDK KV-storage on remote chain which are stored under a set of **keys**;
* Transactions query (TX-query) - find transactions on remote chain under by condition (filter).

The ICQ module emits an event that contains information about the registered interchain query every `update_period` blocks in module's [EndBlocker](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/abci.go#L14).

When [ICQ relayer](/relaying/icq-relayer-guide) receives such an event, it runs the specified query on the remote chain, gets the data and sends the result to the Neutron chain.

Neutron verifies the data and processes the query result depending on the interchain query type:
* in case of a KV-query, the ICQ module saves the result into module's storage, and passed the query id to the contract's [SudoKVQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L265) [handler](https://github.com/neutron-org/neutron-contracts/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L255);
* in case of a TX-query, the ICQ module **does not** save the result to the storage, finds the contract that registered the query, and passes the full result to the contract's [SudoTXQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L227) [handler](https://github.com/neutron-org/neutron-contracts/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L141).
