# Part 1: Minimal Application

## Overview

Everyone knows how to write smart contracts for Ethereum. Some people even know how to write smart contracts for Solana.
But the knowledge of how to write smart contracts for Cosmos SDK chains is sacred, shared by the few, and hard to
obtain.

This CosmWasm onboarding tutorial has one goal: to show the reader that building applications with CosmWasm is not
scary.

In **Part 1** of this tutorial you will learn how to:

1. Create a simple, yet functional smart contract using CosmWasm.
2. Deploy your web3 application locally and on the Neutron testnet.

## What are Neutron smart contracts?

We assume you might not know **anything** about Neutron, so let's start with a basic overview. If you're already
familiar with Cosmos chains, you can skip this section. We've tucked the details into collapsible sections to make it
less scary.

<details><summary><b>Important information:</b> modules and messages</summary>
<p>

Neutron is a [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) chain, which means that it's a collection of **modules**
(`bank`, `dex`, etc.) running on top of the [CometBFT](https://github.com/cometbft/cometbft) consensus. Each module
defines a set of **messages** that it can process. A single **transaction** can include multiple messages to more than
one module.

To **interact with Neutron**, you need to **send messages** to Neutron modules. For example, if you want to send
some `untrn` to your friend, you will need to execute a transaction containing
an `MsgSend` message to the `bank` module. This message might look like this:

```json
{
  "@type": "/cosmos.bank.v1beta1.MsgSend",
  "from_address": "neutron1cvsh2c2vasktkh7krt2w2dhyt0njs0adh5ewqv",
  "to_address": "neutron1vqwe5hda0sjn0tyhd2w2trk7hktksav2c2hsvc",
  "amount": [
    {
      "denom": "untrn",
      "amount": "42"
    }
  ]
}
```

As a user, usually you don't have to deal with raw messages yourself — it's done for you either by the CLI or by a UI.
You'll examples of using the CLI later on in this document.

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
address. If you include the message above in a transaction, the following sequence of events will happen:

1. Neutron will identify that the incoming message needs to be sent to the `wasmd` module.
2. The `wasmd` module will look up the contract binary by its address and load it.
3. The `wasmd` module will take message under the `"msg""` key and will pass it to the `execute()` entrypoint of
   the contract.
4. The contract will try to parse the incoming data into the `"increase_count"` message that is defined on the contract
   level, and will execute the handler associated with it.

</p>
</details>

<details><summary><b>Important information:</b> contract lifecycle, contract entry points</summary>
<p>

The creation of a contract involves **three steps**:

1. First you need to **compile** the contract binary (more on that in the **How to upload a contract and interact with
   it?** section).
2. Then you need to **upload** the contract binary to the chain by sending an `MsgStoreCode` to the `wasmd` module,
   which makes Neutron save the binary under a unique `code_id`.
3. Lastly, you need to **instantiate** a contract from this `code_id` by sending an `MsgInstantiateContract` to
   the `wasmd` module, which will pass the instantiation message to the contract's `instantiate()` entrypoint and create
   an actual contract address that you can interact with.

After a contract was instantiated, you can start to send messages to it using the `MsgExecuteContract` of the `wasmd`
module. Multiple contracts can be created from the same `code_id` without the need to re-upload the binary, and each
instance with have a unique address.

There are **3 main contract entry points** that you need to know about that are used by the `wasmd` module to interact
with a contract: `instantiate()`, `execute()` and `query()`. We are going to implement all of them in this part of our
tutorial.

</p>
</details>

## What does a Neutron smart contract look like?

A **really** minimal smart contract would be about 10 lines long, and would be useless for our purposes. Our smart
contract
is going to be a contract that **actually does** something:

1. Keeps a `Uint128` value in the storage.
2. Allows anyone to increase this value by some amount, if the increase amount is less than `100`.
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

:::warning The Choice
With these initial questions out of the way, **you now have a choice**:

1. You can proceed directly to the **How to deploy and execute?** section at the end of this document to learn how to
   use CLI to run a Neutron localnet, deploy our example contract and interact with it,
2. Or you can read the **How do I write a smart contract for Neutron?** section first if you want to understand the
   inner workings of our example contract.

:::

## How do I write a smart contract for Neutron?

### Storage: how to I store data?

:::tip TL;DR
Use `cw_storage_plus::Item` and `cw_storage_plus::Map` types to store standard and custom types.

See it in context: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L17)
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

