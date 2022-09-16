# Messages

## MsgTransfer

This message has the same structure the original module has. See the corresponding original module's page here: https://ibc.cosmos.network/main/apps/transfer/messages.html#msgtransfer.

### MsgTransfer response

Instead of an empty response as the original module provides, the Neutron's IBC Transfer module responds with the following structure:

```protobuf
message MsgTransferResponse {
  uint64 sequence_id = 1;
  string channel = 2;
}
```

- `sequence_id` — a channel's sequence_id for outgoing ibc packet. Unique per a channel;
- `channel` — the src channel name on neutron's side trasaction was submitted from.
