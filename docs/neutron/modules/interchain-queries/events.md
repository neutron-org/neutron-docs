# Events

There is one important event that exists in the ICQ module, which is emitted after any action that happend to a registered Interchain Query:
* `EventTypeNeutronMessage` - "neutron"

### `EventTypeNeutronMessage`

| Attribute Key | Attribute Value                                                               |
|---------------|-------------------------------------------------------------------------------|
| module        | `interchainqueries`                                                           |
| action        | action identifier: `query_updated` or `query_removed`                         |
| query_id      | `{identifier_of_registered_query}`                                            |
| connection_id | `{connection_id_for_query}`                                                   |
| owner         | `{query_owner}` Note: is only presented in `query_updated` action             |
| type          | `{query_type}` Note: only presented in `query_updated` action                 |
| tx_filter     | `{transactions_search_filter}` Note: only presented in `query_updated` action |
| kv_key        | `{kv_keys}` Note: only presented in `query_updated` action                    |