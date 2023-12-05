# Client

## Queries

#### LimitOrderTrancheUser

```
GET "/dualitylabs/duality/dex/limit_order_tranche_user/{address}/{trancheKey}"
```

This query retrieves a `LimitOrderTrancheUser` by user address and TrancheKey.

**Proto Messages**

Request:

```proto
message QueryGetLimitOrderTrancheUserRequest {
  string address = 1;
  string trancheKey = 2;
}
```

Response:

```proto
message QueryGetLimitOrderTrancheUserResponse {
  LimitOrderTrancheUser limitOrderTrancheUser = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryGetLimitOrderTrancheUserRequest`: Request message for the `LimitOrderTrancheUser` query.
    * `address` (string): The user address.
    * `trancheKey` (string): The tranche key.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/limit_order_tranche_user/{address}/{trancheKey}
```

#### LimitOrderTrancheUserAll

```
GET "/dualitylabs/duality/dex/limit_order_tranche_user"
```

This query retrieves a list of `LimitOrderTrancheUser` items.

**Proto Messages**

Request:

```proto
message QueryAllLimitOrderTrancheUserRequest {
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Response:

```proto
message QueryAllLimitOrderTrancheUserResponse {
  repeated LimitOrderTrancheUser limitOrderTrancheUser = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllLimitOrderTrancheUserRequest`: Request message for the `LimitOrderTrancheUserAll` query.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/limit_order_tranche_user
```

### LimitOrderTranche

```
GET "/dualitylabs/duality/dex/limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}"
```

This query retrieves a `LimitOrderTranche` by index.

**Proto Messages**

Request:

```proto
message QueryGetLimitOrderTrancheRequest {
  string pairID = 1;
  int64 tickIndex = 2;
  string tokenIn = 3;
  string trancheKey = 4;
}
```

Response:

```proto
message QueryGetLimitOrderTrancheResponse {
  LimitOrderTranche limitOrderTranche = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryGetLimitOrderTrancheRequest`: Request message for the `LimitOrderTranche` query.
    * `pairID` (string): The pair ID.
    * `tickIndex` (int64): The tick index.
    * `tokenIn` (string): The input token.
    * `trancheKey` (string): The tranche key.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}
```

#### LimitOrderTrancheAll

```
GET "/dualitylabs/duality/dex/limit_order_tranche/{pairID}/{tokenIn}"
```

This query retrieves a list of `LimitOrderTranche` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```proto
message QueryAllLimitOrderTrancheRequest {
  string pairID = 1;
  string tokenIn = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```proto
message QueryAllLimitOrderTrancheResponse {
  repeated LimitOrderTranche limitOrderTranche = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllLimitOrderTrancheRequest`: Request message for the `LimitOrderTrancheAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/limit_order_tranche/{pairID}/{tokenIn}
```

#### GetUserPositions

```
GET "/dualitylabs/duality/dex/user/positions/{address}"
```

This query retrieves a list of user’s LP deposits and limit orders.

**Proto Messages**

Request:

```proto
message QueryGetUserPositionsRequest {
  string address = 1;
}
```

Response:

```proto
message QueryGetUserPositionsResponse {
  UserPositions userPositions = 1 [(gogoproto.nullable) = false];
}

message UserPositions {
  repeated DepositRecord PoolDeposits  = 1 [(gogoproto.nullable) = false];
  repeated LimitOrderTrancheUser LimitOrders  = 2 [(gogoproto.nullable) = false];
}

message DepositRecord {
  PairID pairID = 1;
  string sharesOwned = 2 [
                          (gogoproto.moretags)   = "yaml:\"totalShares\"",
                          (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
                          (gogoproto.nullable)   = false,
                          (gogoproto.jsontag) = "totalShares"
                          ];
  int64 centerTickIndex = 3;
  int64 lowerTickIndex = 4;
  int64 upperTickIndex = 5;
  uint64 fee = 6;
}

message LimitOrderTrancheUser {
  PairID pairID = 1;
  string token = 2;
  int64 tickIndex = 3;
  string trancheKey = 4; 
  string address = 5; 
  string sharesOwned = 6  [
      (gogoproto.moretags)   = "yaml:\"sharesOwned\"",
      (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
      (gogoproto.nullable)   = false,
      (gogoproto.jsontag) = "sharesOwned"
  ];  
  string sharesWithdrawn = 7  [
      (gogoproto.moretags)   = "yaml:\"sharesWithdrawn\"",
      (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
      (gogoproto.nullable)   = false,
      (gogoproto.jsontag) = "sharesWithdrawn"
  ]; 
  string sharesCancelled = 8  [
      (gogoproto.moretags)   = "yaml:\"sharesCancelled\"",
      (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
      (gogoproto.nullable)   = false,
      (gogoproto.jsontag) = "sharesCancelled"
  ];
  LimitOrderType orderType = 10;
}

```

**Arguments**

* `QueryGetUserPositionsRequest`: Request message for the `GetUserPositions` query.
    * `address` (string): The user address.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/user/positions/{address}
```

#### UserDepositsAll

```
GET "/dualitylabs/duality/dex/user/deposits/{address}"
```

This query retrieves a list of `UserDeposits` items.

**Proto Messages**

Request:

```proto
message QueryAllUserDepositsRequest {
  string address = 1;
}
```

Response:

```proto
message QueryAllUserDepositsResponse {
  repeated DepositRecord deposits = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryAllUserDepositsRequest`: Request message for the `UserDepositsAll` query.
    * `address` (string): The user address.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/user/deposits/{address}
```

#### UserLimitOrdersAll

```
GET "/dualitylabs/duality/dex/user/limit_orders/{address}"
```

This query retrieves a list of `UserLimitOrders` items.

**Proto Messages**

Request:

```proto
message QueryAllUserLimitOrdersRequest {
  string address = 1;
}
```

Response:

```proto
message QueryAllUserLimitOrdersResponse {
  repeated LimitOrderTrancheUser limitOrders = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryAllUserLimitOrdersRequest`: Request message for the `UserLimitOrdersAll` query.
    * `address` (string): The user address.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/user/limit_orders/{address}
```

#### TickLiquidityAll

```
GET "/dualitylabs/duality/dex/tick_liquidity/{pairID}/{tokenIn}"
```

This query retrieves a list of `TickLiquidity` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```proto
message QueryAllTickLiquidityRequest {
  string pairID = 1;
  string tokenIn = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```proto
message QueryAllTickLiquidityResponse {
  repeated TickLiquidity tickLiquidity = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllTickLiquidityRequest`: Request message for the `TickLiquidityAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/tick_liquidity/{pairID}/{tokenIn}
```

### InactiveLimitOrderTranche

```
GET "/dualitylabs/duality/dex/filled_limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}"
```

This query retrieves an `InactiveLimitOrderTranche` by index.

**Proto Messages**

Request:

```proto
message QueryGetInactiveLimitOrderTrancheRequest {
  string pairID = 1;
  string tokenIn = 2;
  int64 tickIndex = 3;
  string trancheKey = 4;
}
```

Response:

```proto
message QueryGetInactiveLimitOrderTrancheResponse {
  LimitOrderTranche inactiveLimitOrderTranche = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryGetInactiveLimitOrderTrancheRequest`: Request message for the `InactiveLimitOrderTranche` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `tickIndex` (int64): The tick index.
    * `trancheKey` (string): The tranche key.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/filled_limit_order_tranche/{pairID}/{tokenIn}/{tickIndex}/{trancheKey}
```

#### InactiveLimitOrderTrancheAll

```
GET "/dualitylabs/duality/dex/filled_limit_order_tranche"
```

This query retrieves a list of `InactiveLimitOrderTranche` items.

**Proto Messages**

Request:

```proto
message QueryAllInactiveLimitOrderTrancheRequest {
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Response:

```proto
message QueryAllInactiveLimitOrderTrancheResponse {
  repeated LimitOrderTranche inactiveLimitOrderTranche = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllInactiveLimitOrderTrancheRequest`: Request message for the `InactiveLimitOrderTrancheAll` query.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/filled_limit_order_tranche
```

#### PoolReservesAll

```
GET "/dualitylabs/duality/dex/pool_reserves/{pairID}/{tokenIn}"
```

This query retrieves a list of `PoolReserves` items for a given pairID / TokenIn combination.

**Proto Messages**

Request:

```proto
message QueryAllPoolReservesRequest {
  string pairID = 1;
  string tokenIn = 2;
  cosmos.base.query.v1beta1.PageRequest pagination = 3;
}
```

Response:

```proto
message QueryAllPoolReservesResponse {
  repeated PoolReserves poolReserves = 1 [(gogoproto.nullable) = false];
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

**Arguments**

* `QueryAllPoolReservesRequest`: Request message for the `PoolReservesAll` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `pagination` (cosmos.base.query.v1beta1.PageRequest): Pagination options.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/pool_reserves/{pairID}/{tokenIn}
```

#### PoolReserves

```
GET "/dualitylabs/duality/dex/pool_reserves/{pairID}/{tokenIn}/{tickIndex}/{fee}"
```

This query retrieves a `PoolReserve` by index.

**Proto Messages**

Request:

```proto
message QueryGetPoolReservesRequest {
  string pairID = 1;
  string tokenIn = 2;
  int64 tickIndex = 3;
  uint64 fee = 4;
}
```

Response:

```proto
message QueryGetPoolReservesResponse {
  PoolReserves poolReserves = 1 [(gogoproto.nullable) = false];
}
```

**Arguments**

* `QueryGetPoolReservesRequest`: Request message for the `PoolReserves` query.
    * `pairID` (string): The pair ID.
    * `tokenIn` (string): The input token.
    * `tickIndex` (int64): The tick index.
    * `fee` (uint64): The fee.

**Sample Query**

Curl Command:

```bash
curl http://lcd.duality.xyz/dualitylabs/duality/dex/pool_reserves/{pairID}/{tokenIn}/{tickIndex}/{fee}
```

