# Messages

### Register Interchain Query

[`MsgRegisterInterchainQuery`](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/proto/interchainqueries/tx.proto#L23) can be submitted by smart-contract only via `MsgRegisterInterchainQuery` transaction:

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
  // Path (storage prefix) to the storage where you want to read value by key (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
  string path = 1;
  // Key you want to read from the storage
  bytes key = 2;
}
```

> **Note:** the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.

Currently `query_type` can take the following values:
* `kv` - query **values** from Cosmos-SDK KV-storage on remote chain which are stored under some **keys**. In this case `kv_keys` must be filled in.

* `tx` - query to search for transactions on remote chain. `transactions_filter` describes a filter by which the [ICQ relayer](/relaying/icq-relayer) will perform the transactions search. It has the following format:

#### Transaction Filter

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


Suppose you want to search for transactions that meet specific conditions on a remote chain. You can build a query using various filters to narrow down the search.

##### Finding Transfer Transactions with a Specific Amount

```json
[{"field": "transfer.amount", "op": "eq", "val": 1000}]
```

This filter searches for all transfer transactions with an exact amount of 1000. The ICQ relayer converts it into the Tendermint search string:

```
"transfer.amount" = 1000
```

##### Searching for Transactions within a Range of Dates

```json
[{"field": "timestamp", "op": "gte", "val": "2023-01-01T00:00:00Z"}, {"field": "timestamp", "op": "lt", "val": "2023-02-01T00:00:00Z"}]
```

This filter queries for all transactions that were processed between January 1, 2023, and February 1, 2023. The corresponding Tendermint search string would be:

```
"timestamp" >= "2023-01-01T00:00:00Z" AND "timestamp" < "2023-02-01T00:00:00Z"
```

##### Combining Multiple Conditions

```json
[{"field": "message.module", "op": "eq", "val": "bank"}, {"field": "transfer.sender", "op": "eq", "val": "neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff"}, {"field": "transfer.amount", "op": "gt", "val": 500}]
```

This example searches for bank transfer transactions sent by a specific address (`neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff`) and with an amount greater than 500. The search string would be:

```
"message.module" = "bank" AND "transfer.sender" = "neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff" AND "transfer.amount" > 500
```

##### Effects of Filters

The filters in the `transactions_filter` field allow for refined and targeted querying of transactions. Some effects of applying these filters are:

- **Increased Efficiency**: By narrowing down the search criteria, the query can return results more quickly, reducing the computational resources required.
- **Improved Relevance**: Filters ensure that only transactions that meet specific criteria are returned, making the results more relevant to the user's needs.
- **Flexibility**: Users can combine different operators and fields to create complex queries that match their exact requirements.
- **Error Handling**: Providing incorrect or conflicting filters might result in an error, so the filter structure must be carefully constructed to avoid issues.

By understanding the usage of the `transactions_filter` field, developers and users can leverage the power of targeted querying to interact with remote chains in a more effective and efficient manner.

##### Having Fewer or More Filters

###### Fewer Filters
**Pros:**
- **Broader Results**: Using fewer filters will generally lead to a larger result set, capturing more transactions that meet broad criteria.
- **Faster Execution**: With less complexity, the query may execute more quickly, as there are fewer conditions to evaluate.

**Cons:**
- **Less Precision**: Fewer filters may lead to less relevant results if the query is too broad.

###### More Filters
**Pros:**
- **More Specific Results**: More filters allow for more targeted and precise queries, narrowing down the result set to only the most relevant transactions.
- **Enhanced Control**: More filters offer greater control over the query, enabling more complex and nuanced searches.

**Cons:**
- **Slower Execution**: More complex queries with multiple filters may take longer to execute, as each additional condition adds to the computational load.
- **Potential Overfitting**: Too many filters may lead to an overly narrow search, missing relevant transactions or even resulting in no results at all if the filters are too restrictive.

##### Good Practices

1. **Start with Core Criteria**: Identify the essential criteria for your query and start with those filters. It helps to focus on what you really need from the results.
2. **Incrementally Refine**: If needed, add additional filters incrementally to refine the results, testing at each stage to ensure relevance.
3. **Avoid Redundancy**: Ensure that each filter adds value to the query and that there are no redundant or conflicting filters.
4. **Test Performance**: Consider testing the query with different numbers of filters to gauge performance and result relevance, especially if using many filters.
5. **Use the Maximum Limit Wisely**: Note that the maximum allowed amount of 32 filters is a technical constraint.

##### How Many Filters Do You Need?

The optimal number of filters depends on the specific use case and the balance between precision and performance. Generally, it's best to use the minimum number of filters that provide the necessary specificity for your query. Using too few may yield irrelevant results, while using too many may overly narrow the search or impact performance.

##### Conclusion

The number of filters in a query is a vital consideration, influencing both the relevance of the results and the performance of the query. Striking the right balance requires a thoughtful approach, considering the specific needs of the query, and adhering to good practices for constructing and refining filters.


`MsgRegisterInterchainQuery` returns [`MsgRegisterInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/proto/interchainqueries/tx.proto#L42) where `id` is unique identifier of newly registered interchain query on success:
```protobuf
message MsgRegisterInterchainQueryResponse { 
  uint64 id = 1; 
}
```

