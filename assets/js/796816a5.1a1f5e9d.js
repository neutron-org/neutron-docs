"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[9291],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),d=i,h=c["".concat(l,".").concat(d)]||c[d]||m[d]||a;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:i,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},55661:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=n(87462),i=(n(67294),n(3905));const a={},o="Messages",s={unversionedId:"neutron/modules/interchain-queries/messages",id:"version-3.0/neutron/modules/interchain-queries/messages",title:"Messages",description:"Register Interchain Query",source:"@site/versioned_docs/version-3.0/neutron/modules/interchain-queries/messages.md",sourceDirName:"neutron/modules/interchain-queries",slug:"/neutron/modules/interchain-queries/messages",permalink:"/3.0/neutron/modules/interchain-queries/messages",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/3.0/neutron/modules/interchain-queries/overview"},next:{title:"Client",permalink:"/3.0/neutron/modules/interchain-queries/client"}},l={},u=[{value:"Register Interchain Query",id:"register-interchain-query",level:3},{value:"State modifications",id:"state-modifications",level:4},{value:"Events",id:"events",level:4},{value:"Update Interchain Query",id:"update-interchain-query",level:3},{value:"State modifications",id:"state-modifications-1",level:4},{value:"Events",id:"events-1",level:4},{value:"Remove Interchain Query",id:"remove-interchain-query",level:3},{value:"State modifications",id:"state-modifications-2",level:4},{value:"Events",id:"events-2",level:4},{value:"Submit Query Result",id:"submit-query-result",level:3},{value:"State modifications",id:"state-modifications-3",level:4}],p={toc:u},c="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"messages"},"Messages"),(0,i.kt)("h3",{id:"register-interchain-query"},"Register Interchain Query"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L23"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgRegisterInterchainQuery"))," can be submitted by smart-contract only via ",(0,i.kt)("inlineCode",{parentName:"p"},"MsgRegisterInterchainQuery")," transaction:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgRegisterInterchainQuery {\n  // defines a query type: `kv` or `tx` now\n  string query_type = 1;\n\n  // is used to define KV-storage keys for which we want to get values from remote chain\n  repeated KVKey keys = 2;\n\n  // is used to define a filter for transaction search ICQ\n  string transactions_filter = 3;\n\n  // is IBC connection ID for getting ConsensusState to verify proofs\n  string connection_id = 4;\n\n  // is used to specify how often (in neutron blocks) the query must be updated\n  uint64 update_period = 5;\n\n  // is the signer of the message\n  string sender = 6;\n}\n\nmessage KVKey {\n  // Path (storage prefix) to the storage where you want to read value by key\n  // (usually name of cosmos-sdk module: 'staking', 'bank', etc.)\n  string path = 1;\n  // Key you want to read from the storage\n  bytes key = 2;\n}\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Note:")," the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.")),(0,i.kt)("p",null,"Currently ",(0,i.kt)("inlineCode",{parentName:"p"},"query_type")," can take the following values:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"kv")," - query ",(0,i.kt)("strong",{parentName:"p"},"values")," from Cosmos-SDK KV-storage on remote chain which are stored under some ",(0,i.kt)("strong",{parentName:"p"},"keys"),". In this case ",(0,i.kt)("inlineCode",{parentName:"p"},"kv_keys")," must be filled in.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"tx")," - query to search for transactions on remote chain. ",(0,i.kt)("inlineCode",{parentName:"p"},"transactions_filter")," describes a filter by which the ",(0,i.kt)("a",{parentName:"p",href:"/relaying/icq-relayer"},"ICQ relayer")," will perform the transactions search. ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-queries/overview"},"The transaction filter is described in more detail in the overview"),":"))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"MsgRegisterInterchainQuery")," returns ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L44"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgRegisterInterchainQueryResponse"))," where ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," is unique identifier of newly registered interchain query on success:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgRegisterInterchainQueryResponse { \n  uint64 id = 1; \n}\n")),(0,i.kt)("h4",{id:"state-modifications"},"State modifications"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"increments last registered query id;"),(0,i.kt)("li",{parentName:"ul"},"generates new ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/genesis.proto#L11"},"RegisteredQuery"),";"),(0,i.kt)("li",{parentName:"ul"},"save the record in storage under incremented query id;")),(0,i.kt)("h4",{id:"events"},"Events"),(0,i.kt)("p",null,"Emits ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-queries/events#eventtypeneutronmessage"},(0,i.kt)("inlineCode",{parentName:"a"},"EventTypeNeutonMessage"))," with ",(0,i.kt)("inlineCode",{parentName:"p"},"action")," equals ",(0,i.kt)("inlineCode",{parentName:"p"},"query_updated"),"."),(0,i.kt)("h3",{id:"update-interchain-query"},"Update Interchain Query"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Note:")," as well as for query registration, for query updates the maximum allowed number of KVKey values for a single InterchainQuery equals to 32.")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L114"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgUpdateInterchainQueryRequest"))," can be submitted only by the owner of corresponding Interchain Query:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgUpdateInterchainQueryRequest {\n  uint64 query_id = 1;\n  repeated KVKey new_keys = 2;\n  uint64 new_update_period = 3;\n  string new_transactions_filter = 4;\n  string sender = 5; // is the signer of the message and owner of the corresponding ICQ\n}\n")),(0,i.kt)("p",null,"Returns just an empty ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L121"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgUpdateInterchainQueryResponse"))," on success:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgUpdateInterchainQueryResponse {\n}\n")),(0,i.kt)("h4",{id:"state-modifications-1"},"State modifications"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/keeper/msg_server.go#L144"},"Updates")," a corresponding ",(0,i.kt)("inlineCode",{parentName:"li"},"RegisteredQuery")," structure.")),(0,i.kt)("h4",{id:"events-1"},"Events"),(0,i.kt)("p",null,"Emits ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-queries/events#eventtypeneutronmessage"},(0,i.kt)("inlineCode",{parentName:"a"},"EventTypeNeutonMessage"))," with ",(0,i.kt)("inlineCode",{parentName:"p"},"action")," equals ",(0,i.kt)("inlineCode",{parentName:"p"},"query_updated"),"."),(0,i.kt)("h3",{id:"remove-interchain-query"},"Remove Interchain Query"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L108"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgRemoveInterchainQueryRequest"))," can be submitted only by the owner of corresponding Interchain Query within the query's service period or by anyone beyond it. Read more about this message permissions ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-queries/overview#query-creation-deposit"},"here"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgRemoveInterchainQueryRequest {\n  uint64 query_id = 1;\n  string sender = 2; // is the signer of the message and the owner of corresponding ICQ\n}\n")),(0,i.kt)("p",null,"Returns just an empty ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L112"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgRemoveInterchainQueryResponse"))," on success:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgRemoveInterchainQueryResponse {\n}\n")),(0,i.kt)("h4",{id:"state-modifications-2"},"State modifications"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/keeper/keeper.go#L140"},"Removes")," a corresponding ",(0,i.kt)("inlineCode",{parentName:"li"},"RegisteredQuery")," structure."),(0,i.kt)("li",{parentName:"ul"},"Also removes the query results (",(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/keeper/keeper.go#L144"},"immediately")," for a KV query, ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/module.go#L176"},"deferred in the ICQ module EndBlock")," for a TX query).")),(0,i.kt)("h4",{id:"events-2"},"Events"),(0,i.kt)("p",null,"Emits ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/interchain-queries/events#eventtypeneutronmessage"},(0,i.kt)("inlineCode",{parentName:"a"},"EventTypeNeutonMessage"))," with ",(0,i.kt)("inlineCode",{parentName:"p"},"action")," equals ",(0,i.kt)("inlineCode",{parentName:"p"},"query_removed"),"."),(0,i.kt)("h3",{id:"submit-query-result"},"Submit Query Result"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L46"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgSubmitQueryResult"))," can be submitted by any Neutron account via ",(0,i.kt)("inlineCode",{parentName:"p"},"MsgSubmitQueryResult")," transaction:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgSubmitQueryResult {\n  uint64 query_id = 1;\n  string sender = 2;\n\n  // is the IBC client ID for an IBC connection between Neutron chain and target chain (where the result was obtained from)\n  string client_id = 3;\n  QueryResult result = 4;\n}\n\nmessage QueryResult {\n  repeated StorageValue kv_results = 1;\n  Block block = 2;\n  uint64 height = 3;\n  uint64 revision = 4;\n  bool allow_kv_callbacks = 5;\n}\n\nmessage StorageValue {\n  // is the substore name (acc, staking, etc.)\n  string storage_prefix = 1;\n\n  // is the key in IAVL store\n  bytes key = 2;\n\n  // is the value in IAVL store\n  bytes value = 3;\n\n  // is the Merkle Proof which proves existence of key-value pair in IAVL storage\n  tendermint.crypto.ProofOps Proof = 4;\n}\n\nmessage Block {\n  // We need to know block X+1 to verify response of transaction for block X\n  // since LastResultsHash is root hash of all results from the txs from the previous block\n  google.protobuf.Any next_block_header = 1;\n\n  // We need to know block X to verify inclusion of transaction for block X\n  google.protobuf.Any header = 2;\n\n  TxValue tx = 3;\n}\n\nmessage TxValue {\n  tendermint.abci.ResponseDeliverTx response = 1;\n\n  // is the Merkle Proof which proves existence of response in block with height next_block_header.Height\n  tendermint.crypto.Proof delivery_proof = 2;\n\n  // is the Merkle Proof which proves existence of data in block with height header.Height\n  tendermint.crypto.Proof inclusion_proof = 3;\n\n  // is body of the transaction\n  bytes data = 4;\n}\n")),(0,i.kt)("p",null,"Returns just an empty ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/proto/interchainqueries/tx.proto#L106"},(0,i.kt)("inlineCode",{parentName:"a"},"MsgSubmitQueryResultResponse"))," on success:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message MsgSubmitQueryResultResponse {}\n")),(0,i.kt)("h4",{id:"state-modifications-3"},"State modifications"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"get registered interchain query info by ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.query_id"),";"),(0,i.kt)("li",{parentName:"ul"},"for every ",(0,i.kt)("inlineCode",{parentName:"li"},"result")," in ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.kv_results"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"read IBC connection consensus state from IBC keeper storage with ",(0,i.kt)("inlineCode",{parentName:"li"},"registered_query.ConnectionID"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.revision"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.height+1"),";"),(0,i.kt)("li",{parentName:"ul"},"verify ",(0,i.kt)("inlineCode",{parentName:"li"},"result.Proof")," with Merkle Root Hash from consensus state;"))),(0,i.kt)("li",{parentName:"ul"},"save ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.kv_results")," to the storage:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"clear ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result")," from the proofs, Neutron doesn't need them anymore;"),(0,i.kt)("li",{parentName:"ul"},"save cleared result to storage with key ",(0,i.kt)("inlineCode",{parentName:"li"},"registered_query.id"),";"),(0,i.kt)("li",{parentName:"ul"},"set ",(0,i.kt)("inlineCode",{parentName:"li"},"registered_query.last_submitted_result_remote_height")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"result.height"),";"),(0,i.kt)("li",{parentName:"ul"},"set ",(0,i.kt)("inlineCode",{parentName:"li"},"registered_query.last_submitted_result_local_height")," to the current Neutron height;"))),(0,i.kt)("li",{parentName:"ul"},"callback ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.kv_results")," to thr appropriate smart-contract if needed;"),(0,i.kt)("li",{parentName:"ul"},"for every ",(0,i.kt)("inlineCode",{parentName:"li"},"block")," in ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.blocks"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"verify ",(0,i.kt)("inlineCode",{parentName:"li"},"block.next_block_header")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"block.header")," by calling ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/keeper/process_block_results.go#L68"},(0,i.kt)("inlineCode",{parentName:"a"},"clientKeeper.UpdateClient(header)")),";"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v2.0.3/x/interchainqueries/keeper/process_block_results.go#L167"},"verify")," ",(0,i.kt)("inlineCode",{parentName:"li"},"block.txs")," with verified headers;"))),(0,i.kt)("li",{parentName:"ul"},"process every ",(0,i.kt)("inlineCode",{parentName:"li"},"transaction")," in every ",(0,i.kt)("inlineCode",{parentName:"li"},"block")," from ",(0,i.kt)("inlineCode",{parentName:"li"},"MsgSubmitQueryResult.result.blocks"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L134"},"check")," transaction was not processed previously to avoid double submitting"),(0,i.kt)("li",{parentName:"ul"},"save generated record to the storage with composite key ",(0,i.kt)("inlineCode",{parentName:"li"},"bigEndianBytes(registered_query.id) + bigEndianBytes(last_submitted_transaction_id")," prefixed by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/types/keys.go#L37"},(0,i.kt)("inlineCode",{parentName:"a"},"SubmittedTxKey")),";"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L143"},"callback")," transaction to the appropriate smart-contract;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/process_block_results.go#L150"},"save")," transaction's hash to the storage to approach double-submission preventing mechanics.")))))}m.isMDXComponent=!0}}]);