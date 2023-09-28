# Messages

## InstantiateMsg

```json
{
    // Account which can update config
    "owner": "neutron...",
    // Account which can update token addresses and generator
    "token_info_manager": "neutron...",
    // Credits contract address
    "credits_contract": "neutron...",
    // Auction contract address
    "auction_contract": "neutron...",
    // Timestamp when Contract will start accepting LP Token deposits
    "init_timestamp": 1234567890,
    // Number of seconds during which lockup deposits will be accepted
    "lock_window": 10000,
    // Withdrawal Window Length :: Post the deposit window
    "withdrawal_window": 1000,
    // Min. no. of weeks allowed for lockup
    "min_lock_duration": 1000,
    // Max. no. of weeks allowed for lockup
    "max_lock_duration": 1000,
    // Max lockup positions a user can have
    "max_positions_per_user": 100,
    // Describes rewards coefficients for each lockup duration
    "lockup_rewards_info": [
      {
        "duration": 10000,
        "coefficient": "0.5"
      },
      {
        "duration": 20000,
        "coefficient": "1"
      }
    ]
}
```

## ExecuteMsg

### `receive`

CW20 receive msg.

```json
{
  "receive": {
    "sender": "neutron...",
    "amount": "123",
    "msg": "<base64_encoded_json_string>"
  }
}
```

#### `initialize_pool`

```json
{
  "initialize_pool": {
      // pool type: "usdc" or "atom"
      "pool_type": "usdc",
      // incentives for this concrete pool
      "incentives_share": "10000"
  }
}
```

Initializes necessary structs and info for a specific LP pool in the Lockdrop contract. Can be called only by the [Auction contract](/neutron/token-generation-event/auction/overview).
Execute this message by calling the LP token contract address of the corresponding pool.

### `increase_lockup_for`

```json
{
  "increase_lockup_for": {
      "user_address": "neutron...",
      "pool_type": "usdc",
      "amount": "10000",
      "duration": 100
  }
}
```

Facilitates opening a new user position or adding to an existing position.

### `increase_ntrn_incentives`

```json
{
  "increase_ntrn_incentives": {}
}
```

Admin function to increase the `NTRN` incentives that are to be distributed.

### `update_config`

```json
{
  "update_config": {
    // Bootstrap Auction contract address
    "auction_contract_address": "neutron....",
    // Generator (Staking for dual rewards) contract address
    "generator_address": "neutron...",
  }
}
```

Can only be called by the admin. Facilitates updating configuration parameters.

### `set_token_info`

```json
{
  "set_token_info": {
    // Address of LP token of ATOM/NTRN pool
    "atom_token": "neutron...",
    // Address of LP token of USDC/NTRN pool
    "usdc_token": "neutron...",
    // Address of generator contract
    "generator": "neutron..."
  }
}
```

Sets info about `ATOM/NTRN`, `USDC/NTRN` LP tokens and a Generator contract.

### `withdraw_from_lockup`

```json
{
  "withdraw_from_lockup": {
    "user_address": "neutron...",
    "pool_type": "usdc",
    "duration": 111,
    "amount": "1000"
  }
}
```

Facilitates LP token withdrawals from lockup positions by users. 100% amount can be withdrawn during deposit window, which is then limited to 50% during 1st half of deposit window which then decreases linearly during 2nd half of deposit window. Only 1 withdrawal can be made by a user during the withdrawal windows.

### `claim_rewards_and_optionally_unlock`

```json
{
  "claim_rewards_and_optionally_unlock": {
    "pool_type": "usdc",
    "duration": 100,
    "withdraw_lp_stake": true
  }
}
```

Facilitates rewards claim by users for a particular lockup position along with unlock when possible.

### `propose_new_owner`

```json
{ "propose_new_owner": {
        // Newly proposed contract owner
        "owner": "neutron...",
        // The date after which this proposal expires
        "expires_in": 1111
    }
}
```

Admin function. Creates an offer to change the contract ownership. The validity period of the offer is set in the expires_in variable. After expires_in seconds pass, the proposal expires and cannot be accepted anymore.

### `drop_ownership_proposal`

```json
{
  "drop_ownership_proposal": {}
}
```

Admin function. Removes an existing offer to change the contract owner.

### `claim_ownership`

```json
{
  "claim_ownership": {}
}
```

Admin function. Used to claim contract ownership.

### `callback`

#### `update_pool_on_dual_rewards_claim`

```json
{
  "update_pool_on_dual_rewards_claim": 
  {
      "pool_type": "usdc",
      "prev_ntrn_balance": "1000",
      "prev_proxy_reward_balances": []
  }
}
```

Callback function to update contract state after pending dual staking rewards are claimed from the generator contract.

#### `withdraw_user_lockup_rewards_callback`

```json
{
  "withdraw_user_lockup_rewards_callback": {
    "pool_type": "usdc",
    "user_address": "neutron...",
    "duration": 100,
    "withdraw_lp_stake": true
  }
}
```

Callback function to withdraw user rewards for a particular lockup position along with optional LP tokens withdrawal (upon lockup duration expiration).