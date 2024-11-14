# Messages

## Deposit

### Overview

In Neutron DEX’s concentrated liquidity model, liquidity providers (LPs) can provide liquidity to a specific trading pair by depositing tokens at a specific price into one or both sides of the pair in “a liquidity pool”. When depositing into the pool LPs must choose a fee for their deposit. This fee will be paid every time a trader swaps through a liquidity pool. When a trader wants to buy or sell one of the tokens in the pair, they must first pay the pool fee, which is a percentage of the trade value, to the liquidity pool. This fee is then shared among the LPs in proportion to their share of the liquidity in the pool. In a concentrated liquidity DEX, LPs can set their own price range for each token in the pair. This means that they can set a higher price for selling their token and a lower price for buying the other token, or vice-versa. This allows LPs to earn more fees by capturing the spread between the buying and selling prices. The deposit message expects `AmountsA`, `AmountsB`, `TickIndexesAToB`, and `Fees` to be passed as equal lengthen arrays of values. This allows deposits to be made simultaneously across a range of positions.

### Deposit Mechanism

When depositing into an LP position (`PoolReserves`) a user specifies amounts of `TokenA` and `TokenB` as well as a `TickIndexAToB` and a fee. The liquidity is added to the reserves for the respective ticks. Internally the DEX Normalizes `TokenA` and `TokenB` to `Token0` and `Token1` where `Token0` is the smaller of the 2 alphabetically sorted tokens. As a convenience to users, they do not have to know the canonical `Token0` and `Token1` for a pair, instead they can assign either denom as `TokenA` or `TokenB`. `TokenA` and `TokenB` along with the `TickIndexAToB` will be normalized according to the canonical [`PairID`](docs/neutron/modules/dex/overview/concepts/tick-liquidity.md#pairid). Token0 will be deposited into the `PoolReserves` struct with the matching fee at `TickIndex - fee` and `Token1` will be deposited into the `PoolReserves` at `TickIndex + fee`.

`TickIndexAToB` specifies the tick providing the desired conversion rate from `TokenA` to `TokenB`. This means that `TokenB` will be deposited at $$TickIndexAToB + fee$$ and `TokenA` will be deposited at $$TickIndexAToB\cdot-1 + fee$$.

In the most basic case, when depositing into a pool, the ratio of Token0 to Token1 will be preserved. If a user does not provide tokens in the same ratio, then only a portion of their total deposit will be used so as to maintain the pool ratio.

$$true_0 = min(amountDeposited_0, \frac{existingReserves_0}{existingReserves_1}\cdot amountDeposited_1)$$

$$true_1 = min(amountDeposited_1, \frac{existingReserves_1}{existingReserves_0}\cdot amountDeposited_0)$$

**NOTE**: Most pools will only have Token1 OR Token0, so most deposits will only be providing one tokens to one side of the pool.

In return for depositing tokens into a pool the user is issued PoolShares corresponding to the specific liquidity pool in which they have deposited. These can be used in the future to withdraw the user’s pro-rata share of the PoolLiquidity. The PoolShares are also fungible denoms that can be bought, sold, and traded.

The amount of pool shares issued is calculated using the following formula:

$$valueDeposited = true_0 + p(i)\cdot true_1$$

$$newShares = \frac{valueDeposited \cdot totalShares}{valueTotal}$$


#### Behind Enemy Lines

In order to maintain basic invariants of the DEX users cannot deposit liquidity at price cheaper than bid price for the opposing liquidity, also known as Behind-Enemy-Lines (BEL). If a deposit is placed BEL it will be ignored, but all other deposits will still succeed. The entire transaction can be failed atomically if the `FailTxOnBEL` option is set to true.


#### Autoswap

In rare cases where the target deposit tick has liquidity of both `token0` and `token1` (i.e the pair spread is 0) `autoswap` is required to perform the deposit on that tick. This is to due to an edge case in pool share calculation where users depositing `token1` receive shares withdrawable for `token0` and `token1`. Without paying the autosap fee upfront, users can effectively perform a 'free' swap on that pool. Autoswap will only apply on the specific tick that has both tokens available
By default the `autoswap` option is enabled, which allows users to deposit their full deposit amount.  Autoswap provides a mechanism for users to deposit the entirety of their specified deposit amounts by paying a small fee. The fee for performing an autoswap is deducted from the total number of shares the the user is issued. When calculating share issuance the same formula as above is used for the balanced portion of the deposit, with the following formula use to calculate the shares issues that would unbalance the pool:

$$additionalShares = left_0 \cdot p(-fee) + left_1 \cdot p(i-fee)$$


### Deposit Message
```protobuf
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

message DepositOptions {
  bool disable_autoswap = 1;
  bool fail_tx_on_bel = 2;
}
```

#### MsgDeposit

| Feild                              | Description                                                                                 |
|------------------------------------|---------------------------------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress)  | The account from which deposit Tokens will be debited                                       |
| `Receiver` string (sdk.AccAddress) | The account to which PoolShares will be issued                                              |
| `TokenA` string                    | Denom for one side of the deposit                                                           |
| `TokenB` string                    | Denom for the opposing side of the deposit                                                  |
| `AmountsA` \[]sdk.Int              | Amounts of tokenA to deposit                                                                |
| `AmountsB` \[]sdk.Int              | Amounts of tokenB to deposit                                                                |
| `TickIndexesAToB` \[]int64         | Tick indexes to deposit at defined in terms of TokenA to TokenB |
| `Fees` \[]uint64                   | Fees to use for each deposit                                                                |
| `Options` \[]DepositOptions        | Additional deposit options                                                                  |



