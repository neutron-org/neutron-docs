# Client

## Transactions

### register-interchain-query

Registers an interchain query with provided params:
```shell
neutrond tx register-interchain-query [zone-id] [connection-id] [query-type] [query-data] [update-period]
```

<details>
  <summary>Example</summary>
  Register an interchain query to get delegations of delegator on remote chain:

  ```shell
  neutrond tx interchainqueries register-interchain-query test-2 connection-0 x/staking/DelegatorDelegations '{"delegator": "neutron1qnk2n4nlkpw9xfqntladh74w6ujtulwn6dwq8z"}' 1 --from demowallet1 --gas 10000000 --gas-adjustment 1.4 --gas-prices 0.5stake --broadcast-mode block --chain-id test-1
  ```
  </details>

### submit-query-result

Submits query result:
  ```shell
  neutrond tx interchainqueries submit-query-result [query-id] [result-file]
  ```

  <details>
    <summary>Example</summary>
    Register an interchain query to get delegations of delegator on remote chain:

  ```shell
  neutrond tx interchainqueries submit-query-result result.json --from demowallet1 --gas 10000000 --gas-adjustment 1.4 --gas-prices 0.5stake --broadcast-mode block --chain-id test-1
  ```

Example ontent of `result.json` file:
  ```json
  {
      "kv_results": [
          {
              "storage_prefix": "staking",
              "key": "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==",
              "value": "Ci5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
              "Proof": {
                  "ops": [
                      {
                          "type": "ics23:iavl",
                          "key": "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==",
                          "data": "CvwDCisxFATsqdZ/sFxTJBNf+tv6rtckvn3TFATsqdZ/sFxTJBNf+tv6rtckvn3TEoUBCi5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMBoLCAEYASABKgMAAgIiKQgBEiUCBAQg/XaR47+Bw1YRGxSWwyiaAq5OSBQJIJ1qSFWbOe/5msIgIisIARIEBAgYIBohIK8BCwRz+Fod0SUgzLUhUK6VU2mEVhOqM53DZgtpytmXIikIARIlBhAcIEDf0aJaZU9bWVCd7T6zPbZoDp9Z+5w4qnurGAYVS85jICIrCAESBAgYJCAaISDJJKeGrIRSJj3EYotsdiXp6QNsqlzjMJuy4aELAnFvYiIrCAESBAo4SiAaISDcflhqTQQJl5EG2W37BWlPexWgUWXE0agE9ir+M5zA6SIsCAESBQxkjgEgGiEg4dZUUhewJTuJ2dNjKe7cJCKzJANcYVTprAPKkjQOtQciLQgBEgYOpgGaASAaISBRJQpR01RPTxIakznqcierctkEkx3Sp51sbw4+cAXnIQ=="
                      },
                      {
                          "type": "ics23:simple",
                          "key": "c3Rha2luZw==",
                          "data": "Cq8BCgdzdGFraW5nEiAX2lqGKZJW473ICfGb3Wa2lotPFt1cTLN+R9aZJjs2xBoJCAEYASABKgEAIicIARIBARogOqsHULjzmZkig3Kxczq2JoCMuiq6iXWpKHea7ZB9gWAiJwgBEgEBGiBp76tKiIQVkrMiaBxiQMYu0e/01Saw7T/PjyEPDPlQbiIlCAESIQEmmrFm4aKKJReopSqK+rTjZSDTKuV0duBPSipjJxPzaA=="
                      }
                  ]
              }
          },
          {
              "storage_prefix": "staking",
              "key": "IRQE7KnWf7BcUyQTX/rb+q7XJL590w==",
              "value": "CjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiA/t9hdbTKV91SkxZmBgg39qOod/0vO76wK5QW4V6ZyiyADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJLCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBIMCIvg1pYGEMCl3pgBWgEx",
              "Proof": {
                  "ops": [
                      {
                          "type": "ics23:iavl",
                          "key": "IRQE7KnWf7BcUyQTX/rb+q7XJL590w==",
                          "data": "CuYEChYhFATsqdZ/sFxTJBNf+tv6rtckvn3TEoICCjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiA/t9hdbTKV91SkxZmBgg39qOod/0vO76wK5QW4V6ZyiyADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJLCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBIMCIvg1pYGEMCl3pgBWgExGgsIARgBIAEqAwACAiIrCAESBAIEAiAaISAUEQIV7Mowp74roi0TppU27U2MG6vmxyfOJv0qCgfKqyIpCAESJQQIAiCCcJylC1/v/+M5ac1A5fvMcAA+5C+mG74CeoXjOScF1SAiKwgBEgQGEBwgGiEgD6ziA96HscsB249ulbBxQa4rSR8BzLzeJNkXjOakvjoiKwgBEgQIGCQgGiEgySSnhqyEUiY9xGKLbHYl6ekDbKpc4zCbsuGhCwJxb2IiKwgBEgQKOEogGiEg3H5Yak0ECZeRBtlt+wVpT3sVoFFlxNGoBPYq/jOcwOkiLAgBEgUMZI4BIBohIOHWVFIXsCU7idnTYynu3CQisyQDXGFU6awDypI0DrUHIi0IARIGDqYBmgEgGiEgUSUKUdNUT08SGpM56nInq3LZBJMd0qedbG8OPnAF5yE="
                      },
                      {
                          "type": "ics23:simple",
                          "key": "c3Rha2luZw==",
                          "data": "Cq8BCgdzdGFraW5nEiAX2lqGKZJW473ICfGb3Wa2lotPFt1cTLN+R9aZJjs2xBoJCAEYASABKgEAIicIARIBARogOqsHULjzmZkig3Kxczq2JoCMuiq6iXWpKHea7ZB9gWAiJwgBEgEBGiBp76tKiIQVkrMiaBxiQMYu0e/01Saw7T/PjyEPDPlQbiIlCAESIQEmmrFm4aKKJReopSqK+rTjZSDTKuV0duBPSipjJxPzaA=="
                      }
                  ]
              }
          }
      ],
      "height": 77,
      "revision": 2
  }
  ```
