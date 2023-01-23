# Messages

```rust
pub enum ExecuteMsg {
    TransferOwnership(String),
    SetShares {
        shares: Vec<(String, Uint128)>,
    },
    Fund {},
    Claim {},
}
```

## TransferOwnership

Transfer the contract's ownership to another account. Can only be executed by owner.

## SetShares

Alter shareholder's weights. Can only be executed by owner.

## Fund

Send money to contract and distribute it between shareholders. Can be executed by anyone.

## Claim

Claim rewards if caller has any. Can be executed by anyone, but only shareholders are able
to withdraw rewards successfully.
