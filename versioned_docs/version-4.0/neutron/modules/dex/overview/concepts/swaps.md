# Swaps

Swap provides the most basic mechanism for exchanging one denom for another. It is a core building block of Multihop Swaps and Taker limit order. The swap operation operates by trading a `TokenIn` through the available `TickLiquidity` (`PoolReserves` and `LimitOrderTranches`) and  outputs a specified `TokenOut`.

When performing a swap we iterate through liquidity (`PoolReserves` & `LimitOrderTranche`s) from best to worst price.  As we iterate through each instance of `TickLiqudity` we fully exhaust it before moving to the next `TickLiquidity` instance. This iteration continues until ONE of the following conditions is met:

1. All available liquidity has been exhausted.
    - If there is no available `TokenOut` liquidity for the given pair at the beginning of the swap it will fail and return an `ErrLimitPriceNotSatisfied`.
    - If swap is called through a `IMMEDIATE_OR_CANCEL` limit order it will still succeed if liquidity is exhausted and only a portion of the `AmountIn` has been used. In all other cases a partial fill of a swap will result in a failure.
2. The `AmountIn` has been hit (ie. the user has swapped through 100% of the supplied `TokenIn`.
3. `MaxAmountOut` has been set and the `TokenOut` amount is equal to `MaxAmountOut`.
    - In cases where only a portion of the `AmountIn` is used, only the used portion of `TokenIn` will be debited from the user's account.
