# Liquidity Iteration

When swapping through liquidity via a Swap, Multi-Hop Swap, or a Taker Limit Order we iterate through the available `TickLiquidity` to fill the swap order. Liquidity is always iterated through in order of best to worst price. In the case of swapping Token0 (tokenIn) for Token1 (tokenOut) we iterate through tick indexes left to right (eg. -1, 0, 1, 2...) and for Token1 for Token0 we iterate from right to left (eg. 2, 1, 0, -1…) For each swap we completely exhaust the available reserves before moving onto the next tick. For `TickLiquidity` instances at the same `TickIndex` they are iterated through in a deterministic order as follows:
- `PoolReserves`: In Ascending `Fee` order
- `LimitOrderTranches`: In ascending `TrancheKey` order

When swapping through `PoolReserves` the proceeds from the swap are added to the reserves on the reciprocal side of the pool. Ie. The output of TokenA swapped through a `PoolReserves` at tick 1, fee 1 will moved to a `PoolReserves` holding TokenB at tick -1 fee 1.

#### Example liquidity iteration swapping TokenA for TokenB

![Example liquidity iteration ](/img/duality_orderbook.png)

1. The first available `TickLiquidity` holding token TokenB is a `PoolReserves` at tick 5, fee 1. When this is swapped through the TokenIn is deposited in the `PoolReserves` at tick 3.
2. The pool `PoolReserves` at tick 5, fee 2 is swapped through. The TokenIn is deposited in the `PoolReserves` at tick 2.
3. The limit order at tick 5 is swapped through.
4. The `PoolReserves` at tick 6, fee 1 is swapped through. The TokenIn is deposited in the `PoolReserves` at tick 4.
