# Overview

The Dex (decentralized exchange) module contains the central business logic of Neutron DEX. Users may interact with this module to provide liquidity and execute trades according to commonly-accepted exchange semantics.

The Neutron DEX, at its core, is a novel AMM design. We are also building a set of features around the AMM in order to enable powerful and sustainable financial markets. At the core of the AMM lays an incredibly simple swap mechanic: liquidity pools that allow traders to buy or sell tokens at a constant price.

Constant-price pools enable a new level of simplicity, flexibility, and capital efficiency which benefits liquidity providers and traders alike. Reasoning about external use cases and core features becomes much easier, leading to an enhanced, simplified user experience.

## Dictionary


**Concentrated Liquidity**: AMMs which allow LPs to choose targeted ranges to provide liquidity to and typically more capital efficient as a result.

**Capital Efficiency**: The ability of an AMM to give traders better prices on the same amount liquidity.

**Liquidity Pools**: Holds liquidity, price and fee data that tells users how they can interact with it (i.e., how much they'll get in output on some input). Allows liquidity providers to pool their liquidity together instead of fragmenting it.

**Liquidity Fragmentation**: When liquidity of the same pairs is spread across numerous exchanges or AMMs. This increases the costs of trying to get the best price on a trade.

**Ticks**: Integers that map to data about the liquidity that can be traded at. The price for tick $$i$$ is $$p(i) = 1.0001^{i}$$.

**Fees**: The way LPs charge traders in order to make returns. It is similar to a bid-ask spread on orderbooks.

**Bid-ask Spread**: The difference between the highest buy price (bid) and lowest sell price (ask).

**Market Order**: An order to buy/sell some amount of token at the best available price.

**Limit Order**: An order to buy/sell some amount token at a set price determined by the placer of the order.

## **Flexible**

Neutron DEX is the one-stop shop for any payoff or trading style.

**Traders** can choose between market orders and limit orders.

**Liquidity providers** can replicate _any feasible AMM curve_ (liquidity distribution) by strategically choosing prices and the distribution of liquidity across them.

While two liquidity providers on Neutron DEX may prefer completely different liquidity distributions, they will still use the same underlying pools. The only difference is the amount deposited in each pool. We call this feature _shared liquidity_ because it has numerous advantages, such as reducing liquidity fragmentation and increasing the cost of price manipulation for traders and liquidity providers.

## **Better Prices**

Neutron DEX’s mechanism design is extremely **capital efficient** since liquidity providers can arbitrarily concentrate their liquidity on a single price. If there is enough liquidity at the peg price, traders can benefit from true zero-slippage swaps on stablecoins and highly correlated assets (e.g., staked:non-staked pools).


## App-Specific Infrastructure

Computer scientist Alan Kay famously said that those who are serious about software build their own hardware. We believe that people who are serious about exchanges own their whole stack.

App-chains (and soon app-rollups) open up a rich design space of unexplored possibilities that can solve some of DeFi’s most urgent problems.

1. MEV protections can be implemented at the consensus level and/or expressed through more complex application logic, which is not reasonable on generalized smart contracting chains.
2. Expensive transactions fees and network congestion become less of an issue with app-specific infrastructure.
3. New incentive schemes based on order flow and fee markets can put an end to DeFi’s unsustainable token emissions models.

Neutron DEX strives to be a hub of innovation for pushing the boundaries of what is possible with app-specific infrastructure.
