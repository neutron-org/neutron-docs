# Messages

## InstantiateMsg

```json
{
  "owner": "neutron...",
  // Token info manager address
  "token_info_manager": "neutron...",
}
```

## ExecuteMsg

### `RegisterVestingAccounts`

Creates vesting schedules for the NTRN token. Also, each schedule will unlock tokens at a different rate according to its time duration.

```json
{
  "RegisterVestingAccounts": {
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