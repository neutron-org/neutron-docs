# Client

## Queries

In this section we describe the queries required on grpc server.

```protobuf
// Query defines the gRPC querier service.
service Query {
  // Parameters queries the parameters of the module.
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/neutron-org/neutron/feerefunder/params";
  }
  rpc FeeInfo(FeeInfoRequest) returns (FeeInfoResponse) {
    option (google.api.http).get = "/neutron-org/neutron/feerefunder/info";
  }
  // this line is used by starport scaffolding # 2
}
```

### fee-info [port-id] [channel-id] [sequence]

```shell
neutrond query feerefunder fee-info [port-id] [channel-id] [sequence]
```

<details>
  <summary>Example</summary>
  Returns fee info by port id, channel id and sequence:

  ```shell
  neutrond query feerefunder fee-info icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq_1 channel_1 1
  ```

Output:

  ```yaml
  fee_info:
    - payer: neutron1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqcd0mrx
      packet_id:
        - channel_id: channel_1
          port_id: icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq_1
          sequence: 1
      fee:
        - recv_fee:
            - denom: "untrn"
              amount: "0"
          ack_fee:
            - denom: "untrn"
              amount: "500"
          timeout_fee:
            - denom: "untrn"
              amount: "500"
        payer: neutron10h9stc5v6ntgeygf5xf945njqq5h32r54rf7kf
  ```
</details>