> **A note on project layout:** usually all storage items and storage types are defined in a separate
> file (`src/state.rs`), alongside the `src/contract.rs` file. Here we define everything in one place for the sake of
> simplicity.

### Instantiation: how do I initialise a contract?

:::tip TL;DR

Implement the `instantiate()` entrypoint and the `InstantiateMsg` message to have custom instantiation logic for your
contract.

See it in context: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L19-L64)
:::

#### InstantiateMsg

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct InstantiateMsg {
    initial_value: Uint128,
}
```

In the snippet above, 2 things happen: the definition of `InstantiateMsg`, and the implementation of the `instantiate()`
entry point.

`InstantiateMsg` can carry any information we might find useful while populating our new contract. In our
case, we decided to use `InstantiateMsg` to set the initial value of the `COUNTER` storage item that was initialised in
the previous section.

> **Note:** You need to add the `#[derive(Serialize, <...> JsonSchema)]` derive macro to the definitions of your custom
> types (so that they can be properly serialised by Rust).

> **Note:** A common practice in the CosmWasm world is to define a `Config` type, create a storage item for it and then
> to set the initial values for `Config` parameters in the `InstantiateMsg`.

> **A note on project layout:** usually all messages are defined in a separate file (`src/state.rs`), alongside
> the `src/contract.rs` file. Here we define everything in one place for the sake of simplicity.

#### `instantiate()` entrypoint

```rust
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

The `instantiate()` entry point expects the following arguments:

* **deps**: most importantly, gives you access to the _storage_ and the _querier_ (we'll discuss queries later),
* **env**:  keeps information about the execution environment, e.g., the address of the current contract,
* **info**: keeps information about the message that is currently executed, e.g., the address of the message sender,
* **msg**:  the `InstantiateMsg` that we just defined.

> **Note:** `deps`, `env`, `info` and `msg` values are provided automatically by the `wasmd` module when executing a
> contract's entrypoint. Most entry points expect a very similar set of arguments, with slight variations.

Our `instantiate()` implementation sets the value of the `COUNTER` storage item to `InstantiateMsg.initial_value`. This
is our first time saving something to storage, which is quite exciting!

> **Note:** Reading and writing to storage consumes gas, which costs money.

Finally, in our `instantiate()` implementation, we add **attributes** to the successful `Response`. This helps with
debugging (we'll cover this in the last section of Part 1). Adding attributes to your response acts like a form of
logging. Alternatively, we could just return `Ok(Response::new())`, and that would work perfectly fine.

<details><summary><b>Important information:</b> errors and errors handling</summary>
<p>

The return type of our entrypoint is `Result<Response<NeutronMsg>, ContractError>`. In simple terms, this means that
it can either return a valid `Response` or a `ContractError`.

If this was really a **minimal** example, we would not define our own error type, and would simply
return `Err(StdError::generic_err("error message"))` in case of an error. However, in most cases you want to define
contract-specific errors, which we will do in the next section.

You might not have noticed it, but in our implementation of the `instantiate()` entrypoint we do some minimal error
handling!

Storage operations can potentially fail (although they usually succeed). In our implementation, if the `.save()` call
fails for whatever reason, we immediately propagate the error by putting the `?` operator at the end of the `.save()`
call. It's also possible to handle errors manually using Rust's `match`
operator (
see [Rust documentation](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#matching-on-different-errors)).

</p>
</details>

### Processing messages: how do I make a contract do something?

:::tip TL;DR

Define all possible messages that your contract needs to process, implement handlers for each of those messages, and
match the messages to handlers in the `execute()` entrypoint.

See it in context: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L66-L147)
:::

#### `ExecuteMsg`: defining the set of possible actions

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    IncreaseCount { amount: Uint128 },
}
```

