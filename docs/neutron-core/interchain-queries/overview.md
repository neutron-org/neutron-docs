# Interchain Queries Module

## Abstract

The ICQ module (**I**nter**C**hain **Q**ueries) provides the logic to retrieve data from remote chains connected to Neutron via IBC.

## Concepts

A smart-contract can register two types of Interchain Query for particular chain with some query payload and `update_period`:
* Key-Value query (KV-query) - to read **values** from Cosmos-SDK KV-storage on remote chain which are stored under some **keys**;
* Transactions query (TX-query) - find transactions on remote chain under by condition (filter).

The ICQ module emits an event with registered interchain query info every `update_period` blocks in module's [EndBlocker](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/abci.go#L14).

When [ICQ relayer](/relaying/icq-relayer-guide) receives such event, it performs a needed query on remote chain, gets data and publishes it on Neutron chain.
Neutron verifies data and processes query result depending on interchain query type:
* in case of KV-query the ICQ module saves the result into module's storage and callbacks the result to the appropriate contract which registered this interchain query via [SudoKVQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L265) method;
* in case of TX-query the ICQ module **DOES NOT** save the result to the storage, but only callbacks the result to the appropriate contract which registered this interchain query via [SudoTXQueryResult](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/internal/sudo/sudo.go#L227) method.
