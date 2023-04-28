# State

The ContractManager module stores one [Failure](TODO: Put link to the Contract Manager genesis) per contract address and record id.
`Failure` contains all the necessary info to store data about ACK sudo handler call failure. `address` contains contract addres and it is used in conjunction with  `id` field to create index of the record in the `KVStore`. `ack_id` is used to identify ACK request that was failed, `ack_type` can take two values : `ack`, and `timeout`.


