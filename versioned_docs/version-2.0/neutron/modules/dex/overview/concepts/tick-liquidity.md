# Tick Liquidity

`TickLiquidity` structs are used to store liquidity within the Dex. Each tick has a specific price and holds liquidity for a single token. `TickLiquidity` come in two general types – `PoolReserves` for storing LP positions and `LimitOrderTranches` for storing maker limit orders. Both types of ticks share several common fields: PairID, TokenIn, TickIndex. PairID refers to the trading pair for which a given tick is used. TokenIn denotes which side of the TradingPair a tick holds liquidity for.

## Pool Reserves

`PoolReserves` are the fundamental building block for Neutron DEX’s AMM design. Each `PoolReserves` instance represents a single side of a liquidity pool. In addition to the `PairID`, `TokenIn` and `TickIndex` fields, Pools Reserves also have a `Reserves` and `Fee` field.

```protobuf
type PoolReserves struct {
    PairID    *PairID
    TokenIn   string
    TickIndex int64
    Reserves  sdk.Int
    Fee       uint64
}

```

`Reserves` is used to store the total amount of `TokenIn` within a given `PoolReserves` instance and `Fee` is the portion of the trading price that will be return to the pool.

In the context of LP liquidity, `PoolReserves` exist in reciprocal pairs with one side (the LowerTick) holding Token0 and the other side (the UpperTick) holding token1. Each of these pairs makes up a single constant price liquidity pool. Within each liquidity pool the following two invariants will always hold true:

1. Both PoolsReserves within a pair will have the same fee: $$LowerTick.Fee == UpperTick.Fee$$
2. The distance between the tick indexes will be equal to 2x the fee:  $$LowerTick.TickIndex + 2 * fee = UppertickTick.TickIndex$$

When swaps occur the tokens will always be added and deducted within a single liqudity pool.

When LP liquidity is deposited with a given fee and price it is added to the `TickLiquidity` instances such that the given fee is already included in the price. For example, if Alice deposits 100 TokenA  and 100TokenB at price 0 (tick 0) with a fee of 1 then her liquidity will be held in tick -1 and tick 1 respectively. If Bob were to swap 50TokenA for TokenB using Alice’s liquidity his exchange rate would be \~ .999. His 50 TokenA would be deposited into tick -1 and he would receive 49 TokenB which would be deducted from tick 1.



It is important to note that multiple `PoolReserves` can exist with the same TickIndex but each one will have a unique fee.

## Limit Order Tranches

`LimitOrderTranches` are used to store liquidity in the form of limit orders. In addition to the `PairID`, `TokenIn` and `TickIndex` fields, Pools Reserves also have `TracheKey`, `ReservesTokenIn`, `ReservesTokenOut`, `TotalTokenIn`, `TotalTokenOut` and an optional `ExpirationTime` field.

```proto
type LimitOrderTranche struct {
    PairID           *PairID
    TokenIn          string
    TickIndex        int64
    TrancheKey       string
    ReservesTokenIn sdk.Int
    ReservesTokenOut sdk.Int
    TotalTokenIn     sdk.Int
    TotalTokenOut    sdk.Int
    ExpirationTime *time.Time
}
```

TrancheKey is a unique identifier for each `LimitOrderTranche`. TrancheKeys also represent a lexicographically sortable order in which tranches with a common PairID, TokenIn and TickIndex will be traded through. Ie. A tranche with TrancheKey “A1” will be traded through before a tranche with TrancheKey “A2”. ReservesTokenIn is the available token that has been added to a limit order by the “maker” and represents the amount of `TokenIn` that can be traded against. `ReservesTokenOut` represents the filled amount of the limit order and can be withdrawn by the “maker”s. `TotalTokenIn` and `TotalTokenOut` are used to store the respective high watermarks for `ReservesTokenIn` and `ReservesTokenOut` and are used for the internal accounting of a limit order.

Lastly, ExpirationTime is an optional field used for Expiring limit orders (`JUST_IN_TIME` and `GOOD_TIL_TIME`). At the end of each block any LimitOrders with `ExpirationTime` <= `ctx.BlockTime()` is converted to an `InactiveLimitOrderTranche` where it can no longer be traded against.
