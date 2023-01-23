# Queries

```rust
#[pausable_query]
pub enum QueryMsg {
    /// The contract's configurations; returns [`ConfigResponse`]
    Config {},
    Stats {},
}
```

## Config

Returns current treasure contract configuration. Return has a following schema:


```rust
pub struct Config {
    /// Distribution rate (0-1) which goes to distribution contract
    pub distribution_rate: Decimal,
    /// Address of distribution contract, which will receive funds defined but distribution_rate %
    pub distribution_contract: Addr,
    /// Address of reserve contract, which will receive funds defined by 100-distribution_rate %
    pub reserve_contract: Addr,
    /// Minimum period between distribution calls
    pub min_period: u64,

    /// Denom of the main coin
    pub denom: String,

    /// Address of the main DAO contract
    pub main_dao_address: Addr,

    /// Address of the security DAO contract
    pub security_dao_address: Addr,

    // Denomintator used int the vesting release function
    pub vesting_denominator: u128,
}
```

## Stats

Returns contract coins distrivution stats. Return has a following schema:

```rust
pub struct StatsResponse {
    /// Amount of coins distributed since contract instantiation
    pub total_distributed: Uint128,

    /// Amount of coins reserved since contract instantiation
    pub total_reserved: Uint128,

    /// Total amount of burned coins processed by treasury contract
    pub total_processed_burned_coins: Uint128,
}
```

## PauseInfo

Returns pause state info. Return has a following schema:

```rust
pub enum PauseInfoResponse {
    /// Contract is in paused state until `until_height` chain height
    Paused { until_height: u64 },

    /// Contract is not paused
    Unpaused {},
}

```
