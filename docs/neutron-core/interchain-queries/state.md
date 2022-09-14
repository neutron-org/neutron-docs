# State

The ICQ module stores one [RegisteredQuery](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/proto/interchainqueries/genesis.proto#L9) per identifier.
`RegisteredQuery` contains all the necessary info for the ICQ relayer to perform a query on remote chain. `last_emitted_height` is modified every `update_period` on end blockers. `last_submitted_result_local_height`, `last_submitted_result_remote_height` are only used for KV-queries and are modified only when a relayer publishes result for a query. It also contains `deposit` field, this field is used to collect escrow payment for query creation. In order to return escrow payment owner or anybode else should issue `RemoveInterchainQuery` message. 

Permissions to perform `RemoveInterchainQuery` message is based on `query_submit_timeout` module parameter. If `last_submitted_result_local_height` + `query_submit_timeout` is less then current block height then `RemoveInterchainQuery` message can be performed only by query owner, on other case it can be performed by any address.

Results for interchain queries are stored as:
1. [QueryResult](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L41) structure is stored under unique key containing identifier of `RegisteredQuery`;
