# How To

## How to choose the right IBC connection ID for an Interchain Query and verify it

Let's find an IBC connection between Neutron and CosmosHub.

#### 1. Find an already existing IBC connection using an explorer

Go to [map of zones](https://mapofzones.com/zones/neutron-1/peers?columnKey=ibcVolumeIn&period=7d). There might be several connections between two chains, so pick one of them. For Neutron and CosmosHub, let's pick the `connection-0`.

#### 2. Pick a neutron RPC node from the chain registry repo

Go to [Neutron's chain registry page](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json), pick an RPC node from the `apis` section, and specify it in the following `neutrond` queries using the `--node` flag.

#### 3. Gather neutron side info about the picket IBC connection

Find out the IBC client ID and the counterparty IBC info for the `connection-0` IBC connection:

```
neutrond q ibc connection end connection-0 --node https://rpc-voidara.neutron-1.neutron.org

connection:
  client_id: 07-tendermint-0
  counterparty:
    client_id: 07-tendermint-1119
    connection_id: connection-809
    ...
```

#### 4. Check the IBC connection counterparty chain ID

Check if the Neutron side IBC client's counterparty chain ID matches the ID of the chain you're up to point your Interchain Queries to:

```
neutrond q ibc client state 07-tendermint-0 --node https://rpc-voidara.neutron-1.neutron.org

client_state:
  ...
  chain_id: cosmoshub-4 << matches the CosmosHub chain ID
  ...
```

#### 5. Pick a CosmosHub RPC node from the chain registry repo

Go to [CosmosHub's chain registry page](https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json), pick an RPC node from the `apis` section, and specify it in the following `gaiad` queries using the `--node` flag.

#### 6. Make sure the CosmosHub's side counterparty is Neutron

Using the counterparty IBC info retrieved at the third step of this HowTo, do the opposite side checks: check that the CosmosHub's side IBC connection and client's counterparty info corresponds to Neutron's side IBC connection and client's info:

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

Try out the result query string in `gaiad q txs` query to make sure it works as expected:

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

**Might be interesting:**
- [Configuring your own remote chain RPC node for TX ICQ usage](/neutron/modules/interchain-queries/explanation#configuring-your-own-remote-chain-rpc-node-for-tx-icq-usage)

## How to register an Interchain Query using neutron-sdk

1. Find the register Interchain Query helper function that your needs require in the [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/index.html) repository. For this particular example, let's choose the [new_register_balances_query_msg](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/fn.new_register_balances_query_msg.html) function.

2. From your contract, broadcast the message created by the helper function as a [submessage](https://docs.cosmwasm.com/docs/smart-contracts/message/submessage/):
```rust
use cosmwasm_std::{
    Binary, CosmosMsg, Response, SubMsg, ReplyOn,
};
use neutron_sdk::{
    bindings::{
        msg::NeutronMsg,
    },
    interchain_queries::v045::new_register_balances_query_msg,
    NeutronResult,
}

/// Reply ID used to tell this kind of reply call apart.
const REGISTER_BALANCES_ICQ_REPLY_ID: u64 = 1;

/// Registers a balances ICQ for a given address.
pub fn register_balances_icq(
    connection_id: String,
    addr: String,
    denoms: Vec<String>,
    update_period: u64,
) -> NeutronResult<Response<NeutronMsg>> {
    ...
    // Construct an ICQ registration message
    let msg =
        new_register_balances_query_msg(connection_id, addr, denoms, update_period)?;

    // Send the ICQ registration message as a submessage to receive a reply callback
    Ok(Response::new().add_submessage(SubMsg {
        id: REGISTER_BALANCES_ICQ_REPLY_ID,
        payload: Binary::default(),
        msg: CosmosMsg::Custom(msg),
        gas_limit: None,
        reply_on: ReplyOn::Success,
    }))
    ...
}
```

3. In the reply handler, decode the submessage result as a [MsgRegisterInterchainQueryResponse](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/bindings/msg/struct.MsgRegisterInterchainQueryResponse.html) to get access to the assigned Interchain Query ID.
```rust
use cosmwasm_std::{
    entry_point, DepsMut, Env, Reply, Response, StdError,
};
use neutron_sdk::{
    bindings::msg::MsgRegisterInterchainQueryResponse,
    NeutronResult,
};

/// Reply ID used to tell this kind of reply call apart.
const REGISTER_BALANCES_ICQ_REPLY_ID: u64 = 1;

#[entry_point]
pub fn reply(_deps: DepsMut, _env: Env, msg: Reply) -> NeutronResult<Response> {
    match msg.id {
        REGISTER_BALANCES_ICQ_REPLY_ID => {
            let resp: MsgRegisterInterchainQueryResponse = serde_json_wasm::from_slice(
                &msg.result
                    .into_result()
                    .map_err(StdError::generic_err)?
                    .msg_responses[0]
                    .value
                    .to_vec(),
            )
            .map_err(|e| StdError::generic_err(format!("failed to parse response: {:?}", e)))?;

            ...
        }

        ...
    }
}
```

## How to register a KV Interchain Query with custom keys

If your KV Interchain Query cannot be covered with the helpers from the [Interchain Queries related package](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/interchain_queries/v045/register_queries/index.html) in the [neutron-sdk](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk), you will need to define the KVKeys for your query yourself and pass it to the [NeutronMsg::register_interchain_query](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/bindings/msg/enum.NeutronMsg.html#method.register_interchain_query) helper. For this particular example, let's register an [Account](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/proto/cosmos/auth/v1beta1/query.proto#L27-L31) Interchain Query to `cosmos-hub`.

1. Figure out how the data path to the required data is constructed and what the data model is. This can be done by the module's code investigation. Start with finding the [respective auth module gRPC handler](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/keeper/grpc_query.go#L69-L95) and then go deeper until you find what info exactly is written to the KVStore and at what path.

For this example, the information we require from the module's code is:
- the store key for the module is [acc](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/types/keys.go#L11-L12);
- the data path is constructed as [AddressStoreKeyPrefix](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/types/keys.go#L22-L23) + [base64-encoded address](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/types/keys.go#L34);
- the data model is [BaseAccount](https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/types/auth.pb.go#L29-L37).

2. From your contract, broadcast the message created by the helper function as a [submessage](https://docs.cosmwasm.com/docs/smart-contracts/message/submessage/). Use the [decode_and_convert](https://docs.rs/neutron-sdk/0.8.0/neutron_sdk/interchain_queries/helpers/fn.decode_and_convert.html) helper function for bech32 address conversion.
```rust
use cosmwasm_std::{
    Binary, CosmosMsg, Response, SubMsg, ReplyOn,
};
use neutron_sdk::{
    bindings::{
        msg::NeutronMsg,
        types::KVKey,
    },
    interchain_queries::helpers::decode_and_convert,
    interchain_queries::types::QueryPayload,
    NeutronResult,
}

/// Name of the standard **auth** Cosmos-SDK module
const AUTH_STORE_KEY: &str = "acc";
/// Storage prefix for account-by-address store
/// <https://github.com/cosmos/cosmos-sdk/blob/c29844f9e1ccc76ba68b8c0d931f3b0ad3885e13/x/auth/types/keys.go#L22-L23>
const ADDRESS_STORE_PREFIX: u8 = 0x01;

/// Reply ID used to tell this kind of reply call apart.
const REGISTER_ACCOUNT_ICQ_REPLY_ID: u64 = 1;

/// Registers an account ICQ for a given address.
pub fn register_account_icq(
    connection_id: String,
    addr: String,
    update_period: u64,
) -> NeutronResult<Response<NeutronMsg>> {
    let mut key: Vec<u8> = vec![ADDRESS_STORE_PREFIX];
    key.extend_from_slice(&decode_and_convert(&addr)?);
    // Construct an ICQ registration message
    let msg = NeutronMsg::register_interchain_query(
        QueryPayload::KV(vec![{
            KVKey {
                path: AUTH_STORE_KEY.to_string(),
                key: Binary::from(key),
            }
        }]),
        connection_id,
        update_period,
    )?;

    // Send the ICQ registration message as a submessage to receive a reply callback
    Ok(Response::new().add_submessage(SubMsg {
        id: REGISTER_ACCOUNT_ICQ_REPLY_ID,
        payload: Binary::default(),
        msg: CosmosMsg::Custom(msg),
        gas_limit: None,
        reply_on: ReplyOn::Success,
    }))
}
```

3. 

4. In the reply handler, decode the submessage result as a [MsgRegisterInterchainQueryResponse](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/bindings/msg/struct.MsgRegisterInterchainQueryResponse.html) to get access to the assigned Interchain Query ID.
```rust
use cosmwasm_std::{
    entry_point, DepsMut, Env, Reply, Response, StdError,
};
use neutron_sdk::{
    bindings::msg::MsgRegisterInterchainQueryResponse,
    NeutronResult,
};

/// Reply ID used to tell this kind of reply call apart.
const REGISTER_ACCOUNT_ICQ_REPLY_ID: u64 = 1;

#[entry_point]
pub fn reply(_deps: DepsMut, _env: Env, msg: Reply) -> NeutronResult<Response> {
    match msg.id {
        REGISTER_ACCOUNT_ICQ_REPLY_ID => {
            let resp: MsgRegisterInterchainQueryResponse = serde_json_wasm::from_slice(
                &msg.result
                    .into_result()
                    .map_err(StdError::generic_err)?
                    .msg_responses[0]
                    .value
                    .to_vec(),
            )
            .map_err(|e| StdError::generic_err(format!("failed to parse response: {:?}", e)))?;

            ...
        }

        ...
    }
}
```

5. Use the assigned Interchain Query ID to distinguish between different Interchain Queries in [QueryResult](/neutron/modules/interchain-queries/api#queryresult) calls and [SudoMsg::KVQueryResult](https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/sudo/msg/enum.SudoMsg.html) callbacks.

## How to register a TX Interchain Query with custom keys

TODO

https://docs.rs/neutron-sdk/0.11.0/neutron_sdk/bindings/msg/enum.NeutronMsg.html#method.register_interchain_query

https://docs.cosmos.network/v0.50/build/modules/bank#events
