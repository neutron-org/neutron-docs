# Queries

All query messages are described below. A custom struct is defined for each query response.

### `config`

Returns the configuration for the contract.

```json
{
  "config": {}
}
```

### `vesting_account`

Returns all vesting schedules with their details for a specific vesting recipient.

```json
{
  "vesting_account": {
    "address": "neutron..."
  }
}
```

### `vesting_accounts`

Returns a paginated list of vesting schedules in chronological order. Given fields are optional.

```json
{
  "vesting_accounts": {
    "start_after": "neutron...",
    "limit": 10,
    "order_by": {
      "desc": {}
    }
  }
}
```

### `available amount`

Returns the claimable amount (vested but not yet claimed) of LP tokens that a vesting target can claim.

```json
{
  "available_amount": {
    "address": "neutron..."
  }
}
```