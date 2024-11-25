# Liquidity Iteration

When swapping through liquidity via a Multi-Hop Swap or a Limit Order, we iterate through the available `TickLiquidity` to fill the swap order. Liquidity is always iterated through in order of best to worst price (from the taker's perspective.) For each swap, we completely exhaust the available reserves before moving on to the next tick. For `TickLiquidity` instances at the same `TickIndex` they are iterated through in a deterministic order as follows:
- `PoolReserves` take priority
- `LimitOrderTranches` are iterated through when Pool Reserve liquidity is depleted
- `LimitOrderTranches` are iterated through in alphabetical order of their `TrancheKey` (`LimitOrderTranche.Key.TrancheKey`.)

When swapping through `PoolReserves` the proceeds from the swap are added to the reserves on the reciprocal side of the pool. Ie. The output of TokenA swapped through a `PoolReserves` will be moved to a `PoolReserves` holding TokenB.

### Example liquidity Placement

**DEX Deposits (0 fee):**
$$
\text{Tick Index Formula}
$$
$$
\text{Price} = 1.0001 ^ \text{TickIndex}\\
\text{TickIndex} = log_{1.0001}(price)
$$
* **Deposit 1:**<br />
    **Amounts:** 10 `ATOM` 0 `USDC`. **Price:** 8 `USDC` per `ATOM`. **Tick index** $20795$.
* **Deposit 2:**<br />
    **Amounts: ** 10 `ATOM` 0 `USDC`. **Price:** 9 `USDC` per `ATOM`. **Tick index** $21973$.
* **Deposit 3:**<br />
    **Amounts:** 10 `ATOM` 0 `USDC`. **Price:** 10 `USDC` per `ATOM`. **Tick index** $23027$.

**DEX Limit Orders:**
* **Limit Order 1:**<br />
 **Amount:** 10 `ATOM`. **Price:** $7$ `USDC` per `ATOM`: **Tick index** $19640$
* **Limit Order 2:**<br />
 **Amount:** 10 `USDC`. **Price:** $0.14$ `ATOM` per `USDC`: **Tick index** $-19640$

![Example liquidity iteration ](/img/duality-dex-deposit-1.png)

- Tick Index $19640$  offers the cheapest `ATOM` per `USDC` spent. it yields $1$ `ATOM` per $7$ `USDC`
- Tick Index  $-19640$ offers the cheapest `USDC` per `ATOM` spent. it yields $1$ `USDC` per $0.14$ `ATOM`
- It is visible that iterating left to right will always yield the best price regardless of the token being swapped.

### Example Liquidity Iteration: Swap

Alice Performs a Swap using a `Taker Limit Order`. She wants to swap $$100$$ `USDC` for `ATOM` at the best possible price.

1. The first available `TickLiquidity` holding `ATOM` is a `LimitOrderTranche` at tick $19640$. Since this is a limit order, when swapped through and depleted the liquidity is removed from state and the `USDC` Alice paid can be later withdrawn by the limit order `Receiver`
2. Alice swaps up to $71.27$ `USDC` using this pool before depleting the reserves. This will net her $10$ `ATOM` for the swap:

$$
\begin{aligned}
AmountSwapped &= ATOMAvailable \cdot Price\\
&= 10 * 1.0001^{19640}\\
&= 71.27
\end{aligned}
$$


3. Alice still has $28.73$ `USDC` she needs to swap, so we move to the next available tick: $20795$
This tick offers `ATOM` at a price of $8$ `USDC` per `ATOM` and is of type `PoolReserve`. Any USDC Alice pays for this swap will be placed in the corresponding poolReserves of the Pool (USDC @ Tick $$-20795$$ .) Alice swaps the remainder of her `USDC` here, resulting in an additional $3.5$ `ATOM`:

$$
\begin{aligned}
AmountOut &= \frac{AmountIn}{Price}\\
&= \frac{28.73}{1.0001^{20795}}\\
&= 3.59
\end{aligned}
$$



4. Done. Alice has swapped $100$ `USDC` for $13.59$ `ATOM` with an average price of $0.136$ `ATOM` per `USDC`.

NOTE: For the clarity of this example we are assuming that the `PoolReserves` have a fee of zero. In a real world scenario almost all `PoolReserves` will have a fee. In a scenario with fees `TokenIn` will be added to $Tick * -1 + (2\cdot fee$). Learn more about fees in the [PoolReserves](tick-liquidity#pool-reserves) section.


### Example liquidity Placement Post Swap

![Example liquidity iteration ](/img/duality-dex-swap-1.png)

We are still displaying the tick liquidity at $19640$ as a visual aid. In reality this tick is depleted and removed

There are different behaviors a taker limit order can take when swapping. for example, here we were not sensitive to Price.
Learn more about the order types and their unique behaviors in the [Order Types](../../messages#order-types) section.