</details>

## Queries

In this section we describe the queries required on grpc server.

```protobuf
// Query defines the gRPC querier service.
service Query {
  // returns all registered queries in the module
  rpc RegisteredQueries(QueryRegisteredQueriesRequest)
      returns (QueryRegisteredQueriesResponse) {
    option (google.api.http).get =
        "/neutron/interchainqueries/interchainqueries/registered_queries";
  }

  // returns registered query by id
  rpc RegisteredQuery(QueryRegisteredQueryRequest)
      returns (QueryRegisteredQueryResponse) {
    option (google.api.http).get =
        "/neutron/interchainqueries/interchainqueries/registered_query";
  }

  // returns query result for a particular registered interchain query by id
  rpc QueryResult(QueryRegisteredQueryResultRequest) returns (QueryRegisteredQueryResultResponse) {
    option (google.api.http).get = "/neutron/interchainqueries/interchainqueries/query_result";
  }

  // returns submitted transactions as query result for a particular registered interchain query by id
  rpc QueryTransactions(QuerySubmittedTransactionsRequest) returns (QuerySubmittedTransactionsResponse) {
    option (google.api.http).get = "/neutron/interchainqueries/interchainqueries/query_transactions";
  }
}
```

### registered-query

Returns registered query by id.

```bash
netrond query interchainqueries registered-query [id]
```

<details>
  <summary>Example</summary>
  Returns info about registered query with id 1:

  ```shell
  neutrond query interchainqueries registered-query 1
  ```

Output:

  ```shell
  registered_query:
    connection_id: connection-0
    id: "1"
    last_emitted_height: "48"
    last_submitted_result_local_height: "0"
    last_submitted_result_remote_height: "0"
    query_data: '{"delegator": "neutron1qnk2n4nlkpw9xfqntladh74w6ujtulwn6dwq8z"}'
    query_type: x/staking/DelegatorDelegations
    update_period: "1"
    zone_id: test-2

  ```

</details>

### registered-queries

Returns all registered interchain queries in the module.

```bash
netrond query interchainqueries registered-queries
```

<details>
  <summary>Example</summary>
  Returns all registered interchain queries in the module.:

  ```shell
  neutrond query interchainqueries registered-queries
  ```

Output:

  ```shell
  registered_queries:
  - connection_id: connection-0
    id: "1"
    last_emitted_height: "218"
    last_submitted_result_local_height: "206"
    last_submitted_result_remote_height: "203"
    query_data: '{"delegator": "neutron1qnk2n4nlkpw9xfqntladh74w6ujtulwn6dwq8z"}'
    query_type: x/staking/DelegatorDelegations
    update_period: "1"
    zone_id: test-2
  - connection_id: connection-0
    id: "2"
    last_emitted_height: "217"
    last_submitted_result_local_height: "199"
    last_submitted_result_remote_height: "188"
    query_data: '{"message.module": "bank"}'
    query_type: x/tx/RecipientTransactions
    update_period: "5"
    zone_id: test-2
  ```

