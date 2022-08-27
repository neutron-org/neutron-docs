# CosmWasm + ICA

This section contains a tutorial for writing smart contracts that utilize interchain accounts.

## Overview

We are going to learn how to:

1. Install dependencies and import the libraries;
2. Register an interchain account;
3. Execute an interchain transaction;
4. Process the transaction acknowledgement;
5. Implement integration tests.

Check out the complete smart contract
example [here](https://github.com/neutron-org/neutron-contracts/tree/main/contracts/neutron_interchain_txs).

> **Note:** Neutron provides an implementation of an ICA
> controller [module](https://github.com/neutron-org/neutron/tree/main/x/interchaintxs), which simplifies the creation
> and
> management of interchain accounts for smart contract developers. This module, however, is not your only option; you
> can
> use raw IBC packets to imitate
> the [ibc-go](https://github.com/cosmos/ibc-go/tree/main/modules/apps/27-interchain-accounts) implementation, or use
> a [framework](TODO_LINK) that already implements the same logic on smart contracts level.

> **Note:** this section assumes that you have basic knowledge of CosmWasm and have some experience in writing smart
> contracts. You can check out CosmWasm [docs](https://docs.cosmwasm.com/docs/1.0/)
> and [blog posts](https://medium.com/cosmwasm/writing-a-cosmwasm-contract-8fb946c3a516) for entry-level tutorials.

## 1. Install dependencies and import the libraries

In order to start using the Neutron ICA controller module, you need to install some dependencies. Add the following
libraries to your dependencies section:

```toml
[dependencies]
cosmwasm-std = { version = "1.0.0", features = ["staking"] }

# Other standard dependencies...

# Various helpers
interchain_txs = { path = "github.com/neutron-org/neutron/packages/interchain_txs", default-features = false, version = "0.1.0" }

# Bindings for the Neutron ICA adapter module (messages, responses, etc.)
neutron_bindings = { path = "github.com/neutron-org/neutron/packages/bindings" }

# This is a library that simplifies working with IBC response packets (acknowledgments, timeouts)
neutron_sudo = { path = "github.com/neutron-org/neutron/packages/neutron_sudo" }

# Required to marshal skd.Msg values; the marshalled messsages will be attached to the IBC packets
# and executed as a transaction on the host chain.
cosmos-sdk-proto = { version = "0.12.2", default-features = false }
protobuf = { version = "3", features = ["with-bytes"] }
```

Now you can import the libraries:

```rust
use interchain_txs::helpers::{parse_item, parse_response, parse_sequence};
use neutron_bindings::msg::NeutronMsg;
use neutron_bindings::ProtobufAny;
use neutron_bindings::query::InterchainQueries;
use neutron_bindings::query::QueryInterchainAccountAddressResponse;
use neutron_sudo::msg::RequestPacket;
use neutron_sudo::msg::SudoMsg;
```

## 2. Register an interchain account

Neutron allows a smart contract to register multiple interchain account for within a single IBC connection. While you
can implement interchain account registration in the `instantiate()` entrypoint, having a separate handler is probably a
better idea:

```rust
pub const INTERCHAIN_ACCOUNTS: Map<String, Option<(String, String)>> =
    Map::new("interchain_accounts");

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Register {
        connection_id: String,
        interchain_account_id: String,
    }
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response<NeutronMsg>> {
    deps.api
        .debug(format!("WASMDEBUG: execute: received msg: {:?}", msg).as_str());
    match msg {
        ExecuteMsg::Register {
            connection_id,
            interchain_account_id,
        } => execute_register_ica(deps, env, connection_id, interchain_account_id),
    }
}

fn execute_register_ica(
    deps: DepsMut,
    env: Env,
    connection_id: String,
    interchain_account_id: String,
) -> StdResult<Response<NeutronMsg>> {
    let register =
        NeutronMsg::register_interchain_account(connection_id, interchain_account_id.clone());
    let key = helpers::get_port_id(env.contract.address.to_string(), &interchain_account_id);
    INTERCHAIN_ACCOUNTS.save(deps.storage, key, &None)?;
    Ok(Response::new().add_message(register))
}
```

In the snippet above, we create the `ExecuteMsg` enum that contains the `Register` message, and implement a
simple `execute_register_ica()` handler for this message. This handler:

1. Creates a message to the Neutrons `interchaintxs` module;
2. Uses a helper function `get_port_id()` to get the port identifier that Neutron is going to generate for the channel
   dedicated to this specific interchain account;
3. Initializes the storage for information related to the new interchain account (currently empty).

