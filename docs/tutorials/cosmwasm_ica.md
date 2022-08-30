# CosmWasm + ICA

This section contains a tutorial for writing smart contracts that utilize interchain accounts.

## Overview

We are going to learn how to:

1. Install dependencies and import the libraries;
2. Register an Interchain Account;
3. Execute an interchain transaction.

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

neutron_bindings = { path = "github.com/neutron-org/neutron/packages/bindings" }

# This is a library that simplifies working with IBC response packets (acknowledgments, timeouts),
# contains bindings for the Neutron ICA adapter module (messages, responses, etc.) and provides
# various helper functions.
neutron-sdk = { path = "github.com/neutron-org/neutron/packages/neutron-sdk", default-features = false, version = "0.1.0" }

# Required to marshal skd.Msg values; the marshalled messsages will be attached to the IBC packets
# and executed as a transaction on the host chain.
cosmos-sdk-proto = { version = "0.12.2", default-features = false }
protobuf = { version = "3", features = ["with-bytes"] }
```

Now you can import the libraries:

```rust
use neutron_sdk::bindings::msg::NeutronMsg;
use neutron_sdk::bindings::query::{InterchainQueries, QueryInterchainAccountAddressResponse};
use neutron_sdk::bindings::types::ProtobufAny;
use neutron_sdk::interchain_txs::helpers::{parse_item, parse_response, parse_sequence, get_port_id};
use neutron_sdk::sudo::msg::{RequestPacket, SudoMsg};
use neutron_sdk::NeutronResult;
```

## 2. Register an Interchain Account

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
    let key = get_port_id(env.contract.address.to_string(), &interchain_account_id);
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

The `interchain_account_id` is just a string name for your new account that you can use to distinguish between multiple
accounts created within a single IBC connection.

> **Note:** in a real-world scenario you wouldn't want just anyone to be able to make your contract register interchain
> accounts, so it might make sense to check the handler

After executing the `execute_register_ica()` handler you need to have a way to know whether the account was registered
properly. As with all IBС-related events (acknowledgements, timeouts), `OnChanOpenAck` messages are dispatched by
Neutron to respective contracts via `wasm.Sudo()`. So, in order to process this type of events, you need to implement
the `sudo()` entrypoint for your contract and process the message dispatched by Neutron:

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> StdResult<Response> {
    match msg {
        SudoMsg::OpenAck {
            port_id,
            channel_id,
            counterparty_channel_id,
            counterparty_version,
        } => sudo_on_chan_open_ack(
            deps,
            env,
            port_id,
            channel_id,
            counterparty_channel_id,
            counterparty_version,
        ),
        _ => Ok(Response::default()),
    }
}

fn sudo_on_chan_open_ack(
    deps: DepsMut,
    _env: Env,
    port_id: String,
    _channel_id: String,
    _counterparty_channel_id: String,
    counterparty_version: String,
) -> StdResult<Response> {
    let parsed_version: Result<OpenAckVersion, _> =
        serde_json_wasm::from_str(counterparty_version.as_str());
    if let Ok(parsed_version) = parsed_version {
        INTERCHAIN_ACCOUNTS.save(
            deps.storage,
            port_id,
            &Some((
                parsed_version.address,
                parsed_version.controller_connection_id,
            )),
        )?;
        return Ok(Response::default());
    }
    Err(StdError::generic_err("Failed to parse counterparty_version"))
}
```

1. All possible message types that can come from Neutron are listed in the `SudoMsg` enum. Here we implement a handler
   just for one element of this enum, `SudoMsg::OpenAck`;
2. If the interchain account was successfully created, you might want to know what account address was generated for you
   on the host zone. This information, encoded by the ICA module as JSON, contained in the `counterparty_version`
   variable, which we need to parse. If we are able to parse it successfully, we save the remote address and the
   connection identifier to the previously created entry in the `INTERCHAIN_ACCOUNTS` storage.

> **Note:** it is required that you implement a `sudo()` handler in your contract if you are using the interchain
> transactions module, even if for some reason you don't want to implement any specific logic for IBC events.

> **Note:** you can organise your `INTERCHAIN_ACCOUNTS` storage in any way that suits your needs. for example, you can
> also save the `interchain_account_id` value there to have easy access to it from inside your contract.

After your contract successfully processed the `SudoMsg::OpenAck` event sent by Neutron, you can start using the
Interchain Account that was created for you.

## 3. Execute an interchain transaction

