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

### Sending messages to smart contracts, processing the responses and making queries to other contract

In CosmWasm, sending messages from one contract to another is typically done using the WasmMsg::Execute variant within the CosmosMsg. This allows you to execute an action on another contract by sending data (like tokens or structured instructions) to the target contract.

Let's create a new simple contract to interact with the contract from the [previous chapter:](/tutorials/onboarding/part-2-calling-modules-and-contracts), which calls `IncreaseCount` method of the Minimal Contract:

```rust
use cosmwasm_std::{CosmosMsg, WasmMsg, to_json_binary, Response, DepsMut, Env, MessageInfo};

pub fn send_message_to_contract(deps: DepsMut, amount: Uint128) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;

    // here we compose a message to a minimal contract instance to increase a counter there by specified amount
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.minimal_contract_address.into_string(),
        msg: to_json_binary(&MinimalContractExecuteMsg::IncreaseCount { amount })?,
        funds: vec![], // Optionally, you can send funds along with the message.
    });

    Ok(Response::new()
        .add_message(message)
        .add_attribute("action", "send_message_to_contract"))
}
```

This is it! This simple construction allows to call any method of any contract on Neutron.

But what if we also want to handle a response of the call?

In CosmWasm, handling the outcome is straightforward: you generally handle successful execution or errors through the execution result.

Let's modify the code a bit, so we would be able to call a minimal a contract and handle response of the call:

```rust
pub fn send_message_to_contract(deps: DepsMut, amount: Uint128) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;

    // here we compose a message to a minimal contract instance to increase a counter there by specified amount
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.clone().minimal_contract_address.into_string(),
        msg: to_json_binary(&MinimalContractExecuteMsg::IncreaseCount { amount })?,
        funds: vec![], // Optionally, you can send funds along with the message.
    });

    let current_counter_value: CurrentValueResponse = deps.querier.query_wasm_smart(
        config.minimal_contract_address,
        &MinimalContractQueryMsg::CurrentValue {},
    )?;

    // we create a submessage to catch the successfull response
    Ok(Response::new()
        .add_submessage(
            SubMsg::reply_on_success(message, INCREASE_COUNT_REPLY_ID)
                .with_payload(to_json_binary(&current_counter_value.current_value)?), // add counter to submsg payload, so we could parse it i reply handler
        )
        .add_attribute("action", "send_message_to_contract"))
}

/// ----------------------------- REPLY HANDLER ------------------------------------
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
    let config = CONFIG.load(deps.storage)?;

    // Handle the response message here
    if msg.id == INCREASE_COUNT_REPLY_ID {
        // parse data field from minimal contract execution respons to get counter value
        let previous_counter: Uint128 = from_json(&msg.payload)?;

        // make a query to a minimal contract to get current counter value
        let current_counter_value_via_query: CurrentValueResponse = deps.querier.query_wasm_smart(
            config.minimal_contract_address,
            &MinimalContractQueryMsg::CurrentValue {},
        )?;

        // check if counter value from a was not actually updated by checking previous counter value we sent in SubMsg and current counter value from a query
        if current_counter_value_via_query.current_value > previous_counter {
            return Err(StdError::generic_err(
                "counter from SubMsg does not equal to a counter from query",
            ));
        }

        Ok(Response::new()
            .add_attribute("reply", "success")
            .add_attribute("new_counter", current_counter_value_via_query.current_value))
    } else {
        Err(StdError::generic_err("unknown reply id"))
    }
}
```

