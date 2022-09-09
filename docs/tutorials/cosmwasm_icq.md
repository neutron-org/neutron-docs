# CosmWasm + ICQ

This section contains a tutorial for writing smart contracts that utilize Interchain Queries Module.

## Overview

We are going to learn how to:

1. Install dependencies and import the libraries.
2. Register different Interchain Queries.
3. Get results from the registered Interchain Queries.
4. Manage the registered Interchain Queries.

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
    query_balance, query_registered_query,
};
use neutron_sdk::interchain_queries::{
    register_balance_query_msg,
    register_transfers_query_msg,
};
use neutron_sdk::sudo::msg::SudoMsg;
use neutron_sdk::{NeutronError, NeutronResult};
```

## 2. Register an Interchain Query

Neutron allows a smart contract to register multiple interchain queries:

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RegisterBalanceQuery {
        connection_id: String,
        update_period: u64,
        addr: String,
        denom: String,
    },
    RegisterTransfersQuery {
        connection_id: String,
        update_period: u64,
        recipient: String,
        min_height: Option<u128>,
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    _: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response<NeutronMsg>> {
    match msg {
        ExecuteMsg::RegisterBalanceQuery {
            connection_id,
            addr,
            denom,
            update_period,
        } => register_balance_query(
            deps,
            env,
            connection_id,
            addr,
            denom,
            update_period,
        ),
        ExecuteMsg::RegisterTransfersQuery {
            connection_id,
            recipient,
            update_period,
            min_height,
        } => register_transfers_query(
            deps,
            env,
            connection_id,
            recipient,
            update_period,
            min_height,
        ),
    }
}

pub fn register_balance_query(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    connection_id: String,
    addr: String,
    denom: String,
    update_period: u64,
) -> NeutronResult<Response<NeutronMsg>> {
    let msg = register_balance_query_msg(
        deps,
        env,
        connection_id.clone(),
        addr.clone(),
        denom.clone(),
        update_period,
    )?;

    let attrs: Vec<Attribute> = vec![
        attr("action", "register_interchain_balance_query"),
        attr("connection_id", connection_id.as_str()),
        attr("update_period", update_period.to_string()),
        attr("denom", denom),
        attr("addr", addr),
    ];

    Ok(Response::new().add_message(msg).add_attributes(attrs))
}

pub fn register_transfers_query(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    connection_id: String,
    recipient: String,
    update_period: u64,
    min_height: Option<u128>,
) -> NeutronResult<Response<NeutronMsg>> {
    let msg = register_transfers_query_msg(
        deps,
        env,
        connection_id.clone(),
        recipient.clone(),
        update_period,
        min_height,
    )?;

    let attrs: Vec<Attribute> = vec![
        attr("action", "register_interchain_transfers_query"),
        attr("connection_id", connection_id.as_str()),
        attr("update_period", update_period.to_string()),
        attr("recipient", recipient),
    ];

    Ok(Response::new().add_message(msg).add_attributes(attrs))
}
```

> **Note:** the ICQ module's `RegisterInterchainQueryMsg` message [returns](/neutron-core/interchain-queries/messages#register-interchain-query)
> an identifier of newly registered Interchain Query in response. So in a real world scenario you should implement a `reply` handler in your contract
> to catch the identifier after the registration, so you'll be able to work with the registered query later.

In the snippet above, we create the `ExecuteMsg` enum that contains two `Register` messages for two different queries:
* `RegisterBalanceQuery` - a simple KV-query to query a balance of an account on remote chain;
* `RegisterTransfersQuery` - a TX-query to query transfers transactions to a some recipient on remote chain.

> **Note:** in a real-world scenario you wouldn't want just anyone to be able to make your contract register interchain
> query, so it might make sense to add ownership checks