> **Note:** `#[serde(rename_all = "snake_case")]` is used to achieve "standard" JSON representation of messages. E.g.,
> the JSON representation of the `IncreaseCount` message will look like this: `{"increase_count": {"amount": "42"}}`

When you start developing a contract, the first thing that you need to figure out is what actions to you want the
contract to perform.

In the snippet above, we define the `ExecuteMsg` enum that has a single variant: the `IncreaseCount` message, which
a `Uint128` amount field. This means that our contract is going to be able to process only one type of message.

Let's say that upon receiving this message, the contract must increase the `COUNTER` storage item value by the `amount`
specified in the message, if the `amount` is less than 100. Matching this particular logic to the `IncreaseCount`
message type is done in the `execute()` entrypoint.

> **A note on project layout:** usually all messages are defined in a separate file (`src/msgs.rs`), alongside the
> `src/contract.rs` file. Here we define everything in one place for the sake of simplicity.

#### `execute()` entrypoint: defining handlers for messages

```rust
pub const MAX_INCREASE_AMOUNT: Uint128 = Uint128::new(100u128);

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    /// Keep access to the StdError, just in case.
    #[error(transparent)]
    Std(#[from] StdError),

    /// We will return this error if the user tries to increment the counter by
    /// more than 100. For no particular reason.
    #[error("Can not increment by more than 100 (got {amount})")]
    InvalidIncreaseAmount { amount: Uint128 },
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env, // We don't use Env in our implementation, hence the underscore
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response<NeutronMsg>, ContractError> {
    match msg {
        ExecuteMsg::IncreaseCount { amount } => execute_increase_amount(deps, info, amount),
    }
}

pub fn execute_increase_amount(
    deps: DepsMut,
    info: MessageInfo,
    amount: Uint128,
) -> Result<Response<NeutronMsg>, ContractError> {
    // Return the InvalidIncreaseAmount error if the user tries to increase
    // by more than 100. We save this value in a well-named constant
    // MAX_INCREASE_AMOUNT because we are nice people.
    if amount.gt(&MAX_INCREASE_AMOUNT) {
        return Err(ContractError::InvalidIncreaseAmount { amount });
    }

    // We need to increase the counter. Step 1: load the current value.
    // This operation consumes gas!
    let mut counter = COUNTER.load(deps.storage)?;

    // Step 2: add the user value to the value loaded from the storage.
    counter += amount;

    // Step 3: save the increased amount to the storage.
    COUNTER.save(deps.storage, &counter)?;

    Ok(Response::default()
        .add_attribute("action", "execute_add")
        .add_attribute("amount", amount.to_string())
        .add_attribute("sender", info.sender))
}
```

In most contracts, the `execute()` entry point doesn’t contain specific logic itself; it simply delegates tasks to the
appropriate handlers based on the message type. That’s exactly what we did in the snippet above: we implemented
the `execute_increase_amount()` handler and directed our contract to use it when an `IncreaseCount` message is received.

> **Note:** If the incoming message cannot be parsed into any known message type, an error will be returned.

Here are a few important points:

1. We set the maximum allowed increase amount using the `MAX_INCREASE_AMOUNT` constant, following best practices.
2. We defined the `ContractError` type to return custom errors. The `InvalidIncreaseAmount` variant includes
   the `amount` parameter to make the error message more informative.
3. If the user tries to increase the counter by more than `MAX_INCREASE_AMOUNT`, we return an error. (First time in this
   tutorial, right? **Exciting!**)
4. If the user input is valid, we load the current counter value from storage, increase it by the specified amount, and
   save the new value back to storage.
5. Similar to the `instantiate()` implementation, we add some attributes to the response to facilitate easier debugging.

### Querying data: how do I... query data?

:::tip TL;DR

