# Fees

_Disclaimer: Liquidity providing into all AMMs is risky and requires due dilligence. While we explain how fees can hypothetically be used to make money, we reccommend that you do your own research before making decisions on how to choose fees and whether to liquidity provide._

Fees are used by liquidity providers to make money from trades using their liquidity. Every time a trade is made, the fee charges traders a slight premium for using the liquidity.

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
