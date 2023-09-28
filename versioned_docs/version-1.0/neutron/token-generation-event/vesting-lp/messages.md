# Messages

## InstantiateMsg

```json
{
  "owner": "neutron...",
  // Initial list of whitelisted vesting managers
  "vesting_managers": ["neutron...", "neutron..."],
  // Token info manager address
  "token_info_manager": "neutron...",
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

#### `register_vesting_accounts`

Creates vesting schedules for the LP token. Also, each schedule will unlock tokens at a different rate according to its time duration.

Execute this message by calling the LP token contract address.

```json
{
  "send": {
    "contract": <VestingContractAddress>,
    "amount": "999",
    "msg": "base64-encodedStringOfWithdrawMsg"
  }
}
```

In `send.msg`, you may encode this JSON string into base64 encoding.

```json
{
  "register_vesting_accounts": {
    "vesting_accounts": [
      {
        "address": "neutron...",
        "schedules": {
          "start_point": {
            "time": "1634125119000000000",
            "amount": "123"
          },
          "end_point": {
            "time": "1664125119000000000",
            "amount": "123"
          }
        }
      }
    ]
  }
}
```

### `claim`

Transfer vested tokens from all vesting schedules that have the same `VestingContractAddress` (address that's vesting tokens).

```json
{
  "claim": {
    "recipient": "neutron...",
    "amount": "123"
  }
}
```

### `withdraw_from_active_schedule`

Withdraw tokens from active vesting schedule.  
Withdraw is possible if there is only one active vesting schedule. Active schedule's remaining amount must be greater than withdraw amount.
This endpoint terminates current active schedule (updates end_point) and creates a new one with remaining amount minus withdrawn amount.

```json
{
  "withdraw_from_active_schedule": {
    "account": "neutron...",
    "recipient": "neutron...",
    "withdraw_amount": "123"
  }
}
```