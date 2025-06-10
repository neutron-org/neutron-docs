# Client

## Queries

### Params
Queries the parameters of the module.

```
GET "/dex/params"
```

**Proto Messages**

Request:
```protobuf
message QueryParamsRequest {}
```

Response:

```protobuf
message QueryParamsResponse {

// params holds all the parameters of this module.
Params params = 1 [(gogoproto.nullable) = false];
}
```

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/params
```

### LimitOrderTrancheUser

```
GET "/dex/limit_order_tranche_user/{address}/{tranche_key}"
```

This query retrieves a `LimitOrderTrancheUser` by user address and TrancheKey.

**Proto Messages**

Request:

```protobuf
message QueryGetLimitOrderTrancheUserRequest {
  string address = 1;
  string tranche_key = 2;
  bool calc_withdrawable_shares = 3;
}
```

Response:

```protobuf
message QueryGetLimitOrderTrancheUserResponse {
  LimitOrderTrancheUser limit_order_tranche_user = 1 [(gogoproto.nullable) = true];
  string withdrawable_shares = 2 [
    (gogoproto.moretags) = "yaml:\"withdrawable_shares\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "withdrawable_shares"
  ];
}

message LimitOrderTrancheUser {
  TradePairID trade_pair_id = 1;
  int64 tick_index_taker_to_maker = 2;
  string tranche_key = 3;
  string address = 4;
  string shares_owned = 5 [
    (gogoproto.moretags) = "yaml:\"shares_owned\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_owned"
  ];
  string shares_withdrawn = 6 [
    (gogoproto.moretags) = "yaml:\"shares_withdrawn\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_withdrawn"
  ];
  string shares_cancelled = 7 [
    (gogoproto.moretags) = "yaml:\"shares_cancelled\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_cancelled"
  ];
  LimitOrderType order_type = 8;
}
```

**Arguments**

* `QueryGetLimitOrderTrancheUserRequest`: Request message for the `LimitOrderTrancheUser` query.
    * `address` (string): The user address.
    * `tranche_key` (string): The tranche key.
    * `calc_withdrawable_shares` (bool): option to calculate the number of shares that can be withdrawn

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/limit_order_tranche_user/{address}/{tranche_key}
```

### LimitOrderTrancheUserAll

```
GET "/dex/Neutron DEX/dex/limit_order_tranche_user"
```

This query retrieves a list of `LimitOrderTrancheUser` items.

**Proto Messages**

Request:

```protobuf
message QueryAllLimitOrderTrancheUserRequest {
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Response:

```protobuf
message QueryAllLimitOrderTrancheUserResponse {
  repeated LimitOrderTrancheUser limit_order_tranche_user = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllLimitOrderTrancheUserRequest`: Request message for the `LimitOrderTrancheUserAll` query.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/dex/limit_order_tranche_user
```

### LimitOrderTranche

```
GET "/dex/limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}"
```

This query retrieves a `LimitOrderTranche` by a tranche's key (pairID + tokenIn + tickIndex + trancheKey).

**Proto Messages**

Request:

```protobuf
message QueryGetLimitOrderTrancheRequest {
  string pair_id = 1;
  int64 tick_index = 2;
  string token_in = 3;
  string tranche_key = 4;
}
```

Response:

```protobuf
message QueryGetLimitOrderTrancheResponse {
  LimitOrderTranche limit_order_tranche = 1 [(gogoproto.nullable) = true];
}

message LimitOrderTrancheKey {
  TradePairID trade_pair_id = 1;
  int64 tick_index_taker_to_maker = 2;
  string tranche_key = 3;
}

message LimitOrderTranche {
  LimitOrderTrancheKey key = 1;
  string reserves_maker_denom = 2 [
    (gogoproto.moretags) = "yaml:\"reserves_maker_denom\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserves_maker_denom"
  ];
  string reserves_taker_denom = 3 [
    (gogoproto.moretags) = "yaml:\"reserves_taker_denom\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserves_taker_denom"
  ];
  string total_maker_denom = 4 [
    (gogoproto.moretags) = "yaml:\"total_maker_denom\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "total_maker_denom"
  ];
  string total_taker_denom = 5 [
    (gogoproto.moretags) = "yaml:\"total_taker_denom\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "total_taker_denom"
  ];
  google.protobuf.Timestamp expiration_time = 6 [
    (gogoproto.stdtime) = true,
    (gogoproto.nullable) = true
  ];
  // DEPRECATED: price_taker_to_maker will be removed in future release, `maker_price` should always be used.
  string price_taker_to_maker = 7 [
    (gogoproto.moretags) = "yaml:\"price_taker_to_maker\"",
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v5/utils/math.PrecDec",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "price_taker_to_maker",
    deprecated = true
  ];
  string maker_price = 8 [
    (gogoproto.moretags) = "yaml:\"maker_price\"",
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v5/utils/math.PrecDec",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "maker_price"
  ];
}
```

**Arguments**

* `QueryGetLimitOrderTrancheRequest`: Request message for the `LimitOrderTranche` query.
    * `pairID` (string): The pair ID.
    * `tickIndex` (int64): The tick index.
    * `tokenIn` (string): The input token.
    * `trancheKey` (string): The tranche key.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}
