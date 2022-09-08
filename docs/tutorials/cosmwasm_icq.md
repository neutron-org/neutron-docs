# CosmWasm + ICQ

This section contains a tutorial for writing smart contracts that utilize Interchain Queries Module.

## Overview

We are going to learn how to:

1. Install dependencies and import the libraries;
2. Register an Interchain Query;
3. Get results from the registered interchain query.

> **Note:** this section assumes that you have basic knowledge of CosmWasm and have some experience in writing smart
> contracts. You can check out CosmWasm [docs](https://docs.cosmwasm.com/docs/1.0/)
> and [blog posts](https://medium.com/cosmwasm/writing-a-cosmwasm-contract-8fb946c3a516) for entry-level tutorials.

## The complete example

In the snippets below some details might be omitted. Please check out the complete smart contract
[example](https://github.com/neutron-org/neutron-contracts/tree/main/contracts/neutron_interchain_queries) for a complete
implementation.

## 1. Install dependencies and import the libraries

In order to start using the Neutron ICQ module, you need to install some dependencies. Add the following
libraries to your dependencies section:

```toml
[dependencies]
cosmwasm-std = { version = "1.0.0", features = ["staking"] }

# Other standard dependencies...

# This is a library that simplifies working with ICQ,
# contains bindings for the Neutron ICQ module (messages, responses, etc.), some default Interchain Queries and provides
# various helper functions.
neutron-sdk = { path = "github.com/neutron-org/neutron/packages/neutron-sdk", default-features = false, version = "0.1.0" }
```

Now you can import the libraries:

```rust
use neutron_sdk::bindings::msg::NeutronMsg;
use neutron_sdk::bindings::query::{InterchainQueries, QueryRegisteredQueryResponse};
use neutron_sdk::interchain_queries::queries::{
    query_balance, query_delegations, query_registered_query,
};
use neutron_sdk::interchain_queries::{
    register_balance_query, register_delegator_delegations_query, register_transfers_query,
    remove_interchain_query, update_interchain_query,
};
use neutron_sdk::sudo::msg::SudoMsg;
use neutron_sdk::{NeutronError, NeutronResult};
```

## 2. Register an Interchain Query

Neutron allows a smart contract to register multiple interchain queries per smart-contract:

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RegisterTransfersQuery {
        zone_id: String,
        connection_id: String,
        update_period: u64,
        recipient: String,
        min_height: Option<u128>,
    },
    RegisterDelegatorDelegationsQuery {
        delegator: String,
        validators: Vec<String>,
        zone_id: String,
        connection_id: String,
        update_period: u64,
    },
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    _: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response<NeutronMsg>> {
    match msg {
        ExecuteMsg::RegisterTransfersQuery {
            zone_id,
            connection_id,
            recipient,
            update_period,
            min_height,
        } => register_transfers_query(
            deps,
            env,
            connection_id,
            zone_id,
            recipient,
            update_period,
            min_height,
        ),
        ExecuteMsg::RegisterDelegatorDelegationsQuery {
            zone_id,
            connection_id,
            delegator,
            validators,
            update_period,
        } => register_delegator_delegations_query(
            deps,
            env,
            connection_id,
            zone_id,
            delegator,
            validators,
            update_period,
        ),
    }
}
```