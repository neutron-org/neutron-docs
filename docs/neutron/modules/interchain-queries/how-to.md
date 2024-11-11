# How To

## How to choose the right IBC connection ID for an Interchain Query and verify it

Let's find an IBC connection between Neutron and CosmosHub.

#### 1. Find an already existing IBC connection using an explorer

Go to [map of zones](https://mapofzones.com/zones/neutron-1/peers?columnKey=ibcVolumeIn&period=7d). There might be several connections between two chains, so pick one of them. For Neutron and CosmosHub, let's pick the `connection-0`.

#### 2. Pick a neutron RPC node from the chain registry repo

Go to [Neutron's chain registry page](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json), pick an RPC node from the `apis` section, and specify it in the following `neutrond` queries using the `--node` flag.

#### 3. Gather neutron side info about the picket IBC connection

Find out the IBC client ID and the counterparty IBC info for the `connection-0` IBC connection.

<details> 
    <summary>Show code</summary>

```
neutrond q ibc connection end connection-0 --node https://rpc-voidara.neutron-1.neutron.org

connection:
client_id: 07-tendermint-0
counterparty:
    client_id: 07-tendermint-1119
    connection_id: connection-809
    ...
```
</details>

#### 4. Check the IBC connection counterparty chain ID

Check if the Neutron side IBC client's counterparty chain ID matches the ID of the chain you're up to point your Interchain Queries to.

<details> 
    <summary>Show code</summary>

```
neutrond q ibc client state 07-tendermint-0 --node https://rpc-voidara.neutron-1.neutron.org

client_state:
  ...
  chain_id: cosmoshub-4 << matches the CosmosHub chain ID
  ...
```
</details>

#### 5. Pick a CosmosHub RPC node from the chain registry repo

Go to [CosmosHub's chain registry page](https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json), pick an RPC node from the `apis` section, and specify it in the following `gaiad` queries using the `--node` flag.

#### 6. Make sure the CosmosHub's side counterparty is Neutron

Using the counterparty IBC info retrieved at the third step of this HowTo, do the opposite side checks: check that the CosmosHub's side IBC connection and client's counterparty info corresponds to Neutron's side IBC connection and client's info.

<details> 
    <summary>Show code</summary>

```
gaiad q ibc connection end connection-809 --node https://cosmoshub.tendermintrpc.lava.build:443

connection:
  client_id: 07-tendermint-1119 << matches the third step's connection.counterparty.client_id
  counterparty:
    client_id: 07-tendermint-0  << matches the third step's connection.client_id
    connection_id: connection-0  << matches the third step's connection-id query parameter
```

```
gaiad q ibc client state 07-tendermint-1119 --node https://cosmoshub.tendermintrpc.lava.build:443

client_state:
  ...
  chain_id: neutron-1 << matches the Neutron chain ID
  ...
```
</details>

## How to find out what transaction filter to use

Let's imagine that we need our Interchain Query based smart contract to know about undelegations done by `cosmos17s3uhcvrwrsp2ldjvxp8rseyc3ulpchdry87hp` on CosmosHub.

#### 1. Find the up-to-date source code of the staking module

Find out what is the current version of the `staking` module (imported from `cosmos-sdk`) CosmosHub runs and go to the module's source code:

1. Find the git repository and currently running version of CosmosHub in the [chain registry](https://github.com/cosmos/chain-registry/blob/e346b6dbc0d901eec5e8704e0a7736bfdaa3dca9/cosmoshub/chain.json#L36-L37) (use the main branch to get the up-to-date info) — `v19.2.0`;
2. Find the [cosmos-sdk](https://github.com/cosmos/gaia/blob/v19.1.0/go.mod#L24) import in the `go.mod` file of the `gaia` repository of `v19.2.0` — `v0.50.9`;
3. Open the `staking` module's source code in [cosmos-sdk with tag v0.50.9](https://github.com/cosmos/cosmos-sdk/tree/v0.50.9/x/staking).

#### 2. Find the handler that manages undelegations

Find the [Undelegate](https://github.com/cosmos/cosmos-sdk/blob/8bfcf554275c1efbb42666cc8510d2da139b67fa/x/staking/keeper/msg_server.go#L391-L392) entry point of the `staking` module's keeper.

#### 3. Find the events emitted on undelegations

Find the [event emission part](https://github.com/cosmos/cosmos-sdk/blob/8bfcf554275c1efbb42666cc8510d2da139b67fa/x/staking/keeper/msg_server.go#L447-L455) of the Undelegate handler code.

#### 4. Create a transactions query using the events

Pairing the emitted event type and required attributes, compose an exhaustive transaction filter. In this case, it's `unbond.delegator=cosmos17s3uhcvrwrsp2ldjvxp8rseyc3ulpchdry87hp` (`types.EventTypeUnbond`.`types.AttributeKeyDelegator`=`cosmos17s3uhcvrwrsp2ldjvxp8rseyc3ulpchdry87hp`).

#### 5. Try to get some results using the query

Try out the result query string in `gaiad q txs` query to make sure it works as expected.

<details> 
    <summary>Show code</summary>

```
gaiad q txs --query "unbond.delegator='cosmos17s3uhcvrwrsp2ldjvxp8rseyc3ulpchdry87hp'"

...
txs:
- code: 0
  ...
  height: "22645909"
  ...
    body:
      ...
      messages:
      - '@type': /cosmos.staking.v1beta1.MsgUndelegate
        amount:
          amount: "20045172"
          denom: uatom
        delegator_address: cosmos17s3uhcvrwrsp2ldjvxp8rseyc3ulpchdry87hp
        validator_address: cosmosvaloper1zqgheeawp7cmqk27dgyctd80rd8ryhqs6la9wc
```
</details>

**Might be interesting:**
- [Configuring your own remote chain RPC node for TX ICQ usage](/neutron/modules/interchain-queries/explanation#configuring-your-own-remote-chain-rpc-node-for-tx-icq-usage)

## How to register and handle a KV Interchain Query

This section contains a brief guide on how to register a KV Interchain Query and handle the query results using [neutron-std](https://docs.rs/neutron-std/4.2.2-rc/neutron_std) and [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk) libraries in a smart contract.

#### 1. Find the appropriate helper function in Neutron SDK

Find the register Interchain Query helper function that your needs require in the [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/index.html) repository. For this particular example, let's choose the [new_register_balances_query_msg](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/fn.new_register_balances_query_msg.html) function.

:::note Couldn't find the required helper function?
If there is no predefined helper function suitable for your needs in [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk), proceed to the [How to register a KV Interchain Query with custom keys](/neutron/modules/interchain-queries/how-to#how-to-register-a-kv-interchain-query-with-custom-keys) section.
:::

#### 2. Define Interchain Query registration entry point

Implement an `execute` message handler in your contract that will process Interchain Query registration using the helper function as a [submessage](https://docs.cosmwasm.com/docs/smart-contracts/message/submessage/).

<details> 
    <summary>Show code</summary>

```rust
use neutron_sdk::interchain_queries::v047::register_queries::new_register_balances_query_msg;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response> {
    match msg {
        ExecuteMsg::RegisterBalancesQuery {
            connection_id,
            addr,
            denoms,
            update_period,
        } => register_balances_query(env, connection_id, addr, denoms, update_period),
    }
}

pub fn register_balances_query(
    env: Env,
    connection_id: String,
    addr: String,
    denoms: Vec<String>,
    update_period: u64,
) -> NeutronResult<Response> {
    let msg = new_register_balances_query_msg(
        env.contract.address,
        connection_id,
        addr.clone(),
        denoms,
        update_period,
    )?;

    // Send the ICQ registration message as a submessage to receive a reply callback
    Ok(Response::new().add_submessage(SubMsg {
        id: REGISTER_BALANCES_ICQ_REPLY_ID,
        payload: to_json_binary(&addr)?,
        msg: msg,
        gas_limit: None,
        reply_on: ReplyOn::Success,
    }))
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_kv_icq/src/contract.rs#L47-L87)
</details>

#### 3. Define Interchain Query registration response handling

In the reply handler, decode the submessage result as a [MsgRegisterInterchainQueryResponse](https://docs.rs/neutron-std/4.2.2-rc/neutron_std/types/neutron/interchainqueries/struct.MsgRegisterInterchainQueryResponse.html) to get access to the assigned Interchain Query ID.

<details> 
    <summary>Show code</summary>

```rust
use neutron_std::types::neutron::interchainqueries::MsgRegisterInterchainQueryResponse;

#[entry_point]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> NeutronResult<Response> {
    match msg.id {
        REGISTER_BALANCES_ICQ_REPLY_ID => {
            // decode the reply msg result as MsgRegisterInterchainQueryResponse
            let resp = MsgRegisterInterchainQueryResponse::decode(
                msg.result
                    .into_result()
                    .map_err(StdError::generic_err)?
                    .msg_responses[0]
                    .clone()
                    .value
                    .to_vec()
                    .as_slice(),
            )?;

            // memorize the address that corresponds to the query id to use it later in the
            // SudoMsg::KVQueryResult handler.
            let addr: String = from_json(&msg.payload)?;
            ICQ_ID_TO_WATCHED_ADDR.save(deps.storage, resp.id, &addr)?;

            Ok(Response::default())
        }
        _ => Err(NeutronError::InvalidReplyID(msg.id)),
    }
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_kv_icq/src/contract.rs#L100-L125)
</details>

#### 4. Define Interchain Query results submission handling

Get the submitted Interchain Query result from the `interchainqueries` module's storage using [query_balance](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v047/queries/fn.query_balance.html) helper function and handle it.

<details> 
    <summary>Show code</summary>

```rust
use neutron_sdk::interchain_queries::v047::queries::query_balance;
use neutron_sdk::sudo::msg::SudoMsg;

#[entry_point]
pub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> NeutronResult<Response> {
    match msg {
        SudoMsg::KVQueryResult { query_id } => sudo_kv_query_result(deps, env, query_id),
        _ => Ok(Response::default()),
    }
}

/// The contract's callback for KV query results. Note that only the query id is provided, so you
/// need to read the query result from the state.
pub fn sudo_kv_query_result(deps: DepsMut, env: Env, query_id: u64) -> NeutronResult<Response> {
    // Get the last submitted ICQ result from the Neutron ICQ module storage
    let balance_resp = query_balance(deps.as_ref(), env.clone(), query_id)?;
    // Get the address that was registered for the ICQ
    let addr = ICQ_ID_TO_WATCHED_ADDR.load(deps.storage, query_id)?;

    // Put your business logic here
    // For this example we just preserve the freshly fetched balances in the contract's state
    REMOTE_BALANCES.save(deps.storage, addr, &balance_resp.balances)?;

    Ok(Response::default())
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_kv_icq/src/contract.rs#L127-L148)
</details>

#### 5. Perform Interchain Query registration

Broadcast a [ExecuteMsg::RegisterBalancesQuery](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_kv_icq/src/msg.rs#L10-L15) message to the contract with required parameters.

## How to register and handle a KV Interchain Query with custom keys

If your KV Interchain Query cannot be covered with the helpers from the [Interchain Queries related package](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/index.html) of [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk), you will need to define the KVKeys for your query yourself. For this particular example, let's register an [Account](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/proto/cosmos/auth/v1beta1/query.proto#L27-L31) Interchain Query to `cosmos-hub` `v21.0.0`.

#### 1. Figure out the respective data path and model 

Figure out how the data path to the required data is constructed and what the data model is. This can be done by the module's code investigation. Start with finding the [respective auth module gRPC handler](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/keeper/grpc_query.go#L62-L63) and then go deeper until you find what info exactly is written to the KVStore and at what path.

For this example, the information we require from the module's code is:
- the store key used at [module's keeper initialisation](https://github.com/cosmos/gaia/blob/db2cc90315161d6730551d795558aaa7664aea6f/app/keepers/keepers.go#L207) is [acc](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/types/keys.go#L11-L12);
- the data path is constructed as [accounts store prefix](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/types/keys.go#L22-L23) + [hex address representation](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/keeper/grpc_query.go#L72-L76);
- the data model is [BaseAccount](https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/types/auth.pb.go#L29-L37).

#### 2. Define Interchain Query registration entry point

Implement an `execute` message handler in your contract that will process Interchain Query registration by broadcasting a [MsgRegisterInterchainQuery](https://docs.rs/neutron-std/4.2.2-rc/neutron_std/types/neutron/interchainqueries/struct.MsgRegisterInterchainQuery.html) message as a [submessage](https://docs.cosmwasm.com/docs/smart-contracts/message/submessage/). Use the data path info found at the previous step to parametrize the message.

<details> 
    <summary>Show code</summary>

```rust
use neutron_std::types::neutron::interchainqueries::MsgRegisterInterchainQuery;

/// Store key for standard **auth** Cosmos-SDK module
pub const AUTH_STORE_KEY: &str = "acc";
/// Storage prefix for account-by-address store
/// <https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/types/keys.go#L22-L23>
pub const ACCOUNTS_PREFIX: u8 = 0x01;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response> {
    match msg {
        ExecuteMsg::RegisterAccountQuery {
            connection_id,
            addr,
            update_period,
        } => register_account_query(env, connection_id, addr, update_period),
    }
}

pub fn register_account_query(
    env: Env,
    connection_id: String,
    addr: String,
    update_period: u64,
) -> NeutronResult<Response> {
    // compose key as accounts store prefix + hex address representation
    let mut key: Vec<u8> = vec![ACCOUNTS_PREFIX];
    key.extend_from_slice(decode_and_convert(&addr)?.as_slice());

    let msg = MsgRegisterInterchainQuery {
        query_type: QueryType::KV.into(),
        keys: vec![KvKey {
            path: AUTH_STORE_KEY.to_string(),
            key: key,
        }],
        transactions_filter: String::default(),
        connection_id,
        update_period,
        sender: env.contract.address.to_string(),
    };

    // Send the ICQ registration message as a submessage to receive a reply callback
    Ok(Response::new().add_submessage(SubMsg {
        id: REGISTER_ACCOUNT_ICQ_REPLY_ID,
        payload: to_json_binary(&addr)?,
        msg: msg.into(),
        gas_limit: None,
        reply_on: ReplyOn::Success,
    }))
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_custom_kv_icq/src/contract.rs#L56-L102)
</details>

#### 3. Define Interchain Query registration response handling

In the reply handler, decode the submessage result as a [MsgRegisterInterchainQueryResponse](https://docs.rs/neutron-std/4.2.2-rc/neutron_std/types/neutron/interchainqueries/struct.MsgRegisterInterchainQueryResponse.html) to get access to the assigned Interchain Query ID.

<details> 
    <summary>Show code</summary>

```rust
use neutron_std::types::neutron::interchainqueries::MsgRegisterInterchainQueryResponse;

#[entry_point]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> NeutronResult<Response> {
    match msg.id {
        REGISTER_ACCOUNT_ICQ_REPLY_ID => {
            // decode the reply msg result as MsgRegisterInterchainQueryResponse
            let resp = MsgRegisterInterchainQueryResponse::decode(
                msg.result
                    .into_result()
                    .map_err(StdError::generic_err)?
                    .msg_responses[0]
                    .clone()
                    .value
                    .to_vec()
                    .as_slice(),
            )?;

            // memorize the address that corresponds to the query id to use it later in the
            // SudoMsg::KVQueryResult handler.
            let addr: String = from_json(&msg.payload)?;
            ICQ_ID_TO_WATCHED_ADDR.save(deps.storage, resp.id, &addr)?;

            Ok(Response::default())
        }
        _ => Err(NeutronError::InvalidReplyID(msg.id)),
    }
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_custom_kv_icq/src/contract.rs#L115-L140)
</details>

#### 4. Implement reconstruction of the query result

Define how the query result should be reconstructed from [StorageValue](https://docs.rs/neutron-std/4.2.2-rc/neutron_std/types/neutron/interchainqueries/struct.StorageValue.html) into a BaseAccount instance.

<details> 
    <summary>Show code</summary>

```rust
use neutron_sdk::interchain_queries::types::KVReconstruct;
use neutron_std::types::neutron::interchainqueries::StorageValue;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
/// A structure that can be reconstructed from **StorageValues**'s for the **Account Interchain Query**.
pub struct BaseAccount {
    pub address: String,
    pub account_number: String,
    pub sequence: String,
}

impl KVReconstruct for BaseAccount {
    fn reconstruct(storage_values: &[StorageValue]) -> NeutronResult<BaseAccount> {
        if storage_values.len() != 1 {
            return Err(NeutronError::InvalidQueryResultFormat(
                "storage_values length is not 1".into(),
            ));
        }

        // first level value is Any as sdk.AccountI implementation:
        // https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/types/account.go#L9-L32
        let any_value: Any = Any::decode(storage_values[0].value.as_slice())?;
        // second level value is BaseAccount:
        // https://github.com/cosmos/cosmos-sdk/blob/853dbbf3e84900214137805d78e325ecd56fd68f/x/auth/types/auth.pb.go#L29-L37
        let std_acc: StdBaseAccount = StdBaseAccount::decode(any_value.value.as_slice())?;
        Ok(BaseAccount {
            address: std_acc.address,
            account_number: std_acc.account_number.to_string(),
            sequence: std_acc.sequence.to_string(),
        })
    }
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_custom_kv_icq/src/types.rs#L10-L38)
</details>

#### 5. Define Interchain Query results submission handling

Get the submitted Interchain Query result from the `interchainqueries` module's storage using [query_kv_result](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/queries/fn.query_kv_result.html) helper function and handle it.

<details> 
    <summary>Show code</summary>

```rust
use neutron_sdk::sudo::msg::SudoMsg;
use neutron_sdk::interchain_queries::queries::query_kv_result;
use crate::types::BaseAccount;

#[entry_point]
pub fn sudo(deps: DepsMut, _env: Env, msg: SudoMsg) -> NeutronResult<Response> {
    match msg {
        SudoMsg::KVQueryResult { query_id } => sudo_kv_query_result(deps, query_id),
        _ => Ok(Response::default()),
    }
}

/// The contract's callback for KV query results. Note that only the query id is provided, so you
/// need to read the query result from the state.
pub fn sudo_kv_query_result(deps: DepsMut, query_id: u64) -> NeutronResult<Response> {
    // Get the last submitted ICQ result from the Neutron ICQ module storage and decode it
    // as BaseAccount using its KVReconstruct::reconstruct implementation.
    let account_resp: BaseAccount = query_kv_result(deps.as_ref(), query_id)?;
    // Get the address that was registered for the ICQ
    let addr = ICQ_ID_TO_WATCHED_ADDR.load(deps.storage, query_id)?;

    // Put your business logic here
    // For this example we just preserve the freshly fetched account in the contract's state
    REMOTE_ACCOUNTS.save(deps.storage, addr, &account_resp)?;

    Ok(Response::default())
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_custom_kv_icq/src/contract.rs#L142-L164)
</details>

#### 6. Perform Interchain Query registration

Broadcast a [ExecuteMsg::RegisterAccountQuery](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_custom_kv_icq/src/msg.rs#L10-L14) message to the contract with required parameters.

## How to register and handle a TX Interchain Query

This section contains a brief guide on how to register a TX Interchain Query and handle the query results using [neutron-std](https://docs.rs/neutron-std/4.2.2-rc/neutron_std) and [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk) libraries in a smart contract.

#### 1. Find out what transaction filter to use

Figure out the appropriate [tx_search](https://docs.cometbft.com/v0.38/app-dev/indexing-transactions#querying-transactions-events) query that would match transactions you need to process. This is described in the [How to find out what transaction filter to use](/neutron/modules/interchain-queries/how-to#how-to-find-out-what-transaction-filter-to-use) section.

#### 2. Define Interchain Query registration entry point

Implement an `execute` message handler in your contract that will process Interchain Query registration by broadcasting a [MsgRegisterInterchainQuery](https://docs.rs/neutron-std/4.2.2-rc/neutron_std/types/neutron/interchainqueries/struct.MsgRegisterInterchainQuery.html) message. Use the `tx_search` query found at the previous step to parametrize the message.

<details> 
    <summary>Show code</summary>

```rust
use neutron_std::types::neutron::interchainqueries::MsgRegisterInterchainQuery;

/// Unbond delegator attribute key.
/// https://github.com/cosmos/cosmos-sdk/blob/8bfcf554275c1efbb42666cc8510d2da139b67fa/x/staking/keeper/msg_server.go#L447-L455
const UNBOND_DELEGATOR_ATTR: &str = "unbond.delegator";

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> NeutronResult<Response> {
    match msg {
        ExecuteMsg::RegisterUndelegationsQuery {
            connection_id,
            addr,
            update_period,
        } => register_undelegations_query(env, connection_id, addr, update_period),
    }
}

pub fn register_undelegations_query(
    env: Env,
    connection_id: String,
    addr: String,
    update_period: u64,
) -> NeutronResult<Response> {
    let msg = MsgRegisterInterchainQuery {
        query_type: QueryType::TX.into(),
        keys: vec![],
        // the result filter is unbond.delegator=addr
        transactions_filter: to_string(&vec![TransactionFilterItem {
            field: UNBOND_DELEGATOR_ATTR.to_string(),
            op: TransactionFilterOp::Eq,
            value: TransactionFilterValue::String(addr.clone()),
        }])
        .map_err(|e| StdError::generic_err(e.to_string()))?,
        connection_id,
        update_period,
        sender: env.contract.address.to_string(),
    };

    Ok(Response::default().add_message(msg))
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_tx_icq/src/contract.rs#L55-L93)
</details>

#### 3. Define Interchain Query results submission handling

Decode the transaction and its messages, implement the [contract's side verification of submitted TX Interchain Query results](/neutron/modules/interchain-queries/explanation#why-is-it-mandatory-to-do-contracts-side-verification-of-submitted-tx-interchain-query-results) and results handling.

<details> 
    <summary>Show code</summary>

```rust
use neutron_sdk::sudo::msg::SudoMsg;
use cosmos_sdk_proto::cosmos::staking::v1beta1::MsgUndelegate;
use cosmos_sdk_proto::cosmos::tx::v1beta1::{TxBody, TxRaw};

const STAKING_UNDELEGATE_MSG_URL: &str = "/cosmos.staking.v1beta1.MsgUndelegate";

#[entry_point]
pub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> NeutronResult<Response> {
    match msg {
        SudoMsg::TxQueryResult {
            query_id,
            height,
            data,
        } => sudo_tx_query_result(deps, env, query_id, height, data),
        _ => Ok(Response::default()),
    }
}

/// The contract's callback for TX query results.
pub fn sudo_tx_query_result(
    deps: DepsMut,
    _env: Env,
    query_id: u64,
    _height: Height,
    data: Binary,
) -> NeutronResult<Response> {
    // Decode the transaction data
    let tx: TxRaw = TxRaw::decode(data.as_slice())?;
    let body: TxBody = TxBody::decode(tx.body_bytes.as_slice())?;

    // Get the registered query by ID and retrieve the delegator address from query's transaction filter
    let registered_query: RegisteredQuery = get_registered_query(deps.as_ref(), query_id)?;
    let query_tx_filter: Vec<TransactionFilterItem> =
        serde_json_wasm::from_str(registered_query.transactions_filter.as_str())?;
    let delegator = match &query_tx_filter[0].value {
        TransactionFilterValue::String(s) => s.clone(),
        _ => {
            return Err(NeutronError::Std(StdError::generic_err(
                "undelegations transaction filter value must be a String",
            )))
        }
    };

    // the contract's side verification of submitted TX Interchain Query results part
    let mut new_undelegations: Vec<Coin> = vec![];
    for msg in body.messages.iter() {
        // Narrow down the messages to only MsgUndelegate ones
        if msg.type_url != STAKING_UNDELEGATE_MSG_URL {
            continue;
        }
        // Narrow down the MsgUndelegate messages to only those that match the delegator address
        let undelegate_msg = MsgUndelegate::decode(msg.value.as_slice())?;
        if undelegate_msg.delegator_address != delegator {
            continue;
        }

        #[allow(clippy::unwrap_used)]
        let undelegation_amount = undelegate_msg.amount.unwrap();
        new_undelegations.push(Coin {
            denom: undelegation_amount.denom,
            amount: Uint128::from_str(undelegation_amount.amount.as_str())?,
        });
    }

    // Put your business logic here
    // For this example we just preserve the new undelegations in the state
    if !new_undelegations.is_empty() {
        let mut undelegations = UNDELEGATED_AMOUNTS
            .may_load(deps.storage, delegator.clone())?
            .unwrap_or_default();
        undelegations.extend(new_undelegations);
        UNDELEGATED_AMOUNTS.save(deps.storage, delegator, &undelegations)?;
    }

    Ok(Response::default())
}
```
[View full code here](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_tx_icq/src/contract.rs#L115-L184)
</details>

#### 4. Perform Interchain Query registration

Broadcast a [ExecuteMsg::RegisterUndelegationsQuery](https://github.com/neutron-org/neutron-dev-contracts/blob/9977666069741116cd95200ffb6ae05ab0834eae/contracts/docs/interchainqueries/howto/register_tx_icq/src/msg.rs#L10-L14) message to the contract with required parameters.
