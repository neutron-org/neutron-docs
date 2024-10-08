# Part 2: Calling Modules and Contracts

## Overview

In the previous part of this tutorial we learned how to implement a simple contract that manages its own state, and how
to write a simple UI for it. Real-world applications, however, are rarely that simple; in order to implement something
useful, you need to know how to interact with **other smart contracts** and with Neutron **modules**.

## Smart contracts

Technically speaking, executing and querying other smart contracts from your own smart contract involves sending
messages to the `wasmd` module, but the interface of this interaction is slightly different from what you will need to
do with other modules.

There are 3 things to cover here:

1. Sending messages to smart contracts,
2. Processing responses to those messages,
3. Querying data from smart contracts.

### Sending messages to smart contracts & processing the responses

In CosmWasm, sending messages from one contract to another is typically done using the WasmMsg::Execute variant within the CosmosMsg. This allows you to execute an action on another contract by sending data (like tokens or structured instructions) to the target contract.

Let's create a new simple contract to interact with the contract from the [previous chapter:](/tutorials/onboarding/part-2-calling-modules-and-contracts)

```rust
use cosmwasm_std::{CosmosMsg, WasmMsg, to_binary, Response, DepsMut, Env, MessageInfo};

pub fn send_message_to_contract(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    target_contract: String,
    amount: String,
) -> Result<Response, ContractError> {
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: target_contract,
        msg: to_binary(&msg_data)?,
        funds: vec![], // Optionally, you can send funds along with the message.
    });

    Ok(Response::new()
        .add_message(message)
        .add_attribute("action", "send_message_to_contract"))
}
```

When you send messages, you may want to handle responses from those messages. In CosmWasm, handling the outcome is straightforward: you generally handle successful execution or errors through the execution result.

Here’s an example where we handle the response by checking for errors and capturing successful execution:
```rust
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, SubMsg, WasmMsg, ReplyOn, StdResult};

pub fn send_and_process_response(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    target_contract: String,
    msg_data: String,
) -> StdResult<Response> {
    let message = WasmMsg::Execute {
        contract_addr: target_contract,
        msg: to_binary(&msg_data)?,
        funds: vec![],
    };

    // Use SubMsg to handle replies and responses
    let sub_msg = SubMsg {
        msg: CosmosMsg::Wasm(message),
        gas_limit: None,
        id: 1, // The ID can be used to differentiate between replies
        reply_on: ReplyOn::Success, // We want a response on success
    };

    Ok(Response::new()
        .add_submessage(sub_msg)
        .add_attribute("action", "send_and_process_response"))
}

pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> StdResult<Response> {
    // Handle the response message here
    if msg.id == 1 {
        // Process the reply based on the ID
        Ok(Response::new().add_attribute("reply", "success"))
    } else {
        Err(ContractError::UnknownReplyId {})
    }
}
```

In this example, SubMsg is used to capture and handle responses by setting a reply_on attribute. Then, in the reply function, you handle the message reply based on the id.

### Querying data from smart contracts

## Modules

With modules, the interaction interface is slightly different, but semantically the same 3 things need to be covered:

1. Sending messages to modules,
2. Processing responses to those messages,
3. Querying data from modules.

<details><summary><b>Historical background:</b> Stargate and gRPC</summary>
<p>

Historically, some modules had their own WASM bindings implemented by developers to handle messages and queries from
smart contracts. For modules without these bindings, Stargate was used to achieve similar functionality. Stargate
primarily relied on gRPC for sending and receiving messages, but its interface was inconsistent, returning
protobuf-encoded messages for some queries and JSON-encoded ones for others—causing significant frustration for
developers. Now that Stargate is outdated, on Neutron, you only need to work with gRPC and protobuf-encoded messages to
interact with core modules.

</p>
</details>

### 1. Sending Messages to Cosmos SDK Modules

In CosmWasm, you can interact with Cosmos SDK modules by sending messages to those modules via the `neutron_std` package. You can use specific message types provided by `neutron_std` to interact with modules like `bank`, `tokenfactory` or `interchaintxs`. These interactions are facilitated through the `CosmosMsg::Custom` message format, which allows communication with Cosmos SDK modules.

Here’s an example of how to send a message to the `bank` module to send tokens:

```rust
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, Coin};
use neutron_std::types::cosmos::bank::MsgSend;

pub fn send_tokens(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    to_address: String,
    amount: Coin,
) -> Result<Response, ContractError> {
    let msg = MsgSend {
        from_address: info.sender.to_string(),
        to_address: to_address,
        amount: Some(amount.into()),
    };

    let cosmos_msg = CosmosMsg::Custom(msg.into());

    Ok(Response::new()
        .add_message(cosmos_msg)
        .add_attribute("action", "send_tokens"))
}
```

In this example, we use `neutron_std` to create a `MsgSend` message and convert it into a `CosmosMsg::Custom`. This sends a request to the Cosmos SDK bank module to send tokens to a recepient.

### 2. Processing Responses to Those Messages

When interacting with Cosmos SDK modules, you might want to process the responses from the actions you've triggered. This is done similarly to handling responses from smart contracts, but in this case, you will rely on the `SubMsg` structure to handle module responses.

Here’s an example of sending a message to the `bank` module to send tokens and handling the response:

```rust
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, SubMsg, StdResult};
use neutron_std::types::cosmos::bank::v1beta1::MsgSend;

pub fn send_tokens(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    to_address: String,
    amount: Coin,
) -> Result<Response, ContractError> {
    let msg = MsgSend {
        from_address: info.sender.to_string(),
        to_address: to_address,
        amount: Some(amount.into()),
    };

    let sub_msg = SubMsg::reply_on_success(msg.into(), 1); // ReplyOn::Success will capture the response only if send message succeeded.

    Ok(Response::new()
        .add_submessage(sub_msg)
        .add_attribute("action", "send_tokens"))
}

pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> StdResult<Response> {
    if msg.id == 1 {
        // Handle success from the bank send
        Ok(Response::new().add_attribute("reply", "send_success"))
    } else {
        Err(ContractError::UnknownReplyId {})
    }
}
```

In this example, we use `MsgSend` from `neutron_std` to create a message that sends tokens via bank module. The response is handled by setting up a `SubMsg` and then processing the response in the `reply` function.

### 3. Querying Data from Cosmos SDK Modules

Querying data from Cosmos SDK modules can be done using the `neutron_std` package’s query capabilities. For example, you can query the `bank` module to retrieve an account’s balance or query the `oracle` module for prices from Slinky.

Here’s an example of querying the bank module for a user’s balance:

```rust
use cosmwasm_std::{Deps, QueryRequest, StdResult, Coin};
use neutron_std::types::neutron::bank::QueryBalanceRequest;
use neutron_std::types::cosmos::base::v1beta1::Coin as BankCoin;

pub fn query_balance(
    deps: Deps,
    address: String,
    denom: String,
) -> StdResult<BankCoin> {
    let query_msg = QueryBalanceRequest {
        address,
        denom,
    };

    let request = QueryRequest::Custom(query_msg.into());

    // Perform the query and get the balance
    let balance: BankCoin = deps.querier.query(&request)?;

    Ok(balance)
}
```

In this example, we use `QueryBalanceRequest` from the `neutron_std::bank` module to query the balance of a specific address. The balance is returned in the `BankCoin` format.
