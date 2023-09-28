# Messages

## `Instantiate`

```json
{
  // Owner of the Auction contract
  "owner": "neutron...",
  // Address which is able to update info about LP assets for TGE
  "token_info_manager": "neutron...",
  // Address of Band Price Feed contract
  "price_feed_contract": "neutron...",
  // Address of the Lockdrop contract
  "lockdrop_contract_address": "neutron...",
  // Address of the Reserve contract
  "reserve_contract_address": "neutron...",
  // Address of the Vesting Contract for USDC/NTRN LP token
  "vesting_usdc_contract_address": "neutron...",
  // Address of the Vesting Contract for ATOM/NTRN LP token
  "vesting_atom_contract_address": "neutron...",
  // Lock window in seconds
  "lp_tokens_lock_window": 100,
  // Init timestamp of auction stage in seconds (unix time)
  "init_timestamp": 1234567890,
  // Deposit window in seconds
  "deposit_window": 100,
  // Withdrawal window in seconds
  "withdrawal_window": 100,
  // Min exchange freshness rate (seconds)
  "max_exchange_rate_age": 100,
  // Min NTRN amount to be distributed as pool liquidity
  "min_ntrn_amount": "100000",
  // Amount of users records which will be handled during on call of the migrate_to_vesting handler
  "vesting_migration_pack_size": 128,
  // Duration for which unlocked LP tokens will be vested in the corresponging contracts
  "vesting_lp_duration": 100
}
```

## `Execute`

### `update_config`

```json
{
  "update_config": {
    // New owner
    "owner": "neutron...",
    // New address of the Band Price Feed contract
    "price_feed_contract": "neutron...",
    // New address of the Lockdrop contract
    "lockdrop_contract_address": "neutron...",
    // New size of vesting migration pack
    "vesting_migration_pack_size": 111,
    "pool_info": {
      //  NTRN-USDC LP Pool address
      "ntrn_usdc_pool_address": "neutron...",
      //  NTRN-ATOM LP Pool address
      "ntrn_atom_pool_address": "neutron...",
      //  NTRN-USDC LP Token address
      "ntrn_usdc_lp_token_address": "neutron...",
      //  NTRN-ATOM LP Token address
      "ntrn_atom_lp_token_address": "neutron..."
    }
  }
}
```

Admin function to update any of the configuration parameters.

### `set_token_info`

```json
{
  "set_token_info": {
    // Denomination of axlrUSDC token transfered via IBC
    "usdc_denom": "neutron...",
    // Denomination of ATOM token transfered via IBC
    "atom_denom": "neutron...",
    "pool_info": {
      //  NTRN-USDC LP Pool address
      "ntrn_usdc_pool_address": "neutron...",
      //  NTRN-ATOM LP Pool address
      "ntrn_atom_pool_address": "neutron...",
      //  NTRN-USDC LP Token address
      "ntrn_usdc_lp_token_address": "neutron...",
      //  NTRN-ATOM LP Token address
      "ntrn_atom_lp_token_address": "neutron..."
    }
  }
}
```

Admin function to set info about `ATOM` and `axlrUSDC` token denominations and corresponding liquidity pools.

### `deposit`

```json
{
  "deposit": {}
}
```

Facilitates deposits of `ATOM` and `axlrUSDC` tokens by users.

### `withdraw`

```json
{
  "withdraw": {
    "amount_atom": "1000",
    "amount_usdc": "1000"
  }
}
```

Facilitates `ATOM` and `axlrUSDC` withdrawals by users. 100% amount can be withdrawn during deposit window, which is then limited to 50% during 1st half of deposit window which then decreases linearly during 2nd half of deposit window. Only 1 withdrawal can be made by a user during the withdrawal window.

### `init_pool`

```json
{
  "init_pool": {}
}
```

Admin function which facilitates Liquidity addition to the Astroport `NTRN-USDC`/`NTRN-ATOM` Pools.

### `set_pool_size`

```json
{
  "set_pool_size": {}
}
```

TODO

### `lock_lp`

```json
{
  "lock_lp": {
    // type of the pool (atom or usdc)
    "asset": "usdc",
    // locked amount
    "amount": "1000",
    // lock duraiton in seconds
    "duration": 100
  }
}
```

Locks tokens in the [Lockdrop contract](/neutron/token-generation-event/lockdrop/overview).

### `withdraw_lp`

```json
{
  "withdraw_lp": {
    // type of the pool (atom or usdc)
    "asset": "usdc",
    // withdraw amount
    "amount": "1000",
    // lock duraiton in seconds
    "duration": 100
  }
}
```

Withdraws locked LP tokens from the [Lockdrop contract](/neutron/token-generation-event/lockdrop/overview).

## `migrate_to_vesting`

```json
{
  "migrate_to_vesting": {}
}
```

Migrates unlocked LP tokens to the corresponding [Vesting LP Contract](/neutron/token-generation-event/vesting-lp/overview).