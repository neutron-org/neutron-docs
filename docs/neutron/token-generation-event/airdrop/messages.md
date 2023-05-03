# Messages

## `Instantiate`

```json
{
  // Address of the Credits contract
  "credits_address": "neutron...",
  // Address of the Reserve contract
  "reserve_address": "neutron...",
  /// MerkleRoot is hex-encoded merkle root.
  "merkle_root": "deadbeef",
  /// A point in time from which it is possible to claim airdrops
  "airdrop_start": 100,
  /// A point in time from which a vesting is configured for cNTRNs. At this point, it is still
  /// possible for users to claim their airdrops.
  "vesting_start": 100,
  /// Total duration of vesting. At `vesting_start.seconds() + vesting_duration_seconds`
  /// point of time it is no longer possible to claim airdrops. At the very same point of time,
  /// it is possible to withdraw all remaining cNTRNs, exchange them for NTRNs and send to
  /// reserve, using `[ExecuteMsg::WithdrawAll]` message
  "vesting_duration_seconds": 100,
  // Total amount of tokens to be airdropped
  "total_amount": "10000",
  /// hrp is the bech32 parameter required for building external network address
  /// from signature message during claim action. example "cosmos", "terra", "juno"
  "hrp": "neutron"
}
```

## `Execute`

### `claim`

```json
{
  "claim": {
    // Amount to claim
    "amount": "1000",
    /// Proof is hex-encoded merkle proof.
    "proof": ["dead", "beef"]
  }
}
```

Claims airdropped tokens.

### `withdraw_all`

```json
{
  "withdraw_all": {}
}
```

Permissionless. Withdraws all remaining cNTRN tokens, burns them, receiving NTRN in exchange, and sends all received NTRN's to reserve.

### `pause`

```json
{
  "pause": {}
}
```

Sets the Airdrop contract on pause. Only the owner can call this method.

### `resume`

```json
{
  "unpause": {}
}
```

Unpauses the Airdrop contract. Only the owner can call this method.