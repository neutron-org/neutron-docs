# Events

The ICQ module emits the following event:

### EndBlocker

| Attribute Key | Attribute Value                    |
|---------------|------------------------------------|
| module        | interchainqueries                  |
| action        | query                              |
| query_id      | `{identifier_of_registered_query}` |
| owner         | `{query_owner}`                    |
| zone_id       | `{identifier_of_remote_zone}`      |
| type          | `{query_type}`                     |
| tx_filter     | `{transactions_search_filter}`     |
| kv_key        | `{kv_keys}`                        |