# Messages

### Register Interchain Query

[`MsgRegisterInterchainQuery`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L23) can be submitted by smart-contract only via `MsgRegisterInterchainQuery` transaction:

```protobuf
message MsgRegisterInterchainQuery {
  // defines a query type: `kv` or `tx` now
  string query_type = 1;

  // is used to define KV-storage keys for which we want to get values from remote chain
  repeated KVKey keys = 2;

  // is used to define a filter for transaction search ICQ
  string transactions_filter = 3;

  // is IBC connection ID for getting ConsensusState to verify proofs
  string connection_id = 4;

  // is used to specify how often (in neutron blocks) the query must be updated
  uint64 update_period = 5;

  // is the signer of the message
  string sender = 6;
}

message KVKey {
  // Path (storage prefix) to the storage where you want to read value by key
  // (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
  string path = 1;
  // Key you want to read from the storage
  bytes key = 2;
}
```

> **Note:** the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.

Currently `query_type` can take the following values:
* `kv` - query **values** from Cosmos-SDK KV-storage on remote chain which are stored under some **keys**. In this case `kv_keys` must be filled in.

* `tx` - query to search for transactions on remote chain. `transactions_filter` describes a filter by which the [ICQ relayer](/relaying/icq-relayer) will perform the transactions search. It has the following format:
```json
[{"field": "{eventType}.{attributeKey}", "val": "{attributeValue}", "op": "gte"}, ...]
```

Maximum allowed amount of filters is 32. Supplying more filters than allowed will return an error.

Supported operators:
* `eq`
* `lt`
* `gt`
* `lte`
* `gte`

The ICQ relayer can easily parse this format and compose it into usual [Tendermint syntax](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html#querying-transactions) for searching transactions.

For instance, this query to search all transfer transactions with amount greater than 42:
```json
[{"field": "transfer.amount", "op": "gt", "val": 42}, {"field": "message.module", "op": "eq", "val": "bank"}]
```
will be converted by the ICQ relayer into a usual Tendermint search string:
```
"transfer.amount" > 42 AND "message.module" = "bank"
```

`MsgRegisterInterchainQuery` returns [`MsgRegisterInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L44) where `id` is unique identifier of newly registered interchain query on success:
```protobuf
message MsgRegisterInterchainQueryResponse { 
  uint64 id = 1; 
}
```

#### State modifications
* increments last registered query id;
* generates new [RegisteredQuery](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/genesis.proto#L11);
* save the record in storage under incremented query id;

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_updated`.

### Update Interchain Query

> **Note:** as well as for query registration, for query updates the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.

[`MsgUpdateInterchainQueryRequest`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L114) can be submitted only by the owner of corresponding Interchain Query:
```protobuf
message MsgUpdateInterchainQueryRequest {
  uint64 query_id = 1;
  repeated KVKey new_keys = 2;
  uint64 new_update_period = 3;
  string new_transactions_filter = 4;
  string sender = 5; // is the signer of the message and owner of the corresponding ICQ
}
```

Returns just an empty [`MsgUpdateInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L121) on success:
```protobuf
message MsgUpdateInterchainQueryResponse {
}
```

#### State modifications
* [Updates](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/msg_server.go#L144) a corresponding `RegisteredQuery` structure.

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_updated`.


### Remove Interchain Query

[`MsgRemoveInterchainQueryRequest`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L108) can be submitted only by the owner of corresponding Interchain Query within the query's service period or by anyone beyond it. Read more about this message permissions [here](/neutron/modules/interchain-queries/overview#query-creation-deposit).
```protobuf
message MsgRemoveInterchainQueryRequest {
  uint64 query_id = 1;
  string sender = 2; // is the signer of the message and the owner of corresponding ICQ
}
```

Returns just an empty [`MsgRemoveInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L112) on success:
```protobuf
message MsgRemoveInterchainQueryResponse {
}
```

#### State modifications
* [Removes](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/keeper.go#L140) a corresponding `RegisteredQuery` structure.
* Also removes the query results ([immediately](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/keeper.go#L144) for a KV query, [deferred in the ICQ module EndBlock](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/module.go#L176) for a TX query).

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_removed`.


### Submit Query Result

[`MsgSubmitQueryResult`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L46) can be submitted by any Neutron account via `MsgSubmitQueryResult` transaction:

```protobuf
message MsgSubmitQueryResult {
  uint64 query_id = 1;
  string sender = 2;

  // is the IBC client ID for an IBC connection between Neutron chain and target chain (where the result was obtained from)
  string client_id = 3;
  QueryResult result = 4;
}

message QueryResult {
  repeated StorageValue kv_results = 1;
  Block block = 2;
  uint64 height = 3;
  uint64 revision = 4;
  bool allow_kv_callbacks = 5;
}

message StorageValue {
  // is the substore name (acc, staking, etc.)
  string storage_prefix = 1;

  // is the key in IAVL store
  bytes key = 2;

  // is the value in IAVL store
  bytes value = 3;

  // is the Merkle Proof which proves existence of key-value pair in IAVL storage
  tendermint.crypto.ProofOps Proof = 4;
}

message Block {
  // We need to know block X+1 to verify response of transaction for block X
  // since LastResultsHash is root hash of all results from the txs from the previous block
  google.protobuf.Any next_block_header = 1;

  // We need to know block X to verify inclusion of transaction for block X
  google.protobuf.Any header = 2;

  TxValue tx = 3;
}

message TxValue {
  tendermint.abci.ResponseDeliverTx response = 1;

  // is the Merkle Proof which proves existence of response in block with height next_block_header.Height
  tendermint.crypto.Proof delivery_proof = 2;

  // is the Merkle Proof which proves existence of data in block with height header.Height
  tendermint.crypto.Proof inclusion_proof = 3;

  // is body of the transaction
  bytes data = 4;
}
```

Returns just an empty [`MsgSubmitQueryResultResponse`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/tx.proto#L106) on success:

```protobuf
message MsgSubmitQueryResultResponse {}
```

#### State modifications
* get registered interchain query info by `MsgSubmitQueryResult.query_id`;
* for every `result` in `MsgSubmitQueryResult.result.kv_results`:
  * read IBC connection consensus state from IBC keeper storage with `registered_query.ConnectionID`, `MsgSubmitQueryResult.result.revision`, `MsgSubmitQueryResult.result.height+1`;
  * verify `result.Proof` with Merkle Root Hash from consensus state;
* save `MsgSubmitQueryResult.result.kv_results` to the storage:
  * clear `MsgSubmitQueryResult.result` from the proofs, Neutron doesn't need them anymore;
  * save cleared result to storage with key `registered_query.id`;
  * set `registered_query.last_submitted_result_remote_height` to `result.height`;
  * set `registered_query.last_submitted_result_local_height` to the current Neutron height;
* callback `MsgSubmitQueryResult.result.kv_results` to thr appropriate smart-contract if needed;
* for every `block` in `MsgSubmitQueryResult.result.blocks`:
  * verify `block.next_block_header` and `block.header` by calling [`clientKeeper.UpdateClient(header)`](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L68);
  * [verify](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L167) `block.txs` with verified headers;
* process every `transaction` in every `block` from `MsgSubmitQueryResult.result.blocks`:
  * [check](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L134) transaction was not processed previously to avoid double submitting
  * save generated record to the storage with composite key `bigEndianBytes(registered_query.id) + bigEndianBytes(last_submitted_transaction_id` prefixed by [`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/types/keys.go#L37);
  * [callback](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L143) transaction to the appropriate smart-contract;
  * [save](https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L150) transaction's hash to the storage to approach double-submission preventing mechanis,
