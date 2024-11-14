# Tick Liquidity

`TickLiquidity` structs are used to store liquidity within the Dex. Each tick has a specific price and holds liquidity for a single token. `TickLiquidity` come in two general types --`PoolReserves` for storing LP positions and `LimitOrderTranche`s for storing limit orders. Both `TickLiquidity` types are indexed by a key which shares a number of feilds in common. These two types make up the fundemental building blocks of the DEX orderbook, and are critical to the [liquidity iteration mechanism](docs/neutron/modules/dex/overview/concepts/liquidity-iteration.md). `TickLiquidity`s contain all of the neccesary information to perform a swap, namely price and available reserves. Each `TickLiquidity` instance has a `TradePairID`, `TickIndexTakerToMaker`. A `TradePairID` containing the feilds `MakerDenom` and `TakerDenom` describes what denom is held in the `TickLiquidity` (`MakerDenom`) and what denom it can be traded with (`TakerDenom`). `TickIndexTakerToMaker` describes the tick at which a certain liquidity is stored and by extension its `PriceTakerToMaker`.

## PairID

`PairID`s are the canonical way which we refer to the two tokens in a pair. In order to ensure uniqueness the denoms are sorted alphabetically, with the first denom stored as `Token0` and the second as `Token`.

```go
type PairID struct {
    Token0 string
    Token1 string
}
```

For example, in an ATOM<\>USDC pair, ATOM would be `Token0` and `USDC` would be `Token1`

We stringify `PairID`s in the form "[Token0]<\>[Token1] ie. "ATOM<\>USDC".


## Pool
A `Pool` contains all the information required for a single constant-priced AMM to exist. It holds liquidity for both sides of a pair, `Token0` and `Token1` named `LowerTick` and `UpperTick` respectively. Pools are not explicitly stored anywhere, but their `PoolReserves` content is.
```go
type Pool struct {
    Id         uint64
    LowerTick0 *PoolReserves
    UpperTick1 *PoolReserves
}
```

## Pool Reserves

`PoolReserves` are the core components for Neutron DEX’s AMM design. Each `PoolReserves` instance represents a single side of a liquidity pool. They contain all the information needed to perform that swap.  They also nest a `Fee` and a `TradePaidId`, both of which are used to find the corresponding PoolReserves on the other side of the pool.

```go
type PoolReserves struct {
    Key                       *PoolReservesKey
    ReservesMakerDenom        Int
    PriceTakerToMaker         PrecDec
    PriceOppositeTakerToMaker PrecDec
}
type PoolReservesKey struct {
    TradePairId           *TradePairID
    TickIndexTakerToMaker int64
    Fee                   uint64
}
type TradePairID struct {
    MakerDenom string
    TakerDenom string
}
```

`ReservesMakerDenom` is used to store the total amount of `MakerDenom` within a given `PoolReserves` instance.

In the context of LP liquidity, `PoolReserves` exist in reciprocal pairs with one side (`LowerTick`) holding Token0 and the other side (`UpperTick`) holding token1. Each of these pairs makes up a single constant price liquidity pool. Within each liquidity pool, the following invariants will always hold True:

* Both PoolsReserves within a pair will have the same fee: $$LowerTick.Key.Fee == UpperTick.Key.Fee$$
* When swaps occur the tokens will always be added to one side of the liquidity pool and deducted from the other side.

When LP liquidity is deposited with a given fee and price it is added to the `TickLiquidity` instances such that the given fee is already included in the price. For example, if Alice deposits 100 TokenA  and 100TokenB at price 1 (tick 0) with a fee of 1 then both `PoolReserves` representing the `Pool` will be placed at tick  1 with a `PriceTakerToMaker` of 0.999 each. If Bob were to swap 50Token0 for Token1 using Alice’s liquidity his exchange rate would be \~ .999. His 50 Token0 would be deposited into the `Pool`'s `LowerTick0 PoolReserves`at tick 1 and fee 1. and he would receive 49 Token1 which would be deducted from  pool's `LowerTick1` `PoolReserves`.


It is important to note that multiple `PoolReserves` can exist with the same TickIndex but each one will have a unique fee.

## Limit Order Tranches

`LimitOrderTranches` are used to store liquidity in the form of limit orders. Like `PoolReserves`, `LimitOrderTranches` also store a reference to a specific `TradePairId` and `TickIndexTakerToMaker`.

```go
type LimitOrderTranche struct {
    Key                *LimitOrderTrancheKey
    ReservesMakerDenom cosmossdk_io_math.Int
    ReservesTakerDenom cosmossdk_io_math.Int
    TotalMakerDenom    cosmossdk_io_math.Int
    TotalTakerDenom    cosmossdk_io_math.Int
    ExpirationTime    *time.Time
    PriceTakerToMaker github_com_neutron_org_neutron_v4_utils_math.PrecDec
}
```

```go
type LimitOrderTrancheKey struct {
    TradePairId           *TradePairID
    TickIndexTakerToMaker int64
    TrancheKey            string
}
```

TrancheKey is a unique identifier for each `LimitOrderTranche`. TrancheKeys also represent a lexicographically sortable order in which tranches with a common `TradePairID` and `TickIndex` will be traded through. Ie. A tranche with `TrancheKey` “A1” will be traded through before a tranche with `TrancheKey` “A2”. ReservesTokenIn is the available token that has been added to a limit order by the “maker” (limit order placer) and represents the amount of `TokenIn` that can be traded against. `ReservesTokenOut` represents the filled amount of the limit order and can be withdrawn by the “makers”. `TotalTokenIn` and `TotalTokenOut` are used to store the respective high watermarks for `ReservesTokenIn` and `ReservesTokenOut` and are used for the internal accounting of a limit order.

Lastly, ExpirationTime is an optional field used for Expiring limit orders [(`JUST_IN_TIME` and `GOOD_TIL_TIME`)](docs/neutron/modules/dex/messages.md#order-types). At the beginning (`BeginBlocker`) of each block any LimitOrders with `ExpirationTime` <= `ctx.BlockTime()` is converted to an `InactiveLimitOrderTranche` where it can no longer be traded against.
