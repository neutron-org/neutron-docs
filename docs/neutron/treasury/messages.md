# Messages

```rust
#[pausable]
pub enum ExecuteMsg {
    /// Transfer the contract's ownership to another account [permissioned - executable only by Main DAO]
    TransferOwnership(String),

    /// Distribute pending funds between Bank and Distribution accounts [permissionless]
    Distribute {},

    /// Update config [permissioned - executable only by Main DAO]
    UpdateConfig {
        distribution_rate: Option<Decimal>,
        min_period: Option<u64>,
        distribution_contract: Option<String>,
        reserve_contract: Option<String>,
        security_dao_address: Option<String>,
        vesting_denominator: Option<u128>,
    },

    /// Pause the contract for `duration` amount of blocks [permissioned - executable only by Main DAO or the Security DAO]
    Pause { duration: u64 },
    
    /// Unpauses the contract [permissioned - executable only by Main DAO]
    Unpause {},
}
```

## TransferOwnership 

Transfer the contract's ownership to another account. Can be executed by `main_dao_address` only.


## Distribute

Distribute pending funds between Bank and Distribution accounts. Can be executed by any address, but not more than `min_period` of heights between calls.

## UpdateConfig

Update treasury contract configuration. Permissioned, can be executed only by Main DAO.

```rust
UpdateConfig {
    /// Distribution rate [0; 1] which goes to distribution contract
    distribution_rate: Option<Decimal>,

    /// Minimum period between distribution calls in amount of blocks
    min_period: Option<u64>,

    /// Address of distribution contract which will receive funds defined by distribution_rate %
    distribution_contract: Option<String>,

    /// Address of reserve contract, which will receive funds defined by 100-distribution_rate %
    reserve_contract: Option<String>,

    /// Address of the security DAO contract
    security_dao_address: Option<String>,

    /// Denominator used in the vesting release function
    vesting_denominator: Option<u128>,
```

## Pause

Pause contract for `duration` amount of blocks.

## Unpause

Unpause paused contract
