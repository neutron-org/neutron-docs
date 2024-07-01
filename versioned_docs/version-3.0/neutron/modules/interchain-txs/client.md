# Client

## Transactions

The Interchain Transactions module only processes messages from smart contract addresses and does not have any `tx` CLI entry points.

## Queries

The query commands allow users to query the module.

```shell
simd query bank --help
```

### interchain-account

The `interchain-account` command allows users to query the interchain account address for a combination of owner-address, connection-id and interchain-account-id:

```shell
neutrond query interchaintxs interchain-account [owner-address] [connection-id] [interchain-account-id] [flags]
```

* `owner-address` is the address of the contract that registered the account;
* `connection-id` is the identifier of the connection used to register the account;
* `interchain-account-id` is the identifier chosen by the contract for a specific interchain account.
