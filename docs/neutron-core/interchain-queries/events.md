# Events

The ICQ module emits the following event:

### EndBlocker

| Attribute Key | Attribute Value                    |
|---------------|------------------------------------|
| module        | interchainqueries                  |
| action        | query                              |
| query_id      | `{identifier_of_registered_query}` |
| owner         | `{query_owner}`                    |
| connection_id | `{connection_id_for_query}`        |
| type          | `{query_type}`                     |
| tx_filter     | `{transactions_search_filter}`     |
| kv_key        | `{kv_keys}`                        |