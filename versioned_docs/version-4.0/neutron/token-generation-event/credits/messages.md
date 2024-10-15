# Messages

## InstantiateMsg

```rust
pub struct InstantiateMsg {
    /// Airdrop contract address
    pub airdrop_address: String,
    /// Lockdrop contract address,
    pub lockdrop_address: String,
    /// When can start withdrawing untrn tokens
    pub when_withdrawable: Timestamp,
}

```

## ExecuteMsg

```rust
pub enum ExecuteMsg {
    /// AddVesting is a message that allows address to claim particular amount of untrn tokens at particular time.
    /// Can only store one vesting amount per address.
    /// [Permissioned - Airdrop address]
    AddVesting {
        address: String,
        amount: Uint128,
        start_time: u64,
        duration: u64,
    },
    /// Transfer is a base message to move tokens to another account without triggering actions.
    /// [Permissioned - Airdrop address]
    Transfer { recipient: String, amount: Uint128 },
    /// Withdraw is a message that burns all vested cNTRN tokens
    /// on the sender and sends untrn tokens in 1:1 proportion.
    /// [Permissionless]
    Withdraw {},
    /// Burns is a message that burns certain amount of cNTRN tokens and sends untrn tokens in 1:1 proportion.
    /// [Permissioned - Airdrop address]
    Burn { amount: Uint128 },
    /// BurnFrom burns owner's cNTRN tokens and mints untrn tokens in 1:1 proportion specified amount for owner.
    /// Used to skip vesting as a reward for participating in the lockdrop.
    /// [Permissioned - Lockdrop address]
    BurnFrom { owner: String, amount: Uint128 },
    /// Locks untrn tokens and mints cNTRN tokens in 1:1 proportion to the airdrop balance.
    /// [Permissioned - DAO] (DAO address set in initialize func as cw20 minter)
    Mint {},
}
```
