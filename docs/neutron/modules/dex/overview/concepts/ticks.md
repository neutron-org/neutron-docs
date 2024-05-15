# Ticks

Ticks are the fundamental unit of accounting within the dex. Each tick is an integer between 352437 and -352437. All tradeable liquidity, in the form of either `PoolReserves` or `LimitOrderTranche`s is stored at a specific tick. The price of liquidity being stored at tick `i` is determined by the function:


$$
p(i) = 1.0001^{-i}
$$

Some examples:

* Price of tick $$0:$$: $$p(0) = 1.0001^0 = 1$$
* Price of tick $$1$$: $$p(1) = 1.0001^{-1} \approx 0.9999$$
* Price of tick $$-1$$: $$p(-1) = 1.0001^{1} = ​1.0001$$
* Price of tick 4000: ​$$p(4000) = 1.0001^{-4000} \approx ​0.6703$$
* Price of tick -4000: ​$$p(-4000) = 1.0001^{4000} \approx 1.4918$$


More specifically price refers to the rate at which `Token0` can be converted to `Token1`. Logically, the converse rate for converting Token0 to Token1 can be expressed as:

$$
price0To1(i) =  1/1.0001^{i}
$$


Given an intent to deposit `ATOM(token0)` and `USDC(token1)` into a pool (assuming no fee) with the Price of `ATOM` set at 10 `USDC`per`ATOM` and implying a reciprocal `USDC` price of 0.1 `ATOM`per`USDC`, the best tick index to deposit to will be `-23027` given that the target price is 10. (1 `ATOM` yields 10 `USDC`)

`USDC` liquidity, if provided, will be placed at tick `-23027`, which implies a price of $$1/1.0001^{+23027}$$ = 10

`ATOM` liquidity, if provided, will be placed at tick `+23027`, which implies a price of $$1/1.0001^{-23027}$$ = 0.1

A good way to think about price in this context is how much of `Token0` Alice would receive if she swapped a single `Token1` and vice versa. In this case, she would receive 10 `USDC` given an input of 1 `ATOM`, and 0.1 `ATOM` given an input of 1 `USDC`

From this, the simple price heuristic is `How much Output given unit Input`.

swapping 100 USDC for Atom: $$100*(ATOM_Price) = 100*0.1 = 10$$ `ATOM`

swapping 100 Atom for USDC: $$100*(USDC_Price) = 100*10  = 1000$$ `USDC`