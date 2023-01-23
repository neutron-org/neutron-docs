# State

```rust
#[pausable_query]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    /// The contract's configurations; returns [`ConfigResponse`]
    Config {},
    Stats {},
}
```

## Queries

`Config{}` - Returns current treasure contract configuration. Return type is `Config{distribution_rate, distribution_contract, reserve_contract, min_period, denom, main_dao_address, security_dao_address, vesting_denominator}`.

`Stats{}` - Returns contract coins distrivution stats. Return type is `StatsResponse(total_distributed, total_reserved, total_processed_burned_coins)`.

`PauseInfo{}` - Return pause state info. Return type is `PauseInfoResponse{ Paused { until_height: u64 }, Unpaused {} }`.

## Return types

### Config
`distribution_rate` - Distribution rate (0-1) which goes to distribution contract;

`distribution_contract` - Address of distribution contract, which will receive funds defined but distribution_rate %;

`reserve_contract` - Address of reserve contract, which will receive funds defined by 100-distribution_rate %;

`min_period` - Minimum period between distribution calls;

`denom` - Denom of the main coin;

`main_dao_address` - Address of the main DAO contract;

`security_dao_address` - Address of the security DAO contract;

`vesting_denominator` - Denomintator used in the vesting release function.


### StatsResponse
`total_distributed` - Amount of coins distributed since contract instantiation;

`total_reserved` - Amount of coins reserved since contract instantiation;

`total_processed_burned_coins` - Total amount of burned coins processed by treasury contract

### PauseInfoResponse
Enum containig pause state of the contract

`Paused { until_height: u64 }` - Contract is in paused state until `until_height` chain height.

`Unpaused {}` - Contract is not paused.
