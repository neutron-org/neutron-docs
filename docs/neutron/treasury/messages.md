# Messages

## MsgTransfer

```protobuf
#[pausable]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
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

## Messages 
`TransferOwnership(String)` - Transfer the contract's ownership to another account. Can be executed by `main_dao_address` only.

`Distribute {}` - Distribute pending funds between Bank and Distribution accounts. Can be executed by any address, but not more than `min_period` of heights between calls.

`UpdateConfig {distribution_rate, distribution_contract, reserve_contract, min_period, security_dao_address, vesting_denominator}` - Update treasury contract configuration. Can be executed by `main_dao_address` only.

## Types
### UpdateConfig
`distribution_rate` - Distribution rate (0-1) which goes to distribution contract;

`distribution_contract` - Address of distribution contract, which will receive funds defined but distribution_rate %;

`reserve_contract` - Address of reserve contract, which will receive funds defined by 100-distribution_rate %;

`min_period` - Minimum period between distribution calls;

`security_dao_address` - Address of the security DAO contract;

`vesting_denominator` - Denomintator used in the vesting release function.
