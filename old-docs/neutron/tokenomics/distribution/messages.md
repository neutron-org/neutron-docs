# Messages

## InstantiateMsg

```rust
pub struct InstantiateMsg {
    /// Denom used for rewards distribution. All funds in any other denoms will be ignored.
    pub denom: String,
    /// The address of the Neutron DAO. It's capable of pausing and unpausing the contract
    pub main_dao_address: String,
    /// The address of the DAO guardian. The security DAO is capable only of pausing the contract.
    pub security_dao_address: String,
}
```

## ExecuteMsg

```rust
pub enum ExecuteMsg {
    /// Transfer the contract's ownership to another account [permissioned - executable only by Neutron DAO]
    TransferOwnership(String),
    /// Alter shareholder's weights [permissioned - executable only by Neutron DAO]
    SetShares {
        shares: Vec<(String, Uint128)>,
    },
    /// Send money to contract and distribute it between shareholders [permissionless]
    Fund {},
    /// Claim rewards if caller has any [permissionless, but only shareholders are able to withdraw rewards]
    Claim {},
    /// pause contract for specified duration [permissioned - executable only by Neutron DAO or Security DAO]
    Pause {
        duration: u64,
    },
    /// Unpause contract if paused [permissioned - executable only by Neutron DAO]
    Unpause {},
}
```
