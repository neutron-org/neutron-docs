# Client

## Transactions

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

Example content of `result.json` file:
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
  // returns all the registered queries in the module with filtration by owner and/or connection id
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

  // returns last height about which Neutron knows for the particular remote chain
  rpc LastRemoteHeight(QueryLastRemoteHeight) returns (QueryLastRemoteHeightResponse) {
    option (google.api.http).get = "/neutron/interchainqueries/interchainqueries/remote_height";
  }
}
```

### registered-query

Returns registered query by id.

```bash
neutrond query interchainqueries registered-query [id]
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
    owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"
    last_submitted_result_local_height: "0"
    last_submitted_result_remote_height: "0"
    transactions_filter: "{}"
    keys:
    - path: "staking"
      key: "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==" 
    query_type: kv
    update_period: "1"
  ```

</details>

### registered-queries

Returns all the registered queries in the module with filtration by owner and/or connection id.

```bash
neutrond query interchainqueries registered-queries
```

<details>
  <summary>Example</summary>
  Returns all registered interchain queries in the module with connection id `connection-0` and owner `neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq`:

  ```shell
  neutrond query interchainqueries registered-queries --connection-id connection-0 --owners neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq
  ```

Output:

  ```shell
  registered_queries:
  - connection_id: connection-0
    id: "1"
    owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"
    last_submitted_result_local_height: "206"
    last_submitted_result_remote_height: "203"
    transactions_filter: "{}"
    keys:
    - path: "staking"
      key: "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==" 
    query_type: kv
    update_period: "1"
  - connection_id: connection-0
    id: "2"
    owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"
    last_submitted_result_local_height: "199"
    last_submitted_result_remote_height: "188"
    transactions_filter: '{"message.module": "bank"}'
    query_type: tx
    update_period: "5"
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

### query-last-remote-height

Returns last height about which Neutron knows for the particular remote chain by connection id.

```bash
neutrond query interchainqueries query-last-remote-height [connection-id]
```

<details>
  <summary>Example</summary>
  Returns last height remote chain by connection id `connection-0`:

  ```shell
  neutrond query interchainqueries query-last-remote-height connection-0
  ```

Output:

  ```shell
  height: "29"
  ```

</details>