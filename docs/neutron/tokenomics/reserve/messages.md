# Messages

## InstantiateMsg
```rust
pub struct InstantiateMsg {
    /// Address of the Neutron DAO contract
    pub main_dao_address: String,

    /// Denom of the main coin
    pub denom: String,

    /// Distribution rate [0;1] which goes to distribution contract
    pub distribution_rate: Decimal,

    /// Minimum period between distribution calls
    pub min_period: u64,

    /// Address of distribution contract
    pub distribution_contract: String,

    /// Address of treasury contract
    pub treasury_contract: String,

    /// Address of security DAO contract
    pub security_dao_address: String,

    /// Vesting release function denominator
    pub vesting_denominator: u128,
}
```

## ExecuteMsg
```rust
#[pausable]
pub enum ExecuteMsg {
    /// Transfer the contract's ownership to another account [permissioned - executable only by Neutron DAO]
    TransferOwnership(String),

    /// Distribute pending funds between Bank and Distribution accounts [permissionless]
    Distribute {},

    /// Update config [permissioned - executable only by Neutron DAO]
    UpdateConfig {
        distribution_rate: Option<Decimal>,
        min_period: Option<u64>,
        distribution_contract: Option<String>,
        treasury_contract: Option<String>,
        security_dao_address: Option<String>,
        vesting_denominator: Option<u128>,
    },

    /// Pause the contract for `duration` amount of blocks [permissioned - executable only by Neutron DAO or the Security DAO]
    Pause { duration: u64 },
    
    /// Unpauses the contract [permissioned - executable only by Neutron DAO]
    Unpause {},
}
```

### TransferOwnership 

Transfer the contract's ownership to another account. Can be executed by `main_dao_address` only.


### Distribute

Distribute pending funds between Bank and Distribution accounts. Can be executed by any address, but not more than `min_period` of heights between calls.

### UpdateConfig

Update reserve contract configuration. Permissioned, can be executed only by [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao).

```rust
UpdateConfig {
    /// Distribution rate [0; 1] which goes to distribution contract
    distribution_rate: Option<Decimal>,

    /// Minimum period between distribution calls in amount of blocks
    min_period: Option<u64>,

    /// Address of distribution contract which will receive funds defined by distribution_rate %
    distribution_contract: Option<String>,

    /// Address of treasury contract, which will receive funds defined by 100-distribution_rate %
    treasury_contract: Option<String>,

    /// Address of the security DAO contract
    security_dao_address: Option<String>,

    /// Denominator used in the vesting release function
    vesting_denominator: Option<u128>,
```

### Pause

Pause contract for `duration` amount of blocks. Permissioned can be executed only by [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao) or the Security DAO. If contract is in paused state it disables `execute` method processing for any message except `Pause` and `Unpause`.

### Unpause

Unpause paused contract. Permissioned can be executed only by [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao).
