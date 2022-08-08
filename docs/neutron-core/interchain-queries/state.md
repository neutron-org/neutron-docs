# State

The ICQ module stores one [RegisteredQuery](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/genesis.proto#L10) per identifier.
`RegisteredQuery` contains all the necessary info for the ICQ relayer to perform a query on remote chain. `last_emitted_height` is modified every `update_period` on end blockers. `last_submitted_result_local_height`, `last_submitted_result_remote_height` are modified only when a relayer publishes result for a query.

Results for interchain queries are stored in two ways:
1. [QueryResult](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L41) structure is stored under unique key containing identifier of `RegisteredQuery`;
2. Transaction's data from [TxValue](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L67) is packed in [`Transaction`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/query.proto#L87) structure and stored under a composite key `bigEndianBytes(queryID) + bigEndianBytes(txID)` prefixed by [`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/types/keys.go#L33);
