# Messages

## MsgRegisterInterchainAccount

Attempts to register an interchain account by sending an IBC packet over an IBC connection.

```protobuf
message MsgRegisterInterchainAccount {
  option (gogoproto.equal) = false;
  option (gogoproto.goproto_getters) = false;

  string from_address = 1;
  string connection_id = 2 [ (gogoproto.moretags) = "yaml:\"connection_id\"" ];
  string interchain_account_id = 3 [ (gogoproto.moretags) = "yaml:\"interchain_account_id\"" ];
  repeated cosmos.base.v1beta1.Coin register_fee = 4;
}
```

* `from_address` must be a smart contract address, otherwise the message will fail;
* `connection_id` must be the identifier of a valid IBC connection, otherwise the message will fail;
* `interchain_account_id` is used to generate the [owner](https://github.com/cosmos/ibc-go/blob/v3.1.1/modules/apps/27-interchain-accounts/controller/keeper/account.go#L17) parameter for ICA's `RegisterInterchainAccount()` call, which is later used for port identifier generation (see below). Maximum allowed length of `interchain_account_id` is 47 characters.
* `register_fee` fee is required to be paid in favor of the community (payee address is the treasury) to register an interchain account. Minimal amount of fee is contolled by the module's param `RegisterFee`

<details>
  <summary>IBC ports naming / Interchain Account address derivation</summary>

If a contract with the address `neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq` sends an `MsgRegisterInterchainAccount` with `interchain_account_id` set to `hub/1`, the generated ICA owner will look like `neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq.hub/1`, and the IBC port generated by the ICA app will be equal to `icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq.hub/1`.
</details>

<details>
  <summary> Neutron V2 update: Fee Implementation for ICA Registration</summary>

As of [Neutron V2](https://github.com/neutron-org/neutron/releases/tag/v2.0.0), we have introduced a new fee structure for the registration of Interchain Accounts (ICAs). Please be aware of the following updates:

- **[Minimum Fee (minFee)](https://github.com/neutron-org/neutron/blob/c6df465e5f83a811fd1cc98b6ebbf677a55ea21c/x/interchaintxs/types/params.pb.go#L32):** A minimum fee is now required for all new ICA registrations. This fee goes directly to the `FeeCollector` with purpose of preventing spam.

- **`FeeCollector Beneficiary`:** The `FeeCollector` is the designated recipient of the new registration fees, ensuring the economic sustainability of the network. This is the Neutron DAO at the moment.

- **Backwards Compatibility Assurance:**
  - Contracts and ICAs established with contracts, stored on Neutron before [V2](https://github.com/neutron-org/neutron/releases/tag/v2.0.0) [will **not**](https://github.com/neutron-org/neutron/blob/c6df465e5f83a811fd1cc98b6ebbf677a55ea21c/x/interchaintxs/keeper/msg_server.go#L51) incur the new registration fee.
  - This update is fully compatible with previous [Neutron V1 version](https://github.com/neutron-org/neutron/releases/tag/v1.0.4), guaranteeing a smooth transition and no disruption to existing contracts and services.

ICA's remote address generation concatenates connection identifier and port identifier to use them as the derivation key for the new account:

```go
// GenerateAddress returns an sdk.AccAddress derived using the provided module account address and connection and port identifiers.
// The sdk.AccAddress returned is a sub-address of the module account, using the host chain connection ID and controller chain's port ID as the derivation key
func GenerateAddress(moduleAccAddr sdk.AccAddress, connectionID, portID string) sdk.AccAddress {
	return sdk.AccAddress(sdkaddress.Derive(moduleAccAddr, []byte(connectionID+portID)))
}
```

</details>

> **Note:** your contract needs to implement the `sudo()` entrypoint on order to successfully process the IBC events associated with this message. You can find an example in the [neutron-sdk](https://github.com/neutron-org/neutron-sdk/tree/main/contracts) repository.

### Response

```protobuf
message MsgRegisterInterchainAccountResponse {}
```

### IBC Events

```go
type MessageOnChanOpenAck struct {
	OpenAck OpenAckDetails `json:"open_ack"`
}

type OpenAckDetails struct {
	PortID                string `json:"port_id"`
	ChannelID             string `json:"channel_id"`
	CounterpartyChannelId string `json:"counterparty_channel_id"`
	CounterpartyVersion   string `json:"counterparty_version"`
}
```

The data from an `OnChanOpenAck` event is passed to the contract using a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453). You can have a look at an example handler implementation in the [neutron-sdk](https://github.com/neutron-org/neutron-sdk/tree/main/contracts) repository.

> Note: you can find the interchain account address in the stored in the `CounterpartyVersion` field as part of [metadata](https://github.com/cosmos/ibc-go/blob/main/modules/apps/27-interchain-accounts/host/keeper/handshake.go#L78).

### State modifications

None.

## MsgSubmitTx

Attempts to execute a transaction on a remote chain.

```protobuf
message MsgSubmitTx {
  option (gogoproto.equal) = false;
  option (gogoproto.goproto_getters) = false;

  string from_address = 1;
  string interchain_account_id = 2;
  string connection_id = 3;
  repeated google.protobuf.Any msgs = 4;
  string memo = 5;
  uint64 timeout = 6;

  neutron.feerefunder.Fee fee = 7 [ (gogoproto.nullable) = false ];
}
```

* `from_address` must be a smart contract address, otherwise the message will fail;
* `interchain_account_id` is identical to `MsgRegisterInterchainAccount.interchain_account_id`;
* `connection_id` must be the identifier of a valid IBC connection, otherwise the message will fail;
* `msgs` must contain not more than it is defined in the module params;
* `memo` is the transaction [memo](https://docs.cosmos.network/master/core/transactions.html);
* `timeout` is a timeout in seconds after which the packet times out;
* `fee` is a fee amount to refund relayer for `ack` and `timeout` messages submission.

> **Note:** your smart-contract **must have** `fee.ack_fee + fee.timeout_fee + fee.recv_fee` coins on its balance, otherwise the message fails. See more info about fee refunding mechanism [here](../feerefunder/overview#general-mechanics).

> **Note:** most networks reject memos longer than 256 bytes.

> **Note:** your contract needs to implement the `sudo()` entrypoint on order to successfully process the IBC events associated with this message. You can find an example in the [neutron-sdk](https://github.com/neutron-org/neutron-sdk/tree/main/contracts) repository.

> **Note:** to see the currently available messages amount in a single MsgSubmitTx, query the module parameters:

```shell
neutrond query interchaintxs params

params:
  msg_submit_tx_max_messages: "16"
```

### Response

```protobuf
message MsgSubmitTxResponse {
  uint64 sequence_id = 1;
  string channel = 2;
}
```

* `sequence_id` is a channel's sequence_id for outgoing ibc packet. Unique per a channel;
* `channel` is the src channel name on neutron's side transaction was submitted from;

### IBC Events

```go
// MessageSudoCallback is passed to a contract's sudo() entrypoint when an interchain
// transaction failed.
type MessageSudoCallback struct {
	Response *ResponseSudoPayload `json:"response,omitempty"`
	Error    *ErrorSudoPayload    `json:"error,omitempty"`
	Timeout  *TimeoutPayload      `json:"timeout,omitempty"`
}

type ResponseSudoPayload struct {
	Request channeltypes.Packet `json:"request"`
	Data    []byte              `json:"data"` // Message data
}

type ErrorSudoPayload struct {
	Request channeltypes.Packet `json:"request"`
	Details string              `json:"details"`
}

type TimeoutPayload struct {
	Request channeltypes.Packet `json:"request"`
}
```

While trying to execute an interchain transaction, you can receive an IBC `Timeout` or an IBC `Acknowledgement`, and the latter can contain either a valid response or an error. These three types of transaction results are passed to the contract as distinct messages using a [Sudo() call](https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453). You can have a look at an example handler implementation in the [neutron-sdk](https://github.com/neutron-org/neutron-sdk/tree/main/contracts) repository.

> **Note**: there is no dedicated event for a closed channel (ICA disables all messages related to closing the channels)
> . Your channel, however, can still be closed if a packet timeout occurs; thus, if you are notified about a packet
> timeout, you can be sure that the affected channel was closed. Please note that it is generally a good practice to set
> the packet timeout for your interchain transactions to a really large value.
>
> If the timeout occurs anyway, you can just
> execute [RegisterInterchainAccount message]( /neutron/modules/interchain-txs/messages#msgregisterinterchainaccount) again to
> recover access to your interchain account.

> **Note** Keep in mind, new channel is created

You can more find info, recommendations and examples about how process acknowledgements [here](https://github.com/neutron-org/neutron-sdk/blob/6e7e83d3083f7942942ff0d97a36f9e9f00d4aee/contracts/neutron_interchain_txs/src/contract.rs#L397).

### State modifications

None.
