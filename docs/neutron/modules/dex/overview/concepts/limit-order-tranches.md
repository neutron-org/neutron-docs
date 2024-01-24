# Limit Order Tranches

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