#### State modifications
* increments last registered query id;
* generates new [RegisteredQuery](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/proto/interchainqueries/genesis.proto#L10);
* save the record in storage under incremented query id;

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_updated`.

### Update Interchain Query

> **Note:** as well as for query registration, for query updates the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.

[`MsgUpdateInterchainQueryRequest`](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/proto/interchainqueries/tx.proto#L111) can be submitted only by the owner of corresponding Interchain Query:
```protobuf
message MsgUpdateInterchainQueryRequest {
  uint64 query_id = 1;
  repeated KVKey new_keys = 2;
  uint64 new_update_period = 3;
  string new_transactions_filter = 4;
  string sender = 5; // is the signer of the message and owner of the corresponding ICQ
}
```

Returns just an empty [`MsgUpdateInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/proto/interchainqueries/tx.proto#L117) on success:
```protobuf
message MsgUpdateInterchainQueryResponse {
}
```

#### State modifications
* [Updates](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/x/interchainqueries/keeper/msg_server.go#L130) a corresponding `RegisteredQuery` structure.

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_updated`.


### Remove Interchain Query

[`MsgRemoveInterchainQueryRequest`](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/proto/interchainqueries/tx.proto#L104) can be submitted only by the owner of corresponding Interchain Query within the query's service period or by anyone beyond it. Read more about this message permissions [here](/neutron/modules/interchain-queries/overview#query-creation-deposit).
```protobuf
message MsgRemoveInterchainQueryRequest {
  uint64 query_id = 1;
  string sender = 2; // is the signer of the message and the owner of corresponding ICQ
}
```

Returns just an empty [`MsgRemoveInterchainQueryResponse`](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/proto/interchainqueries/tx.proto#L108) on success:
```protobuf
message MsgRemoveInterchainQueryResponse {
}
```

#### State modifications
* [Removes](https://github.com/neutron-org/neutron/blob/dd812d6a05f4036a789cdb4b895020e73543702e/x/interchainqueries/keeper/msg_server.go#L93) a corresponding `RegisteredQuery` structure.
* Also [removes](https://github.com/neutron-org/neutron/blob/88abc3140a8d2944c03a1c282c2f83c59fe6030b/x/interchainqueries/keeper/msg_server.go#L106) the query results ([immediately](https://github.com/neutron-org/neutron/blob/88abc3140a8d2944c03a1c282c2f83c59fe6030b/x/interchainqueries/keeper/keeper.go#L144) for a KV query, [deferred in the ICQ module EndBlock](https://github.com/neutron-org/neutron/blob/88abc3140a8d2944c03a1c282c2f83c59fe6030b/x/interchainqueries/module.go#L176) for a TX query).

#### Events
Emits [`EventTypeNeutonMessage`](/neutron/modules/interchain-queries/events#eventtypeneutronmessage) with `action` equals `query_removed`.


### Submit Query Result

[`MsgSubmitQueryResult`](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/proto/interchainqueries/tx.proto#L44) can be submitted by any Neutron account via `MsgSubmitQueryResult` transaction:

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

Returns just an empty [`MsgSubmitQueryResultResponse`](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/proto/interchainqueries/tx.proto#L99) on success:

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
  * verify `block.next_block_header` and `block.header` by calling [`ibcClientKeeper.UpdateClient(header)`](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/process_block_results.go#L63);
  * [verify](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/process_block_results.go#L155) `block.txs` with verified headers;
* process every `transaction` in every `block` from `MsgSubmitQueryResult.result.blocks`:
  * [check](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/process_block_results.go#L125) transaction was not processed previously to avoid double submitting
  * save generated record to the storage with composite key `bigEndianBytes(registered_query.id) + bigEndianBytes(last_submitted_transaction_id` prefixed by [`SubmittedTxKey`](https://github.com/neutron-org/neutron/blob/c8503c3c17df3c5ca24abeeafaba9123c28395ac/x/interchainqueries/types/keys.go#L33);
  * [callback](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/process_block_results.go#L134) transaction to the appropriate smart-contract;
  * [save](https://github.com/neutron-org/neutron/blob/4313d35f8082dc124c5fe9491870720bbd3a5052/x/interchainqueries/keeper/process_block_results.go#L141) transaction's hash to the storage to approach double-submission preventing mechanis,
