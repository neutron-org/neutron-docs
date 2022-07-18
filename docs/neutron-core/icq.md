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
2. Transaction's data from [TxValue](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L67) is packed in [`Transaction`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/query.proto#L87) structure and stored under a composite key `[]byte`([`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/types/keys.go#L33)` + bigEndianBytes(queryID) + bigEndianBytes(txID)`

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

## Messages

### Register Interchain Query

[`MsgRegisterInterchainQuery`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L23) can be submitted by any Neutron account (including smart-contract) via `MsgRegisterInterchainQuery` transaction:

```protobuf
message MsgRegisterInterchainQuery {
 string query_data = 1; // JSON encoded data of query
 string query_type = 2; // is used to identify the query (i.e. /cosmos.staking.v1beta1.Query/AllDelegations)
 string zone_id = 3; // is used to identify the chain of interest
 string connection_id = 4; // is IBC connection ID for getting ConsensusState to verify proofs
 uint64 update_period = 5; // is used to say how often the query must be updated
 string sender = 6; // is the signer of the message
}
```

Returns [`MsgRegisterInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L32) where `id` is unique identifier of newly registered interchain query on success:
```protobuf
message MsgRegisterInterchainQueryResponse { 
  uint64 id = 1; 
}
```

#### State modifications
* increments last registered query id;
* generates new [RegisteredQuery](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/genesis.proto#L10);
* save the record in storage under incremented query id;

### Submit Query Result

[`MsgSubmitQueryResult`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L34) can be submitted by any Neutron account via `MsgSubmitQueryResult` transaction:

```protobuf
message MsgSubmitQueryResult {
  uint64 query_id = 1;
  string sender = 2;
  string client_id = 3; // is the IBC client ID for an IBC connection between Neutron chain and target chain (where the result was obtained from)
  QueryResult result = 4;
}

message QueryResult {
  repeated StorageValue kv_results = 1;
  repeated Block blocks = 2;
  uint64 height = 3;
  uint64 revision = 4;
}

message StorageValue {
  string storage_prefix = 1; // is the substore name (acc, staking, etc.)
  bytes key = 2; // is the key in IAVL store
  bytes value = 3; // is the value in IAVL store

  tendermint.crypto.ProofOps Proof = 4; // is the Merkle Proof which proves existence of key-value pair in IAVL storage
}

message Block {
  // We need to know block X+1 to verify response of transaction for block X
  // since LastResultsHash is root hash of all results from the txs from the previous block
  google.protobuf.Any next_block_header = 1;

  // We need to know block X to verify inclusion of transaction for block X
  google.protobuf.Any header = 2;

  repeated TxValue txs = 3;
}

message TxValue {
  tendermint.abci.ResponseDeliverTx response = 1;
  tendermint.crypto.Proof delivery_proof = 2; // is the Merkle Proof which proves existence of response in block with height next_block_header.Height
  tendermint.crypto.Proof inclusion_proof = 3; // is the Merkle Proof which proves existence of data in block with height header.Height
  bytes data = 4; // is body of the transaction
}
```

Returns just an empty [`MsgSubmitQueryResultResponse`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/tx.proto#L74) on success:

```protobuf
message MsgSubmitQueryResultResponse {

}
```

#### State modifications
* get registered interchain query info by `MsgSubmitQueryResult.query_id`;
* for every `result` in `MsgSubmitQueryResult.result.kv_results`:
  * read IBC connection consensus state from IBC keeper storage with `registered_query.ConnectionID`, `MsgSubmitQueryResult.result.revision`, `MsgSubmitQueryResult.result.height+1`;
  * verify `result.Proof` with Merkle Root Hash from consensus state;
* for every `block` in `MsgSubmitQueryResult.result.blocks`:
  * verify `block.next_block_header` and `block.header` by calling [`ibcClientKeeper.UpdateClient(header)`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/keeper/verify.go#L61);
  * [verify](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/keeper/verify.go#L127) `block.txs` with verified headers;
* save `MsgSubmitQueryResult.result.kv_results` to the storage:
  * clear `MsgSubmitQueryResult.result` from the proofs, Neutron doesn't need them anymore;
  * save cleared result to storage with key `registered_query.id`;
  * set `registered_query.last_submitted_result_remote_height` to `result.height`;
  * set `registered_query.last_submitted_result_local_height` to the current Neutron height;
* save every `transaction` in every `block` from `MsgSubmitQueryResult.result.blocks` to the storage:
  * read `last_submitted_transaction_id` for `registered_query`;
  * generate [`Transaction`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/query.proto#L87) structure where `id` is `last_submitted_transaction_id`, `height` is a `block.height` and `data` is `transaction.data`;
  * increment `last_submitted_transaction_id`;
  * save generated record to the storage with composite key `[]byte`([`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/types/keys.go#L33)` + bigEndianBytes(registered_query.id) + bigEndianBytes(last_submitted_transaction_id)`;
  * set `registered_query.last_submitted_result_remote_height` to a max `block.Header.height` among all submitted `blocks`;
  * set `registered_query.last_submitted_result_local_height` to the current Neutron height;
