# Client

## Queries

In this section we describe the queries required on grpc server.

```protobuf
// Query defines the gRPC querier service.
service Query {
  // Parameters queries the parameters of the module.
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/neutron/feeburner/params";
  }

  // TotalBurnedNeutronsAmount queries total amount of burned neutron fees.
  rpc TotalBurnedNeutronsAmount(QueryTotalBurnedNeutronsAmountRequest)
      returns (QueryTotalBurnedNeutronsAmountResponse) {
    option (google.api.http).get =
        "/neutron/feeburner/total_burned_neutrons_amount";
  }
}
```

### total-burned-neutrons-amount

Returns `sdk.Coin` with all-time amount of burned Neutron tokens.

```shell
neutrond query feeburner total-burned-neutrons-amount
```

<details>
  <summary>Example</summary>
  Returns amount of burned Neutrons:

  ```shell
  neutrond query feeburner total-burned-neutrons-amount
  ```

Output:

  ```yaml
  total_burned_neutrons_amount:
    coin:
      amount: "551"
      denom: untrn

  ```
</details>
