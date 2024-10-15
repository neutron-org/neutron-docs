# Liquidity Iteration

When swapping through liquidity via a Multi-Hop Swap or a Taker Limit Order, we iterate through the available `TickLiquidity` to fill the swap order. Liquidity is always iterated through in order of best to worst price (from the taker's perspective.) For each swap, we completely exhaust the available reserves before moving on to the next tick. For `TickLiquidity` instances at the same `TickIndex` they are iterated through in a deterministic order as follows:
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
\text{Price} = 1.0001 ^ \text{ -TickIndex}\\
\text{TickIndex} = -log_{1.0001}(price)
$$
* **Deposit 1:**
    **Amounts:** 10 `ATOM` 10 `USDC`. **Price:** 10 `USDC` per `ATOM`. **Tick index** $-23027$.
* **Deposit 2:**
    **Amounts:** 10 `ATOM` 10 `USDC`. **Price:** 9 `USDC` per `ATOM`. **Tick index** $-21973$.
* **Deposit 3:**
    **Amounts:** 10 `ATOM` 10 `USDC`. **Price:** 8 `USDC` per `ATOM`. **Tick index** $-20795$.

**DEX Limit Orders:**
* **Limit Order 1:**
 **Amount:** 10 `ATOM`. **Price:** $0.14$ `ATOM` per `USDC`: **Tick index** $-19460$

![Example liquidity iteration ](/img/duality-dex-deposit-1.png)

- Tick Index $-23027$ offers the cheapest `USDC` per `ATOM` spent. it yields $10$ `USDC` per `ATOM`
- Tick Index  $19640$ offers the cheapest `ATOM` per `USDC` spent. it yields $0.14$ `ATOM` per `USDC`
- It is visible that iterating left to right will always yield the best price regardless of the token being swapped.

### Example Liquidity Iteration: Swap

Alice Performs a Swap using a `Taker Limit Order`. She wants to swap $$100$$ `USDC` for `ATOM` at the best possible price.

1. The first available `TickLiquidity` holding `ATOM` is a `LimitOrderTranche` at tick $19640$. Since this is a limit order, when swapped through and depleted the liquidity is removed from state and the `USDC` Alice paid is credited to the limit order `Receiver`
2. Alice swaps up to $71.428$ `USDC` using this pool before depleting the reserves. This will net her $10$ `ATOM` for the swap:

 $\text{ATOM available} / \text{exchange rate} = \text{USDC needed}$
 $10 / 0.14 = 71.428$


3. Alice still has $28.527$ `USDC` she needs to swap, so we move to the next available tick: $-20795$
This tick offers `ATOM` at a price of $0.123$ `ATOM` per `USDC` and is of type `PoolReserve`. Any USDC Alice pays for this swap will be placed in the corresponding poolReserves of the Pool (USDC @ Tick $$-20795$$ .) Alice swaps the remainder of her `USDC` here, resulting in an additional $3.5$ `ATOM`:

 $\text{USDC in} * \text{exchange rate} = \text{ATOM out}$
 $28.527 * 0.123 = 3.5$

4. Done. Alice has swapped $100$ `USDC` for $13.5$ `ATOM` with an average price of $0.135$ `ATOM` per `USDC`.

NOTE: For the clarity of this example we are assuming that the `PoolReserves` have a fee of zero. In a real world scenario almost all `PoolReserves` will have a fee. In a scenario with fees `TokenIn` will be added to $Tick * -1 + (2\cdot fee$). Learn more about fees in the [PoolReserves](tick-liquidity#pool-reserves) section.


### Example liquidity Placement Post Swap

![Example liquidity iteration ](/img/duality-dex-swap-1.png)

We are still displaying the tick liquidity at $19640$ as a visual aid. In reality this tick is depleted and removed

There are different behaviors a taker limit order can take when swapping. for example, here we were not sensitive to Price.
Learn more about the order types and their unique behaviors in the [Order Types](../../messages#order-types) section.
