# Messages

## Instantiate

Instantiated with this message:

```rust
pub struct InstantiateMsg {
    /// Denom in which Reserve will hold it's funds.
    pub denom: String,

    /// The address of the main DAO. It's capable of pausing and unpausing the contract.
    pub main_dao_address: String,

    /// The address of the DAO guardian. The security DAO is capable only of pausing the contract.
    pub security_dao_address: String,
}
```

> Note that uploading and instantiation was already done before the chain start.

## Messages

Contract takes following messages:

```rust
pub enum ExecuteMsg {
    /// Transfer the contract's ownership to another account [permissioned - executable only by Main DAO]
    TransferOwnership(String),

    /// Payout specified `amount` of funds to the `recipient` address [permissioned - executable only by Main DAO]
    Payout {
        amount: Uint128,
        recipient: String,
    },

    /// Pause the contract for `duration` amount of blocks [permissioned - executable only by Main DAO or the Security DAO]
    Pause { duration: u64 },

    /// Unpause the contract [permissioned - executable only by the Main DAO]
    Unpause {},
}
```
