"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[9900],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>h});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(t),m=r,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return t?a.createElement(h,s(s({ref:n},d),{},{components:t})):a.createElement(h,s({ref:n},d))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=t[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},12756:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=t(87462),r=(t(67294),t(3905));const o={},s="CosmWasm + ICA",i={unversionedId:"tutorials/cosmwasm-ica",id:"version-1.0/tutorials/cosmwasm-ica",title:"CosmWasm + ICA",description:"This section contains a tutorial for writing smart contracts that utilize interchain accounts.",source:"@site/versioned_docs/version-1.0/tutorials/cosmwasm-ica.md",sourceDirName:"tutorials",slug:"/tutorials/cosmwasm-ica",permalink:"/1.0/tutorials/cosmwasm-ica",draft:!1,tags:[],version:"1.0",frontMatter:{},sidebar:"docs",previous:{title:"Prepare target chain RPC node for Relayer's usage",permalink:"/1.0/relaying/target-chain"},next:{title:"CosmWasm + ICQ",permalink:"/1.0/tutorials/cosmwasm-icq"}},l={},c=[{value:"Overview",id:"overview",level:2},{value:"The complete example",id:"the-complete-example",level:2},{value:"1. Install dependencies and import the libraries",id:"1-install-dependencies-and-import-the-libraries",level:2},{value:"2. Register an Interchain Account",id:"2-register-an-interchain-account",level:2},{value:"3. Execute an interchain transaction",id:"3-execute-an-interchain-transaction",level:2},{value:"Sending the transaction",id:"sending-the-transaction",level:3},{value:"IBC Events",id:"ibc-events",level:3},{value:"Successful Response",id:"successful-response",level:4},{value:"Error",id:"error",level:4},{value:"Timeout",id:"timeout",level:4}],d={toc:c},u="wrapper";function p(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cosmwasm--ica"},"CosmWasm + ICA"),(0,r.kt)("p",null,"This section contains a tutorial for writing smart contracts that utilize interchain accounts."),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"We are going to learn how to:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Install dependencies and import the libraries;"),(0,r.kt)("li",{parentName:"ol"},"Register an Interchain Account;"),(0,r.kt)("li",{parentName:"ol"},"Execute an interchain transaction.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Neutron provides an implementation of an ICA\ncontroller ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/tree/main/x/interchaintxs"},"module"),", which simplifies the creation\nand\nmanagement of interchain accounts for smart contract developers. This module, however, is not your only option; you\ncan\nuse raw IBC packets to imitate\nthe ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cosmos/ibc-go/tree/main/modules/apps/27-interchain-accounts"},"ibc-go")," implementation, or use\na framework that already implements the same logic on smart contracts level.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," this section assumes that you have basic knowledge of CosmWasm and have some experience in writing smart\ncontracts. You can check out CosmWasm ",(0,r.kt)("a",{parentName:"p",href:"https://docs.cosmwasm.com/docs"},"docs"),"\nand ",(0,r.kt)("a",{parentName:"p",href:"https://medium.com/cosmwasm/writing-a-cosmwasm-contract-8fb946c3a516"},"blog posts")," for entry-level tutorials.")),(0,r.kt)("h2",{id:"the-complete-example"},"The complete example"),(0,r.kt)("p",null,"In the snippets below some details might be omitted. Please check out the complete smart contract\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-sdk/tree/main/contracts/neutron_interchain_txs"},"example")," for a complete\nimplementation."),(0,r.kt)("h2",{id:"1-install-dependencies-and-import-the-libraries"},"1. Install dependencies and import the libraries"),(0,r.kt)("p",null,"In order to start using the Neutron ICA controller module, you need to install some dependencies. Add the following\nlibraries to your dependencies section:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml"},'[dependencies]\ncosmwasm-std = "1.2.5"\n\n# Other standard dependencies...\n\n# This is a library that simplifies working with IBC response packets (acknowledgments, timeouts),\n# contains bindings for the Neutron ICA adapter module (messages, responses, etc.) and provides\n# various helper functions.\nneutron-sdk = "0.5.0"\n\n# Required to marshal skd.Msg values; the marshalled messsages will be attached to the IBC packets\n# and executed as a transaction on the host chain.\ncosmos-sdk-proto = { version = "0.14.0", default-features = false }\nprotobuf = { version = "3.2.0", features = ["with-bytes"] }\n')),(0,r.kt)("p",null,"Now you can import the libraries:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"use neutron_sdk::{\n    bindings::{\n        msg::{IbcFee, MsgSubmitTxResponse, NeutronMsg},\n        query::{NeutronQuery, QueryInterchainAccountAddressResponse},\n        types::ProtobufAny,\n    },\n    interchain_txs::helpers::{\n        decode_acknowledgement_response, decode_message_response, get_port_id,\n    },\n    sudo::msg::{RequestPacket, SudoMsg},\n    NeutronResult,\n};\nuse cosmwasm_std::Coin;\n")),(0,r.kt)("h2",{id:"2-register-an-interchain-account"},"2. Register an Interchain Account"),(0,r.kt)("p",null,"Neutron allows a smart contract to register multiple interchain account for within a single IBC connection. While you\ncan implement interchain account registration in the ",(0,r.kt)("inlineCode",{parentName:"p"},"instantiate()")," entrypoint, having a separate handler is probably a\nbetter idea:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'// Initialize the storage for known interchain accounts.\npub const INTERCHAIN_ACCOUNTS: Map<String, Option<(String, String)>> =\n    Map::new("interchain_accounts");\n\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\n#[serde(rename_all = "snake_case")]\npub enum ExecuteMsg {\n    Register {\n        connection_id: String,\n        interchain_account_id: String,\n    }\n}\n\n#[entry_point]\npub fn execute(\n    deps: DepsMut,\n    env: Env,\n    _: MessageInfo,\n    msg: ExecuteMsg,\n) -> StdResult<Response<NeutronMsg>> {\n    match msg {\n        ExecuteMsg::Register {\n            connection_id,\n            interchain_account_id,\n        } => execute_register_ica(deps, env, connection_id, interchain_account_id),\n    }\n}\n\nfn execute_register_ica(\n    deps: DepsMut,\n    env: Env,\n    connection_id: String,\n    interchain_account_id: String,\n) -> StdResult<Response<NeutronMsg>> {\n    let register =\n        NeutronMsg::register_interchain_account(connection_id, interchain_account_id.clone());\n\n    // Get the IBC port identifier generated by Neutron for the new interchain account.\n    let key = get_port_id(env.contract.address.as_str(), &interchain_account_id);\n\n    // Add an incomplete entry for the new account to the storage.\n    INTERCHAIN_ACCOUNTS.save(deps.storage, key, &None)?;\n    Ok(Response::new().add_message(register))\n}\n')),(0,r.kt)("p",null,"In the snippet above, we create the ",(0,r.kt)("inlineCode",{parentName:"p"},"ExecuteMsg")," enum that contains the ",(0,r.kt)("inlineCode",{parentName:"p"},"Register")," message, and implement a\nsimple ",(0,r.kt)("inlineCode",{parentName:"p"},"execute_register_ica()")," handler for this message. This handler:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Creates a message to the Neutrons ",(0,r.kt)("inlineCode",{parentName:"li"},"interchaintxs")," module;"),(0,r.kt)("li",{parentName:"ol"},"Uses a helper function ",(0,r.kt)("inlineCode",{parentName:"li"},"get_port_id()")," to get the port identifier that Neutron is going to generate for the channel\ndedicated to this specific interchain account;"),(0,r.kt)("li",{parentName:"ol"},"Initializes the storage for information related to the new interchain account (currently empty).")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"interchain_account_id")," is just a string name for your new account that you can use to distinguish between multiple\naccounts created within a single IBC connection."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," in a real-world scenario you wouldn't want just anyone to be able to make your contract register interchain\naccounts, so it might make sense to check the handler")),(0,r.kt)("p",null,"After executing the ",(0,r.kt)("inlineCode",{parentName:"p"},"execute_register_ica()")," handler you need to have a way to know whether the account was registered\nproperly. As with all IB\u0421-related events (acknowledgements, timeouts), ",(0,r.kt)("inlineCode",{parentName:"p"},"OnChanOpenAck")," messages are dispatched by\nNeutron to respective contracts via ",(0,r.kt)("inlineCode",{parentName:"p"},"wasm.Sudo()"),". So, in order to process this type of events, you need to implement\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"sudo()")," entrypoint for your contract and process the message dispatched by Neutron:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'#[cfg_attr(not(feature = "library"), entry_point)]\npub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> StdResult<Response> {\n    match msg {\n        SudoMsg::OpenAck {\n            port_id,\n            channel_id,\n            counterparty_channel_id,\n            counterparty_version,\n        } => sudo_open_ack(\n            deps,\n            env,\n            port_id,\n            channel_id,\n            counterparty_channel_id,\n            counterparty_version,\n        ),\n        _ => Ok(Response::default()),\n    }\n}\n\nfn sudo_open_ack(\n    deps: DepsMut,\n    _env: Env,\n    port_id: String,\n    _channel_id: String,\n    _counterparty_channel_id: String,\n    counterparty_version: String,\n) -> StdResult<Response> {\n    // The version variable contains a JSON value with multiple fields,\n    // including the generated account address. \n    let parsed_version: Result<OpenAckVersion, _> =\n        serde_json_wasm::from_str(counterparty_version.as_str());\n   \n    // Update the storage record associated with the interchain account. \n    if let Ok(parsed_version) = parsed_version {\n        INTERCHAIN_ACCOUNTS.save(\n            deps.storage,\n            port_id,\n            &Some((\n                parsed_version.address,\n                parsed_version.controller_connection_id,\n            )),\n        )?;\n        return Ok(Response::default());\n    }\n   \n    Err(StdError::generic_err("Can\'t parse counterparty_version"))\n}\n')),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"All possible message types that can come from Neutron are listed in the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron-sdk/blob/main/packages/neutron-sdk/src/sudo/msg.rs"},"SudoMsg")," enum. Here we implement a handler\njust for one element of this enum, ",(0,r.kt)("inlineCode",{parentName:"li"},"SudoMsg::OpenAck"),";"),(0,r.kt)("li",{parentName:"ol"},"If the interchain account was successfully created, you might want to know what account address was generated for you\non the host zone. This information is contained in\nthe ",(0,r.kt)("inlineCode",{parentName:"li"},"counterparty_version")," variable (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/cosmos/ibc-go/blob/42240b54f23ae1d2f8f170f942e49e54ebb7588a/modules/apps/27-interchain-accounts/types/metadata.pb.go#L28"},"see the structure"),")\n, which we need to parse. If we are able to parse it successfully, we save the remote address and the connection\nidentifier to the previously created entry in the ",(0,r.kt)("inlineCode",{parentName:"li"},"INTERCHAIN_ACCOUNTS")," storage.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," it is required that you implement a ",(0,r.kt)("inlineCode",{parentName:"p"},"sudo()")," handler in your contract if you are using the interchain\ntransactions module, even if for some reason you don't want to implement any specific logic for IBC events.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," you can organise your ",(0,r.kt)("inlineCode",{parentName:"p"},"INTERCHAIN_ACCOUNTS")," storage in any way that suits your needs. for example, you can\nalso save the ",(0,r.kt)("inlineCode",{parentName:"p"},"interchain_account_id")," value there to have easy access to it from inside your contract.")),(0,r.kt)("p",null,"After your contract successfully processed the ",(0,r.kt)("inlineCode",{parentName:"p"},"SudoMsg::OpenAck")," event sent by Neutron, you can start using the\nInterchain Account that was created for you."),(0,r.kt)("h2",{id:"3-execute-an-interchain-transaction"},"3. Execute an interchain transaction"),(0,r.kt)("h3",{id:"sending-the-transaction"},"Sending the transaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'use cosmos_sdk_proto::cosmos::staking::v1beta1::{\n    MsgDelegate, MsgDelegateResponse\n};\n\n// Default timeout for SubmitTX is two weeks\nconst DEFAULT_TIMEOUT_SECONDS: u64 = 60 * 60 * 24 * 7 * 2;\n\n/// SudoPayload is a type that stores information about a transaction that we try to execute\n/// on the host chain. This is a type introduced for our convenience.\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\n#[serde(rename_all = "snake_case")]\npub struct SudoPayload {\n    pub message: String,\n    pub port_id: String,\n}\n\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\n#[serde(rename_all = "snake_case")]\npub enum ExecuteMsg {\n    Register {\n        connection_id: String,\n        interchain_account_id: String,\n    },\n    Delegate {\n        interchain_account_id: String,\n        validator: String,\n        amount: u128,\n        denom: String,\n        timeout: Option<u64>,\n    }\n}\n\n\n#[entry_point]\npub fn execute(\n    deps: DepsMut,\n    env: Env,\n    _: MessageInfo,\n    msg: ExecuteMsg,\n) -> StdResult<Response<NeutronMsg>> {\n    deps.api\n        .debug(format!("WASMDEBUG: execute: received msg: {:?}", msg).as_str());\n    match msg {\n        ExecuteMsg::Register {\n            connection_id,\n            interchain_account_id,\n        } => execute_register_ica(deps, env, connection_id, interchain_account_id),\n        ExecuteMsg::Delegate {\n            validator,\n            interchain_account_id,\n            amount,\n            denom,\n            timeout,\n        } => execute_delegate(\n            deps,\n            env,\n            interchain_account_id,\n            validator,\n            amount,\n            denom,\n            timeout,\n        ),\n    }\n}\n\nfn execute_delegate(\n    mut deps: DepsMut,\n    env: Env,\n    interchain_account_id: String,\n    validator: String,\n    amount: u128,\n    denom: String,\n    timeout: Option<u64>,\n) -> StdResult<Response<NeutronMsg>> {\n    // Get the delegator address from the storage & form the Delegate message.\n    let (delegator, connection_id) = get_ica(deps.as_ref(), &env, &interchain_account_id)?;\n    let delegate_msg = MsgDelegate {\n        delegator_address: delegator,\n        validator_address: validator,\n        amount: Some(Coin {\n            denom,\n            amount: amount.to_string(),\n        }),\n    };\n\n    // Serialize the Delegate message. \n    let mut buf = Vec::new();\n    buf.reserve(delegate_msg.encoded_len());\n\n    if let Err(e) = delegate_msg.encode(&mut buf) {\n        return Err(StdError::generic_err(format!("Encode error: {}", e)));\n    }\n\n    // Put the serialized Delegate message to a types.Any protobuf message.\n    let any_msg = ProtobufAny {\n        type_url: "/cosmos.staking.v1beta1.MsgDelegate".to_string(),\n        value: Binary::from(buf),\n    };\n\n    // specify fees to refund relayers for submission of ack and timeout messages\n    //\n    // The contract MUST HAVE recv_fee + ack_fee + timeout_fee coins on its balance!\n    // See more info about fees here: https://docs.neutron.org /neutron/modules/interchain-txs/messages#msgsubmittx\n    // and here: https://docs.neutron.org/neutron/feerefunder/overview\n    let fee = IbcFee {\n        recv_fee: vec![], // must be empty\n        ack_fee: vec![CosmosCoin::new(1000u128, "untrn")],\n        timeout_fee: vec![CosmosCoin::new(1000u128, "untrn")],\n    };\n\n    // Form the neutron SubmitTx message containing the binary Delegate message.\n    let cosmos_msg = NeutronMsg::submit_tx(\n        connection_id,\n        interchain_account_id.clone(),\n        vec![any_msg],\n        "".to_string(),\n        timeout.unwrap_or(DEFAULT_TIMEOUT_SECONDS),\n        fee\n    );\n\n    // We use a submessage here because we need the process message reply to save\n    // the outgoing IBC packet identifier for later.\n    let submsg = msg_with_sudo_callback(\n        deps.branch(),\n        cosmos_msg,\n        SudoPayload {\n            port_id: get_port_id(env.contract.address.to_string(), &interchain_account_id),\n            // Here you can store some information about the transaction to help you parse\n            // the acknowledgement later.\n            message: "interchain_delegate".to_string(),  \n        },\n    )?;\n\n    Ok(Response::default().add_submessages(vec![submsg]))\n}\n\nfn msg_with_sudo_callback<C: Into<CosmosMsg<T>>, T>(\n    deps: DepsMut,\n    msg: C,\n    payload: SudoPayload,\n) -> StdResult<SubMsg<T>> {\n    save_reply_payload(deps.storage, payload)?;\n    Ok(SubMsg::reply_on_success(msg, SUDO_PAYLOAD_REPLY_ID))\n}\n\n// Add storage for reply ids\npub const REPLY_ID_STORAGE: Item<Vec<u8>> = Item::new("reply_queue_id");\n\npub fn save_reply_payload(store: &mut dyn Storage, payload: SudoPayload) -> StdResult<()> {\n    REPLY_ID_STORAGE.save(store, &to_vec(&payload)?)\n}\n')),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"First we need to import the ",(0,r.kt)("inlineCode",{parentName:"li"},"MsgDelegate")," type from the ",(0,r.kt)("inlineCode",{parentName:"li"},"cosmos_sdk_proto")," library. This is required to marshal the\nmessage and put it to the IBC packet sent by the ICA module;"),(0,r.kt)("li",{parentName:"ol"},"Then we implement a handler for the new ",(0,r.kt)("inlineCode",{parentName:"li"},"ExecuteMsg::Delegate")," handler, ",(0,r.kt)("inlineCode",{parentName:"li"},"execute_delegate()"),", and add it to\nour ",(0,r.kt)("inlineCode",{parentName:"li"},"execute()")," entrypoint;"),(0,r.kt)("li",{parentName:"ol"},"Inside the ",(0,r.kt)("inlineCode",{parentName:"li"},"execute_delegate()")," handler, we get the interchain account address from the storage, form a ",(0,r.kt)("inlineCode",{parentName:"li"},"Delegate"),"\nmessage, form an ",(0,r.kt)("inlineCode",{parentName:"li"},"IBCFee")," structure that specifies fees to refund relayers for submission of ",(0,r.kt)("inlineCode",{parentName:"li"},"ack")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"timeout")," messages, put it and the formed ",(0,r.kt)("inlineCode",{parentName:"li"},"Delegate")," message inside Neutron's ",(0,r.kt)("inlineCode",{parentName:"li"},"SubmitTx")," message and execute it as a submessage. Inside\nthe ",(0,r.kt)("inlineCode",{parentName:"li"},"msg_with_sudo_callback()")," function, we set up the reply payload using the ",(0,r.kt)("inlineCode",{parentName:"li"},"SUDO_PAYLOAD_REPLY_ID")," value.")),(0,r.kt)("p",null,"We need to execute the ",(0,r.kt)("inlineCode",{parentName:"p"},"SubmitTx")," message as a submessage because Neutron returns the outgoing IBC packet identifier for\nus as a message reply. This IBC packet identifier is necessary to later determine which To process it, we need to\nimplement the ",(0,r.kt)("inlineCode",{parentName:"p"},"reply()")," handler:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'#[entry_point]\npub fn reply(deps: DepsMut, env: Env, msg: Reply) -> StdResult<Response> {\n    match msg.id {\n        SUDO_PAYLOAD_REPLY_ID => prepare_sudo_payload(deps, env, msg),\n        _ => Err(StdError::generic_err(format!(\n            "unsupported reply message id {}",\n            msg.id\n        ))),\n    }\n}\n\nfn prepare_sudo_payload(mut deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {\n    let payload = read_reply_payload(deps.storage)?;\n    let resp: MsgSubmitTxResponse = serde_json_wasm::from_slice(\n        msg.result\n            .into_result()\n            .map_err(StdError::generic_err)?\n            .data\n            .ok_or_else(|| StdError::generic_err("no result"))?\n            .as_slice(),\n    )\n    .map_err(|e| StdError::generic_err(format!("failed to parse response: {:?}", e)))?;\n    deps.api\n        .debug(format!("WASMDEBUG: reply msg: {:?}", resp).as_str());\n    let seq_id = resp.sequence_id;\n    let channel_id = resp.channel;\n    save_sudo_payload(deps.branch().storage, channel_id, seq_id, payload)?;\n    Ok(Response::new())\n}\n\npub fn read_reply_payload(store: &mut dyn Storage) -> StdResult<SudoPayload> {\n    let data = REPLY_ID_STORAGE.load(store)?;\n    from_binary(&Binary(data))\n}\n\npub fn save_sudo_payload(\n    store: &mut dyn Storage,\n    channel_id: String,\n    seq_id: u64,\n    payload: SudoPayload,\n) -> StdResult<()> {\n    SUDO_PAYLOAD.save(store, (channel_id, seq_id), &to_vec(&payload)?)\n}\n')),(0,r.kt)("h3",{id:"ibc-events"},"IBC Events"),(0,r.kt)("p",null,"After we saved the IBC packet identifier, we are ready for processing the IBC events that can be triggered by an IBC\nrelayer: an acknowledgement or a timeout. In order to process them, we need to add a couple of new handlers to\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"sudo()")," entrypoint:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'#[cfg_attr(not(feature = "library"), entry_point)]\npub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> StdResult<Response> {\n    match msg {\n        // For handling successful (non-error) acknowledgements.\n        SudoMsg::Response { request, data } => sudo_response(deps, request, data),\n\n        // For handling error acknowledgements.\n        SudoMsg::Error { request, details } => sudo_error(deps, request, details),\n\n        // For handling error timeouts.\n        SudoMsg::Timeout { request } => sudo_timeout(deps, env, request),\n\n        SudoMsg::OpenAck {\n            port_id,\n            channel_id,\n            counterparty_channel_id,\n            counterparty_version,\n        } => sudo_open_ack(\n            deps,\n            env,\n            port_id,\n            channel_id,\n            counterparty_channel_id,\n            counterparty_version,\n        ),\n        _ => Ok(Response::default()),\n    }\n}\n\n// Interchain transaction responses - here we just save ack/err/timeout state\npub const ACKNOWLEDGEMENT_RESULTS: Map<(String, u64), AcknowledgementResult> =\n    Map::new("acknowledgement_results");\n\n/// Serves for storing acknowledgement calls for interchain transactions\n#[derive(Serialize, Deserialize, Clone, PartialEq, Eq, JsonSchema, Debug)]\n#[serde(rename_all = "snake_case")]\npub enum AcknowledgementResult {\n    /// Success - Got success acknowledgement in sudo with array of message item types in it\n    Success(Vec<String>),\n    /// Error - Got error acknowledgement in sudo with payload message in it and error details\n    Error((String, String)),\n    /// Timeout - Got timeout acknowledgement in sudo with payload message in it\n    Timeout(String),\n}\n')),(0,r.kt)("h4",{id:"successful-response"},"Successful Response"),(0,r.kt)("p",null,"Let's have a look at how to handle a successful Response event (a non-error IBC Acknowledgement):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'fn sudo_response(deps: DepsMut, request: RequestPacket, data: Binary) -> StdResult<Response> {\n    deps.api.debug(\n        format!(\n            "WASMDEBUG: sudo_response: sudo received: {:?} {:?}",\n            request, data\n        )\n        .as_str(),\n    );\n\n    // Get the channel identifier and the sequence identifier to be able to understand\n    // which transaction is acknowledged by this packet, and for which Interchain Account.\n    //\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let seq_id = request\n        .sequence\n        .ok_or_else(|| StdError::generic_err("sequence not found"))?;\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let channel_id = request\n        .source_channel\n        .ok_or_else(|| StdError::generic_err("channel_id not found"))?;\n\n    // Read the information about the transaction that we previously executed and saved to state.\n    //\n    // NOTE: NO ERROR IS RETURNED HERE. THE CHANNEL LIVES ON.\n    // In this particular example, this is a matter of developer\'s choice. Not being able to read\n    // the payload here means that there was a problem with the contract while submitting an\n    // interchain transaction. You can decide that this is not worth killing the channel,\n    // write an error log and / or save the acknowledgement to an errors queue for later manual\n    // processing. The decision is based purely on your application logic.\n    let payload = read_sudo_payload(deps.storage, channel_id, seq_id).ok();\n    if payload.is_none() {\n        let error_msg = "WASMDEBUG: Error: Unable to read sudo payload";\n        deps.api.debug(error_msg);\n        add_error_to_queue(deps.storage, error_msg.to_string());\n        return Ok(Response::default());\n    }\n\n    deps.api\n        .debug(format!("WASMDEBUG: sudo_response: sudo payload: {:?}", payload).as_str());\n\n    // Parse the response to Vec<MsgData>.\n    //\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not being able to parse this data\n    // that a fatal error occurred on Neutron side, or that the remote chain sent us unexpected data.\n    // Both cases require immediate attention.\n    let parsed_data = decode_acknowledgement_response(data)?;\n\n    // Iterate over the messages, parse them depending on their type & process them.\n    let mut item_types = vec![];\n    for item in parsed_data {\n        let item_type = item.msg_type.as_str();\n        item_types.push(item_type.to_string());\n        match item_type {\n            "/cosmos.staking.v1beta1.MsgDelegate" => {\n                // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n                // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n                // FOR LATER INSPECTION.\n                // In this particular case, a mismatch between the string message type and the\n                // serialised data layout looks like a fatal error that has to be investigated.\n                let _out: MsgDelegateResponse = decode_message_response(&item.data)?;\n            }\n            _ => {\n                deps.api.debug(\n                    format!(\n                        "This type of acknowledgement is not implemented: {:?}",\n                        payload\n                    )\n                    .as_str(),\n                );\n            }\n        }\n    }\n\n    if let Some(payload) = payload {\n        // update but also check that we don\'t update same seq_id twice\n        ACKNOWLEDGEMENT_RESULTS.update(\n            deps.storage,\n            (payload.port_id, seq_id),\n            |maybe_ack| -> StdResult<AcknowledgementResult> {\n                match maybe_ack {\n                    Some(_ack) => Err(StdError::generic_err("trying to update same seq_id")),\n                    None => Ok(AcknowledgementResult::Success(item_types)),\n                }\n            },\n        )?;\n    }\n\n    Ok(Response::default())\n}\n\npub fn read_sudo_payload(\n    store: &mut dyn Storage,\n    channel_id: String,\n    seq_id: u64,\n) -> StdResult<SudoPayload> {\n    let data = SUDO_PAYLOAD.load(store, (channel_id, seq_id))?;\n    from_binary(&Binary(data))\n}\n\npub fn add_error_to_queue(store: &mut dyn Storage, error_msg: String) -> Option<()> {\n    let result = ERRORS_QUEUE\n        .keys(store, None, None, Order::Descending)\n        .next()\n        .and_then(|data| data.ok())\n        .map(|c| c + 1)\n        .or(Some(0));\n\n    result.and_then(|idx| ERRORS_QUEUE.save(store, idx, &error_msg).ok())\n}\n\npub const ERRORS_QUEUE: Map<u32, String> = Map::new("errors_queue");\n')),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"We get the sequence and channel identifiers to retrieve the information about the interchain transaction from our\nlocal storage. ",(0,r.kt)("em",{parentName:"li"},"Note"),": we could instead parse the raw data from the ",(0,r.kt)("inlineCode",{parentName:"li"},"RequestPacket"),", but it feels more natural to\nsave\nthe required information when sending the transaction and to retrieve it from the state when processing the response;"),(0,r.kt)("li",{parentName:"ol"},"We parse the response data and start iterating over the message responses, determining the message type for each of\nthem and (potentially) executing custom logic for each message.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),": if your Sudo handler fails, the acknowledgment won't be marked as processed inside the IBC module. This will\nmake most IBC relayers try to submit the acknowledgment over and over again. And since the ICA channels are ",(0,r.kt)("inlineCode",{parentName:"p"},"ORDERED"),",\nACKs must be processed in the same order as corresponding transactions were sent, meaning no further acknowledgments\nwill be process until the previous one processed successfully."),(0,r.kt)("p",{parentName:"blockquote"},"We strongly recommend developers to write Sudo handlers very carefully and keep them as simple as possible. If you do\nwant to have elaborate logic in your handler, you should verify the acknowledgement data before making any state\nchanges; that way you can, if the data received with the acknowledgement is incompatible with executing the handler\nlogic normally, return an ",(0,r.kt)("inlineCode",{parentName:"p"},"Ok()")," response immediately, which will prevent the acknowledgement from being resubmitted.")),(0,r.kt)("h4",{id:"error"},"Error"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'fn sudo_error(deps: DepsMut, request: RequestPacket, details: String) -> StdResult<Response> {\n    deps.api\n        .debug(format!("WASMDEBUG: sudo error: {}", details).as_str());\n    deps.api\n        .debug(format!("WASMDEBUG: request packet: {:?}", request).as_str());\n\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let seq_id = request\n        .sequence\n        .ok_or_else(|| StdError::generic_err("sequence not found"))?;\n\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let channel_id = request\n        .source_channel\n        .ok_or_else(|| StdError::generic_err("channel_id not found"))?;\n    let payload = read_sudo_payload(deps.storage, channel_id, seq_id).ok();\n\n    if let Some(payload) = payload {\n        // update but also check that we don\'t update same seq_id twice\n        ACKNOWLEDGEMENT_RESULTS.update(\n            deps.storage,\n            (payload.port_id, seq_id),\n            |maybe_ack| -> StdResult<AcknowledgementResult> {\n                match maybe_ack {\n                    Some(_ack) => Err(StdError::generic_err("trying to update same seq_id")),\n                    None => Ok(AcknowledgementResult::Error((payload.message, details))),\n                }\n            },\n        )?;\n    } else {\n        let error_msg = "WASMDEBUG: Error: Unable to read sudo payload";\n        deps.api.debug(error_msg);\n        add_error_to_queue(deps.storage, error_msg.to_string());\n    }\n\n    Ok(Response::default())\n}\n')),(0,r.kt)("p",null,"This handler is very similar to ",(0,r.kt)("inlineCode",{parentName:"p"},"sudo_response()"),". Unfortunately, current ICA implementation does not allow you to get\nthe exact error string that was returned by the host chain; your controller code can only know that something went\nwrong on the other side."),(0,r.kt)("h4",{id:"timeout"},"Timeout"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'fn sudo_timeout(deps: DepsMut, _env: Env, request: RequestPacket) -> StdResult<Response> {\n    deps.api\n        .debug(format!("WASMDEBUG: sudo timeout request: {:?}", request).as_str());\n\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let seq_id = request\n        .sequence\n        .ok_or_else(|| StdError::generic_err("sequence not found"))?;\n\n    // WARNING: RETURNING THIS ERROR CLOSES THE CHANNEL.\n    // AN ALTERNATIVE IS TO MAINTAIN AN ERRORS QUEUE AND PUT THE FAILED REQUEST THERE\n    // FOR LATER INSPECTION.\n    // In this particular case, we return an error because not having the sequence id\n    // in the request value implies that a fatal error occurred on Neutron side.\n    let channel_id = request\n        .source_channel\n        .ok_or_else(|| StdError::generic_err("channel_id not found"))?;\n\n    // update but also check that we don\'t update same seq_id twice\n    // NOTE: NO ERROR IS RETURNED HERE. THE CHANNEL LIVES ON.\n    // In this particular example, this is a matter of developer\'s choice. Not being able to read\n    // the payload here means that there was a problem with the contract while submitting an\n    // interchain transaction. You can decide that this is not worth killing the channel,\n    // write an error log and / or save the acknowledgement to an errors queue for later manual\n    // processing. The decision is based purely on your application logic.\n    // Please be careful because it may lead to an unexpected state changes because state might\n    // has been changed before this call and will not be reverted because of supressed error.\n    let payload = read_sudo_payload(deps.storage, channel_id, seq_id).ok();\n    if let Some(payload) = payload {\n        // update but also check that we don\'t update same seq_id twice\n        ACKNOWLEDGEMENT_RESULTS.update(\n            deps.storage,\n            (payload.port_id, seq_id),\n            |maybe_ack| -> StdResult<AcknowledgementResult> {\n                match maybe_ack {\n                    Some(_ack) => Err(StdError::generic_err("trying to update same seq_id")),\n                    None => Ok(AcknowledgementResult::Timeout(payload.message)),\n                }\n            },\n        )?;\n    } else {\n        let error_msg = "WASMDEBUG: Error: Unable to read sudo payload";\n        deps.api.debug(error_msg);\n        add_error_to_queue(deps.storage, error_msg.to_string());\n    }\n\n    Ok(Response::default())\n}\n')),(0,r.kt)("p",null,"This handler looks exactly the same as the previous one. The ",(0,r.kt)("inlineCode",{parentName:"p"},"Timeout")," event, however, should be treated with extra\nattention. There is no dedicated event for a closed channel (ICA disables all messages related to closing the channels).\nYour channel, however, can still be closed if a packet timeout occurs. This means that if you are notified about a\npacket\ntimeout, ",(0,r.kt)("strong",{parentName:"p"},"you can be sure that the affected channel was closed"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," it is generally a good practice to set the packet timeout for your interchain transactions to a really large\nvalue.")),(0,r.kt)("p",null,"If the timeout occurs anyway, you can just\nexecute ",(0,r.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-txs/messages#msgregisterinterchainaccount"},"RegisterInterchainAccount message")," again to\nrecover access to your interchain account."))}p.isMDXComponent=!0}}]);