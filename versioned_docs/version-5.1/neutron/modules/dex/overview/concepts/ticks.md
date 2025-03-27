# Ticks

Ticks are the fundamental unit of accounting within the dex. Each tick is an integer between 559,680 and -559,680. All tradeable liquidity, in the form of either `PoolReserves` or `LimitOrderTranche`s is stored at a specific tick. Price for liquidity held at a tick is stored in the form of `MakerPrice` -- the price at which the `MakerDenom` is being sold denominated in terms of the `TakerDenom`. The `MakerPrice` of liquidity being stored at tick `i` is determined by the function:


$$
p(i) = 1.0001^{i}
$$

Some examples:

* Price of tick 0: $$p(0) = 1.0001^0 = 1$$
* Price of tick 1: $$p(1) = 1.0001^{1} = 1.0001$$
* Price of tick -1: $$p(-1) = 1.0001^{-1} = \approx 0.9999$$
* Price of tick 4000: ​$$p(4000) = 1.0001^{4000} \approx 1.4918$$
* Price of tick -4000: ​$$p(-4000) = 1.0001^{-4000} \approx ​0.6703$$


`MakerPrice` can also be seen as the rate for converting `MakerDenom` to `TakerDenom`:

$$MakerDenom \cdot MakerPrice == TakerDenom$$.

Conversely, we can convert `TakerDenom` to `MakerDenom` as follows:

$$\frac{TakerDenom}{MakerPrice} == MakerDenom$$.


Given an intent to deposit `ATOM` and `USDC` into a pool (assuming no fee) with the Price of `ATOM` set at 10 `USDC`per`ATOM` and implying a reciprocal `USDC` price of 0.1 `ATOM`per`USDC`, the best tick index to deposit to will be `+/-23027` given that the target price is 10. (we are selling 1 `ATOM` for 10 `USDC`)


`USDC` liquidity will be placed at tick `-23027`, which implies a price of $$1.0001^{-23027}$$ = 0.1ATOM

`ATOM` liquidity  will be placed at tick `+23027`, which implies a price of $$1.0001^{23027}$$ = 10USDC


A good way to think about price in this context is how much of `TakerDenom` Alice would receive if she sold a single `MakerDenom` and vice versa. In this case, she would receive 10 `USDC` given an input of 1 `ATOM`, and 0.1 `ATOM` given an input of 1 `USDC`.

From this, the simple price heuristic is _How much output given unit input_.

swapping 100 USDC for Atom: $$100\cdot MakerPrice(USDC) = 100*0.1 = 10 ATOM$$

swapping 100 Atom for USDC: $$100\cdot MakerPrice(ATOM) = 100*10  = 1000 USDC$$
