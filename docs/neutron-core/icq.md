# Interchain Queries Module

## Abstract

The ICQ module (**I**nter**C**hain **Q**ueries) provides the logic to retrieve data from remote chains connected to Neutron via IBC.

## Concepts

Anyone (smart-contract, user) can register an Interchain Query for particular chain with some query payload and `update_period`.
The ICQ module emits an event with registered interchain query info every `update_period` blocks.

When [ICQ relayer](/relaying/icq-relayer-guide) receives such event, it performs a needed query on remote chain, gets data and publishes it on Neutron chain.
Neutron verifies data and saves it to the storage.

After that an interchain query response will be available for anyone on neutron.

## State

The ICQ module stores one [RegisteredQuery](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/genesis.proto#L10) per identifier.
`RegisteredQuery` contains all the necessary info for the ICQ relayer to perform a query on remote chain. `last_emitted_height` is modified every `update_period` on end blockers. `last_submitted_result_local_height`, `last_submitted_result_remote_height` are modified only when a relayer publishes result for a query.

Results for interchain queries are stored in two ways:
1. [QueryResult](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L41) structure is stored under unique key containing identifier of `RegisteredQuery`;
2. Transaction's data from [TxValue](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L67) is stored under a composite key: `[]byte`([`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/types/keys.go#L33)` + bigEndianBytes(queryID) + bigEndianBytes(txID)`

## Events

The ICQ module emits the following event:

### EndBlocker

| Attribute Key | Attribute Value                    |
|---------------|------------------------------------|
 | module        | interchainqueries                  |
| action        | query                              |
| query_id      | `{identifier_of_registered_query}` |
| zone_id       | `{identifier_of_remote_zone}`      |
| type          | `{query_type}`                     |
| parameters    | `{query_parameteres}`              |

