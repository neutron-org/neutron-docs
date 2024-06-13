# Ticks

Ticks are the fundamental unit of accounting within the dex. Each tick is an integer between 352437 and -352437. All tradeable liquidity, in the form of either \`PoolReserves\` or \`LimitOrderTranche\`s is stored at a specific tick.  The price of liquidity being stored at tick is determined by the function:

$$
p(i) = 1.0001^{i}
$$

Some examples:

* Price of tick $$0:$$ $$p(0) = 1.0001^0 = 1$$
* Price of tick $$1$$: $$p(-4000) = 1.0001^{4000} \approx 1.4917$$​
* Price of tick 2: ​$$p(-4000) = 1.0001^{-4000} \approx 0.6703$$


More specifically price refers to the rate at which Token1 can be converted to Token0. Logically, the converse rate for converting Token0 to Token1 can be expressed as:

$$
price0To1(i) =  1/1.0001^{i}
$$
