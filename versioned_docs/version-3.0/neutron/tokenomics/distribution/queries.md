# Queries

```rust
pub enum QueryMsg {
    /// The contract's configurations
    Config {},
    /// List of pending funds to addresses (to be distributed)
    Pending {},
    /// List of current shareholder weights
    Shares {},
    /// Returns pause state info - whether contract is paused and if it is, until when
    PauseInfo {},
}
```

## Config

Returns current config of contract. Config has a following schema:

```rust
pub struct Config {
    /// Denom used for rewards distribution. All funds in any other denoms will be ignored.
    pub denom: String,
    /// The address of the Neutron DAO. It's capable of pausing and unpausing the contract
    pub main_dao_address: Addr,
    /// The address of the DAO guardian. The security DAO is capable only of pausing the contract.
    pub security_dao_address: Addr,
}
```

## Pending

Returns an array of `(address, amount)` pairs of pending rewards to be distributed among all shareholders.

## Shares

Returns an array of `(address, weight)` pairs of shareholders' weights.

## PauseInfo

Returns enum describing whether contract is paused, and if it is, also returns the height until which it is paused:

```rust
pub enum PauseInfoResponse {
    Paused { until_height: u64 },
    Unpaused {},
}
```