</details>

### query-result

Returns KV-storage result for particular registered interchain query by id.

```bash
neutrond query interchainqueries query-result [query-id]
```

<details>
  <summary>Example</summary>
  Returns KV-storage result for registered interchain query with id 1:

  ```shell
  neutrond query interchainqueries query-result 1
  ```

Output:

  ```shell
  result:
    blocks: []
    height: "203"
    kv_results:
    - Proof: null
      key: MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==
      storage_prefix: staking
      value: Ci5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==
    - Proof: null
      key: IRQE7KnWf7BcUyQTX/rb+q7XJL590w==
      storage_prefix: staking
      value: CjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiCGVtQII4Ok0ieJqHiQcBkW42FKCSKPv+3poD5Me4zh1SADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJKCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBILCKLo1pYGEKjc/G1aATE=
    revision: "0"
  ```

</details>

### query-transactions-search-result

Returns submitted transactions as query result for a particular registered interchain query by id.

```
neutrond query interchainqueries query-transactions-search-result [query-id] [start] [end]
```

<details>
  <summary>Example</summary>

Returns submitted transactions as query result for registered interchain query with id 2 with `start` argument equals 1 and `end` argument equals 2 (meaning *give me all transactions from id 1 to 2*):

  ```shell
  neutrond query interchainqueries query-transactions-search-result 2 1 3
  ```

Output:

  ```shell
  transactions:
  - data: CpIBCo8BChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEm8KLm5ldXRyb24xMGg5c3RjNXY2bnRnZXlnZjV4Zjk0NW5qcXE1aDMycjU0cmY3a2YSLm5ldXRyb24xbWprNzlmampncHBsYWs1d3E4Mzh3MHlkOTgyZ3preWY4Znh1OHUaDQoFc3Rha2USBDEwMDASaQpOCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohAk9iJuH5l5/XdmS6U+ojbutXnGzBnQf++HVOfKanVEc+EgQKAggBEhcKEAoFc3Rha2USBzUwMDAwMDAQgK3iBBpAIU14ZdEeH6ds4IhhPQx4k/3AJfODRt0PSXR9SljosdQ+JAyT2YGh48PEp0kARPSn2lk/2x7ie+JvQ1yfjo3KOg==
    height: "188"
    id: "1"
  - data: CpIBCo8BChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEm8KLm5ldXRyb24xMGg5c3RjNXY2bnRnZXlnZjV4Zjk0NW5qcXE1aDMycjU0cmY3a2YSLm5ldXRyb24xbWprNzlmampncHBsYWs1d3E4Mzh3MHlkOTgyZ3preWY4Znh1OHUaDQoFc3Rha2USBDEwMDASaQpOCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohAk9iJuH5l5/XdmS6U+ojbutXnGzBnQf++HVOfKanVEc+EgQKAggBEhcKEAoFc3Rha2USBzUwMDAwMDAQgK3iBBpAIU14ZdEeH6ds4IhhPQx4k/3AJfODRt0PSXR9SljosdQ+JAyT2YGh48PEp0kARPSn2lk/2x7ie+JvQ1yfjo3KOg==
    height: "189"
    id: "2"
  - data: CpIBCo8BChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEm8KLm5ldXRyb24xMGg5c3RjNXY2bnRnZXlnZjV4Zjk0NW5qcXE1aDMycjU0cmY3a2YSLm5ldXRyb24xbWprNzlmampncHBsYWs1d3E4Mzh3MHlkOTgyZ3preWY4Znh1OHUaDQoFc3Rha2USBDEwMDASaQpOCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohAk9iJuH5l5/XdmS6U+ojbutXnGzBnQf++HVOfKanVEc+EgQKAggBEhcKEAoFc3Rha2USBzUwMDAwMDAQgK3iBBpAIU14ZdEeH6ds4IhhPQx4k/3AJfODRt0PSXR9SljosdQ+JAyT2YGh48PEp0kARPSn2lk/2x7ie+JvQ1yfjo3KOg==
    height: "190"
    id: "3"
  ```

</details>
