# Pool Reserves

`PoolReserves` are the fundamental building block for Neutron DEX’s AMM design. Each PoolReserve instance represents a single side of a liquidity pool. In addition to the `PairID`, `TokenIn` and `TickIndex` fields, Pools Reserves also have a `Reserves` and `Fee` field.

```protobuf
type PoolReserves struct {
	PairID    *PairID
	TokenIn   string 
	TickIndex int64 
	Reserves  sdk.Int
	Fee       uint64
}

```

`Reserves` is used to store the total amount of `TokenIn` within a given PoolReserves instance and `Fee` is the portion of the trading price that will be return to the pool.

In the context of LP liquidity, PoolReserves exist in reciprocal pairs with one side (the LowerTick) holding Token0 and the other side (the UpperTick) holding token1. Each of these pairs makes up a single constant price liquidity pool. Within each liquidity pool the following two invariants will always hold true:&#x20;

1. Both PoolsReserves within a pair will have the same fee: $$LowerTick.Fee == UpperTick.Fee$$&#x20;
2. The distance between the tick indexes will be equal to 2x the fee:  $$LowerTick.TickIndex + 2 * fee = UppertickTick.TickIndex$$

When swaps occur the tokens will always be added and deducted within a single liqudity pool.&#x20;

When LP liquidity is deposited with a given fee and price it is added to the TickLiquidity instances such that the given fee is already included in the price. For example, if Alice deposits 100 TokenA  and 100TokenB at price 0 (tick 0) with a fee of 1 then her liquidity will be held in tick -1 and tick 1 respectively. If Bob were to swap 50TokenA for TokenB using Alice’s liquidity his exchange rate would be \~ .999. His 50 TokenA would be deposited into tick -1 and he would receive 49 TokenB which would be deducted from tick 1.&#x20;



It is important to note that multiple PoolReserve ticks can exist with the same TickIndex but each one will have a unique fee.&#x20;

\