#### DepositOptions

| Field                   | Description                                                             |
|-------------------------| ----------------------------------------------------------------------- |
| `disable_autoswap` bool | Toggle to use autoswap (default false)                                  |
| `fail_tx_on_bel` bool   | Toggle to fail entire transaction if behind-enemy-lines (default false) |


## Withdrawal

### Overview

Withdraw is used to redeem PoolShares for the user’s pro-rata portion of tokens within a liquidity pool. Users can withdraw from a pool at any time. When Withdrawing from a pool they will receive Token0 and Token1 in the same ratio as what is currently present in the pool. When withdrawing the users PoolShares are burned and their account is credited with the withdrawn tokens.

### Withdrawal Message

```protobuf
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

| Field                              | Description                                                                                                |
|------------------------------------|------------------------------------------------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress)  | The account from which the PoolShares are removed                                                          |
| `Receiver` string (sdk.AccAddress) | The account to which the tokens are credited                                                               |
| `TokenA` string                    | Denom for one side of the deposit                                                                          |
| `TokenB` string                    | Denom for the opposing side of the deposit                                                                 |
| `SharesToRemove` \[]sdk.Int        | Amount of shares to remove from each pool                                                                  |
| `TickIndexesAToB` \[]int64         | Tick indexes of the target LiquidityPools defined in terms of TokenA to TokenB |
| `Fees` \[]uint64                   | Fee for the target LiquidityPools                                                                          |


## MultiHop Swap

### Overview

Multihop swap provides a swapping mechanism to achieve better prices by routing through a series of pools. Rather than swapping directly from TokenA to TokenB a user may be able to get a better price if they swap from TokenA to TokenC to TokenD to TokenB. When performing a multihop swap the user provides an array of Denoms that they would like to swap through. For example if the user supplied the following array of Denoms \[`“TokenA”, “TokenC”, “TokenD”, “TokenB”`], the following swaps would be performed: Swap TokenA for TokenC; Swap TokenC for TokenD; Swap TokenD for TokenB.

The underlying swaps (hops) within a Multihop Swap are performed using the same mechanism as the basic Swap function. Unlike the the basic swap however, the complete amount of specified by `AmountIn` will always be used. If there is insufficient liquidity in a route to swap 100% of the `AmountIn` the route will fail. Additionally, rather than supply an explicit argument for `TokenIn` the first denom in each `Routes` array is used as the `TokenIn.`

MultihopSwap also allows users to set an `ExitLimitPrice.` For a route to succeed the final conversion rate for the EntryToken to ExitToken must be less than the ExitLimitPrice. For a Multihop swap to succeed the following test must be satisfied:

$$ExitLimitPrice <= \frac{AmountOfExitToken}{AmountIn}$$

Multihop swap also allows users to supply multiple different routes. By default, the first route that does not run out of liquidity, hit the `ExitLimitPrice` or return an error will be used. Multihop swap also provides a `PickBestRoute` option. When `PickBestRoute` is true all routes will be run and the route that results in the greatest amount of the resulting TokenOut at final hop will be used. This option to dynamically pick the best route at runtime significantly reduces the risk of front running. Note that a successful MultiHop swap can produce dust on any pool in swaps through. This dust is credited to the caller.

### Multihop Swap Message

```protobuf
message MultiHopRoute {
  repeated string hops = 1;
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
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v4/utils/math.PrecDec",
    (gogoproto.nullable) = false,
    (gogoproto.jsontag) = "exit_limit_price"
  ];
  // If pickBestRoute == true then all routes are run and the route with the
  // best price is chosen otherwise, the first succesful route is used.
  bool pick_best_route = 6;
}
```

#### MsgMultiHopSwap

| Field                              | Description                                                          |
|------------------------------------|----------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress)  | Account from which TokenIn is debited                                |
| `Receiver` string (sdk.AccAddress) | Account to which TokenOut is credited                                |
| `Routes` \[]MultiHopRoute          | Array of possible routes                                             |
| `AmountIn` sdk.Int                 | Amount of TokenIn to swap                                            |
| `ExitLimitPrice` sdk.Dec           | Minimum price that that must be satisfied for a route to succeed     |
| `PickBestRoute` bool               | If true all routes are run and the route with the best price is used (default false) |

**Multihop Route**

| Field            | Description                      |
|------------------|----------------------------------|
| `Hops` \[]String | Array of denoms to route through |


## Place Limit Order

### Overview

Limit orders provide the primary mechanism for trading on the Neutron DEX Dex. Limit orders can provide liquidity to the Dex (“Maker LimitOrders”) and/or can be used to trade against preexisting liquidity (“Taker Limit Orders”). All limit orders provide a `limitSellPrice` which represents the lowest allowable price at which a trade will be executed. Limit price can be converted to `TickIndex` with the following formula:

$$log_{1.0001}(price) = TickIndex$$

Taker limit orders will swap through all liquidity at ticks less than or equal to the `TickIndex`. Maker limit orders will be placed at $$-1\cdot TickIndex$$.


Maker limit orders provide new liquidity to the dex that can be swapped through by other traders (either via Multihop Swap or a Taker Limit Order.) The liquidity supplied by a maker limit order is stored in a `LimitOrderTranche` at a specific tick. Once the tranche has been fully or partially filled via another order the user can withdraw the proceeds from that tranche. Maker limit orders can also be cancelled at any time. Maker only limit order’s are created with the following order types: `GOOD\_TIL\_CANCELLED`, `JUST\_IN\_TIME` and `GOOD\_TIL\_TIME`. All Maker limit order will first try to fill via existing liquidity on the DEX priced below their `limit_sell_price`, any amount of `TokenIn` that cannot be immediately swapped will be placed into a `LimitOrderTranche`. The proceeds from this initial swap will be deposited directly back to the `Receiver`.

Taker limit orders do not add liquidity to the dex, instead they trade against existing `TickLiquidity`. Taker orders will either fail at the time of transaction or be completed immediately. Successful taker orders will deposit the proceeds directly back into the `Receiver`.

Rather than supplying a limit price, limit orders take a `TickIndex` as an argument. For maker limit orders this is the tick that the `LimitOrderTranche` will be placed at. For taker limit order will only trade through liquidity at or above the `TickIndex.` A specific price can be converted to a `TickIndex` using the following formula:



### Order types

#### FILL\_OR\_KILL

Fill-or-Kill limit orders are maker limit orders that either successfully swap 100% of the supplied `AmountIn` or return an error. If there is insufficient liquidity to complete the trade at or above the supplied `LimitSellPrice` a Fill-or-Kill order will return an error of `ErrFoKLimitOrderNotFilled.`

#### IMMEDIATE\_OR\_CANCEL

Immediate-or-Cancel limit orders are maker orders that will swap as much as of the `AmountIn` as possible given available liquidity above the supplied `LimitSellPrice`. Unlike Fill-or-Kill orders they will still successfully complete even if they are only able to partially trade through the `AmountIn` at the `LimitSellPrice` or better.

#### GOOD\_TIL\_CANCELLED

Good-til-Cancelled limit orders are hybrid maker and taker limit orders. They will attempt to trade the supplied `AmountIn` at the `TickIndex` or better. However, if the total `AmountIn` cannot be traded at the limit price they remaining amount will be placed as a maker limit order. The proceeds from the taker portion are deposited into the user’s account immediately, however, the proceeds from the maker portion must be explicitly withdrawn via WithdrawLimitOrder.

#### GOOD\_TIL\_TIME;

Good-til-Time limit orders function exactly the same as Good-til-Cancelled limit orders, first trying to trade as a taker limit order and then placing any remaining amount as a maker limit order. However, the maker portion of the limit order has a specified `ExpirationTime`. After the` ExpirationTime` the order will be automatically cancelled and can no longer be traded against. When withdrawing a Good-til-Time limit order the user will receive both the successfully traded portion of the limit order (`TokenOut`) as well as any remaining untraded amount (`TokenIn`).

#### JUST\_IN\_TIME;

Just-in-Time limit orders are an advanced maker limit order order that provides tradeable liquidity for exactly one block. They operate the same as GOOD_TIL_TIME limit orders, but have a fixed expiration of one block. At the beginning of the block after  the Just-in-Time order was submitted the order is cancelled and any untraded portion will no longer be usable as active liquidity.

### PlaceLimitOrder Message

```protobuf
message MsgPlaceLimitOrder {
  string creator = 1;
  string receiver = 2;
  string token_in = 3;
  string token_out = 4;
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
    (gogoproto.customtype) = "github.com/neutron-org/neutron/v4/utils/math.PrecDec",
    (gogoproto.nullable) = true,
    (gogoproto.jsontag) = "limit_sell_price"
  ];
}