And implement a simple handlers `register_balance_query` and `register_transfers_query` for these messages. Each handler
uses built-in helpers from Neutron-SDK to create necessary register messages: `register_balance_query_msg` and `register_transfers_query_msg`:
* `register_balance_query_msg` - is a KV-query, therefore it creates an Interchain Query with necessary KV-keys to read
from remote chain and build a full `Balance` response from KV-values (you can see a full implementation of the helper in the [SDK source code](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/register_queries.rs#L61)):
```rust
pub fn register_balance_query_msg(...) -> NeutronResult<NeutronMsg> {
    // convert bech32 encoded address to a bytes representation
    let converted_addr_bytes = decode_and_convert(addr.as_str())?;

    // creates a balance KV-key with necessary prefixes we want to read from the storage on remote chain
    let balance_key = create_account_denom_balance_key(converted_addr_bytes, denom)?;

    let kv_key = KVKey {
        path: BANK_STORE_KEY.to_string(),
        key: Binary(balance_key),
    };
    ...
}
```
* `register_transfers_query_msg` - is a TX-query, therefore it creates an Interchain Query with necessary TX-filter 
to receive only required transactions from remote chain (you can see a full implementation of the helper in the [SDK source code](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/register_queries.rs#L95)):
```rust
pub fn register_transfers_query_msg(...) -> NeutronResult<NeutronMsg> {
    // in this case the function creates filter to receive only transactions with transfer msg in it with a particular recipient
    let mut query_data: Vec<TransactionFilterItem> = vec![TransactionFilterItem {
        field: RECIPIENT_FIELD.to_string(),
        op: TransactionFilterOp::Eq,
        value: TransactionFilterValue::String(recipient),
    }];
    ...
}
```

> **Note:** Neutron SDK is shipped with a lot of helpers to register different Interchain Queries (you can find a full list [here](TODO_LINK)).
> But if you don't find some particular register query helper in the SDK, you can always implement your own using implementations from SDK as a reference.

## 3. Get results from the registered Interchain Queries

### Get results from KV-queries
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetRegisteredQuery { query_id: u64 },
    Balance { query_id: u64 },
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps<InterchainQueries>, env: Env, msg: QueryMsg) -> NeutronResult<Binary> {
    match msg {
        QueryMsg::GetRegisteredQuery { query_id } => {
            Ok(to_binary(&get_registered_query(deps, query_id)?)?)
        },
        QueryMsg::Balance { query_id } => Ok(to_binary(&query_balance(deps, env, query_id)?)?)
    }
}
```

In the snippet above we create the `QueryMsg` enum that contains two msgs `Balance` and `GetRegisteredQuery` and a `query`
entrypoint which handles the defined query msgs:
* the handler of `GetRegisteredQuery` uses [built-in SDK helper](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/queries.rs#L51) `get_registered_query` to get all the information about
any registered query by its id;
* the handler of `Balance` is much more interesting. It uses [built-in SDK helper](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/queries.rs#L87) `query_balance` to query interchain balance:
```rust
pub fn query_balance(
    deps: Deps<InterchainQueries>,
    _env: Env,
    registered_query_id: u64,
) -> NeutronResult<BalanceResponse> {
    // get info about the query
    let registered_query = get_registered_query(deps, registered_query_id)?;
    // check that query type is KV
    check_query_type(registered_query.registered_query.query_type, QueryType::KV)?;
    // reconstruct a nice Balances structure from raw KV-storage values
    let balances: Balances = query_kv_result(deps, registered_query.registered_query.id)?;

    Ok(BalanceResponse {
        // last_submitted_height tells us when the query result was updated last time (block height)
        last_submitted_local_height: registered_query
            .registered_query
            .last_submitted_result_local_height,
        balances,
    })
}
```
The most import function here is `query_kv_result`:
```rust
/// Reads submitted raw KV values for Interchain Query with **query_id** from the storage and reconstructs the result
pub fn query_kv_result<T: KVReconstruct>(
    deps: Deps<InterchainQueries>,
    query_id: u64,
) -> NeutronResult<T> {
    let registered_query_result = get_interchain_query_result(deps, query_id)?;

    KVReconstruct::reconstruct(&registered_query_result.result.kv_results)
}
```
It is built-in into SDK, and it uses `KVReconstruct` [trait](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/types.rs#L148)
to reconstruct KV-storage values into a nice structure.
Meaning any structure that implements `KVReconstruct` trait can be used with `query_kv_result` helper.
In our case we want to reconstruct `Balances` from KV-values. `Balances` is a build-in SDK structure and it already [implements](https://github.com/neutron-org/neutron-contracts/blob/a47bfac69667da57f8bf6ea81c9f16240e145c6d/packages/neutron-sdk/src/interchain_queries/types.rs#L176)
`KVReconstruct` trait, so no additional functionality is required from developers, you can just import and use it as it is:
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
/// A structure that can be reconstructed from **StorageValues**'s for the **Balance Interchain Query**.
/// Contains coins that are held by some account on remote chain.
pub struct Balances {
    pub coins: Vec<Coin>,
}

impl KVReconstruct for Balances {
    fn reconstruct(storage_values: &[StorageValue]) -> NeutronResult<Balances> {
        let mut coins: Vec<Coin> = vec![];

        for kv in storage_values {
            let balance: CosmosCoin = CosmosCoin::decode(kv.value.as_slice())?;
            let amount = Uint128::from_str(balance.amount.as_str())?;
            coins.push(Coin::new(amount.u128(), balance.denom));
        }

        Ok(Balances { coins })
    }
}
```

> **Note:** Neutron SDK is shipped with a lot of query structures to reconstruct different Interchain Queries (you can find a full list [here](TODO_LINK)).
> But if you don't find some particular structure in the SDK, you can always implement your own using implementations from SDK as a reference.
> All you need to do is just implement the `KVReconstruct` trait for your structure, and after that you can easily use this with `query_kv_result` helper like this:
> ```rust
let response: YourStructure = query_kv_result(deps, query_id)?
> ```

Sometimes you might want to get KV Interchain Queries result immediately after it was published by the [ICQ relayer](/relaying/icq-relayer-guide).
That's why we've implemented **KV Queries Callbacks**, which allows you to get a callback in your contract with the query result when the relayer submits it.
KV callbacks are implemented via **Sudo** calls in your smart-contract:
```rust
#[entry_point]
pub fn sudo(deps: DepsMut<InterchainQueries>, env: Env, msg: SudoMsg) -> NeutronResult<Response> {
    match msg {
        SudoMsg::KVQueryResult { query_id } => sudo_kv_query_result(deps, env, query_id),
        _ => Ok(Response::default()),
    }
}

/// sudo_kv_query_result is the contract's callback for KV query results. Note that only the query
/// id is provided, so you need to read the query result from the state.
pub fn sudo_kv_query_result(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    query_id: u64,
) -> NeutronResult<Response> {
    deps.api.debug(
        format!(
            "WASMDEBUG: sudo_kv_query_result received; query_id: {:?}",
            query_id,
        )
            .as_str(),
    );

    Ok(Response::default())
}
```
In the snippet above we implement a `sudo` entrypoint to catch all the `KVQueryResult` callbacks, and we define
`sudo_kv_query_result` handler to process the callback. In this particular handler we don't anything, but print some debug info to the log.
But there could be any logic you want.

### Get results from TX-queries
Unlike KV-queries result, TX-queries results are not saved to the storage by the Neutron ICQ Module (on Cosmos-SDK level).
TX-queries are supported only in _callback way_, so to get result from TX-queries you have to work with `sudo` callbacks and save results to the storage by yourself if you need:
```rust
#[entry_point]
pub fn sudo(deps: DepsMut<InterchainQueries>, env: Env, msg: SudoMsg) -> NeutronResult<Response> {
    match msg {
        SudoMsg::TxQueryResult {
            query_id,
            height,
            data,
        } => sudo_tx_query_result(deps, env, query_id, height, data)
    }
}

/// sudo_check_tx_query_result is an example callback for transaction query results that stores the
/// deposits received as a result on the registered query in the contract's state.
pub fn sudo_tx_query_result(
    deps: DepsMut<InterchainQueries>,
    _env: Env,
    query_id: u64,
    _height: u64,
    data: Binary,
) -> NeutronResult<Response> {
    // Decode the transaction data
    let tx: TxRaw = TxRaw::decode(data.as_slice())?;
    let body: TxBody = TxBody::decode(tx.body_bytes.as_slice())?;

    // Get the registered query by ID and retrieve the raw query string
    let registered_query: QueryRegisteredQueryResponse =
        get_registered_query(deps.as_ref(), query_id)?;
    let transactions_filter = registered_query.registered_query.transactions_filter;

    #[allow(clippy::match_single_binding)]
    // Depending of the query type, check the transaction data to see whether is satisfies
    // the original query. If you don't write specific checks for a transaction query type,
    // all submitted results will be treated as valid.
    match registered_query.registered_query.query_type.as_str() {
        _ => {
            // For transfer queries, query data looks like `[{"field:"transfer.recipient", "op":"eq", "value":"some_address"}]`
            let query_data: Vec<TransactionFilterItem> =
                serde_json_wasm::from_str(transactions_filter.as_str())?;

            let recipient = query_data
                .iter()
                .find(|x| x.field == RECIPIENT_FIELD && x.op == TransactionFilterOp::Eq)
                .map(|x| match &x.value {
                    TransactionFilterValue::String(v) => v.as_str(),
                    _ => "",
                })
                .unwrap_or("");

            let deposits = recipient_deposits_from_tx_body(body, recipient)?;
            // If we didn't find a Send message with the correct recipient, return an error, and
            // this query result will be rejected by Neutron: no data will be saved to state.
            if deposits.is_empty() {
                return Err(NeutronError::Std(StdError::generic_err(
                    "failed to find a matching transaction message",
                )));
            }

            let mut stored_transfers: u64 = TRANSFERS.load(deps.storage).unwrap_or_default();
            stored_transfers += deposits.len() as u64;
            TRANSFERS.save(deps.storage, &stored_transfers)?;

            check_deposits_size(&deposits)?;
            let mut stored_deposits: Vec<Transfer> = RECIPIENT_TXS
                .load(deps.storage, recipient)
                .unwrap_or_default();
            stored_deposits.extend(deposits);
            RECIPIENT_TXS.save(deps.storage, recipient, &stored_deposits)?;
            Ok(Response::new())
        }
    }
}
```
In the snippet above we implement a `sudo` entrypoint to catch all the `TXQueryResult` callbacks, and we define
`sudo_tx_query_result` handler to process the callback.
In the handler we decode the transaction data at first, try to parse messages in the transaction, check that transaction really satisfies our defined filter
and do some business logic (in our case we just save transfer to the storage).

> **IMPORTANT NOTICE:** It's necessary to check that then result transaction satisfies your filter. Although Neutron guarantees that transaction is valid
> (meaning transaction is really included in a block on remote chain, it was executed successfully, signed properly, etc.), Neutron *can not* guarantee you
> that result transaction satisifies defined filter. You must always check this in your contract!

## 4. Manage registered Interchain Queries

In some cases you may need to update Interchain Queries parameters (update period, KV-keys, tx filter, etc) or even remove a
query from the Neutron.
Neutron allows you to do these actions via `Update` and `Remove` messages:
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ...
    UpdateInterchainQuery {
        query_id: u64,
        new_keys: Option<Vec<KVKey>>,
        new_update_period: Option<u64>,
    },
    RemoveInterchainQuery {
        query_id: u64,
    },
    ...
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut<InterchainQueries>,
    env: Env,
    _: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response<NeutronMsg>> {
    match msg {
        ...
        ExecuteMsg::UpdateInterchainQuery {
            query_id,
            new_keys,
            new_update_period,
        } => update_interchain_query(query_id, new_keys, new_update_period),
        ExecuteMsg::RemoveInterchainQuery { query_id } => remove_interchain_query(query_id),
        ...
    }
}

pub fn update_interchain_query(
    query_id: u64,
    new_keys: Option<Vec<KVKey>>,
    new_update_period: Option<u64>,
) -> NeutronResult<Response<NeutronMsg>> {
    let mut attributes = vec![
        attr("action", "update_interchain_query"),
        attr("query_id", query_id.to_string()),
    ];
    if let Some(keys) = new_keys.clone() {
        attributes.push(attr("new_keys", KVKeys(keys)))
    }
    if let Some(update_period) = new_update_period {
        attributes.push(attr("new_update_period", update_period.to_string()))
    }
    let update_msg = NeutronMsg::update_interchain_query(query_id, new_keys, new_update_period);
    Ok(Response::new()
        .add_message(update_msg)
        .add_attributes(attributes))
}

pub fn remove_interchain_query(query_id: u64) -> NeutronResult<Response<NeutronMsg>> {
    let remove_msg = NeutronMsg::remove_interchain_query(query_id);
    Ok(Response::new().add_message(remove_msg).add_attributes(vec![
        attr("action", "remove_interchain_query"),
        attr("query_id", query_id.to_string()),
    ]))
}
```

In the snippet above we add `UpdateInterchainQuery` and `RemoveInterchainQuery` to our `ExecuteMsg` enum and define corresponding
handlers `update_interchain_query` and `remove_interchain_query` which basically just issue proper Neutron msgs to update and remove interchain query.
In a real world scenario such handlers must have ownership checks.