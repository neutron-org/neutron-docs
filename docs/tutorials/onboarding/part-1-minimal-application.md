# Part 1: Minimal Application

## Overview

Everyone knows how to write smart contracts for Ethereum. Some people even know how to write smart contracts for Solana.
But the knowledge of how to write smart contracts for Cosmos SDK chains is sacred, shared by the few, and hard to
obtain.

This CosmWasm onboarding tutorial has one goal: to show the reader that building applications with CosmWasm is not
scary. Let's get right into it!

In **Part 1** of this tutorial you will learn how to:

1. Create a simple, yet functional smart contract using CosmWasm;
2. Write unit- and integration tests for it;
3. Build a React web application that interacts with your smart contract,
4. Deploy your web3 application locally and on the Neutron testnet.

## What are Neutron smart contracts?

We assume you might not know **anything** about Neutron, so let's start with a basic overview. If you're already
familiar with Cosmos chains, you can skip this section. We've tucked the details into collapsible sections to make it
less scary.

<details><summary><b>Important information:</b> modules and messages</summary>
<p>

Neutron is a [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) chain, which means that it's a collection of **modules**
(`bank`, `dex`, etc.) running on top of the [CometBFT](https://github.com/cometbft/cometbft) consensus.

The only thing that a user cares about is **interacting with the blockchain**, which in case of Neutron means **sending
messages** to the Neutron modules. For example, if you want to send some `untrn` to your friend, you will need to
execute a transaction containing an `MsgSend` message for the `bank` module (see the Cosmos
SDK [docs](https://docs.cosmos.network/main/user/run-node/txs) for more details).

As a user, usually you don't have to deal with raw messages yourself — it's done for you either by the CLI or by a UI
that you are using.

To reiterate: each Neutron module defines a set of messages that it can parse and process. Interacting with Neutron
means sending messages to Neutron modules. That's it, it's that simple.

</p>
</details>

<details><summary><b>Important information:</b> smart contracts</summary>
<p>

Smart contracts are enabled on Neutron by a module called [wasmd](https://github.com/CosmWasm/wasmd). As any other
module, `wasmd` defines a set of messages that it can process, e.g.: `MsgStoreCode` (used to upload compiled contract
binaries), `MsgExecuteContract` (used to execute existing contracts), etc.

For now, the main thing that you need to know about the `wasmd` messages is that `MsgExecuteContract` includes an
**embedded message for a smart contract**:

```json
{
  "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
  "sender": "neutron1cvsh2c2vasktkh7krt2w2dhyt0njs0adh5ewqv",
  "contract": "neutron1a5xz4zm0gkpcf92ddm7fw8pghg2mf4wm6cyu6cgcruq35upf7auslnnfye",
  "msg": {
    "increase_count": {
      "amount": "42"
    }
  },
  "funds": []
}
```

That's because **smart contract developers can define the messages that the contract is able to process.**

In the snippet above, the message under the `"msg"` key is a message to a smart contract identified by the `"contract"`
address within the `wasmd` module. If you include the message above in a transaction, the following sequence of events
will happen:

1. Neutron will identify that the incoming message needs to be sent to the `wasmd` module,
2. The `wasmd` module will look up the contract binary by its address and load it,
3. The `wasmd` module will take message under the `"msg""` key and will pass it to the `execute()` entrypoint of
   the contract,
4. The contract will try to parse the incoming data into the `"increase_count"` message that is defined on the contract
   level, and will execute the handler associated with it.

</p>
</details>

<details><summary><b>Important information:</b> contract lifecycle, contract entry points</summary>
<p>

The creation of a contract involves **three steps**:

1. First you need to **compile** the contract binary (more on that in the **How to upload a contract and interact with
   it?** section),
2. Then you need to **upload** the contract binary to the chain by sending an `MsgStoreCode` to the `wasmd` module,
   which makes Neutron save the binary under a unique `code_id`,
3. Lastly, you need to **instantiate** a contract from this `code_id` by sending an `MsgInstantiateContract` to
   the `wasmd` module, which will result in Neutron creating an actual contract address that you can interact with.

After a contract was instantiated, you can start to send messages to it using the `MsgExecuteContract` of the `wasmd`
module. Multiple contracts can be created from the same `code_id` without the need to re-upload the binary, and each
instance with have a unique address.

There are **3 main contract entry points** that you need to know about that are used by `wasmd` to pass
messages to the contract: `instantiate()`, `execute()` and `query()`.

</p>
</details>

## What does a minimal smart contract look like?

A **really** minimal smart contract would be about 10 lines long, and would be useless for our purposes. Our smart
contract
is going to be a contract that **actually does** something:

1. Keeps a `Uint128` value in the storage,
2. Allows anyone to increase this value by some amount, if the increase amount is less than `100`,
3. Allows anyone to query the current value from the storage.

Fun, right? Right. **Check out the full source code** of this contract
on [GitHub](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs). Take a look if you
enjoy diving into raw source code – we’ve included **lots** of comments. But don’t worry, we'll walk you through every
part of it, step by step, below.

After having a look at the source code, you might have some questions right away, and we will try to address them
immediately:

1. **"How is this minimal? It's 160 lines of code!"** Yes, but 50% of them are comments!
2. **"Wait, is this Rust?"** Yes, it's in Rust. Rust is scary, but writing CosmWasm smart contracts is probably the
   easiest
   thing you can do with Rust, because everything is single-threaded.

With these initial questions out of the way, let's have a closer look at this contract.

> If you don't care about the implementation details at the moment and just want to see how to deploy and interact with
> the contract, please have a look at the **How to upload a contract and interact with it?** section.

### Storage: how to I store data?

:::tip TL;DR
Use `cw_storage_plus::Item` and `cw_storage_plus::Map` types to store standard and custom types.

See it in action: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L14)
:::

Storing data is essential, that's why we start with it. Almost any useful contract manages some storage. In CosmWasm, in
order to have storage, you need to initialise it using a type from the `cw_storage_plus` package. In our case, it's
`Item<Uint128>`:

```rust
use cw_storage_plus::Item;

pub const COUNTER: Item<Uint128> = Item::new("counter");
```

This will make CosmWasm allocate some space in the persistent storage for a single `Uint128` value under the
`"counter"` key. As a smart contract developer, you don't care about this key at all, but you must make sure that
each storage item has a unique key.

Saving single integers is kind of lame, but don't worry: **you can save almost anything to storage**. For example, **you
can save vectors**: `Item<Vec<Uint128>>`.

Or **you can save the types that you created yourself** (just make sure you added the fancy derive macro to the type
declaration):

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Config {
    pub important_parameter: String,
}

pub const CONFIG: Item<Config> = Item::new("config");
```

For maps, `cw_storage_plus` has a special `Map` type, in which you can also map pretty much anything to anything, if it
serialises properly:

```rust
pub const EXAMPLE_MAP: Map<Uint128, Uint128> = Map::new("example-map");
```

> **More storage types:** `cw_storage_plus` has even more storage types, some of which allow you to track the height at
> which a certain value was saved to your storage item.

> **A note about project layout:** usually all storage items and storage types are defined in a separate
> file (`src/state.rs`), alongside the `src/contract.rs` file. Here we define everything in one place for the sake of
> simplicity.

### Instantiation: how do I initialise a contract?

:::tip TL;DR

Before you can interact with a contract, you need to write the code that **instantiates** it. This is done by
implementing the `instantiate()` entrypoint and the `InstantiateMsg`.

See it in action: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L16-L63)
:::

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct InstantiateMsg {
    initial_value: Uint128,
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response<NeutronMsg>, ContractError> {
    COUNTER.save(deps.storage, &msg.initial_value)?;

    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("initial_value", msg.initial_value)
        .add_attribute("contract_address", env.contract.address)
        .add_attribute("sender", info.sender.to_string()))
}
```

In the snippet above, 2 things happen: the definition of `InstantiateMsg`, and the implementation of the `instantiate()`
entry point.

`InstantiateMsg` can carry any information we might find useful while populating our new contract. In our
case, we decided to use `InstantiateMsg` to set the initial value of the `COUNTER` storage item that was initialised in
the previous section.

> You need to add the `#[derive(Serialize, <...> JsonSchema)]` derive macro to the definitions of your custom types (so
> that they can be properly serialised by Rust).

> A common practice in the CosmWasm world is to define a `Config` type, create a storage item for it and then to set the
> initial values for `Config` parameters in the `InstantiateMsg`.

The `instantiate()` entry point expects the following arguments:

* **deps**: most importantly, gives you access to the _storage_ and the _querier_ (we'll discuss queries later),
* **env**:  keeps information about the execution environment, e.g., the address of the current contract,
* **info**: keeps information about the message that is currently executed, e.g., the address of the message sender,
* **msg**:  the `InstantiateMsg` that we just defined.

Most entry points expect a very similar set of arguments, with slight variations.

The return type of this entry point is `Result<Response<NeutronMsg>, ContractError>`. In simple terms, this means that
the entry point can either return a valid `Response` or a `ContractError`. We'll define `ContractError` in the next
section.

Our `instantiate()` implementation sets the value of the `COUNTER` storage item to `InstantiateMsg.initial_value`. This
is our first time saving something to storage, which is quite exciting!

Here are some key points to remember:

1. Reading and writing to storage consumes gas, which costs money.
2. Storage operations can potentially fail (though they usually succeed). In our implementation, any error is
   immediately returned by the `instantiate()` function, thanks to the `?` operator at the end of the `.save()` call.
   It's also possible to handle errors manually using Rust's `match`
   operator ([Rust documentation](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#matching-on-different-errors)).

Finally, in our `instantiate()` implementation, we add **attributes** to the successful `Response`. This helps with
debugging (we'll cover this in the last section of Part 1). Adding attributes to your response acts like a form of
logging. Alternatively, we could just return `Ok(Response::new())`, and that would work perfectly fine.

## How to upload a contract and interact with it?