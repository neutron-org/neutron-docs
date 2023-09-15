# State

The ContractManager module stores one [Failure](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/contractmanager/genesis.proto#L12) per contract address and record id.

`Failure` contains all the necessary info to store data about ACK sudo handler call failure:
```protobuf
// Failure message contains information about ACK failures and can be used to
// replay ACK in case of requirement.
// Note that Failure means that sudo handler to cosmwasm contract failed for some reason
message Failure {
  // Address of the failed contract
  string address = 1;
  // Id of the failure under specific address
  uint64 id = 2;
  // Serialized MessageSudoCallback with Packet and Ack(if exists)
  bytes sudo_payload = 3;
}
```
