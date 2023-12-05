# Overview

The Dex (decentralized exchange) module contains the central business logic of Duality. Users may interact with this module to provide liquidity and execute trades according to commonly-accepted exchange semantics.

Duality, at its core, is a novel AMM design. We are also building a set of features around the AMM in order to enable powerful and sustainable financial markets. At the core of the AMM lays an incredibly simple swap mechanic: liquidity pools that allow traders to buy or sell tokens at a constant price.&#x20;

Constant-price pools enable a new level of simplicity, flexibility, and capital efficiency which benefits liquidity providers and traders alike. Reasoning about external use cases and core features becomes much easier, leading to an enhanced, simplified user experience.

## Dictionary

**Concentrated Liquidity**: AMMs which allow LPs to choose targeted ranges to provide liquidity to and typically more capital efficient as a result.

**Capital Efficiency**: The ability of an AMM to give traders better prices on the same amount liquidity.

**Liquidity Pools**: Holds liquidity, price and fee data that tells users how they can interact with it (i.e., how much they'll get in output on some input). Allows liquidity providers to pool their liquidity together instead of fragmenting it.

**Liquidity Fragmentation**: When liquidity of the same pairs is spread across numerous exchanges or AMMs. This increases the costs of trying to get the best price on a trade.&#x20;

**Ticks**: Integers that map to data about the liquidity that can be traded at. The price for tick $$i$$ is $$p(i) = 1.0001^{i}$$.

**Fees**: ​The way LPs charge traders in order to make returns. It is similar to a bid-ask spread on orderbooks.

**Bid-ask Spread**: The difference between the highest buy price (bid) and lowest sell price (ask).

**Market Order**: An order to buy/sell some amount of token at the best available price.

**Limit Order**: An order to buy/sell some amount token at a set price determined by the placer of the order.

## **Flexible**

Duality is the one-stop shop for any payoff or trading style.

**Traders** can choose between market orders and limit orders.&#x20;

**Liquidity providers** can replicate _any feasible AMM curve_ (liquidity distribution) by strategically choosing prices and the distribution of liquidity across them.

While two liquidity providers on Duality may prefer completely different liquidity distributions, they will still use the same underlying pools. The only difference is the amount deposited in each pool. We call this feature _shared liquidity_ because it has numerous advantages, such as reducing liquidity fragmentation and increasing the cost of price manipulation for traders and liquidity providers.

## **Better Prices**

Duality’s mechanism design is extremely **capital efficient** since liquidity providers can arbitrarily concentrate their liquidity on a single price. If there is enough liquidity at the peg price, traders can benefit from true zero-slippage swaps on stablecoins and highly correlated assets (e.g., stakednon-staked pools).

Duality has also implemented **dynamic routing** to further give traders better prices. Most routers calculate and broadcast the path(s) that a trade should take before the trade is executed. This reveals dangerous information to searchers who can sandwich or front-run the broadcasted route. As a matter of fact, because the prices of pools are volatile, the run-time route is likely no longer the optimal route.

With _Dynamic Routing,_ Duality only reveals the in-token and out-token in the mempool, and finds the best path(s) when the trade is executed. Thus if the price moves because of volatility or because someone is trying to front-run your trade, your route will respond in real time to find the next best route.

## App-Specific Infrastructure

Computer scientist Alan Kay famously said that those who are serious about software build their own hardware. We believe that people who are serious about exchanges own their whole stack.

App-chains (and soon app-rollups) open up a rich design space of unexplored possibilities that can solve some of DeFi’s most urgent problems.&#x20;

1. MEV protections can be implemented at the consensus level and/or expressed through more complex application logic, which is not reasonable on generalized smart contracting chains.
2. Expensive transactions fees and network congestion become less of an issue with app-specific infrastructure.&#x20;
3. New incentive schemes based on order flow and fee markets can put an end to DeFi’s unsustainable token emissions models.&#x20;

Duality strives to be a hub of innovation for pushing the boundaries of what is possible with app-specific infrastructure.


## AMMs and Orderbooks

**AMMs**

AMMs were the first time that capital markets were created on-chain, in a computationally efficient manner. This was a transformative innovation. However, these AMMs were extremely capital inefficient, meaning that a significant amount of the liquidity deposited in them was not used. This led to extremely high price impact (aka slippage) for traders.

Recently, AMMs have introduced concentrated liquidity to increase their capital efficiency. This enabled liquidity providers to decide at what prices they wanted their liquidity to be used as, and gave liquidity providers better prices. These concentrated liquidity paradigms are often implemented in complicated manners, and still don't reach the full capital efficiency of orderbooks.


**Orderbooks**

Orderbooks are the dominant trading mechanism of traditional finance, and involve a set of limit orders that market makers fill. They are extremely capital efficient: limit orders, by definition, have zero price impact for traders. While they offer a familiar UX and capital efficient trading experience, they are extremely computationally inefficient to implement on-chain, and don't offer the same liveness and composability properties that make AMMs a core DeFi primitive.

![A summary of the pros and cons of AMMs and orderbooks](/img/Dual_Chart_bg.png)

**Duality**

Duality's mechanism combines the best of AMMs and orderbooks. It is a series of constant-priced pools where LPs can deposit their capital. For example, an LP can deposit capital at the 1.000:1.000 price on a DAI/USDC pair.

This simple design has significant consequences. Duality can reach order-book levels of capital efficiency (zero price impact on trades, swaps, and limit orders) while still maintaining the computational efficiency and liveness properties of AMMs.



**A Quick Note on Fees and Value Accrual**

Concentrated liquidity and orderbooks differ slightly in how liquidity providers accrue value. On concentrated liquidity AMMs, liquidity providers accrue value through a [fee](neutron/modules/dex-module/overview#fees) that they choose when placing the liquidity. The fee is a predetermined premium that traders pay when using the liquidity to swap between two assets.&#x20;

Orderbook liquidity providers accrue value through maintaining a bid-ask spread, which entails them offering to sell assets slightly above the current current price and buy them slightly below the current price. It turns out that these two mechanism are actually very similar in that they describe the difference in prices between the best sell and buy prices.

## Liquidity Iteration

When swapping through liquidity via a Swap, Multi-Hop Swap, or a Taker Limit Order we iterate through the available tick liquidity to fill the swap order. Liquidity is always iterated through in order of best to worst price. In the case of swapping Token0 (tokenIn) for Token1 (tokenOut) we iterate through tickIndexes left to right (eg. -1, 0, 1, 2...) and for Token1 for Token0 we iterate from right to left (eg. 2, 1, 0, -1…) For each swap we completely exhaust the available reserves before moving onto the next tick. For TickLiquidity instances at the same `TickIndex` they are iterated through in a deterministic order as follows. PoolReserves: In Ascending `Fee` order LimitOrderTranches: In ascending `TrancheKey` order


## Liquidity Pools

**Constant-Priced Liquidity Pools**

Every Duality pair is made up of _constant-priced pools_. As long as there are reserves left to trade in a pool, they will be allowed to be traded at a constant exchange rate. This is very different than other liquidity pool types in which price changes become more significant as the amount being traded gets larger. This is also known as _price impact_ or _slippage loss._&#x20;

Of course, liquidity providers aren't limited to depositing at a single constant price pool per token pair. In fact, liquidity providers can deposit their liquidity at any price. This allows liquidity providers and builders to have infinite flexibility and control over the strategies and products built on top of Duality.

There are a number of benefits to using constant priced pools:

* Routing algorithms are easier to reason about and build, which lead to traders getting better prices
* Any feasible liquidity distribution can be replicated by breaking it down into discrete chunks and depositing into constant priced pools at those discrete points (the more pools, the closer the replication).
* Liquidity can be extremely concentrated on a single price. This is a significant benefit for stablecoins and other highly correlated assets, which can now take advantage of extremely low to no price impact on trades.
* Constant-priced liquidity pool are much more similar to limit orders than other liquidity pools, making the trading experience feel familiar to traders who are used to orderbooks.

**Constant Priced Pools  = Constant Sum Market Makers**

Constant priced pools are also known as _constant sum market makers._ This is in reference to a trading function which is the sum of the two reserves multiplied by a constant price i.e., $$\psi(R_1, R_2) = R_1 + p R_2$$.&#x20;

Here, ​$$p$$ is a constant price that the pool trades at regardless of the reserves.&#x20;

For example if $$p=2$$ than we can exchange 2 ​of $$R_2$$for 4 of $$R_1$$as long as there is enough of $$R_1$$left to complete the trade i.e., $$R_2 \geq 4$$. We can see this is a viable trade because ​$$\psi(R_1, R_2) = R_1 + pR_2 = (R_1 - 4) + p(R_1 + 2)$$ and so the pool's "invariant" ​holds.

## Swaps

Swap provides the most basic mechanism for exchanging one denom for another. It is a core building block of Multihop Swaps and Taker limit order. The swap operation operates by trading a `TokenIn` through the liquidity pools that are provided by LPs and outputs a specified `TokenOut`

When performing a swap we iterate through liquidity from best to worst price (PoolLiquidity and taker Limit Orders.) As we iterate through each instance of TickLiqudity we fully exhaust it before moving to the next TickLiquidity instance. This iteration continues until one of the following conditions is met:

All available liquidity has been exhausted – Note: If there is no available liquidity for the given Pair and TokenIn at the beginning of the swap it will fail and return an `ErrInsufficientLiquidity`error. If swap is called through a IMMEDIATE\_OR\_CANCEL limit order it will still succeed if liquidity is exhausted and only a portion of the `AmountIn` has been used. In all other cases a partial fill of a swap will result in a failure.\
The `AmountIn` has been hit (ie. the user has swapped through 100% of the supplied `TokenIn` `MaxAmountOut` has been set and the `TokenOut` amount is equal to `MaxAmountOut`

In cases where only a portion of the maxAmountIn is used only the used portion of `TokenIn` will be debited from the user's account.

## Limit Order Tranches

Limit Order tranches are used to store liquidity in the form of limit orders. In addition to the `PairID`, `TokenIn` and `TickIndex` fields, Pools Reserves also have `TracheKey`, `ReservesTokenIn`, `ReservesTokenOut`, `TotalTokenIn`, `TotalTokenOut` and an optional `ExpirationTime` field.

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

TrancheKey is a unique identifier for each LimitOrderTranche. TrancheKeys also represent a lexicographically sortable order in which tranches with a common PairID, TokenIn and TickIndex will be traded through. Ie. A tranche with TrancheKey “A1” will be traded through before a tranche with TrancheKey “A2”. ReservesTokenIn is the available token that has been added to a limit order by the “maker” and represents the amount of `TokenIn` that can be traded against. `ReservesTokenOut` represents the filled amount of the limit order and can be withdrawn by the “maker”s. `TotalTokenIn` and `TotalTokenOut` are used to store the respective high watermarks for `ReservesTokenIn` and `ReservesTokenOut` and are used for the internal accounting of a limit order.

Lastly, ExpirationTime is an optional field used for Expiring limit orders (`JUST_IN_TIME` and `GOOD_TIL_TIME`). At the end of each block any LimitOrders with `ExpirationTime` <= `ctx.BlockTime()` is converted to an `InactiveLimitOrderTranche` where it can no longer be traded against.


## Fees

_Disclaimer: Liquidity providing into all AMMs is risky and requires due dilligence. While we explain how fees can hypothetically be used to make money, we reccommend that you do your own research before making decisions on how to choose fees and whether to liquidity provide._

Fees are used by liquidity providers to make money from trades using their liquidity. Every time a trade is made, the fee charges traders a slight premium for using the liquidity.&#x20;

The best strategy for liquidity providers will not always be to charge traders the highest fee. This is because higher fees also means higher prices, which can be undercut by liquidity being deposited at lower fees or prices. Thus, liquidity providers should be thoughtful in their selection of fees.

A rule of thumb on choosing fees is that liquidity providers typically choose higher fees on pairs with more volatility.

* Less volatile assets (like stablecoin pairs) carry little to no risk of loss-versus-balancing (LVR) and impermanent loss (loss-versus-holding) for liquidity providers. It is relatively straightforward to LP and make a price prediction. This means that attracting order flow is very competitive and fees may end up becoming a race to the bottom. A typical strategy might be to deploy a lot of liquidity at very close to and at the peg price with the lowest fee tier.
* More volatile assets are subject to higher LVR and IL. LPs may spread their liquidity across a wider range to capture more volume. This additional volume and lack of liquidity concentration makes it more suitable for LPs to charge higher fees.

### Basic Fee Math

We will use $$\gamma$$​ to represent fees in constant sum pools. Fees work as follows:

* Consider a pool between token $$A$$​ and token $$B$$​
* When a trader wants to trade $$a_{in} = X$$units of token $$A$$ for token $$B$$ through a pool with the price $$p$$ and a fee $$\gamma$$, they receive $$a_{out} = p (1 -\gamma) X$$ is long as there are enough reserves in the pool i.e., $$R_B \geq p (1 - \gamma) X$$​
* When a trader wants to trade $$a_{in} = Y$$units of token $$B$$ for token $$A$$ through the same pool, they receive $$a_{out} = \frac{(1 - \gamma) Y}{p}$$as long as there are enough reserves in the pool i.e., $$R_A \geq \frac{(1 - \gamma) Y}{p}$$

_Note_: that since price $$p$$​ is the exchange rate for trades from token $$A$$  to token $$B$$, $$\frac{1}{p}$$ is the exchange rate for trades ​from token $$B$$​ to token $$A$$​.
