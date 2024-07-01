# State

The ContractManager module stores [Failure](https://github.com/neutron-org/neutron/blob/v2.0.3/proto/neutron/contractmanager/failure.proto#L11) under `contract address` and `record id` key.
`Failure` contains all the necessary info about ACK sudo handler call failure.

- `address` contains contract address and it is used in conjunction with  
- `id` field to create index of the record in the `KVStore`.
- `SudoPayload` - serialized MessageSudoCallback with Packet and Ack(if exists)
- `Error` - redacted error response of the sudo call. Full error is emitted as an event
