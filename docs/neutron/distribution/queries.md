# Queries

```rust
pub enum QueryMsg {
    Config {},
    Pending {},
    Shares {},
}
```

## Config

Returns current config of contract. Config has a following schema:

```rust
pub struct Config {
    /// Denom used for rewards distribution. All funds in any other denoms will be ignored.
    pub denom: String,
    /// The address of the main DAO. It's capable of pausing and unpausing the contract
    pub main_dao_address: Addr,
    /// The address of the DAO guardian. The security DAO is capable only of pausing the contract.
    pub security_dao_address: Addr,
}
```

## Pending

Returns an array of `(address, amount)` pairs of pending rewards to be distributed among all shareholders.

## Shares

Returns an array of `(address, weight)` pairs of shareholders' weights.
