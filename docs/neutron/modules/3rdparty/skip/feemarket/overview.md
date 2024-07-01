# Overview

> **Note:** you can find more info about Slinky and how it works in the official Skip's Feemarket docs: https://github.com/skip-mev/feemarket/blob/main/x/feemarket/README.md

**Feemarket** implements the AIMD (Additive Increase Multiplicative Decrease) EIP-1559 fee market as described in this AIMD EIP-1559 research publication.

The AIMD EIP-1559 fee market is a slight modification to Ethereum's EIP-1559 fee market. Specifically it introduces the notion of a adaptive learning rate which scales the base fee (reserve price to be included in a block) more aggressively when the network is congested and less aggressively when the network is not congested. This is primarily done to address the often cited criticism of EIP-1559 that it's base fee often lags behind the current demand for block space. The learning rate on Ethereum is effectively hard-coded to be 12.5%, which means that between any two blocks the base fee can maximally increase by 12.5% or decrease by 12.5%. Additionally, AIMD EIP-1559 differs from Ethereum's EIP-1559 by considering a configured time window (number of blocks) to consider when calculating and comparing target block utilization and current block utilization.

## How to query gas prices for all accepted denoms?

1. (via a local running chain): `curl http://<NEUTRON_REST_NODE_ADDRESS>:1317/feemarket/v1/gas_prices`
2. (via chain app CLI): `neutrond q feemarket gas-prices`
3. (via gRPC): `grpcurl -plaintext <NEUTRON_GRPC_NODE_ADDRESS>:9090 feemarket.feemarket.v1.Query/GasPrices`

This will return a JSON list of gas prices in all available denoms.

## How to query a gas price for a particular denom?

1. (via a local running chain): `curl http://<NEUTRON_REST_NODE_ADDRESS>:1317/feemarket/v1/gas_price/{denom}`
2. (via chain app CLI): `neutrond q feemarket gas-price {denom}`
3. (via gRPC): `grpcurl -d '{"denom":"{denom}"}'  -plaintext <NEUTRON_GRPC_NODE_ADDRESS>:9090 feemarket.feemarket.v1.Query/GasPrice`

This will return a gas prices for a particular denom.

## How to query the current state of the Feemarket module?

1. (via a local running chain): `curl http://<NEUTRON_REST_NODE_ADDRESS>:1317/feemarket/v1/state`
2. (via chain app CLI): `neutrond q feemarket state`
3. (via gRPC): `grpcurl -plaintext <NEUTRON_GRPC_NODE_ADDRESS>:9090 feemarket.feemarket.v1.Query/State`

This will return the current state of the Feemarket module within the following structure:

```protobuf
// State is utilized to track the current state of the fee market. This includes
// the current base fee, learning rate, and block utilization within the
// specified AIMD window.
message State {
  // BaseGasPrice is the current base fee. This is denominated in the fee per
  // gas unit.
  string base_gas_price = 1 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // LearningRate is the current learning rate.
  string learning_rate = 2 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // Window contains a list of the last blocks' utilization values. This is used
  // to calculate the next base fee. This stores the number of units of gas
  // consumed per block.
  repeated uint64 window = 3;

  // Index is the index of the current block in the block utilization window.
  uint64 index = 4;
}
```

## How to query the current params of the Feemarket module?

1. (via a local running chain): `curl http://<NEUTRON_REST_NODE_ADDRESS>:1317/feemarket/v1/params`
2. (via chain app CLI): `neutrond q feemarket params`
3. (via gRPC): `grpcurl -plaintext <NEUTRON_GRPC_NODE_ADDRESS>:9090 feemarket.feemarket.v1.Query/Params`

This will return the current params of the Feemarket module within the following structure:

```protobuf
// Params contains the required set of parameters for the EIP1559 fee market
// plugin implementation.
message Params {
  // Alpha is the amount we additively increase the learning rate
  // when it is above or below the target +/- threshold.
  //
  // Must be > 0.
  string alpha = 1 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // Beta is the amount we multiplicatively decrease the learning rate
  // when it is within the target +/- threshold.
  //
  // Must be [0, 1].
  string beta = 2 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // Gamma is the threshold for the learning rate. If the learning rate is
  // above or below the target +/- threshold, we additively increase the
  // learning rate by Alpha. Otherwise, we multiplicatively decrease the
  // learning rate by Beta.
  //
  // Must be [0, 0.5].
  string gamma = 3 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // Delta is the amount we additively increase/decrease the gas price when the
  // net block utilization difference in the window is above/below the target
  // utilization.
  string delta = 4 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // MinBaseGasPrice determines the initial gas price of the module and the
  // global minimum for the network.
  string min_base_gas_price = 5 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // MinLearningRate is the lower bound for the learning rate.
  string min_learning_rate = 6 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // MaxLearningRate is the upper bound for the learning rate.
  string max_learning_rate = 7 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "cosmossdk.io/math.LegacyDec",
    (gogoproto.nullable) = false
  ];

  // MaxBlockUtilization is the maximum block utilization.
  uint64 max_block_utilization = 8;

  // Window defines the window size for calculating an adaptive learning rate
  // over a moving window of blocks.
  uint64 window = 9;

  // FeeDenom is the denom that will be used for all fee payments.
  string fee_denom = 10;

  // Enabled is a boolean that determines whether the EIP1559 fee market is
  // enabled.
  bool enabled = 11;

  // DistributeFees is a boolean that determines whether the fees are burned or
  // distributed to all stakers.
  bool distribute_fees = 12;
}
```
