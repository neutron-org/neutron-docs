# Ticks

Ticks are the fundamental unit of accounting within the dex. Each tick is an integer between 559,680 and -559,680. All tradeable liquidity, in the form of either `PoolReserves` or `LimitOrderTranche`s is stored at a specific tick. Price for liquidity held at a tick is stored in the form of `PriceMakerToTaker` -- the rate at which the `MakerDenom` (the liquidity stored at the tick) can be coverted to the `TakerDenom`. The `PriceMakerToTaker` of liquidity being stored at tick `i` is determined by the function:


$$
p(i) = 1.0001^{-i}
$$

Some examples:

* Price of tick 0: $$p(0) = 1.0001^0 = 1$$
* Price of tick 1: $$p(1) = 1.0001^{-1} \approx 0.9999$$
* Price of tick -1: $$p(-1) = 1.0001^{1} = ​1.0001$$
* Price of tick 4000: ​$$p(4000) = 1.0001^{-4000} \approx ​0.6703$$
* Price of tick -4000: ​$$p(-4000) = 1.0001^{4000} \approx 1.4918$$


In this way, liquidity held at a tick can also be thought of as an offer to buy the opposing a token in the pair at a rate of `PriceMakeToTaker` `MakerDenom`s per `TakerDenom`.

Conversely, price can also be thought of as the price of the `MakerDenom` as denominated in the `TakerDenom`, or the sell price for the `MakerDenom`. This would be expressed as follows:

$$
price(i) =  1/1.0001^{i}
$$

Both versions yeild the same result.

Given an intent to deposit `ATOM` and `USDC` into a pool (assuming no fee) with the Price of `ATOM` set at 10 `USDC`per`ATOM` and implying a reciprocal `USDC` price of 0.1 `ATOM`per`USDC`, the best tick index to deposit to will be `+/-23027` given that the target price is 10. (1 `ATOM` yields 10 `USDC`)


`USDC` liquidity will be placed at tick `-23027`, which implies a price of $$1.0001^{+23027}$$ = 10

`ATOM` liquidity  will be placed at tick `+23027`, which implies a price of $$1.0001^{-23027}$$ = 0.1


A good way to think about price in this context is how much of `MakerDenom` Alice would receive if she swapped a single `TakerDenom` and vice versa. In this case, she would receive 10 `USDC` given an input of 1 `ATOM`, and 0.1 `ATOM` given an input of 1 `USDC`.

From this, the simple price heuristic is _How much output given unit input_.

swapping 100 USDC for Atom: $$100\cdot PriceMakerToTaker(ATOM) = 100*0.1 = 10 ATOM$$

swapping 100 Atom for USDC: $$100\cdot PriceMakerToTaker(USDC) = 100*10  = 1000 USDC$$
