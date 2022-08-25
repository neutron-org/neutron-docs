# Overview

## Abstract

This document specifies the ICQ (**I**nter**C**hain **Q**ueries) module for the Neutron network.

The ICQ module implements a mechanism to retrieve data from remote chains connected to Neutron via IBC.

## Concepts

A smart-contract can register two types of Interchain Query for particular chain with some query payload and `update_period`:
* Key-Value query (KV-query) - to read **values** from Cosmos-SDK KV-storage on remote chain which are stored under a set of **keys**;
* Transactions query (TX-query) - find transactions on remote chain under by condition (transactions filter).

The ICQ module emits an event that contains information about the registered interchain query every `update_period` blocks
in module's [EndBlocker](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/abci.go#L14).

When [ICQ relayer](/relaying/icq-relayer-guide) receives such an event, it runs the specified query on the remote chain:
* in case of KV-query, the ICQ relayer just [reads](https://github.com/neutron-org/cosmos-query-relayer/blob/4542045ab24d2735890e70d4dc525677d5f30c8a/internal/proof/proof_impl/get_storage_values.go#L11)
necessary KV-keys from the storage in remote chain with [Merkle Proofs](https://github.com/cosmos/cosmos-sdk/blob/ae77f0080a724b159233bd9b289b2e91c0de21b5/docs/interfaces/lite/specification.md). 
Neutron need the proofs to [verify](https://github.com/neutron-org/neutron/blob/49c33ff43122cb12ee20e98493e0e2439a94f928/x/interchainqueries/keeper/msg_server.go#L217) validity of KV-results when they are being submitted on Neutron;
* in case if TX-query, the ICQ relayer makes a query to the [Tendermint RPC](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html#querying-transactions) 
to search transactions by message types, events and attributes which were emitted during transactions execution and were 
[indexed](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html) by Tendermint (you can read about the syntax [here](messages#register-interchain-query)). When the ICQ relayer submit transactions search result on Neutron, 
it **DOES NOT** include events into result (even if events were used for the query),
because [events are not deterministic](https://github.com/tendermint/tendermint/blob/bff63aec83a4cfbb3bba253cfa04737fb21dacb4/types/results.go#L47),
therefore they can break blockchain consensus. 

Neutron verifies the data and processes the query result depending on the interchain query type:
* in case of a KV-query, the ICQ module saves the result into module's storage, and passed the query id to the contract's
[SudoKVQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L265) [handler](https://github.com/neutron-org/neutron-contracts/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L255);
* in case of a TX-query, the ICQ module **does not** save the result to the storage, finds the contract that registered the query,
and passes the full result to the contract's [SudoTXQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L227) [handler](https://github.com/neutron-org/neutron-contracts/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L141).

## Transaction filters

Since events themselves are not part of the consensus and are not included in the transaction result, it's necessary to
[implement additional checks](https://github.com/neutron-org/neutron-contracts/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L197)
in your `SudoTXQueryResult` handler to check that result transactions satisfies your transactions filter. For instance, you can check that messages in the transactions have proper types, payload, etc.
If your contract does not have such checks, malicious relayer can send a fully valid Tendermint transaction which does not satisfy your defined transactions filter, and your business-logic can be broken.

> NOTE: when registering a TX-query, you write the transaction filters as filters for transaction events. When you check the submitted transaction in your contracts, though, you can only check the information that is stored on-chain (i.e., message fields for messages in a transaction). To put it another way, the set of values that you can use to filter transactions is the intersection of the values that are added to transaction events (used by the ICQ relayer can perform the search) and the values included directly to sdk.Msgs (can be used by your code to check whether the submitted transaction matches your query).  

You can see more info, examples and recommendations about proper transactions result handling [here](TODO_LINK).