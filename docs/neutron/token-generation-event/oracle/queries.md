# Queries

This contract accepts the following query msgs:

```rust
pub enum QueryMsg {
    /// Multiplies a token amount (token that's present in the target pool for the TWAP) by the latest TWAP value for that token.
    Consult {}, // returns `AssetInfo, Uint256`

    /// Returns token TWAP value for given height.
    TWAPAtHeight {}, // returns `AssetInfo, Deciimal256`
}
```


## Consult
See [original documentation](https://docs.astroport.fi/docs/develop/smart-contracts/oracle#consult)

## TWAPAtHeight
Returns token TWAP value for given height.
```rust
#[returns(Vec<(AssetInfo, Decimal256)>)]
TWAPAtHeight {
/// The asset for which to compute a new TWAP value
    token: AssetInfo,
/// The amount of tokens for which to compute the token price
    height: Uint64,
}
```

 **token**: token for which we're getting its historical TWAP value.
**height**: height, on which we receive TWAP.

### returns

_Vec(AssetInfo, Decimal256)_

- [AssetInfo](https://docs.astroport.fi/docs/develop/smart-contracts/common-types#assetinfo)
- Decimal256: TWAP value for returned asset

