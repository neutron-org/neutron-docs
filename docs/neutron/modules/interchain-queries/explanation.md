# Explanation

## How do KV-typed Interchain Queries work?

The meaning of a KV Interchain Query is to get a secured access to a remote chain's storage from a smart contract. Such a secured access is based on:
- [IAVL tree](https://github.com/cosmos/iavl) which is used as data storage in Cosmos-SDK based blockchains. Each piece of data (value) is a leaf node in the tree having its unique data path (key);
- [abci_query](https://docs.cometbft.com/v0.38/spec/rpc/#abciquery) RPC that exposes the storage (`IAVL tree`) read operations by a given path.

A typical flow of KV-typed Interchain Queries usage is as follows:
1. A smart contract developer realises that their interchain protocol depends on state of a remote chain, and figures out what info exactly they need to read from the chain;
2. Given the required data set, the developer composes a list of paths in the storage that contain the required data;
3. The developer writes and deploys a smart contract that contains Interchain Query registration logic and a callback for handling the query results;
4. The smart contract registers a KV-typed Interchain Query with the set of keys to read. The registered Interchain Query is stored in the `interchainqueries` module's state;
5. An Interchain Query relayer reads the `interchainqueries` module's state, finds the registered query and its parameters, and does the `abci_query` RPC. The result of the call is a set of key-value pairs with proofs coming from the `IAVL tree`;
6. The Interchain Query relayer provides the key-value pairs and proofs to the `interchainqueries` module. This is as KV Interchain Query result submission operation. The module does the result verification against the proofs and passes the result to the smart contract;
7. The smart contract does arbitrary handling of the result;
8. Steps 5-7 are repeated periodically until the query is removed.

**Might be interesting:**
- [How to register an Interchain Query using neutron-sdk](/neutron/modules/interchain-queries/how-to#how-to-register-an-interchain-query-using-neutron-sdk)
- [How to register a KV-typed Interchain Query with custom keys](/neutron/modules/interchain-queries/how-to#how-to-register-a-kv-typed-interchain-query-with-custom-keys)
- [What is an Interchain Query relayer?](/neutron/modules/interchain-queries/explanation#what-is-an-interchain-query-relayer)

## How do TX-typed Interchain Queries work?

The meaning of a TX Interchain Query is to get a secured subscription on transactions happening on a remote chain from a smart contract. Such a secured access is based on:
- transaction execution [events](https://docs.cosmos.network/v0.50/learn/advanced/events) emission. In a word, events are structured logs of actions that take place within the blockchain;
- [tx_search](https://docs.cometbft.com/v0.38/app-dev/indexing-transactions#querying-transactions-events) RPC. This RPC allows to search for transactions based on events they emit.

A typical flow of TX-typed Interchain Queries usage is as follows:
1. A smart contract developer realises that their interchain protocol depends on actions happening on a remote chain, and figures out what actions exactly they need to react on;
2. Given the requirements, the developer composes a list of filtering conditions that identify the needed transactions by the events they emit;
3. The developer writes and deploys a smart contract that contains Interchain Query registration logic and a callback for handling the query results;
4. The smart contract registers a TX-typed Interchain Query with the set of transaction filters to apply. The registered Interchain Query is stored in the `interchainqueries` module's state;
5. An Interchain Query relayer reads the `interchainqueries` module's state, finds the registered query and its parameters, and does the `tx_search` RPC. The result of the call is a list of transactions successfully processed on the remote chain;
6. The Interchain Query relayer provides the list of transactions a couple of headers for each transaction needed to verify the result to the `interchainqueries` module. This is a TX Interchain Query result submission operation. The module does the result verification against the headers and passes the result to the smart contract;
7. The smart contract does arbitrary handling of the result;
8. Steps 5-7 are repeated periodically until the query is removed.

**Might be interesting:**
- [How to register an Interchain Query using neutron-sdk](/neutron/modules/interchain-queries/how-to#how-to-register-an-interchain-query-using-neutron-sdk)
- [How to register a TX-typed Interchain Query with custom keys](/neutron/modules/interchain-queries/how-to#how-to-register-a-tx-typed-interchain-query-with-custom-keys)
- [What is an Interchain Query relayer?](/neutron/modules/interchain-queries/explanation#what-is-an-interchain-query-relayer)

## What is an Interchain Query relayer?

An Interchain Query relayer is an off-chain application that serves the needs of `interchainqueries` module users. It is an intermediary between two chains, and in this regard it is similar to an IBC relayer. The responsibilities of an Interchain Query relayer are:
- Monitoring of the registered Interchain Queries: retrieval of Interchain Queries that are needed to be processed from the `interchainqueries` module's state;
- Interchain Queries execution: reading of remote chain's state based on the parameters defined in the Interchain Query being executed, fidning proofs for the read data;
- Query results submission: passing of the retrieved data and proofs to the `interchainqueries` module and, through that, to respective smart contracts.

## Why is there a query creation deposit?

In order to clean up ledger from not used, outdated queries, a special deposit mechanism is used. [RegisterInterchainQuery](/neutron/modules/interchain-queries/api#registerinterchainquery) message contains the `deposit` field which is used to collect escrow payment for query creation. In order to return escrow payment, a [RemoveInterchainQuery](/neutron/modules/interchain-queries/api#removeinterchainquery) message should be issued.

The required amount of coins to deposit is defined by the `query_deposit` [module parameter](/neutron/modules/interchain-queries/api#params).

In other words, it is expected that the query owner will remove their queries when they are no longer needed. If a query hasn't been used for the `query_submit_timeout` period and the owner hasn't removed it, all network users are granted the opportunity to clean up the chain (to remove the unused query) and earn the deposited assets for doing so.

**Might be interesting:**
- [What are the rules for creation deposit refund?](/neutron/modules/interchain-queries/explanation#what-are-the-rules-for-creation-deposit-refund)

## What are the rules for creation deposit refund?

The query creation deposit is paid when the Interchain Query is removed. It is done by issuing a [RemoveInterchainQuery](/neutron/modules/interchain-queries/api#removeinterchainquery) message. The issuer may be either the query owner or anyone under specific circumstances. Briefly, if a query was registered recently or has been continuously updated (i.e. is within a so to say `query service period`), the query would seem to be valuable for its owner and only the owner can get rid of it and get the deposit back. If a query was registered a long time ago and hasn't been updated for a long time (i.e. is beyond the `query service period`), the query has most likely been forgotten, is not in use and therefore can be removed from the chain's state by anyone for a reward in the amount of the creation deposit. You can see a more detailed permission evaluation policy below.

There are three arguments defining the removal permissions for an Interchain Query:
1. `query_submit_timeout` — a [registered query's property](/neutron/modules/interchain-queries/api#registeredquery) which defines the span in blocks of the query's renewable `query service period`. The period is granted when a query is registered and gets renewed each time a query is updated. A `query_submit_timeout` value is assigned to the query based on the [module's parameters](/neutron/modules/interchain-queries/api#params) at the time of query registration;
2. `last_submitted_result_local_height` — a [registered query's property](/neutron/modules/interchain-queries/api#registeredquery) representing the home chain's height the query was last time updated at;
3. `registered_at_height` — a [registered query's property](/neutron/modules/interchain-queries/api#registeredquery) representing the home chain's height the query was registered at.

The permissions to execute [RemoveInterchainQuery](/neutron/modules/interchain-queries/api#removeinterchainquery) are as follows:

- Within the `query service period` only the query's owner is permissioned to remove it. A query is within the `query service period` if there **hasn't been** `params.query_submit_timeout` blocks yet since the query registration height **or** the last query update height:

    `within_service_period = current_height <= query.last_submitted_result_local_height + params.query_submit_timeout || current_height <= query.registered_at_height + params.query_submit_timeout`

- Beyond the `query service period` anyone can remove the query and take the deposit as a reward for keeping the network tidy. A query is beyond the `query service period` if there **has been** `params.query_submit_timeout` blocks since the query registration height **and** the last query update height:

    `beyond_service_period = current_height > query.last_submitted_result_local_height + params.query_submit_timeout && current_height > query.registered_at_height + params.query_submit_timeout`

## Why is the Proof field nullified in QueryResult RPC response?

The `interchainqueries` module only needs KV proofs during the submission process to verify the values being submitted against the proofs. If save them afterwards, they'll just increase chain's space without any reasonable further usage. The KV results saved on chain can be trusted as cryptographically proved because they are verified at the very beginning — by the module at the submission step.

The reason the `Proof` field is presented but empty is that the [QueryResult](https://pkg.go.dev/github.com/neutron-org/neutron/v4@v4.0.1/x/interchainqueries/types#QueryResult) type is used for both query result submission and query result preservation in the module's storage. More designated types are likely to be introduced in the future to mitigate confusion around this.

## Why doesn't interchainqueries module store TX-typed query results?

If compare to the KV-typed Interchain Queries which have the last result stored on chain and available to be read, the TX-typed Interchain Queries are not about the last result, but about a possible list of results (transactions matched the filter). Storing the whole list of results may be cumbersome for the chain in terms of required space. So, instead of storing results on chain and requiring smart contracts to read them (as for KV queries), the `interchainqueries` module passes the whole tx results directly to smart contracts, ending the life of the results right after a successful [TxQueryResult](/neutron/modules/interchain-queries/api#messagetxqueryresult) sudo call. The only things that the module stores on chain regarding TX-typed Interchain Queries are:
- hashes of transactions that have been successfully processed by the owner smart contract to avoid multiple processing of the same transactions, and
- [failures appeared during sudo calls](#what-happens-if-a-sudo-callback-to-a-smart-contract-owning-an-interchain-query-fails).

## What happens if a sudo callback to a smart contract owning an Interchain Query fails?

In this case, the `interchainqueries` module will store the failure in the [contractmanager](/neutron/modules/contract-manager/overview) module with all information about the query and a redacted (shortened to codespace and error code) error message. A full error message is emitted as an [event](https://docs.cosmos.network/v0.50/learn/advanced/events) on a failure (see the [message events emission](/neutron/modules/interchain-queries/api#sudo) for details). Note that the `out of gas` errors are stored as failures, too. Failed query result submissions can be read from the `contractmanager` module and resubmitted to the `interchainqueries` module. More info about the read and resubmit operations by the link to the [contractmanager](/neutron/modules/contract-manager/overview) module documentation.
