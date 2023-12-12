# Swaps

Swap provides the most basic mechanism for exchanging one denom for another. It is a core building block of Multihop Swaps and Taker limit order. The swap operation operates by trading a `TokenIn` through the liquidity pools that are provided by LPs and outputs a specified `TokenOut`

When performing a swap we iterate through liquidity from best to worst price (PoolLiquidity and taker Limit Orders.) As we iterate through each instance of TickLiqudity we fully exhaust it before moving to the next TickLiquidity instance. This iteration continues until one of the following conditions is met:

All available liquidity has been exhausted – Note: If there is no available liquidity for the given Pair and TokenIn at the beginning of the swap it will fail and return an `ErrInsufficientLiquidity`error. If swap is called through a IMMEDIATE\_OR\_CANCEL limit order it will still succeed if liquidity is exhausted and only a portion of the `AmountIn` has been used. In all other cases a partial fill of a swap will result in a failure.\
The `AmountIn` has been hit (ie. the user has swapped through 100% of the supplied `TokenIn` `MaxAmountOut` has been set and the `TokenOut` amount is equal to `MaxAmountOut`

In cases where only a portion of the maxAmountIn is used only the used portion of `TokenIn` will be debited from the user's account.
