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

> **Note:** uploading and instantiation was already done before the chain start.

## ExecuteMsg

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

    /// Pause the contract for `duration` amount of blocks [permissioned - executable only by Main DAO or the Security SubDAO]
    Pause { duration: u64 },

    /// Unpause the contract [permissioned - executable only by the Main DAO]
    Unpause {},
}
```

### TransferOwnership

Transfer the contract's ownership to another account. Can be executed by `main_dao_address` only.
This method accepts a single string, which should be an account address of new contract owner.

### Payout

Send specified `amount` of funds to the `recipient` address. Can be executed by `main_dao_address` only.
Reserve contract only operates on `denom` set during instantiation, and will only pay out funds in this denom.

### Pause

Pause the contract for `duration` amount of blocks. Can be executed only by `main_dao_address` or `security_dao_address`.

### Unpause

Unpause the contract. Can be executed by `main_dao_address_only`.
