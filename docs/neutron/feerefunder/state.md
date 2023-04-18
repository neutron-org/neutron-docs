# State

The FeeRefunder module stores one [FeeInfo](https://github.com/neutron-org/neutron/blob/a9e8ba5ebb9230bec97a4f2826d75a4e0e6130d9/proto/feerefunder/genesis.proto#L18) per [`channel_id`, `port_id` and `sequence`](https://github.com/neutron-org/neutron/blob/a9e8ba5ebb9230bec97a4f2826d75a4e0e6130d9/x/feerefunder/types/keys.go#L28).
`FeeInfo` contains all the necessary info to store data about fees to properly refund relayers and return fees to the original caller of IBC messages:
* `payer` - stores the fee payer address (smart contract or other fee payer) which will be refunded after the IBC packet is processed;
* `packet_id` - stores an info about an IBC packet for which `ack` or `timeout` submission relayers should be refunded;
* `fee` - stores amount of fee to refund relayers for the submission of IBC packets.