Define all possible query messages that your contract needs to process, implement handlers for each of those messages,
and match the messages to handlers in the `query()` entrypoint.

See it in context: [link](https://github.com/neutron-org/onboarding/blob/main/minimal_contract/src/contract.rs#L66-L147)
:::

Querying the raw storage data from a smart contract is **technically** possible, but is not very convenient. If you want
your contract to provide information about it state, you need to (guess what?) implement the `QueryMsg` and the
`query()` entrypoint. The process is very similar to what we did with the `execute()` entrypoint, the only difference
being that in the `query()` entrypoint you can not modify the state, and that you don't have the `MessageInfo` data in
it.

```rust
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    /// A query message to get the current value of COUNTER. The #[returns(Uint128)]
    /// derive marco here is required to generate proper JSON schemas for out smart
    /// contract.
    #[returns(Uint128)]
    CurrentValue {},
}

/// We could simply read the Uint128 value from storage and return it as is,
/// but in general it's better to provide a custom response types for your
/// queries.
#[cw_serde]
pub struct CurrentValueResponse {
    pub current_value: Uint128,
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    // Similar to execute(), we try to parse msg into any of the known variants of QueryMsg.
    match msg {
        QueryMsg::CurrentValue {} => query_current_value(deps),
    }
}

pub fn query_current_value(deps: Deps) -> StdResult<Binary> {
    let current_value = &COUNTER.load(deps.storage)?;
    // to_json_binary is a handy helper function from cosmwasm_std that allows you
    // to convert any properly defined Rust type to StdResult<Binary>.
    to_json_binary(&CurrentValueResponse {
        current_value: current_value.clone(),
    })
}
```

A few things to note here:

* Creating custom response types for your queries is not necessary, but is a good practice, even if you only return a
  single number.
* If our contract was a bit more complicated, we could, of course, create a query message with some query parameters,
  and process the query taking the query parameters into account.
* You are not limited to only reading your own storage values in the `query()` entrypoint; you can also query other
  contracts, and even modules, if necessary. We'll teach you how to do it in **Part 3** of this tutorial.

> **A note on project layout:** usually all custom response types are defined in a separate file (`src/query.rs`),
> alongside the `src/contract.rs` file. Here we define everything in one place for the sake of simplicity.

## How to deploy and execute?

### Prepare the environment

First of all, you need to install Rust: https://doc.rust-lang.org/cargo/getting-started/installation.html. After
installing Rust, you need to add a wasm target for cargo:

```bash
rustup target add wasm32-unknown-unknown
```

Next, install Docker: https://docs.docker.com/engine/install/. You need Docker to build reproducible wasm
binaries and to run the localnet.

Create a directory for this tutorial, e.g.:

```
mkdir neutron-cosmwasm-tutorial-part-1 && cd neutron-cosmwasm-tutorial-part-1
```

Next, you need to get a `neutrond` binary. If you don't have Go installed, install Go 1.21 (https://go.dev/dl/).

Clone the Neutron repository and install the `neutrond` binary:

```bash
git clone https://github.com/neutron-org/neutron && cd neutron && make install && cd ..
```

This will put the `neutrond` binary to your `$GOPATH/bin`. If you don't have `$GOPATH/bin` exported yet, export it now
to be able to execute the binary conveniently from anywhere on your machine:

```bash
export PATH=$PATH:$GOPATH/bin
```

Finally, clone the onboarding tutorial repo:

```bash
git clone git@github.com:neutron-org/onboarding.git
cd onboarding
```

### Run the localnet

First, install the `cosmopark` tool that allows you to run custom Neutron localnet setups (input `y` when prompted to
install the package):

```bash
npx @neutron-org/cosmopark --help
```

Next, build the images that are required to run a localnet of Neutron consisting of Neutron itself, Gaia, and IBC
relayer and an interchain queries relayer. This might be a bit of overkill for our current purposes, but it's good
to know how to run a real world setup:

```bash
./dockerfiles/build-all.sh
```

Then, start the local network:

```bash
npx @neutron-org/cosmopark@latest start localnet_config.json
🚀 Starting
{"level":30,"time":1719406723924,"pid":85823,"hostname":"Andreis-MBP","chain":"neutron","msg":"Starting ics chain neutron"}
<...>
🥳 Done
{"level":20,"time":1729261511883,"pid":52118,"hostname":"Andreis-MBP","context":"main","msg":"cosmopark started"}
```

> **Note:** if you want to shut down the localnet, run `npx @neutron-org/cosmopark@latest stop localnet_config.json`.

Now you have several containers running on your local machine. One of them is `main-neutron_ics-1`, which is the
container running Neutron.

In order to execute any messages, you need to import a key using one of the localnet mnemonics:

```bash
neutrond keys add demowallet1 --recover
> Enter your bip39 mnemonic
> kiwi valid tiger wish shop time exile client metal view spatial ahead

- address: neutron13nfu3ct5xkr0vlswgk3gl9zazp7zan88edz67j
  name: demowallet1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AqVGLu0hlIfruwPYSddOyDmiy7a2kZ0mJ3Qan8vwzXak"}'
  type: local
```

> **Note:** you can find more demo mnemonics in the `localnet_config.json` file.

> **Important note:** you can also import your account from a Ledger by
> running `neutrond keys add my_ledger_account --ledger`. Your private key won't be transferred, obviously; to use
> an account created this way to execute transactions you will always need to specify the `--ledger` flag in addition
> to the flags normally provided to a command.

To make sure that everything works well, query the balance of your account:

```bash
neutrond q bank balances neutron13nfu3ct5xkr0vlswgk3gl9zazp7zan88edz67j --node tcp://0.0.0.0:26657
balances:
- amount: "999975000"
  denom: untrn
pagination:
  next_key: null
  total: "0"

```

### Compile the contract binary

Go to the `minimal_contract` project directory in the `onboarding` repository:

```bash
cd onboarding/minimal_contract
```

Then build the contract binary:

```bash
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  --platform linux/amd64 \
  cosmwasm/optimizer:0.16.0
cd ..
```

You will find the compiled binary in `minimal_contract/artifacts/minimal_contract.wasm`.

### Upload the contract

First, you need to upload the contract binary (copy the `txhash` value from the last line of the command output!):

```bash
neutrond tx wasm store minimal_contract/artifacts/minimal_contract.wasm \
 --node tcp://0.0.0.0:26657 --chain-id ntrntest --gas 3000000 \
 --fees 10000untrn --from demowallet1
```

Let's see what the command arguments stand for here, because **it's very important for your general understanding of how
Neutron works**:

* `minimal_contract/artifacts/minimal_contract.wasm`: path to the compiled contract binary.
* `--node tcp://0.0.0.0:26657`: address of the Neutron node's RPC endpoint. This particular port is exposed by
  the `main-neutron_ics-1` container that we started in the previous section; for mainnet RPC providers, please visit
  the [mainnet chain registry](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json#L208); for
  testnet RPC providers, please visit
  the [testnet chain registry](https://github.com/cosmos/chain-registry/blob/master/testnets/neutrontestnet/chain.json#L151).
* `--chain-id ntrntest`: the chain identifier; any running Cosmos chain has an identifier that you need to provide for
  all `tx` commands. We gave this identifier to our localnet in the `localnet_config.json` file. You can find the
  mainnet `chain_id` [here](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json#L7), and the
  testnet `chain_id` [here](https://github.com/cosmos/chain-registry/blob/master/testnets/neutrontestnet/chain.json#L7).
* `--gas 1500000`: the gas limit for this transaction; if your gas limit is too low, the transaction will fail. If the
  transaction failed, you can query the transaction details (shown below) to see what amount of gas was actually
  consumed by the transaction.
* `--fees 4000untrn`: the amount that you are ready to pay for executing the transaction; if your fee is too low, the
  transaction will fail. If the transaction failed, you can query the transaction details (shown below) to see what fee
  was actually required to execute the transaction.
* `--from demowallet1`: the account that you are using to sign this transaction.

Next, you need to get the `code_id` of the binary that you just uploaded:

```bash
neutrond q tx 855C2F0D3E120D986B65EB250BBB3C24ED38F7251E928F03DB96AF8186C00973 --output json \
  --node tcp://0.0.0.0:26657 | jq ".events[8]"  
{
  "type": "store_code",
  "attributes": [
    {
      "key": "code_checksum",
      "value": "5aca867b2af7295c7ff224dd62605a8f1601ccee73161ed41e4c43034327f021",
      "index": true
    },
    {
      "key": "code_id",
      "value": "20",
      "index": true
    }
  ]
}
```

You can see in the output above that the `code_id` of our contract binary is `19`. Now that we know it, we can finally
instantiate our contract (once again, copy the `txhash` value):

```bash
neutrond tx wasm instantiate 20 '{"initial_value": "42"}' --label minimal_contract \
  --no-admin --node tcp://0.0.0.0:26657 --from demowallet1 --chain-id ntrntest \
  --gas 3000000 --fees 10000untrn
```

Lets have a look at the transaction arguments and flags once again:

* `20`: the `code_id` that we got after uploading our compiled binary. As we mentioned previously, you can instantiate
  multiple identical contracts from one `code_id`!
* `'{"initial_value": "42"}'`: that's our `InstantiateMsg` that we defined in our contract. If we provided a JSON that
  could not be parsed into `InstantiateMsg`, we would receive an error.
* `--label minimal_contract`: every CosmWasm contract needs to have a user-defined label.
* `--no-admin` means that we created our contract without an admin address. The admin address can _migrate_ a contract.

Now, we need to query the transaction details to get the address of the instantiated contract:

```bash
neutrond q tx B45E9D20A5744A81C2C3B0E75D0E740E56E0E0FD20206DDFC77F6FCFE11333B8 --output json --node tcp://0.0.0.0:26657 | jq ".events[8]"
{
  "type": "instantiate",
  "attributes": [
    {
      "key": "_contract_address",
      "value": "neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj",
      "index": true
    },
    {
      "key": "code_id",
      "value": "20",
      "index": true
    }
  ]
}
```

**Congratulations!** The contract is now instantiated, and is ready to process our messages.

:::warning Contract addresses

The address of your contract might be different from what you see in this tutorial. Make sure that you are replacing
the addresses from the commands below with the address of **your** contract!

:::

### Interact with the contract

Now that the contract is instantiated and we know its address, let's first see whether what that current value of the
counter is:

```bash
neutrond q wasm contract-state smart neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj \
  '{"current_value": {}}' --output json --node tcp://0.0.0.0:26657
{"data":{"current_value":"42"}}
```

> **Important note:** we have the number as a string here because that's how `Uint128` is represented (it's a potentially
> very big number). When using `Uint128` value in JSON, you need to provide them as strings.

The current value is `42`, which means that our instantiate message did its job. Let's now increase the value by
`1` by sending an `IncreaseCount` message to it:

```bash
neutrond tx wasm execute neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj \
  '{"increase_count": {"amount": "1"}}' --node tcp://0.0.0.0:26657 --from demowallet1 \
  --chain-id ntrntest --gas 1500000 --fees 4000untrn
```

* `neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj`: the address of our instantiated contract.
* `'{"increase_count": {"amount": "1"}}'`: the JSON representation of the `ExecuteMsg::IncreaseCount` message that we
  defined in our contract.

If we query the contract once again, we'll see that the current value was increased by 1:

```bash
neutrond q wasm contract-state smart neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj \
  '{"current_value": {}}' --output json --node tcp://0.0.0.0:26657
{"data":{"current_value":"43"}}
```

## Conclusion

In this first part of the tutorial, you learned how to create a simple, yet functional smart contract using CosmWasm, 
and to deploy and interact with it locally. In the second part of the tutorial, you will learn how to interact with
Neutron modules and other smart contracts.