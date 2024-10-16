# TODO

## Explanation: How Interchain Query results are removed?

- KV query results are removed immediately
- TX query results are removed in EndBlock in an amount based on the module's `tx_query_removal_limit` value

## Explanation: Configuring your own remote chain RPC node for TX ICQ usage

If running your own RPC node for the target chain, make sure to [configure](https://docs.cometbft.com/v0.38/core/configuration) it's `indexer` parameter the way it is sufficient for the transactions filter you define for your queries.

... add something else probably

## Explanation: What are sudo calls?

## Explanation: Limited gas for sudo calls

- reasoning
- what is the value and how to get the current value
- guidelines how to write sudo handlers (preserve sudo data, then process it in another outer call)

## Explanation: How to find the right IBC connection ID for an Interchain Query?

- explain clients and connections
- add links to IBC docs
- ICQs depend on IBC clients in terms of data authenticity and the client should be trustworthy (i.e. owned by the protocol)

## Explanation: Guidelines on transactions_filter definition

Since events themselves are not part of the consensus and are not included in the transaction result, it's necessary to
[implement additional checks](https://github.com/neutron-org/neutron-sdk/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L197)
in your `SudoTXQueryResult` handler to check that result transactions satisfies your transactions filter. For instance, you can check that messages in the transactions have proper types, payload, etc.
If your contract does not have such checks, malicious relayer can send a fully valid Tendermint transaction which does not satisfy your defined transactions filter, and your business-logic can be broken.

> NOTE: when registering a TX-query, you write the transaction filters as filters for transaction events. When you check the submitted transaction in your contracts, though, you can only check the information that is stored on-chain (i.e., message fields for messages in a transaction). To put it another way, the set of values that you can use to filter transactions is the intersection of the values that are added to transaction events (used by the ICQ relayer to perform the search) and the values included directly to sdk.Msgs (can be used by your code to check whether the submitted transaction matches your query).  

You can see more info, examples and recommendations about proper transactions result handling [here](https://github.com/neutron-org/neutron-sdk/blob/v0.5.0/contracts/neutron_interchain_txs/src/contract.rs#L439).


```json
[{"field": "{eventType}.{attributeKey}", "val": "{attributeValue}", "op": "gte"}, ...]
```

Maximum allowed amount of filters is 32. Supplying more filters than allowed will return an error.

Supported operators:
* `eq`
* `lt`
* `gt`
* `lte`
* `gte`

The ICQ relayer can easily parse this format and compose it into usual [Tendermint syntax](https://docs.tendermint.com/v0.33/app-dev/indexing-transactions.html#querying-transactions) for searching transactions.

Suppose you want to search for transactions that meet specific conditions on a remote chain. You can build a query using various filters to narrow down the search.

##### Finding Transfer Transactions with a Specific Amount

```json
[{"field": "transfer.amount", "op": "eq", "val": 1000}]
```

This filter searches for all transfer transactions with an exact amount of 1000. The ICQ relayer converts it into the Tendermint search string:

```
"transfer.amount" = 1000
```

##### Searching for Transactions within a Range of Dates

```json
[{"field": "timestamp", "op": "gte", "val": "2023-01-01T00:00:00Z"}, {"field": "timestamp", "op": "lt", "val": "2023-02-01T00:00:00Z"}]
```

This filter queries for all transactions that were processed between January 1, 2023, and February 1, 2023. The corresponding Tendermint search string would be:

```
"timestamp" >= "2023-01-01T00:00:00Z" AND "timestamp" < "2023-02-01T00:00:00Z"
```

##### Combining Multiple Conditions

```json
[{"field": "message.module", "op": "eq", "val": "bank"}, {"field": "transfer.sender", "op": "eq", "val": "neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff"}, {"field": "transfer.amount", "op": "gt", "val": 500}]
```

This example searches for bank transfer transactions sent by a specific address (`neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff`) and with an amount greater than 500. The search string would be:

```
"message.module" = "bank" AND "transfer.sender" = "neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff" AND "transfer.amount" > 500
```

##### Effects of Filters

The filters in the `transactions_filter` field allow for refined and targeted querying of transactions. Some effects of applying these filters are:

- **Increased Efficiency**: By narrowing down the search criteria, the query can return results more quickly, reducing the computational resources required.
- **Improved Relevance**: Filters ensure that only transactions that meet specific criteria are returned, making the results more relevant to the user's needs.
- **Flexibility**: Users can combine different operators and fields to create complex queries that match their exact requirements.
- **Error Handling**: Providing incorrect or conflicting filters might result in an error, so the filter structure must be carefully constructed to avoid issues.

By understanding the usage of the `transactions_filter` field, developers and users can leverage the power of targeted querying to interact with remote chains in a more effective and efficient manner.

##### Having Fewer or More Filters

###### Fewer Filters
**Pros:**
- **Broader Results**: Using fewer filters will generally lead to a larger result set, capturing more transactions that meet broad criteria.
- **Faster Execution**: With less complexity, the query may execute more quickly, as there are fewer conditions to evaluate.

**Cons:**
- **Less Precision**: Fewer filters may lead to less relevant results if the query is too broad.

###### More Filters
**Pros:**
- **More Specific Results**: More filters allow for more targeted and precise queries, narrowing down the result set to only the most relevant transactions.
- **Enhanced Control**: More filters offer greater control over the query, enabling more complex and nuanced searches.

**Cons:**
- **Slower Execution**: More complex queries with multiple filters may take longer to execute, as each additional condition adds to the computational load.
- **Potential Overfitting**: Too many filters may lead to an overly narrow search, missing relevant transactions or even resulting in no results at all if the filters are too restrictive.

##### Good Practices

1. **Start with Core Criteria**: Identify the essential criteria for your query and start with those filters. It helps to focus on what you really need from the results.
2. **Incrementally Refine**: If needed, add additional filters incrementally to refine the results, testing at each stage to ensure relevance.
3. **Avoid Redundancy**: Ensure that each filter adds value to the query and that there are no redundant or conflicting filters.
4. **Test Performance**: Consider testing the query with different numbers of filters to gauge performance and result relevance, especially if using many filters.
5. **Use the Maximum Limit Wisely**: Note that the maximum allowed amount of 32 filters is a technical constraint.

##### How Many Filters Do You Need?

The optimal number of filters depends on the specific use case and the balance between precision and performance. Generally, it's best to use the minimum number of filters that provide the necessary specificity for your query. Using too few may yield irrelevant results, while using too many may overly narrow the search or impact performance.

##### Conclusion

The number of filters in a query is a vital consideration, influencing both the relevance of the results and the performance of the query. Striking the right balance requires a thoughtful approach, considering the specific needs of the query, and adhering to good practices for constructing and refining filters.
