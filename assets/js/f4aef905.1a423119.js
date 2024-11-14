"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[52225],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=o,d=p["".concat(u,".").concat(m)]||p[m]||h[m]||a;return r?n.createElement(d,i(i({ref:t},l),{},{components:r})):n.createElement(d,i({ref:t},l))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},78939:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(87462),o=(r(67294),r(3905));const a={},i="Overview",s={unversionedId:"neutron/modules/interchain-queries/overview",id:"version-1.0/neutron/modules/interchain-queries/overview",title:"Overview",description:"Abstract",source:"@site/versioned_docs/version-1.0/neutron/modules/interchain-queries/overview.md",sourceDirName:"neutron/modules/interchain-queries",slug:"/neutron/modules/interchain-queries/overview",permalink:"/1.0/neutron/modules/interchain-queries/overview",draft:!1,tags:[],version:"1.0",frontMatter:{},sidebar:"docs",previous:{title:"Events",permalink:"/1.0/neutron/modules/interchain-txs/events"},next:{title:"Messages",permalink:"/1.0/neutron/modules/interchain-queries/messages"}},u={},c=[{value:"Abstract",id:"abstract",level:2},{value:"Concepts",id:"concepts",level:2},{value:"Transaction filters",id:"transaction-filters",level:2},{value:"Query creation deposit",id:"query-creation-deposit",level:2}],l={toc:c},p="wrapper";function h(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"overview"},"Overview"),(0,o.kt)("h2",{id:"abstract"},"Abstract"),(0,o.kt)("p",null,"This document specifies the ICQ (",(0,o.kt)("strong",{parentName:"p"},"I"),"nter",(0,o.kt)("strong",{parentName:"p"},"C"),"hain ",(0,o.kt)("strong",{parentName:"p"},"Q"),"ueries) module for the Neutron network."),(0,o.kt)("p",null,"The ICQ module implements a mechanism to retrieve data from remote chains connected to Neutron via IBC."),(0,o.kt)("h2",{id:"concepts"},"Concepts"),(0,o.kt)("p",null,"A smart-contract can register two types of Interchain Query for particular chain with some query payload and ",(0,o.kt)("inlineCode",{parentName:"p"},"update_period"),":"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Key-Value query (KV-query) - to read ",(0,o.kt)("strong",{parentName:"li"},"values")," from Cosmos-SDK KV-storage on remote chain which are stored under a set of ",(0,o.kt)("strong",{parentName:"li"},"keys"),";"),(0,o.kt)("li",{parentName:"ul"},"Transactions query (TX-query) - find transactions on remote chain under by condition (transactions filter).")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u26a0\ufe0f ",(0,o.kt)("strong",{parentName:"p"},"IMPORTANT NOTE ABOUT KV-QUERIES")),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Due to a ",(0,o.kt)("a",{parentName:"strong",href:"https://github.com/cosmos/ics23/issues/134"},"bug")," in ICS23 package, it's currently impossible to query an empty or ",(0,o.kt)("inlineCode",{parentName:"strong"},"nil")," value from a remote chain.")),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Meaning if your KV-query is registered with key ",(0,o.kt)("inlineCode",{parentName:"strong"},"K")," and a value under this key is ",(0,o.kt)("inlineCode",{parentName:"strong"},"nil")," or empty, submission of such"),"\n",(0,o.kt)("strong",{parentName:"p"},"KV result will fail due to IAVL-proof verification error: ",(0,o.kt)("inlineCode",{parentName:"strong"},"failed to verify proof: empty value in membership proof"))),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Moreover, due to ",(0,o.kt)("a",{parentName:"strong",href:"https://github.com/cosmos/cosmos-sdk/blob/ae77f0080a724b159233bd9b289b2e91c0de21b5/docs/interfaces/lite/specification.md"},"the nature of IAVL-proofs")),"\n",(0,o.kt)("strong",{parentName:"p"},"(which is an underlying mechanism of verification of a validity of KV-queries results),"),"\n",(0,o.kt)("strong",{parentName:"p"},"it's also impossible to verify"),"\n",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("a",{parentName:"strong",href:"https://github.com/cosmos/cosmos-sdk/blob/ae77f0080a724b159233bd9b289b2e91c0de21b5/docs/interfaces/lite/specification.md#iavl-absence-proof"},"IAVL-absence proof")),"\n",(0,o.kt)("strong",{parentName:"p"},"if it contains IAVL-proof with ",(0,o.kt)("inlineCode",{parentName:"strong"},"nil")," or empty value: ",(0,o.kt)("inlineCode",{parentName:"strong"},"failed to verify proof: could not verify absence of key. Please ensure that the path is correct."))),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"We are in contact with ics23 team to fix this issue ASAP, but in the meantime the only way to deal with the bug - is to avoid querying keys with ",(0,o.kt)("inlineCode",{parentName:"strong"},"nil")," or empty values."))),(0,o.kt)("p",null,"ICQ Relayer keeps track of registered Interchain Queries by querying all existed ICQs at the start of work and by subscribing on ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/msg_server.go#L305"},"Update")," and ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/interchainqueries/keeper/msg_server.go#L321"},"Delete")," events which are emitted in corresponding Neutron handlers. When the ICQ Relayer sees that it's time to perform an interchain query, it makes a necessary RPC call to a remote chain and makes the results available for the Neutron's smart contracts by submitting the result to the module. Read more about it at the ",(0,o.kt)("a",{parentName:"p",href:"/relaying/icq-relayer#overview"},"Relayer's page"),"."),(0,o.kt)("p",null,"Neutron verifies the data and processes the query result depending on the interchain query type:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"in case of a KV-query, the ICQ module saves the result into module's storage, and passed the query id to the contract's\n",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/contractmanager/keeper/sudo.go#L211"},"SudoKVQueryResult")," ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron-sdk/blob/v0.5.0/contracts/neutron_interchain_queries/src/contract.rs#L385"},"handler"),";"),(0,o.kt)("li",{parentName:"ul"},"in case of a TX-query, the ICQ module ",(0,o.kt)("strong",{parentName:"li"},"does not")," save the result to the storage, finds the contract that registered the query,\nand passes the full result to the contract's ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/x/contractmanager/keeper/sudo.go#L173"},"SudoTXQueryResult")," ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron-sdk/blob/v0.5.0/contracts/neutron_interchain_queries/src/contract.rs#L267"},"handler"),".")),(0,o.kt)("h2",{id:"transaction-filters"},"Transaction filters"),(0,o.kt)("p",null,"Since events themselves are not part of the consensus and are not included in the transaction result, it's necessary to\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-sdk/blob/c197ceacc1c23d2f1283be91f8f90c2be1328db0/contracts/neutron_interchain_queries/src/contract.rs#L197"},"implement additional checks"),"\nin your ",(0,o.kt)("inlineCode",{parentName:"p"},"SudoTXQueryResult")," handler to check that result transactions satisfies your transactions filter. For instance, you can check that messages in the transactions have proper types, payload, etc.\nIf your contract does not have such checks, malicious relayer can send a fully valid Tendermint transaction which does not satisfy your defined transactions filter, and your business-logic can be broken."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"NOTE: when registering a TX-query, you write the transaction filters as filters for transaction events. When you check the submitted transaction in your contracts, though, you can only check the information that is stored on-chain (i.e., message fields for messages in a transaction). To put it another way, the set of values that you can use to filter transactions is the intersection of the values that are added to transaction events (used by the ICQ relayer to perform the search) and the values included directly to sdk.Msgs (can be used by your code to check whether the submitted transaction matches your query).  ")),(0,o.kt)("p",null,"You can see more info, examples and recommendations about proper transactions result handling ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-sdk/blob/v0.5.0/contracts/neutron_interchain_txs/src/contract.rs#L439"},"here"),"."),(0,o.kt)("h2",{id:"query-creation-deposit"},"Query creation deposit"),(0,o.kt)("p",null,"In order to clean up ledger from not used, outdated queries special deposit mechanism is used. ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v1.0.4/proto/interchainqueries/genesis.proto#L40"},"RegisteredQuery")," contains ",(0,o.kt)("inlineCode",{parentName:"p"},"deposit")," field, this field is used to collect escrow payment for query creation. In order to return escrow payment a ",(0,o.kt)("inlineCode",{parentName:"p"},"RemoveInterchainQuery")," message should be issued. "),(0,o.kt)("p",null,"Permission to perform ",(0,o.kt)("inlineCode",{parentName:"p"},"RemoveInterchainQuery")," message is based on three parameters:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"query_submit_timeout")," \u2014 a module parameter which can be thought of as query service period;"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"last_submitted_result_local_height")," \u2014 registered query's property representing the Neutron's height the query was updated last time at;"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"registered_at_height")," \u2014 registered query's property representing the Neutron's height the query was registered at.")),(0,o.kt)("p",null,"The permissions to execute ",(0,o.kt)("inlineCode",{parentName:"p"},"RemoveInterchainQuery")," are as follows:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"within the service period (i.e. if ",(0,o.kt)("inlineCode",{parentName:"li"},"current_height <= last_submitted_result_local_height + query_submit_timeout && current_height <= registered_at_height + query_submit_timeout"),") only the query's owner is permissioned to remove it;"),(0,o.kt)("li",{parentName:"ul"},"beyond the service period (i.e. if ",(0,o.kt)("inlineCode",{parentName:"li"},"current_height > last_submitted_result_local_height + query_submit_timeout || current_height > registered_at_height + query_submit_timeout"),") anyone can remove the query and take the deposit as a reward.")),(0,o.kt)("p",null,"Amount of coins to deposit is defined via parameter (",(0,o.kt)("inlineCode",{parentName:"p"},"query_deposit"),") controlled by governance proposal."),(0,o.kt)("p",null,"In other words, it is expected of the query owner to remove its queries when they are not needed anymore. If a query hasn't been in use for the ",(0,o.kt)("inlineCode",{parentName:"p"},"query_submit_timeout")," and owner hasn't removed it, network users are granted with an opportunity to clean the chain up and raise assets for it."))}h.isMDXComponent=!0}}]);