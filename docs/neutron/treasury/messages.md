# Messages

```rust
#[pausable]
pub enum ExecuteMsg {
    /// Transfer the contract's ownership to another account
    TransferOwnership(String),

    /// Distribute pending funds between Bank and Distribution accounts
    Distribute {},

    /// Update config
    UpdateConfig {
        distribution_rate: Option<Decimal>,
        min_period: Option<u64>,
        distribution_contract: Option<String>,
        reserve_contract: Option<String>,
        security_dao_address: Option<String>,
        vesting_denominator: Option<u128>,
    },
}
```

## TransferOwnership 

Transfer the contract's ownership to another account. Can be executed by `main_dao_address` only.


## Distribute
Distribute pending funds between Bank and Distribution accounts. Can be executed by any address, but not more than `min_period` of heights between calls.

## UpdateConfig

Update treasury contract configuration. Can be executed by `main_dao_address` only.

```rust
UpdateConfig {
    /// Distribution rate (0-1) which goes to distribution contract
    distribution_rate: Option<Decimal>,

    /// Minimum period between distribution calls in chain "heights"
    min_period: Option<u64>,

    /// Address of distribution contract, which will receive funds defined but distribution_rate %
    distribution_contract: Option<String>,

    /// Address of reserve contract, which will receive funds defined by 100-distribution_rate %
    reserve_contract: Option<String>,

    /// Address of the security DAO contract
    security_dao_address: Option<String>,

    /// Denomintator used in the vesting release function
    vesting_denominator: Option<u128>,
```

## Pause

Pause contract for `duration` period of heights

## Unpause

Unpause paused contract