enum LimitOrderType {
  GOOD_TIL_CANCELLED = 0;
  FILL_OR_KILL = 1;
  IMMEDIATE_OR_CANCEL = 2;
  JUST_IN_TIME = 3;
  GOOD_TIL_TIME = 4;
}
```

#### MsgPlaceLimitOrder

| Field                               | Desciption                                                                                                                                      |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress)   | Account from which TokenIn is debited                                                                                                           |
| `Receiver` string (sdk.AccAddress)  | Account to which TokenOut is credited or that will be allowed to withdraw or cancel a maker order                                               |
| `TokenIn` string                    | Token being “sold”                                                                                                                              |
| `TokenOut`                          | Token being “bought”                                                                                                                            |
| `AmountIn` sdk.Int                  | Amount of TokenIn to be traded                                                                                                                  |
| `OrderType` orderType               | Type of limit order to be used. Must be one of: GOOD\_TIL\_CANCELLED, FILL\_OR\_KILL, IMMEDIATE\_OR\_CANCEL, JUST\_IN\_TIME, or GOOD\_TIL\_TIME |
| `LimitSellPrice` sdk.Dec                   | Limit sell price                                                                          |
| `MaxAmountOut` sdk.Int                   | The maximum `TokenOut` a user wants to receive|
| `ExpirationTime` time.Time          | Expiration time for order. Only valid for GOOD\_TIL\_TIME limit orders                                                                          |

## Cancel Limit Order Message

### Overview

Standard Taker limit orders (Good-til-cancelled & Good-til-Time) can be cancelled at any time if they have not been completely filled. Once a limit order is cancelled any remaining “TokenIn” liquidity is returned to the user.

NOTE: Canceling a partially filled limit order does not withdraw the traded portion. A separate call must be made to `WithdrawFilledLimitOrder` to withdraw any proceeds from the limit order

### Cancel Limit Order Message

```protobuf
message MsgCancelLimitOrder {
    string creator = 1;
    string tranche_key = 2;
}
```

### MsgCancelLimitOrder

| Field                             | Description                                                                         |
|-----------------------------------|-------------------------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress) | Account which controls the limit order and to which any untraded amount is credited |
| `TrancheKey` string               | TrancheKey for the target limit order                                               |


## Withdraw Filled Limit Order

### Overview
Once a limit order has been filled – either partially or in its entirety, it can be withdrawn at any time. Withdrawing from a limit order credits all available proceeds to the user. Withdraw can be called on a limit order multiple times as new proceeds become available.

### Withdraw Filled Limit Order Message
```protobuf
message MsgWithdrawFilledLimitOrder {
    string creator = 1;
    string tranche_key = 2;
}
```

### MsgWithdrawFilledLimitOrder

| Field                             | Description                                                               |
|----------------------------------|---------------------------------------------------------------------------|
| `Creator` string (sdk.AccAddress)  | Account which controls the limit order and to which proceeds are credited |
| `TrancheKey` string              | TrancheKey for the target limit order                                     |


## UpdateParams

### Overview
Used to update DEX params

### UpdateParamsMsg
```protobuf
message MsgUpdateParams {
  string authority = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // NOTE: All parameters must be supplied.
  Params params = 2 [
    (gogoproto.nullable) = false,
    (amino.dont_omitempty) = true
  ];
}

