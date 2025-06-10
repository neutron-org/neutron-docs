# Queries

```rust
pub enum QueryMsg {
    /// Returns the current vestings of the given address.
    WithdrawableAmount { address: String },
    /// Returns the amount that is left vested of the given address.
    VestedAmount { address: String },
    /// Returns the current allocation of the given address.
    Allocation { address: String },
    /// Returns the current balance of the given address, 0 if unset.
    Balance { address: String },
    /// Returns the total supply at provided height, or current total supply if `height` is unset.
    TotalSupplyAtHeight { height: Option<u64> },
    /// Returns the balance of the given address at a given block height or current balance if `height` is unset.
    /// Returns 0 if no balance found.
    BalanceAtHeight {
        address: String,
        height: Option<u64>,
    },
    /// Returns metadata on the contract - name, decimals, supply, etc.
    TokenInfo {},
    /// Returns who can mint and the hard cap on maximum tokens after minting.
    Minter {},
    /// Returns how much spender can use from owner account, 0 if unset.
    Allowance { owner: String, spender: String },
    /// Returns all allowances this owner has approved. Supports pagination.
    AllAllowances {
        owner: String,
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// Returns all accounts that have balances. Supports pagination.
    AllAccounts {
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// Returns current config of Credits contract
    Config {},
}
```