# Messages

## MsgTransfer

```protobuf
message MsgTransfer {
  option (gogoproto.equal) = false;
  option (gogoproto.goproto_getters) = false;

  // The port on which the packet will be sent
  string source_port = 1 [ (gogoproto.moretags) = "yaml:\"source_port\"" ];
  // The channel by which the packet will be sent
  string source_channel = 2
      [ (gogoproto.moretags) = "yaml:\"source_channel\"" ];
  // The tokens to be transferred
  cosmos.base.v1beta1.Coin token = 3 [ (gogoproto.nullable) = false ];
  // The sender address
  string sender = 4;
  // The recipient address on the destination chain
  string receiver = 5;
  // Timeout height relative to the current block height.
  // The timeout is disabled when set to 0.
  ibc.core.client.v1.Height timeout_height = 6 [
    (gogoproto.moretags) = "yaml:\"timeout_height\"",
    (gogoproto.nullable) = false
  ];
  // Timeout timestamp in absolute nanoseconds since unix epoch.
  // The timeout is disabled when set to 0.
  uint64 timeout_timestamp = 7
      [ (gogoproto.moretags) = "yaml:\"timeout_timestamp\"" ];

  string memo = 8;

  // Fees amount to refund relayer for ack and timeout submission
  neutron.feerefunder.Fee fee = 9
      [ (gogoproto.nullable) = false ];
}
```
> **Note:** your smart-contract **must have** `fee.ack_fee + fee.timeout_fee + fee.recv_fee` coins on its balance, otherwise the message fails. See more info about fee refunding mechanism [here](../feerefunder/overview#general-mechanics).

This message has the same structure the original module has, with addition of `fee` field.
See the corresponding original module's page here: https://ibc.cosmos.network/main/apps/transfer/messages.html#msgtransfer.


### MsgTransfer response

Instead of an empty response as the original module provides, the Neutron's IBC Transfer module responds with the following structure:

```protobuf
message MsgTransferResponse {
  // A channel's sequence_id for outgoing ibc packet. Unique per a channel.
  uint64 sequence_id = 1;
  // The src channel name on neutron's side transaction was submitted from
  string channel = 2;
}
```
