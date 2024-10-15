# AMMs and Orderbooks

**AMMs**

AMMs were the first time that capital markets were created on-chain, in a computationally efficient manner. This was a transformative innovation. However, these AMMs were extremely capital inefficient, meaning that a significant amount of the liquidity deposited in them was not used. This led to extremely high price impact (aka slippage) for traders.

Recently, AMMs have introduced concentrated liquidity to increase their capital efficiency. This enabled liquidity providers to decide at what prices they wanted their liquidity to be used as, and gave liquidity providers better prices. These concentrated liquidity paradigms are often implemented in complicated manners, and still don't reach the full capital efficiency of orderbooks.


**Orderbooks**

Orderbooks are the dominant trading mechanism of traditional finance, and involve a set of limit orders that can be filled by other traders and market makers. They are extremely capital efficient: limit orders, by definition, have zero price impact for traders. While they offer a familiar UX and capital efficient trading experience, they are extremely computationally inefficient to implement on-chain, and don't offer the same liveness and composability properties that make AMMs a core DeFi primitive.

![A summary of the pros and cons of AMMs and orderbooks](/img/Dual_Chart_bg.png)

**Neutron DEX**

Neutron DEX's mechanism combines the best of AMMs and orderbooks. It is a series of constant-priced pools where LPs can deposit their capital. For example, an LP can deposit capital at the 1.000:1.000 price on a DAI/USDC pair.

This simple design has significant consequences. Neutron DEX can reach order-book levels of capital efficiency (zero price impact on trades, swaps, and limit orders) while still maintaining the computational efficiency and liveness properties of AMMs.

**A Quick Note on Fees and Value Accrual**

Concentrated liquidity and orderbooks differ slightly in how liquidity providers accrue value. On concentrated liquidity AMMs, liquidity providers accrue value through a [fee](docs/neutron/modules/dex/overview/concepts/fees.md) that they choose when placing the liquidity. The fee is a predetermined premium that traders pay when using the liquidity to swap between two assets.

Orderbook liquidity providers accrue value through maintaining a bid-ask spread, which entails them offering to sell assets slightly above the current price and buy them slightly below the current price. It turns out that these two mechanism are actually very similar in that they describe the difference in prices between the best sell and buy prices.