message Params {
  option (gogoproto.goproto_stringer) = false;
  repeated uint64 fee_tiers = 1;
  uint64 max_jits_per_block = 3;
  uint64 good_til_purge_allowance = 4;
  bool paused = 5;
}
```

| Field                       | Description                                                                                                                                                                                                                                             |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `FeeTiers` uint64           | Fee tiers is the list of allowable fees that can be used for LP deposits                                                                                                                                                                                |
| `MaxJitsPerBlock` uint64           | Maximum number of JIT limit orders allowed to be placed in a single block                                                                                                                                                                                |
| `GoodTilPurgeAllowance` uint64           | Amount of gas reserved for purging non-JIT limit orders in `BeginBlocker`                                                                                                                                                                                |
| `Paused` bool           | Option to disable all messages to the dex |


# Gas Estimates

Below are basic gas estimates for various Dex operations. Depending on the exact state of the dex and the inputs of the message being sent real gas costs can vary substantially. For operations that touch multiple ticks the gas cost can be estimated using the formula:

$$gasUsed = fixedGasCost + perTickGas*nTicks$$

These estimates only consider the gas costs at the message server level and below; application level (ie. AnteHandler) gas costs are not included.

### Deposit

| CASE                     | FIXED_GAS | PER_TICK_GAS |
|--------------------------|-----------|--------------|
| New pools                | `21825`     | `48076`        |
| Adding to existing pools | `19069`     | `39100`        |

*assumes single-sided deposits

### Withdrawal

| FIXED_GAS | PER_TICK_GAS |
|-----------|--------------|
| `21825`     | `32215`        |


### PlaceLimitOrder

| CASE                     | FIXED_GAS | PER_TICK_GAS |
|--------------------------|-----------|--------------|
| Taker only limit order   | `44213`     | `7779`         |
| Maker only GTC           | `31095`     | `N/A`          |
| Maker only JIT           | `48095`     | `N/A`          |
| Maker only GoodTil       | `49107`     | `N/A`          |

### WithdrawLimitOrder

| FIXED_GAS | PER_TICK_GAS |
|-----------|--------------|
| `24992`     | `N/A`          |

### CancelLimitOrder

| FIXED_GAS | PER_TICK_GAS |
|-----------|--------------|
| `25451`     | `N/A`          |
