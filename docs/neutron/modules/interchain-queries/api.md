# API

This page contains the `interchainqueries` module's interface description: the endpoints the module exposes and the `sudo` messages the module issues. Each endpoint is explained in a dedicated section with links to request and response models, and an example of interaction with the module via the endpoint. The links to the request and response models also provide more information about request parameters and response values.

Please be aware that the examples do not necessarily reflect the current state on the chain; they are listed here only to visualize the request formation and response payload in a user-friendly way.

**Endpoints**

This section lists piblic RPC API of the `interchainqueries` module.

Queries:
- [Params](#params);
- [RegisteredQueries](#registeredqueries);
- [RegisteredQuery](#registeredquery);
- [QueryResult](#queryresult);
- [LastRemoteHeight](#lastremoteheight).

Messages:
- [RegisterInterchainQuery](#registerinterchainquery);
- [SubmitQueryResult](#submitqueryresult);
- [RemoveInterchainQuery](#removeinterchainquery);
- [UpdateInterchainQuery](#updateinterchainquery);
- [UpdateParams](#updateparams).

**Sudo**

This section lists `sudo` messages issued by the `interchainqueries` module to smart contracts owning Interchain Queries.

- [MessageTxQueryResult](#messagetxqueryresult)
- [MessageKvQueryResult](#messagekvqueryresult)

## Queries

### Params

Queries the current parameters of the module.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryParamsRequest)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryParamsResponse)

<details>
  <summary>Example</summary>

```sh
curl -X 'GET' \
  'https://rest-lb.neutron.org/neutron/interchainqueries/params' \
  -H 'accept: application/json'
 ```

```json
{
  "params": {
    "query_submit_timeout": "1036800",
    "query_deposit": [
      {
        "denom": "untrn",
        "amount": "1000000"
      }
    ],
    "tx_query_removal_limit": "10000",
    "max_kv_query_keys_count": "32",
    "max_transactions_filters": "32"
  }
}
```
</details>

### RegisteredQueries

Queries all the registered Interchain Queries in the module with filtration by owner and/or connection ID.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryRegisteredQueriesRequest)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryRegisteredQueriesResponse)

<details>
  <summary>Example</summary>

```sh
curl -X 'GET' \
  'https://rest-lb-pion.ntrn.tech/neutron/interchainqueries/registered_queries?owners=neutron1zf2tdlq9pn8jq680rlsgwtsgljt54ctu0ulj8cm4s6r93mdmjuwqpurmf4&owners=neutron1sj5zhzmejs5q4t54zfgpkua6z0w0m87tz0sdzzqv8j0f5nwsv4fqmerty7' \
  -H 'accept: application/json'
```

```json
{
  "registered_queries": [
    {
      "id": "30",
      "owner": "neutron1sj5zhzmejs5q4t54zfgpkua6z0w0m87tz0sdzzqv8j0f5nwsv4fqmerty7",
      "query_type": "tx",
      "keys": [],
      "transactions_filter": "[{\"field\":\"transfer.recipient\",\"op\":\"Eq\",\"value\":\"cosmos1mclft0hv4f385j2t4luwfz4gthn264alvufx7fjvkwd99qhl4e9sf4g87w\"},{\"field\":\"tx.height\",\"op\":\"Gte\",\"value\":2644737}]",
      "connection_id": "connection-8",
      "update_period": "6",
      "last_submitted_result_local_height": "0",
      "last_submitted_result_remote_height": null,
      "deposit": [
        {
          "denom": "untrn",
          "amount": "1000000"
        }
      ],
      "submit_timeout": "1036800",
      "registered_at_height": "2644737"
    },
    {
      "id": "62",
      "owner": "neutron1zf2tdlq9pn8jq680rlsgwtsgljt54ctu0ulj8cm4s6r93mdmjuwqpurmf4",
      "query_type": "kv",
      "keys": [
        {
          "path": "bank",
          "key": "AhRF6XHZfYzFmJGcX7lKP98y5ZeMgnVubHM="
        }
      ],
      "transactions_filter": "",
      "connection_id": "connection-130",
      "update_period": "30",
      "last_submitted_result_local_height": "8544484",
      "last_submitted_result_remote_height": {
        "revision_number": "1",
        "revision_height": "3036139"
      },
      "deposit": [
        {
          "denom": "untrn",
          "amount": "1000000"
        }
      ],
      "submit_timeout": "1036800",
      "registered_at_height": "8542104"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "2"
  }
}
```
</details>

**Might be interesting:**
- [Why is the Proof field nullified in QueryResult RPC response?](/neutron/modules/interchain-queries/explanation#why-is-the-proof-field-nullified-in-queryresult-rpc-response)
- [Why doesn't interchainqueries module store TX query results?](/neutron/modules/interchain-queries/explanation#why-doesnt-interchainqueries-module-store-tx-query-results)

### RegisteredQuery

Queries a registered Interchain Query by ID.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryRegisteredQueryRequest)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryRegisteredQueryResponse)

<details>
  <summary>Example</summary>

```sh
curl -X 'GET' \
  'https://rest-lb-pion.ntrn.tech/neutron/interchainqueries/registered_query?query_id=62' \
  -H 'accept: application/json'
 ```

```json
{
  "registered_query": {
    "id": "62",
    "owner": "neutron1zf2tdlq9pn8jq680rlsgwtsgljt54ctu0ulj8cm4s6r93mdmjuwqpurmf4",
    "query_type": "kv",
    "keys": [
      {
        "path": "bank",
        "key": "AhRF6XHZfYzFmJGcX7lKP98y5ZeMgnVubHM="
      }
    ],
    "transactions_filter": "",
    "connection_id": "connection-130",
    "update_period": "30",
    "last_submitted_result_local_height": "8544484",
    "last_submitted_result_remote_height": {
      "revision_number": "1",
      "revision_height": "3036139"
    },
    "deposit": [
      {
        "denom": "untrn",
        "amount": "1000000"
      }
    ],
    "submit_timeout": "1036800",
    "registered_at_height": "8542104"
  }
}
```
</details>

**Might be interesting:**
- [Why is the Proof field nullified in QueryResult RPC response?](/neutron/modules/interchain-queries/explanation#why-is-the-proof-field-nullified-in-queryresult-rpc-response)
- [Why doesn't interchainqueries module store TX query results?](/neutron/modules/interchain-queries/explanation#why-doesnt-interchainqueries-module-store-tx-query-results)

### QueryResult

Queries the last successfully submitted result of an Interchain Query.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryQueryResultRequest)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryQueryResultResponse)

<details>
  <summary>Example</summary>

```sh
curl -X 'GET' \
  'https://rest-lb-pion.ntrn.tech/neutron/interchainqueries/query_result?query_id=62' \
  -H 'accept: application/json'
 ```

```json
{
  "result": {
    "kv_results": [
      {
        "storage_prefix": "bank",
        "key": "AhRF6XHZfYzFmJGcX7lKP98y5ZeMgnVubHM=",
        "value": "CgR1bmxzEgczOTk3NDkx",
        "Proof": null
      }
    ],
    "block": null,
    "height": "3036139",
    "revision": "1",
    "allow_kv_callbacks": false
  }
}
```
</details>

**Might be interesting:**
- [Why is the Proof field nullified in QueryResult RPC response?](/neutron/modules/interchain-queries/explanation#why-is-the-proof-field-nullified-in-queryresult-rpc-response)
- [Why doesn't interchainqueries module store TX query results?](/neutron/modules/interchain-queries/explanation#why-doesnt-interchainqueries-module-store-tx-query-results)

### LastRemoteHeight

Queries the last height of a remote chain known to the IBC client behind a given connection ID.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryLastRemoteHeightRequest)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryLastRemoteHeightResponse)

<details>
  <summary>Example</summary>

```sh
curl -X 'GET' \
  'https://rest-lb-pion.ntrn.tech/neutron/interchainqueries/remote_height?connection_id=connection-92' \
  -H 'accept: application/json'
 ```

```json
{
  "height": "5788175"
}
```
</details>

**Might be interesting:**
-[What's the role of IBC connections in Interchain Queries and how to choose one?](/neutron/modules/interchain-queries/explanation#whats-the-role-of-ibc-connections-in-interchain-queries-and-how-to-choose-one)

## Messages

### RegisterInterchainQuery

Registers a new Interchain Query in the `interchainqueries` module. This message is supposed to be issues only by a smart contract. The caller contract is charged a query registration deposit automatically in the amount defined as the module's query deposit parameter. The deposit is paid back on the query removal. Make sure to have enough assets on the contract's account at the time of the message execution.

Returns an ID assigned to the registered query. Handle this message response via a reply handler in order to make use of the ID.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgRegisterInterchainQuery)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgRegisterInterchainQueryResponse)

Events emission on success:
- `type=neutron`, attributes:
    - `module=interchainqueries`;
    - `action=query_updated`;
    - other attributes with query parameters: `query_id`, `connection_id`, `owner`, `type`, `tx_filter`, `kv_key`.

**Might be interesting:**
- [How to choose the right IBC connection ID for an Interchain Query and verify it](/neutron/modules/interchain-queries/how-to#how-to-choose-the-right-ibc-connection-id-for-an-interchain-query-and-verify-it)
- [How to find out what transaction filter to use](/neutron/modules/interchain-queries/how-to#how-to-find-out-what-transaction-filter-to-use)
- [How to register and handle a KV Interchain Query](/neutron/modules/interchain-queries/how-to#how-to-register-and-handle-a-kv-interchain-query)
- [How to register and handle a TX Interchain Query](/neutron/modules/interchain-queries/how-to#how-to-register-and-handle-a-tx-interchain-query)
- [Why is there a query creation deposit?](/neutron/modules/interchain-queries/explanation#why-is-there-a-query-creation-deposit)
- [Impossibility to retrieve and prove KV data with nil values](/neutron/modules/interchain-queries/known-bugs#impossibility-to-retrieve-and-prove-kv-data-with-nil-values)

### SubmitQueryResult

Submits a result of an Interchain Query execution to the chain. This message handling may include passing of the result to the query's owner smart contract for processing which might be a pretty gas-consumable operation.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgSubmitQueryResult)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgSubmitQueryResultResponse)

**Might be interesting:**
- [What are entry points and sudo calls?](/neutron/modules/interchain-queries/explanation#what-are-entry-points-and-sudo-calls)
- [Limited gas for sudo calls](/neutron/modules/interchain-queries/explanation#limited-gas-for-sudo-calls)
- [What happens if a sudo callback to a smart contract owning an Interchain Query fails?](/neutron/modules/interchain-queries/explanation#what-happens-if-a-sudo-callback-to-a-smart-contract-owning-an-interchain-query-fails)
- [Impossibility to retrieve and prove KV data with nil values](/neutron/modules/interchain-queries/known-bugs#impossibility-to-retrieve-and-prove-kv-data-with-nil-values)

### RemoveInterchainQuery

Removes a given Interchain Query and its results from the module. Can be removed only by the owner of the query during the query's submit timeout, and by anyone after the query has been timed out. The query deposit is returned to the caller on a success call.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgRemoveInterchainQuery)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgRemoveInterchainQueryResponse)

Events emission on success:
- `type=neutron`, attributes:
    - `module=interchainqueries`;
    - `action=query_removed`;
    - other attributes with query parameters: `query_id`, `connection_id`, `owner`, `type`, `tx_filter`, `kv_key`.

**Might be interesting:**
- [What are the rules for creation deposit refund?](/neutron/modules/interchain-queries/explanation#what-are-the-rules-for-creation-deposit-refund)
- [How Interchain Query results are removed?](/neutron/modules/interchain-queries/explanation#how-interchain-query-results-are-removed)

### UpdateInterchainQuery

Updates parameters of a registered Interchain Query. Only callable by the owner of the query.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateInterchainQuery)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateInterchainQueryResponse)

Events emission on success:
- `type=neutron`, attributes:
    - `module=interchainqueries`;
    - `action=query_updated`;
    - other attributes with query parameters: `query_id`, `connection_id`, `owner`, `type`, `tx_filter`, `kv_key`.

### UpdateParams

Updates params of the interchainqueries module. Only callable by the module's authority.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateParams)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateParamsResponse)

## Sudo

### MessageTxQueryResult

MessageTxQueryResult is the model of the `sudo` message sent to a smart contract on a TX Interchain Query result submission. The owner of a TX Interchain Query must define a `sudo` entry_point for handling `tx_query_result` messages and place the needed logic there. The `tx_query_result` handler is treated by the `interchainqueries` module as a callback that is called each time a TX query result is submitted.

- [Message model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/contractmanager/types#MessageTxQueryResult)
- [Message model in neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/sudo/msg/enum.SudoMsg.html#variant.TxQueryResult)

Events emission on failure:
- `type=sudo`, attributes:
    - attributes with the failure parameters: `_contract_address`, `failure_id`, `error`.

**Might be interesting:**
- [What are entry points and sudo calls?](/neutron/modules/interchain-queries/explanation#what-are-entry-points-and-sudo-calls)
- [Limited gas for sudo calls](/neutron/modules/interchain-queries/explanation#limited-gas-for-sudo-calls)
- [What happens if a sudo callback to a smart contract owning an Interchain Query fails?](/neutron/modules/interchain-queries/explanation#what-happens-if-a-sudo-callback-to-a-smart-contract-owning-an-interchain-query-fails)
- [Why is it mandatory to do contract's side verification of submitted TX Interchain Query results?](/neutron/modules/interchain-queries/explanation#why-is-it-mandatory-to-do-contracts-side-verification-of-submitted-tx-interchain-query-results)
- [Why doesn't interchainqueries module store TX query results?](/neutron/modules/interchain-queries/explanation#why-doesnt-interchainqueries-module-store-tx-query-results)

### MessageKvQueryResult

MessageKVQueryResult is the model of the `sudo` message sent to a smart contract on a KV Interchain Query result submission. If the owner of a KV Interchain Query wants to handle the query updates, it must define a `sudo` entry_point for handling `kv_query_result` messages and place the needed logic there. The `kv_query_result` handler is treated by the `interchainqueries` module as a callback that is called each time a KV query result is submitted.

Note that there is no query result sent, only the query ID. In order to access the actual result, use the Query/QueryResult RPC of the `interchainqueries` module.

- [Message model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/contractmanager/types#MessageKVQueryResult)
- [Message model in neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/sudo/msg/enum.SudoMsg.html#variant.KVQueryResult)

Events emission on failure:
- `type=sudo`, attributes:
    - attributes with the failure parameters: `_contract_address`, `failure_id`, `error`.

**Might be interesting:**
- [What are entry points and sudo calls?](/neutron/modules/interchain-queries/explanation#what-are-entry-points-and-sudo-calls)
- [Limited gas for sudo calls](/neutron/modules/interchain-queries/explanation#limited-gas-for-sudo-calls)
- [What happens if a sudo callback to a smart contract owning an Interchain Query fails?](/neutron/modules/interchain-queries/explanation#what-happens-if-a-sudo-callback-to-a-smart-contract-owning-an-interchain-query-fails)
- [Impossibility to retrieve and prove KV data with nil values](/neutron/modules/interchain-queries/known-bugs#impossibility-to-retrieve-and-prove-kv-data-with-nil-values)
