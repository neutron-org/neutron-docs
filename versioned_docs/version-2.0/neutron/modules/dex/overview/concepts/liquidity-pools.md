# Liquidity Pools

**Constant-Priced Liquidity Pools**

Every Neutron DEX pair is made up of _constant-priced pools_. As long as there are reserves left to trade in a pool, they will be allowed to be traded at a constant exchange rate. This is very different than other liquidity pool types in which price changes become more significant as the amount being traded gets larger. This is also known as _price impact_ or _slippage loss._;

Of course, liquidity providers aren't limited to depositing at a single constant price pool per token pair. In fact, liquidity providers can deposit their liquidity at any price. This allows liquidity providers and builders to have infinite flexibility and control over the strategies and products built on top of Neutron DEX.

There are a number of benefits to using constant priced pools:

* Routing algorithms are easier to reason about and build, which lead to traders getting better prices
* Any feasible liquidity distribution can be replicated by breaking it down into discrete chunks and depositing into constant priced pools at those discrete points (the more pools, the closer the replication).
* Liquidity can be extremely concentrated on a single price. This is a significant benefit for stablecoins and other highly correlated assets, which can now take advantage of extremely low to no price impact on trades.
* Constant-priced liquidity pool are much more similar to limit orders than other liquidity pools, making the trading experience feel familiar to traders who are used to orderbooks.

**Constant Priced Pools  = Constant Sum Market Makers**

Constant priced pools are also known as _constant sum market makers._ This is in reference to a trading function which is the sum of the two reserves multiplied by a constant price i.e., $$\psi(R_1, R_2) = R_1 + p R_2$$.

Here, ​$$p$$ is a constant price that the pool trades at regardless of the reserves.

For example if $$p=2$$ than we can exchange 2 ​of $$R_2$$for 4 of $$R_1$$as long as there is enough of $$R_1$$left to complete the trade i.e., $$R_2 \geq 4$$. We can see this is a viable trade because ​$$\psi(R_1, R_2) = R_1 + pR_2 = (R_1 - 4) + p(R_1 + 2)$$ and so the pool's "invariant" ​holds.
