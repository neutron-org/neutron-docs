# API

This page describes the interface of the `interchainqueries` module, including the endpoints it provides and the `sudo` messages it issues. Each endpoint is detailed in its own section, with links to the request and response models, as well as examples of how to interact with the module using the endpoint. The request and response model links also offer more details about the request parameters and response values.

Please note that the examples are for demonstration purposes only and may not reflect the current state of the chain. They are included to help visualize how requests are formed and what the response payloads look like.

**Endpoints**

This section lists the public RPC API of the `interchainqueries` module.

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

This section lists the `sudo` messages that the `interchainqueries` module sends to smart contracts that own Interchain Queries.

- [MessageTxQueryResult](#messagetxqueryresult)
- [MessageKvQueryResult](#messagekvqueryresult)

## Queries

### Params

Fetches the current parameters of the `interchainqueries` module.

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

Retrieves all registered Interchain Queries in the module, with optional filtering by owner and/or connection ID.

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

Fetches details of a registered Interchain Query using its ID.

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

Retrieves the most recent successfully submitted result of an Interchain Query. This is only applicable for KV Interchain Queries.

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

Retrieves the most recent height of a remote chain as known by the IBC client associated with a given connection ID.

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

Registers a new Interchain Query in the `interchainqueries` module. This message should only be issued by a smart contract. The calling contract is automatically charged a query registration deposit, based on the module's query deposit parameter. The deposit is refunded when the query is removed. Ensure the contract's account has sufficient assets at the time of message execution.

The response includes the ID assigned to the registered query. Use a reply handler to process this response and utilize the query ID.

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

Submits the result of an Interchain Query execution to the chain. Handling this message may involve forwarding the result to the smart contract that owns the query for processing, which could require significant gas usage.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgSubmitQueryResult)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgSubmitQueryResultResponse)

**Might be interesting:**
- [What are entry points and sudo calls?](/neutron/modules/interchain-queries/explanation#what-are-entry-points-and-sudo-calls)
- [Limited gas for sudo calls](/neutron/modules/interchain-queries/explanation#limited-gas-for-sudo-calls)
- [What happens if a sudo callback to a smart contract owning an Interchain Query fails?](/neutron/modules/interchain-queries/explanation#what-happens-if-a-sudo-callback-to-a-smart-contract-owning-an-interchain-query-fails)
- [Impossibility to retrieve and prove KV data with nil values](/neutron/modules/interchain-queries/known-bugs#impossibility-to-retrieve-and-prove-kv-data-with-nil-values)

### RemoveInterchainQuery

Removes a specific Interchain Query and its results from the module. The query can only be removed by its owner during the query's submit timeout. After the timeout, anyone can remove it. Upon successful removal, the query deposit is refunded to the caller.

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

Updates the parameters of a registered Interchain Query. This action can only be performed by the query's owner.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateInterchainQuery)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateInterchainQueryResponse)

Events emission on success:
- `type=neutron`, attributes:
    - `module=interchainqueries`;
    - `action=query_updated`;
    - other attributes with query parameters: `query_id`, `connection_id`, `owner`, `type`, `tx_filter`, `kv_key`.

### UpdateParams

Updates the parameters of the `interchainqueries` module. This action can only be performed by the module's authority.

- [Request model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateParams)
- [Response model](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#MsgUpdateParamsResponse)

## Sudo

### MessageTxQueryResult

MessageTxQueryResult is the model of the `sudo` message sent to a smart contract when a TX Interchain Query result is submitted. The owner of a TX Interchain Query must implement a `sudo` entry point to handle `tx_query_result` messages and include the necessary logic in it. The `tx_query_result` handler functions as a callback, triggered by the `interchainqueries` module each time a TX query result is submitted.

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

MessageKvQueryResult is the model of the `sudo` message sent to a smart contract when a KV Interchain Query result is submitted. If the owner of a KV Interchain Query wants to handle updates, they must implement a `sudo` entry point to process `kv_query_result` messages and include the necessary logic in it. The `kv_query_result` handler acts as a callback, triggered by the `interchainqueries` module whenever a KV query result is submitted.

Note that the message does not include the actual query result, only the query ID. To access the result data, use the `Query/QueryResult` RPC of the `interchainqueries` module.

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