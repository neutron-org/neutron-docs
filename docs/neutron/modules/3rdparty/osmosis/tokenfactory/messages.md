# Messages

### CreateDenom
- Creates a denom of `factory/{creator address}/{subdenom}` given the denom creator address and the subdenom. Subdenoms can contain `[a-zA-Z0-9./]`.
``` {.go}
message MsgCreateDenom {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  string subdenom = 2 [ (gogoproto.moretags) = "yaml:\"subdenom\"" ];
}
```

**State Modifications:**
- Fund community pool with the denom creation fee from the creator address, set in `Params`
- Set `DenomMetaData` via bank keeper
- Set `AuthorityMetadata` for the given denom to store the admin for the created denom `factory/{creator address}/{subdenom}`. Admin is automatically set as the Msg sender
- Add denom to the `CreatorPrefixStore`, where a state of denoms created per creator is kept

### Mint
- Minting of a specific denom is only allowed for the creator of the denom registered during `CreateDenom`
``` {.go}
message MsgMint {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.moretags) = "yaml:\"amount\"",
    (gogoproto.nullable) = false
  ];
}
```

**State Modifications:**
- Safety check the following
  - Check that the denom minting is created via `tokenfactory` module
  - Check that the sender of the message is the admin of the denom
- Mint designated amount of tokens for the denom via `bank` module



### Burn
- Burning of a specific denom is only allowed for the creator of the denom registered during `CreateDenom`
``` {.go}
message MsgBurn {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.moretags) = "yaml:\"amount\"",
    (gogoproto.nullable) = false
  ];
}
```

**State Modifications:**
- Saftey check the following
  - Check that the denom minting is created via `tokenfactory` module
  - Check that the sender of the message is the admin of the denom
- Burn designated amount of tokens for the denom via `bank` module