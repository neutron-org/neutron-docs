# Client

## Queries

In this section we describe the queries required on grpc server.

```protobuf
// Query defines the gRPC querier service.
service Query {
	// Parameters queries the parameters of the module.
	rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
		option (google.api.http).get = "/neutron-org/neutron/contractmanager/params";
	}

	// Queries a Failures by address.
	rpc Failure(QueryGetFailuresByAddressRequest) returns (QueryGetFailuresByAddressResponse) {
		option (google.api.http).get = "/neutron-org/neutron/contractmanager/failure/{address}";
	}

	// Queries a list of failed addresses.
	rpc AllFailures(QueryAllFailureRequest) returns (QueryAllFailureResponse) {
		option (google.api.http).get = "/neutron-org/neutron/contractmanager/failure";
	}
}
```

### failures [address]

Returns list of all failures.

```shell
neutrond query contractmanager failures
```

<details>
  <summary>Example</summary>
  Returns info about all failures:

  ```shell
  neutrond query contractmanager failures
  ```

Output:

  ```yaml
  failures:
    - address: neutron1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqcd0mrx
      id: 0
      ack_id: 0
      ack_type: "ack"
    - address: neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq
      id: 1
      ack_id: 1
      ack_type: "timeout"
  pagination:
    next_key: null
    total: "2"
  ```

</details>



Returns list of all failures for specific contract address.

```bash
neutrond query contractmanager failures [address]
```

<details>
  <summary>Example</summary>
  Returns failures for specific contract address:

  ```shell
  neutrond query contractmanager failures neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq
  ```

Output:

  ```yaml
  failures:
    - address: neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq
      id: 0
      ack_id: 0
      ack_type: "ack"
    - address: neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq
      id: 1
      ack_id: 1
      ack_type: "ack"
  pagination:
    next_key: null
    total: "2"
  ```

</details>

