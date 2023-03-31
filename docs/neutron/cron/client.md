# Client

## Queries

In this section we describe the queries required on grpc server.

```protobuf
service Query {
  // Parameters queries the parameters of the module.
	rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
		option (google.api.http).get = "/neutron/cron/params";
	}

	// Queries a Schedule by name.
	rpc Schedule(QueryGetScheduleRequest) returns (QueryGetScheduleResponse) {
		option (google.api.http).get = "/neutron/cron/schedule/{name}";
	}

	// Queries a list of Schedule items.
	rpc Schedules(QuerySchedulesRequest) returns (QuerySchedulesResponse) {
		option (google.api.http).get = "/neutron/cron/schedule";
	}
}

message QueryParamsRequest {}

message QueryParamsResponse {
	Params params = 1 [(gogoproto.nullable) = false];
}

message QueryGetScheduleRequest {
	string name = 1;
}

message QueryGetScheduleResponse {
	Schedule schedule = 1 [(gogoproto.nullable) = false];
}

message QuerySchedulesRequest {
	cosmos.base.query.v1beta1.PageRequest pagination = 1;
}

message QuerySchedulesResponse {
	repeated Schedule schedules = 1 [(gogoproto.nullable) = false];
	cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```