In this example, SubMsg is used to capture and handle responses by setting a reply_on attribute. Then, in the reply function, you handle the message reply based on the id `INCREASE_COUNT_REPLY_ID`:
1. At first we are checking the reply message id. If it's not `INCREASE_COUNT_REPLY_ID` something goes wrong, so we return an error;
2. Then we are decoding `payload` field of the message to extract `previous_counter` value we [set in our contract in the execute message](https://github.com/neutron-org/onboarding/blob/cf20ed2a2258e772e86f12421507617a143aa675/contracts/calling_modules_and_contracts/src/contract.rs#L139);
3. And next we a doing the `CurrentValue` [query to our Minimal contract](https://github.com/neutron-org/onboarding/blob/f438ffae9e1e7d949534f36644f38b457c499e67/minimal_contract/src/contract.rs#L149) to get the current counter value from a contract. Easy, right?;
4. And then we are comparing those value just to check everything went as expected.

:::tip Note
You can see the whole contract [here.](https://github.com/neutron-org/onboarding/blob/f438ffae9e1e7d949534f36644f38b457c499e67/calling_modules_and_contracts/src/contract.rs#L120)
:::

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

### Sending Messages to Cosmos SDK Modules

In this tutorial, we’ll explore how a CosmWasm contract interacts with Cosmos SDK modules using custom messages. We’ll walk through sending messages to Cosmos SDK modules, handling responses, and querying data. The provided code will guide us through sending tokens (after converting an amount in USD to NTRN using an oracle), handling the response when the tokens are sent, and querying additional data.

:::tip Note
You can see the whole contract [here.](https://github.com/neutron-org/onboarding/blob/f438ffae9e1e7d949534f36644f38b457c499e67/calling_modules_and_contracts/src/contract.rs#L135)
:::

The `send_tokens` function demonstrates how to send tokens by communicating with two Cosmos SDK modules:

*	Oracle Module (to get the NTRN price)
*	Bank Module (to send tokens)

```rust
pub fn send_tokens(
    deps: DepsMut,
    env: Env,
    to_address: String,
    usd_amount: Uint128,
) -> Result<Response, ContractError> {
    // get NTRN price from Slinky
    let slinky_querier = oracle::v1::OracleQuerier::new(&deps.querier);
    let ntrn_price = slinky_querier.get_price(Some(slinky::types::v1::CurrencyPair {
        base: "NTRN".to_string(),
        quote: "USD".to_string(),
    }))?;

    if ntrn_price.price.is_none() {
        return Err(ContractError::Std(StdError::generic_err(
            "no price for NTRN/USD pair",
        )));
    }

    // normalize the price
    let normalized_price = Decimal::from_atomics(
        Uint128::from_str(&ntrn_price.price.unwrap().price)?,
        ntrn_price.decimals as u32,
    )?;

    // convert usd amount to ntrn amount
    let ntrn_amount = Decimal::from_str(&usd_amount.to_string())?
        .checked_mul(normalized_price)?
        .to_uint_floor();

    // compose bank send message
    let msg = MsgSend {
        from_address: env.contract.address.into_string(),
        to_address,
        amount: vec![SDKCoin {
            denom: "untrn".to_string(),
            amount: ntrn_amount.to_string(),
        }],
    };

    let sub_msg = SubMsg::reply_on_success(Into::<CosmosMsg>::into(msg), BANK_SEND_REPLY_ID); // ReplyOn::Success will capture the response only if send message succeeded.

    Ok(Response::new()
        .add_submessage(sub_msg)
        .add_attribute("action", "send_tokens"))
}
```

**Step 1**: Querying the Oracle Module for the Price of NTRN

Before sending tokens, we need to convert the USD amount into NTRN. To achieve this, the contract queries the Oracle Module for the current NTRN/USD price:

```rust
let slinky_querier = oracle::v1::OracleQuerier::new(&deps.querier);
let ntrn_price = slinky_querier.get_price(Some(slinky::types::v1::CurrencyPair {
    base: "NTRN".to_string(),
    quote: "USD".to_string(),
}))?;
```

*	Oracle Module Interaction: This code uses the `oracle::v1::OracleQuerier` to create a querier and request the price for the `NTRN/USD` currency pair from the Slinky oracle module. It uses the get_price method to fetch the current price.
*	Error Handling: If the oracle doesn’t return a price (`ntrn_price.price.is_none()`), the contract returns an error, ensuring that no transaction occurs with invalid pricing data.

**Step 2**: Normalizing the Price and Converting USD to NTRN

Once the price is retrieved, we need to normalize the result and convert the `USD` amount into `NTRN` tokens:

```rust
let normalized_price = Decimal::from_atomics(
    Uint128::from_str(&ntrn_price.price.unwrap().price)?,
    ntrn_price.decimals as u32,
)?;
let ntrn_amount = Decimal::from_str(&usd_amount.to_string())?
    .checked_mul(normalized_price)?
    .to_uint_floor();
```

*	The retrieved price is normalized to convert it into a usable format by accounting for the number of decimal places.
* The contract multiplies the USD amount by the normalized `NTRN` price to determine how many `NTRN` tokens to send.

**Step 3**: Sending Tokens to a Recipient Using the Bank Module

Once the token amount is calculated, the contract sends the `NTRN` tokens to the recipient by constructing a `MsgSend` message. This message is sent to the Bank Module:

```rust
let msg = MsgSend {
    from_address: env.contract.address.into_string(),
    to_address,
    amount: vec![SDKCoin {
        denom: "untrn".to_string(),
        amount: ntrn_amount.to_string(),
    }],
};
```

*	Bank Module Interaction: The contract creates a `MsgSend` message, which sends the calculated `NTRN` tokens from the contract’s address (`env.contract.address`) to the recipient’s address (`to_address`).
*	The amount is specified using the micro-denomination `untrn`;

**Step 4**: Handling Success with SubMsg

To handle the response from the Bank Module, the message is wrapped in a SubMsg:

```rust
let sub_msg = SubMsg::reply_on_success(Into::<CosmosMsg>::into(msg), BANK_SEND_REPLY_ID);
```

*	The `SubMsg::reply_on_success` function ensures that the contract will capture the response when the token transfer succeeds. The `BANK_SEND_REPLY_ID` helps identify this message’s reply when processing the result later.

The function returns a Response object that contains the submessage and logs the action (`send_tokens`).
