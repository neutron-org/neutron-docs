# Events

### `EventTypeLockFees`

Event type: `lock_fees`

| Attribute Key | Attribute Value         |
|---------------|-------------------------|
| payer         | `{payer_address}`       |
| port_id       | `{port_identifier}`     |
| channel_id    | `{channel_identifier}`  |
| sequence      | `{sequence_identifier}` |

### `EventTypeDistributeAcknowledgementFee`

Event type: `distribute_ack_fee`

| Attribute Key | Attribute Value         |
|---------------|-------------------------|
| receiver      | `{receiver_address}`    |
| port_id       | `{port_identifier}`     |
| channel_id    | `{channel_identifier}`  |
| sequence      | `{sequence_identifier}` |

### `EventTypeLockFees`

Event type: `distribute_timeout_fee`

| Attribute Key | Attribute Value         |
|---------------|-------------------------|
| receiver      | `{receiver_address}`    |
| port_id       | `{port_identifier}`     |
| channel_id    | `{channel_identifier}`  |
| sequence      | `{sequence_identifier}` |