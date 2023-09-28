# Queries

## `config`

```json
{
  "config": {}
}
```

Returns the config info

## `state`

```json
{
  "state": {}
}
```

Returns the contract's global state.

## `pool`

```json
{
  "pool": {
    "pool_type": "usdc"
  }
}
```

Returns info regarding a certain supported LP token pool.

## `user_info`

```json
{
  "user_info": {
    "address": "neutron...."
  }
}
```

Returns info regarding a user.

## `user_info_with_lockup_list`

```json
{
  "user_info_with_lockup_list": {
    "address": "neutron..."
  }
}
```

Returns a full info regarding a user (total `NTRN` rewards, list of lockup positions).

## `lockup_info`

```json
{
  "lockup_info": {
    "user_address": "neutron...",
    "pool_type": "usdc",
    "duration": 100,
  }
}
```

Returns info regarding a particular lockup position with a given duration and identifier for the LP tokens locked.

## `query_user_lockup_total_at_height`

```json
{
  "query_user_lockup_total_at_height": {
    "pool_type": "usdc",
    "user_address": "neutron...",
    "height": 100
  }
}
```

Returns info regarding a particular lockup position with a given duration and identifier for the LP tokens locked for a given height.

## `query_lockup_total_at_height`

```json
{
  "query_lockup_total_at_height": { 
    "pool_type": "usdc", 
    "height": 100
  }
}
```

Returns total locked LP tokens amount for a given pool type and height.