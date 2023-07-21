# State

The ICQ module stores one [RegisteredQuery](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/genesis.proto#L11) per identifier.
`RegisteredQuery` contains all the necessary info for the ICQ relayer to perform a query on remote chain. `last_submitted_result_local_height`, `last_submitted_result_remote_height` are only used for KV-queries and are modified only when a relayer publishes result for a query.

Results for interchain queries are stored as:
1. [QueryResult](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L56) structure is stored under unique key containing identifier of `RegisteredQuery`;