```

### LimitOrderTrancheAll

```
GET "dex/limit_order_tranche/{pairID}/{tokenIn}"
```

This query retrieves a list of `LimitOrderTranche` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```protobuf
message QueryAllLimitOrderTrancheRequest {
  string pair_id = 1;
  string token_in = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```protobuf
message QueryAllLimitOrderTrancheResponse {
  repeated LimitOrderTranche limit_order_tranche = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllLimitOrderTrancheRequest`: Request message for the `LimitOrderTrancheAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/limit_order_tranche/{pairID}/{tokenIn}
```

### UserDepositsAll

```
GET "/dex/user/deposits/{address}"
```

This query retrieves a list of `DepositRecord` items by user address.

**Proto Messages**

Request:

```protobuf
message QueryAllUserDepositsRequest {
  string address = 1;
  cosmos.base.query.v1beta1.PageRequest pagination = 2;
  bool include_pool_data = 3;
}
```

Response:

```protobuf
message QueryAllUserDepositsResponse {
  repeated DepositRecord deposits = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}

message DepositRecord {
  PairID pair_id = 1;
  string shares_owned = 2 [
    (gogoproto.moretags) = "yaml:\"shares_owned\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_owned"
  ];
  int64 center_tick_index = 3;
  int64 lower_tick_index = 4;
  int64 upper_tick_index = 5;
  uint64 fee = 6;
  string total_shares = 7 [
    (gogoproto.moretags) = "yaml:\"total_shares\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "total_shares"
  ];
  Pool pool = 8 [(gogoproto.nullable) = true];
}
```

**Arguments**

* `QueryAllUserDepositsRequest`: Request message for the `UserDepositsAll` query.
    * `address` (string): The user address.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.
    * `include_pool_data` (bool) option to include the underlying pool data

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/user/deposits/{address}
```

### LimitOrderTrancheUserAllByAddress

```
GET "/neutron/dex/user/limit_orders/{address}"
```

This query retrieves a list of `LimitOrderTrancheUser` items by user address.

**Proto Messages**

Request:

```protobuf
message QueryAllLimitOrderTrancheUserByAddressRequest {
  string address = 1;
  cosmos.base.query.v1beta1.PageRequest pagination = 2;
}
```

Response:

```protobuf
message QueryAllLimitOrderTrancheUserByAddressResponse {
  repeated LimitOrderTrancheUser limit_orders = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllLimitOrderTrancheUserByAddressRequest`: Request message for the `LimitOrderTrancheUserAllByAddress` query.
    * `address` (string): The user address.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/user/limit_orders/{address}
```

### TickLiquidityAll

```
GET "/neutron/dex/tick_liquidity/{pairID}/{tokenIn}"
```

This query retrieves a list of `TickLiquidity` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```protobuf
message QueryAllTickLiquidityRequest {
  string pair_id = 1;
  string token_in = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```protobuf
message TickLiquidity {
  oneof liquidity {
    PoolReserves pool_reserves = 1;
    LimitOrderTranche limit_order_tranche = 2;
  }
}

message QueryAllTickLiquidityResponse {
  repeated TickLiquidity tick_liquidity = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllTickLiquidityRequest`: Request message for the `TickLiquidityAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/tick_liquidity/{pairID}/{tokenIn}
```

### InactiveLimitOrderTranche

```
GET "/neutron/dex/filled_limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}"
```

This query retrieves an inactive `LimitOrderTranche` by a tranche's key (pairID + tokenIn + tickIndex + trancheKey).

**Proto Messages**

Request:

```protobuf
message QueryGetInactiveLimitOrderTrancheRequest {
  string pair_id = 1;
  string token_in = 2;
  int64 tick_index = 3;
  string tranche_key = 4;
}
```

Response:

```protobuf

message QueryGetInactiveLimitOrderTrancheResponse {
  LimitOrderTranche inactive_limit_order_tranche = 1 [(gogoproto.nullable) = true];
}
```

**Arguments**

* `QueryGetInactiveLimitOrderTrancheRequest`: Request message for the `InactiveLimitOrderTranche` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `tickIndex` (int64): The tick index.
    * `trancheKey` (string): The tranche key.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/filled_limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}
```

### InactiveLimitOrderTrancheAll

```
GET "/neutron/dex/filled_limit_order_tranche"
```

This query retrieves a list of inactive `LimitOrderTranche` items.

**Proto Messages**

Request:

```protobuf
message QueryAllInactiveLimitOrderTrancheRequest {
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Response:

```protobuf
message QueryAllInactiveLimitOrderTrancheResponse {
  repeated LimitOrderTranche inactive_limit_order_tranche = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllInactiveLimitOrderTrancheRequest`: Request message for the `InactiveLimitOrderTrancheAll` query.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/filled_limit_order_tranche
```

### PoolReservesAll

```
GET "/neutron/dex/pool_reserves/{pairID}/{tokenIn}"
```

This query retrieves a list of `PoolReserves` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```protobuf
message QueryAllPoolReservesRequest {
  string pair_id = 1;
  string token_in = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```protobuf
message QueryAllPoolReservesResponse {
  repeated PoolReserves pool_reserves = 1 [(gogoproto.nullable) = true];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllPoolReservesRequest`: Request message for the `PoolReservesAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/pool_reserves/{pairID}/{tokenIn}
```

### PoolReserves

```
GET "/neutron/dex/pool_reserves/{pairID}/{tokenIn}/{tickIndex}/{fee}"
```

This query retrieves a `PoolReserves` by PoolReservesKey (PairID+TokenIn+TickIndex+Fee).

**Proto Messages**

Request:

```protobuf
message QueryGetPoolReservesRequest {
  string pair_id = 1;
  string token_in = 2;
  int64 tick_index = 3;
  uint64 fee = 4;
}
```

Response:

```protobuf
message QueryGetPoolReservesResponse {
  PoolReserves pool_reserves = 1 [(gogoproto.nullable) = true];
}
```

**Arguments**

* `QueryGetPoolReservesRequest`: Request message for the `PoolReserves` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `tickIndex` (int64): The tick index.
    * `fee` (uint64): The fee.

**Sample Query**

Curl Command (testnet):

```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/pool_reserves/{pairID}/{tokenIn}/{tickIndex}/{fee}
```

### PoolRequest
```
GET "/neutron/dex/pool/{pair_id}/{tick_index}/{fee}"
```
Queries a pool by pair, tick and fee

**Proto Messages**

Request:
```protobuf
message QueryPoolRequest {
  string pair_id = 1;
  int64 tick_index = 2;
  uint64 fee = 3;
}
```

Response:

```protobuf
message Pool {
  uint64 id = 1;
  PoolReserves lower_tick0 = 2;
  PoolReserves upper_tick1 = 3;
}

message QueryPoolResponse {
  Pool pool = 1 [(gogoproto.nullable) = true];
}
```

**Arguments**
* `QueryPoolRequest`: Request message for the `PoolRequest` query.
  * `pairID` (string): The pair ID.
  * `tickIndex` (int64): The tick index.
  * `fee` (uint64): fee.


Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/pool/{pair_id}/{tick_index}/{fee}
```

### PoolRequestByID

```
GET "/neutron/dex/pool/{pool_id}"
```

Queries a pool by ID

**Proto Messages**

Request:
```protobuf
message QueryPoolByIDRequest {
  uint64 pool_id = 1;
}
```

Response:

```protobuf
message QueryPoolResponse {
  Pool pool = 1 [(gogoproto.nullable) = true];
}
```
**Arguments**

* `QueryPoolByIDRequest`: Request message for the `PoolRequestByID` query.
  * `id` (uint64): Pool ID.

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/pool/{pool_id}
```

### GetPoolMetadata

```
GET "/neutron/dex/pool_metadata/{id}"
```
Queries a PoolMetadata by ID

**Proto Messages**:
Request:
```protobuf
message QueryGetPoolMetadataRequest {
  uint64 id = 1;
}
```

Response:
```protobuf
message PoolMetadata {
  uint64 id = 1;
  int64 tick = 2;
  uint64 fee = 3;
  PairID pair_id = 4;
}
message PairID {
  string token0 = 1;
  string token1 = 2;
}

message QueryGetPoolMetadataResponse {
  PoolMetadata Pool_metadata = 1 [(gogoproto.nullable) = false];
}
```
**Arguments**

* `QueryGetPoolMetadataRequest`: Request message for the `GetPoolMetadata` query.
  * `id` (uint64): Pool ID.


```bash
curl /neutron/dex/pool_metadata/{id}
```

### GetAllPoolMetadata
```
GET "/neutron/dex/pool_metadata"
```

Queries a list of PoolMetadata items

**Proto Messages**:

Request:
```protobuf
message QueryAllPoolMetadataRequest {
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Response:

```protobuf
message QueryAllPoolMetadataResponse {
  repeated PoolMetadata pool_metadata = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**
* `QueryAllPoolMetadataRequest`: Request message for the `GetAllPoolMetadata` query.
  * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/pool_metadata
```

### SimulateDeposit

```
GET "/neutron/dex/simulate_deposit"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulateDepositRequest {
  MsgDeposit msg = 1;
}

message MsgDeposit {
  string creator = 1;
  string receiver = 2;
  string token_a = 3;
  string token_b = 4;
  repeated string amounts_a = 5 [
    (gogoproto.moretags) = "yaml:\"amounts_a\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "amounts_a"
  ];
  repeated string amounts_b = 6 [
    (gogoproto.moretags) = "yaml:\"amounts_b\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "amounts_b"
  ];
  repeated int64 tick_indexes_a_to_b = 7;
  repeated uint64 fees = 8;
  repeated DepositOptions options = 9;
}
```

Response:

```protobuf
message QuerySimulateDepositResponse {
  MsgDepositResponse resp = 1;
}

message MsgDepositResponse {
  repeated string reserve0_deposited = 1 [
    (gogoproto.moretags) = "yaml:\"reserve0_deposited\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserve0_deposited"
  ];
  repeated string reserve1_deposited = 2 [
    (gogoproto.moretags) = "yaml:\"reserve1_deposited\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserve1_deposited"
  ];
  repeated FailedDeposit failed_deposits = 3;
  repeated cosmos.base.v1beta1.Coin shares_issued = 4 [
    (gogoproto.moretags) = "yaml:\"shares_issued\"",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_issued"
  ];
}

```

**Arguments**
* `QuerySimulateDepositRequest`: Request message for the `SimulateDeposit` query.
  * `msg` (MsgDeposit): Deposit message (same as the DepositMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_deposit
```


### SimulateWithdrawal

```
GET "/neutron/dex/simulate_withdrawal"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulateWithdrawalRequest {
  MsgWithdrawal msg = 1;
}

message MsgWithdrawal {
  string creator = 1;
  string receiver = 2;
  string token_a = 3;
  string token_b = 4;
  repeated string shares_to_remove = 5 [
    (gogoproto.moretags) = "yaml:\"shares_to_remove\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_to_remove"
  ];
  repeated int64 tick_indexes_a_to_b = 6;
  repeated uint64 fees = 7;
}
```

Response:

```protobuf
message QuerySimulateWithdrawalResponse {
  MsgWithdrawalResponse resp = 1;
}

message MsgWithdrawalResponse {
  string reserve0_withdrawn = 1 [
    (gogoproto.moretags) = "yaml:\"reserve0_withdrawn\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserve0_withdrawn"
  ];
  string reserve1_withdrawn = 2 [
    (gogoproto.moretags) = "yaml:\"reserve1_withdrawn\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "reserve1_withdrawn"
  ];
  repeated cosmos.base.v1beta1.Coin shares_burned = 3 [
    (gogoproto.moretags) = "yaml:\"shares_burned\"",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "shares_burned"
  ];
}

```

**Arguments**
* `QuerySimulateWithdrawalRequest`: Request message for the `SimulateWithdrawal` query.
  * `msg` (MsgWithdrawal): Withdrawal message (same as the WithdrawalMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_withdrawal
```

### SimulatePlaceLimitOrder

```
GET "/neutron/dex/simulate_place_limit_order"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulatePlaceLimitOrderRequest {
  MsgPlaceLimitOrder msg = 1;
}

message MsgPlaceLimitOrder {
  string creator = 1;
  string receiver = 2;
  string token_in = 3;
  string token_out = 4;
  int64 tick_index_in_to_out = 5 [deprecated = true];
  string amount_in = 7 [
    (gogoproto.moretags) = "yaml:\"amount_in\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "amount_in"
  ];
  LimitOrderType order_type = 8;
  google.protobuf.Timestamp expiration_time = 9 [
    (gogoproto.stdtime) = true,
    (gogoproto.nullable) = true
  ];
  string max_amount_out = 10 [
    (gogoproto.moretags) = "yaml:\"max_amount_out\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "max_amount_out"
  ];
  string limit_sell_price = 11 [
    (gogoproto.moretags) = "yaml:\"limit_sell_price\"",
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v5/utils/math.PrecDec",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "limit_sell_price",
    (amino.encoding) = "cosmos_dec_bytes"
  ];
  string min_average_sell_price = 12 [
    (gogoproto.moretags) = "yaml:\"min_average_sell_price\"",
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v5/utils/math.PrecDec",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "min_average_sell_price",
    (amino.encoding) = "cosmos_dec_bytes"
  ];
}
```

Response:

```protobuf
message QuerySimulatePlaceLimitOrderResponse {
  MsgPlaceLimitOrderResponse resp = 1;
}

message MsgPlaceLimitOrderResponse {
  string trancheKey = 1;
  cosmos.base.v1beta1.Coin coin_in = 2 [
    (gogoproto.moretags) = "yaml:\"coin_in\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "coin_in"
  ];
  cosmos.base.v1beta1.Coin taker_coin_out = 3 [
    (gogoproto.moretags) = "yaml:\"taker_coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "taker_coin_out"
  ];
  cosmos.base.v1beta1.Coin taker_coin_in = 4 [
    (gogoproto.moretags) = "yaml:\"taker_coin_in\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "taker_coin_in"
  ];
}

```

**Arguments**
* `QuerySimulatePlaceLimitOrderRequest`: Request message for the `SimulatePlaceLimitOrder` query.
  * `msg` (MsgPlaceLimitOrder): PlaceLimitOrder message (same as the PlaceLimitOrderMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_place_limit_order
```

### SimulateWithdrawFilledLimitOrder

```
GET "/neutron/dex/simulate_withdraw_filled_limit_order"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulateWithdrawFilledLimitOrderRequest {
  MsgWithdrawFilledLimitOrder msg = 1;
}

message MsgWithdrawFilledLimitOrder {
  string creator = 1;
  string tranche_key = 2;
}
```

Response:

```protobuf
message QuerySimulateWithdrawFilledLimitOrderResponse {
  MsgWithdrawFilledLimitOrderResponse resp = 1;
}

message MsgWithdrawFilledLimitOrderResponse {
  cosmos.base.v1beta1.Coin taker_coin_out = 1 [
    (gogoproto.moretags) = "yaml:\"taker_coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "taker_coin_out"
  ];
  cosmos.base.v1beta1.Coin maker_coin_out = 2 [
    (gogoproto.moretags) = "yaml:\"maker_coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "maker_coin_out"
  ];
}

```

**Arguments**
* `QuerySimulateWithdrawFilledLimitOrderRequest`: Request message for the `SimulateWithdrawFilledLimitOrder` query.
  * `msg` (MsgWithdrawFilledLimitOrder): WithdrawFilledLimitOrder message (same as the WithdrawFilledLimitOrderMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_withdraw_filled_limit_order
```

### SimulateCancelLimitOrder

```
GET "/neutron/dex/simulate_cancel_limit_order"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulateCancelLimitOrderRequest {
  MsgCancelLimitOrder msg = 1;
}

message MsgCancelLimitOrder {
  string creator = 1;
  string tranche_key = 2;
}
```

Response:

```protobuf
message QuerySimulateCancelLimitOrderResponse {
  MsgCancelLimitOrderResponse resp = 1;
}

message MsgCancelLimitOrderResponse {
  cosmos.base.v1beta1.Coin taker_coin_out = 1 [
    (gogoproto.moretags) = "yaml:\"taker_coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "taker_coin_out"
  ];
  cosmos.base.v1beta1.Coin maker_coin_out = 2 [
    (gogoproto.moretags) = "yaml:\"maker_coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "maker_coin_out"
  ];
}

```

**Arguments**
* `QuerySimulateCancelLimitOrderRequest`: Request message for the `SimulateCancelLimitOrder` query.
  * `msg` (MsgCancelLimitOrder): CancelLimitOrder message (same as the CancelLimitOrderMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_cancel_limit_order
```

### SimulateMultiHopSwap

```
GET "/neutron/dex/simulate_multi_hop_swap"
```

**Proto Messages**:

Request:
```protobuf
message QuerySimulateMultiHopSwapRequest {
  MsgMultiHopSwap msg = 1;
}

message MsgMultiHopSwap {
  string creator = 1;
  string receiver = 2;
  repeated MultiHopRoute routes = 3;
  string amount_in = 4 [
    (gogoproto.moretags) = "yaml:\"amount_in\"",
    (gogoproto.customtype) = "cosmossdk.io/math.Int",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "amount_in"
  ];
  string exit_limit_price = 5 [
    (gogoproto.moretags) = "yaml:\"exit_limit_price\"",
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v5/utils/math.PrecDec",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "exit_limit_price",
    (amino.encoding) = "cosmos_dec_bytes"
  ];
  bool pick_best_route = 6;
}
```

Response:

```protobuf
message QuerySimulateMultiHopSwapResponse {
  MsgMultiHopSwapResponse resp = 1;
}

message MsgMultiHopSwapResponse {
  cosmos.base.v1beta1.Coin coin_out = 1 [
    (gogoproto.moretags) = "yaml:\"coin_out\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "coin_out"
  ];
  MultiHopRoute route = 2;
  repeated cosmos.base.v1beta1.Coin dust = 3 [
    (gogoproto.moretags) = "yaml:\"dust\"",
    (gogoproto.nullable) = false,
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Coin",
    (gogoproto.jsontag) = "dust"
  ];
}

```

**Arguments**
* `QuerySimulateMultiHopSwapRequest`: Request message for the `SimulateMultiHopSwap` query.
  * `msg` (MsgMultiHopSwap): MultiHopSwap message (same as the MultiHopSwapMsg tx).

Curl Command (testnet):
```bash
curl https://rest-falcron.pion-1.ntrn.tech/neutron/dex/simulate_multi_hop_swap
```
