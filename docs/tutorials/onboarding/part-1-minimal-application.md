# Part 1: Minimal Application

Everyone knows how to write smart contracts for Ethereum. Some people even know how to write smart contracts for Solana.
But the knowledge of how to write smart contracts for Cosmos SDK chains is sacred, shared by the few, and hard to
obtain.

This CosmWasm onboarding tutorial has one goal: to show the reader that building applications with CosmWasm is not
scary. Let's get right into it!

## What does a minimal smart contract look like?

A **really** minimal smart contract would be 10 lines long, and would be useless for our purposes. Our smart contract
is going to be a contract that **actually does** something:

1. Keeps a `Uint128` value in the storage,
2. Allows anyone to increase this value by some amount, if the increase amount is less than `100`,
3. Allows anyone to query the current value from the storage.

Fun, right? Right. **Here is the full source code** of this contract
on [Github](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs), please have a
look at it. If you like reading raw source code, you can spend some time in this file (we left **a lot** of comments),
but we are going to walk you through everything there in this part of the tutorial.

After having a look at the source code, you might have some questions right away, and we will try to address them
immediately:

1. **"How is this minimal? It's 160 lines of code!"** Yes, but 50% of them are comments!
2. **"Wait, is this Rust?"** Yes, it's in Rust. Rust is scary, but writing CosmWasm smart contracts is probably the
   easiest
   thing you can do with Rust, because everything is single-threaded.

With these initial questions out of the way, let's have a closer look at this contract.

> If you don't care about the implementation details at the moment and just want to see how to deploy and interact with
> the contract, please have a look at the **How to upload a contract and interact with it?** section.

### Storage

Almost any useful contract manages some storage. In CosmWasm, in order to have storage, you need to initialise it using
a type from the `cw_storage_plus` package. In our case, it's `Item<Uint128>`:

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

### Instantiation

#### Contract life cycle and entry points

The creation of a contract involves **two steps**: first you need to **upload** the compiled contract binary to the
chain,
which makes Neutron save the binary under a unique `code_id`. Then you need to **instantiate** a contract from this
`code_id`, which will result in Neutron creating an actual contract that you can interact with.

> Multiple contracts can be created from the same `code_id` without the need to re-upload the binary. Each contract
> with have a unique address.

The **instantiation process can be customised** by the contract creator by defining an `InstantiateMsg` and implementing
the `instantiate()` entry point.

> The `instantiate()` entry point is one of the 3 main contract entry points, the other 2 being `execute()`
> and `query()`, which we are going to discuss right after `instantiate()`.

> There are 3 more entry points that we are not going to discuss in Part 1 of this tutorial: `migrate()`, `reply()`,
> and `sudo()`.

#### Implementing the `instantiate()` entry point

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

The `instantiate()` entry point, expects the following arguments:

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