```rust
use cosmos_sdk_proto::cosmos::staking::v1beta1::{
    MsgDelegate, MsgDelegateResponse
};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Register {
        connection_id: String,
        interchain_account_id: String,
    },
    Delegate {
        interchain_account_id: String,
        validator: String,
        amount: u128,
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
        ExecuteMsg::Delegate {
            validator,
            interchain_account_id,
            amount,
        } => execute_delegate(deps, env, interchain_account_id, validator, amount),
    }
}

fn execute_delegate(
    mut deps: DepsMut,
    env: Env,
    interchain_account_id: String,
    validator: String,
    amount: u128,
) -> StdResult<Response<NeutronMsg>> {
    // Get the delegator address from the storage & form the Delegate message.
    let (delegator, connection_id) = get_ica(deps.as_ref(), &env, &interchain_account_id)?;
    let delegate_msg = MsgDelegate {
        delegator_address: delegator,
        validator_address: validator,
        amount: Some(Coin {
            denom: "stake".to_string(),
            amount: amount.to_string(),
        }),
    };

    // Serialize the Delegate message. 
    let mut buf = Vec::new();
    buf.reserve(delegate_msg.encoded_len());

    if let Err(e) = delegate_msg.encode(&mut buf) {
        return Err(StdError::generic_err(format!("Encode error: {}", e)));
    }

    // Put the serialized Delegate message to a types.Any protobuf message.
    let any_msg = ProtobufAny {
        type_url: "/cosmos.staking.v1beta1.MsgDelegate".to_string(),
        value: Binary::from(buf),
    };

    // Form the neutron SubmitTx message containing the binary Delegate message.
    let cosmos_msg = NeutronMsg::submit_tx(
        connection_id,
        interchain_account_id.clone(),
        vec![any_msg],
        "".to_string(),
        timeout.unwrap_or(DEFAULT_TIMEOUT_SECONDS),
    );

    // We use a submessage here because we need the process message reply to save
    // the outgoing IBC packet identifier for later.
    let submsg = msg_with_sudo_callback(
        deps.branch(),
        cosmos_msg,
        SudoPayload {
            port_id: get_port_id(env.contract.address.to_string(), &interchain_account_id),
            message: "message".to_string(),
        },
    )?;

    Ok(Response::default().add_submessages(vec![submsg]))
}

fn msg_with_sudo_callback<C: Into<CosmosMsg<T>>, T>(
   deps: DepsMut,
   msg: C,
   payload: SudoPayload,
) -> StdResult<SubMsg<T>> {
   save_reply_payload(deps.storage, payload)?;
   Ok(SubMsg::reply_on_success(msg, SUDO_PAYLOAD_REPLY_ID))
}

pub fn save_reply_payload(store: &mut dyn Storage, payload: SudoPayload) -> StdResult<()> {
   REPLY_ID_STORAGE.save(store, &to_vec(&payload)?)
}
```

1. First we need to import the `MsgDelegate` type from the `cosmos_sdk_proto` library. This is required to marshal the
   message and put it to the IBC packet sent by the ICA module;
2. Then we implement a handler for the new `ExecuteMsg::Delegate` handler, `execute_delegate()`, and add it to
   our `execute()` entrypoint;
3. Inside the `execute_delegate()` handler, we get the interchain account address from the storage, form a `Delegate`
   message, put it inside Neutron's `SubmitTx` message and execute it as a submessage. Inside
   the `msg_with_sudo_callback()` function, we set up the reply payload using the `SUDO_PAYLOAD_REPLY_ID` value.

We need to execute the `SubmitTx` message as a submessage because Neutron returns the outgoing IBC packet identifier for
us as a message reply. This IBC packet identifier is necessary to later determine which To process it, we need to
implement the `reply()` handler:

```rust
#[entry_point]
pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> StdResult<Response> {
    match msg.id {
        SUDO_PAYLOAD_REPLY_ID => prepare_sudo_payload(deps, env, msg),
        _ => Err(StdError::generic_err(format!(
            "unsupported reply message id {}",
            msg.id
        ))),
    }
}
```

After we saved the IBC packet identifier, we are ready for processing the IBC events that can be triggered by an IBC
relayer: an acknowledgement or a timeout. In order to process them, we need to add a couple of new handlers to
the `sudo()` entrypoint:

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> StdResult<Response> {
    match msg {
        // For handling successful (non-error) acknowledgements.
        SudoMsg::Response { request, data } => sudo_response(deps, request, data),

        // For handling error acknowledgements.
        SudoMsg::Error { request, details } => sudo_error(deps, request, details),

        // For handling error timeouts.
        SudoMsg::Timeout { request } => sudo_timeout(deps, env, request),

        SudoMsg::OpenAck {
            port_id,
            channel_id,
            counterparty_channel_id,
            counterparty_version,
        } => sudo_on_chan_open_ack(
            deps,
            env,
            port_id,
            channel_id,
            counterparty_channel_id,
            counterparty_version,
        ),
        _ => Ok(Response::default()),
    }
}
```
