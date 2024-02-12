# Messages

### CreateDenom
Creates a denom of `factory/{creator address}/{subdenom}` given the denom creator address and the subdenom. Subdenoms can contain `[a-zA-Z0-9./]`.
``` {.go}
message MsgCreateDenom {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  string subdenom = 2 [ (gogoproto.moretags) = "yaml:\"subdenom\"" ];
}
```

**State Modifications:**
- Fund [Neutron DAO Treasury](/neutron/dao/overview) with the denom creation fee from the creator address, specified in `Params`; 
- Consume an amount of gas corresponding to the `DenomCreationGasConsume` parameter specified in `Params`;
- Set `DenomMetaData` via bank keeper;
- Set `AuthorityMetadata` for the given denom to store the admin for the created denom `factory/{creator address}/{subdenom}`. Admin is automatically set as the Msg sender;
- Add denom to the `CreatorPrefixStore`, where a state of denoms created per creator is kept.

### Mint
Minting of a specific denom is only allowed for the creator of the denom registered during `CreateDenom`
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
Burning of a specific denom is only allowed for the creator of the denom registered during `CreateDenom`
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
- Safety check the following
  - Check that the denom has been created via `tokenfactory` module
  - Check that the sender of the message is the admin of the denom
- Burn designated amount of tokens for the denom via `bank` module



### ForceTransfer
Force transferring of a specific denom is only allowed for the creator of the denom registered during `CreateDenom`.
``` {.go}
message MsgForceTransfer {
  option (amino.name) = "osmosis/tokenfactory/force-transfer";

  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.moretags) = "yaml:\"amount\"",
    (gogoproto.nullable) = false
  ];
  string transferFromAddress = 3
  [ (gogoproto.moretags) = "yaml:\"transfer_from_address\"" ];
  string transferToAddress = 4
  [ (gogoproto.moretags) = "yaml:\"transfer_to_address\"" ];
}
```

**State Modifications:**
- Safety check the following
  - Check that the denom has been created via `tokenfactory` module
  - Check that the sender of the message is the admin of the denom
- Send designated amount of tokens for the denom via `bank` module from `transferFromAddress` to `transferToAddress`



### ChangeAdmin
Change the admin of a denom. Note, this is only allowed to be called by the current admin of the denom.

```go
message MsgChangeAdmin {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  string denom = 2 [ (gogoproto.moretags) = "yaml:\"denom\"" ];
  string newAdmin = 3 [ (gogoproto.moretags) = "yaml:\"new_admin\"" ];
}
```



### SetDenomMetadata
Setting of metadata for a specific denom is only allowed for the admin of the denom.
It allows the overwriting of the denom metadata in the bank module.

```go
// MsgSetDenomMetadata is the sdk.Msg type for allowing an admin account to set
// the denom's bank metadata
message MsgSetDenomMetadata {
  string sender = 1 [(gogoproto.moretags) = "yaml:\"sender\""];
  cosmos.bank.v1beta1.Metadata metadata = 2 [
  (gogoproto.moretags) = "yaml:\"metadata\"",
  (gogoproto.nullable) = false
  ];
}
```

**State Modifications:**

- Check that sender of the message is the admin of denom;
- Modify `Metadata` state entry in `bank` module to change the metadata for the denom;



### SetBeforeSendHook
Allowing to assign a CosmWasm contract to call with a BeforeSend hook for a specific denom is only allowed for the creator of the denom registered during `CreateDenom`.
``` {.go}
message MsgSetBeforeSendHook {
  option (amino.name) = "osmosis/tokenfactory/set-beforesend-hook";

  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  string denom = 2 [ (gogoproto.moretags) = "yaml:\"denom\"" ];
  string contract_addr = 3
  [ (gogoproto.moretags) = "yaml:\"contract_addr\"" ];
}
```

**State Modifications:**
- Safety check the following
  - Check that the denom has been created via `tokenfactory` module
  - Check that the sender of the message is the admin of the denom
- Sets a bank hook for specified `denom` and `contract_addr`



### UpdateParams
Updates [params](/neutron/modules/3rdparty/osmosis/tokenfactory/params) of the module.

```go
message MsgChangeAdmin {
  string sender = 1 [ (gogoproto.moretags) = "yaml:\"sender\"" ];
  cosmos.bank.v1beta1.Metadata metadata = 2 [ (gogoproto.moretags) = "yaml:\"metadata\"", (gogoproto.nullable)   = false ];
}
```

**State Modifications:**

- Check that sender of the message is the `Authority` of the module. Currently it's an address of Neutron's [AdminModule](/neutron/modules/admin-module/overview)
- Modify `Params` state entry to update params of the module