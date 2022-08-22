# Events

The ICQ module emits the following event:

## EndBlocker

| Attribute Key | Attribute Value                    |
|---------------|------------------------------------|
| module        | interchainqueries                  |
| action        | query                              |
| query_id      | `{identifier_of_registered_query}` |
| zone_id       | `{identifier_of_remote_zone}`      |
| type          | `{query_type}`                     |
| parameters    | `{query_parameteres}`              |
