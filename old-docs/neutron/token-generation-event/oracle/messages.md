# Messages

## Instantiate

```json
{
  /// The factory contract address
  "factory_contract": "neutron...",
  /// Minimal interval between Update{}'s (in seconds)
  "period": 1000,
  /// Manager is the only one who can set pair info, if not set already
  "manager": "neutron..."
}
```

## Execute

### `update`

```json
{
  "update": {}
}
```

Updates the local TWAP value and the target pair's cumulative prices.

### `update_period`

```json
{
  "update_period": {
    "new_period": 100
  }
}
```

Manager only method. Updates minimal interval between `update` calls in the contract's configuration.

### `update_manager`

```json
{
  "update_manager": {
    "new_manager": "neutron..."
  }
}
```

Manager only method. Updates manager in the contract's configuration.

### `set_asset_infos`

```json
{
  "set_asset_infos": [
    {
      "token": {
        "contract_info": "neutron..."
      }
    },
    {
      "native_token": {
        "denom": "untrn"
      }
    }
  ]
}
```


Manager only method. Set asset infos that have a pool for which this contract provides price feeds.