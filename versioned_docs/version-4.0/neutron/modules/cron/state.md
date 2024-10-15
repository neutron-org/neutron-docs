# State

The Cron module stores schedules with `name` as the key in the following format:

```protobuf
message Schedule {
	// Name of schedule
	string name = 1;
	// Period in blocks
	uint64 period = 2;
	// Msgs that will be executed every period amount of time
	repeated MsgExecuteContract msgs = 3 [ (gogoproto.nullable) = false ];
	// Last execution's block height
	uint64 last_execute_height = 4;
}

message MsgExecuteContract {
	// Contract is the address of the smart contract
	string contract = 1;
	// Msg json encoded message to be passed to the contract
	string msg = 2;
}
```

The Cron module uses params in this format:
```protobuf
message Params {
	// Security address that can remove schedules
	string security_address = 1;
	// Limit of schedules executed in one block
	uint64 limit = 2;
}
```
