"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[51908],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),d=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},m=function(e){var t=d(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=d(n),c=a,h=p["".concat(l,".").concat(c)]||p[c]||u[c]||r;return n?o.createElement(h,s(s({ref:t},m),{},{components:n})):o.createElement(h,s({ref:t},m))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=c;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var d=2;d<r;d++)s[d]=n[d];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},11778:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var o=n(87462),a=(n(67294),n(3905));const r={},s="Admin Module",i={unversionedId:"neutron/modules/admin-module/overview",id:"version-3.0/neutron/modules/admin-module/overview",title:"Admin Module",description:"Overview",source:"@site/versioned_docs/version-3.0/neutron/modules/admin-module/overview.md",sourceDirName:"neutron/modules/admin-module",slug:"/neutron/modules/admin-module/overview",permalink:"/3.0/neutron/modules/admin-module/overview",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Queries",permalink:"/3.0/neutron/token-generation-event/price-feed/queries"},next:{title:"Messages",permalink:"/3.0/neutron/modules/admin-module/messages"}},l={},d=[{value:"Overview",id:"overview",level:2},{value:"Concepts",id:"concepts",level:2},{value:"Network Administration and Governance",id:"network-administration-and-governance",level:3},{value:"Mechanism of Operation",id:"mechanism-of-operation",level:3},{value:"Implementation in Neutron",id:"implementation-in-neutron",level:3},{value:"Whitelisting",id:"whitelisting",level:3},{value:"Challenges related to Cosmos SDK 0.47",id:"challenges-related-to-cosmos-sdk-047",level:2},{value:"Enhancements &amp; Solutions",id:"enhancements--solutions",level:3},{value:"ProposalExecuteMessage Binding",id:"proposalexecutemessage-binding",level:4},{value:"Whitelisting of Executable Messages",id:"whitelisting-of-executable-messages",level:4},{value:"Legacy Proposals &amp; Handler",id:"legacy-proposals--handler",level:4},{value:"Revamped MsgSubmitProposal",id:"revamped-msgsubmitproposal",level:4},{value:"Streamlined Logic and Execution",id:"streamlined-logic-and-execution",level:4},{value:"Conclusion",id:"conclusion",level:2}],m={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"admin-module"},"Admin Module"),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/admin-module/tree/feat/admin-module-sdk47"},"Admin module")," in the Neutron network is a central governance tool, enabling the DAO to propose and execute pivotal operations. Developed using the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk"},"cosmos-sdk"),", this module is upgraded to align with the ",(0,a.kt)("inlineCode",{parentName:"p"},"Cosmos SDK 0.47"),"."),(0,a.kt)("h2",{id:"concepts"},"Concepts"),(0,a.kt)("h3",{id:"network-administration-and-governance"},"Network Administration and Governance"),(0,a.kt)("p",null,"Being the network's admin, our ",(0,a.kt)("a",{parentName:"p",href:"/neutron/dao/overview"},"DAO")," is empowered to execute proposals that can significantly change the network state. These proposals can encapsulate a myriad of operations including but not limited to:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Modifying parameters of a specific module, like adjusting transaction fees or validator incentives."),(0,a.kt)("li",{parentName:"ul"},"A full spectrum of ",(0,a.kt)("inlineCode",{parentName:"li"},"wasm")," proposals, leveraging the WebAssembly smart contract functionalities in Cosmos."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/main/x/upgrade/types/upgrade.pb.go"},"Upgrade proposals"),", enabling seamless interoperability and data transfer between distinct blockchains."),(0,a.kt)("li",{parentName:"ul"},"Execution of any ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/tree/master/types"},"sdk.msg"),", the standard message format in the Cosmos ecosystem.")),(0,a.kt)("h3",{id:"mechanism-of-operation"},"Mechanism of Operation"),(0,a.kt)("p",null,"We achieve governance through a dual mechanism approach. A message, structured as per cosmos-sdk's guidelines, is sent to the admin module using wasmbindings from MainDao. This message typically contains one of the two global types of ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/gov/spec"},"proposals"),":"),(0,a.kt)("p",null,"1) ",(0,a.kt)("strong",{parentName:"p"},"Legacy Proposal"),": Rooted in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/gov"},(0,a.kt)("inlineCode",{parentName:"a"},"x/gov")," module")," of the cosmos-sdk, certain modules like wasm can have predefined proposals. Classic examples include ",(0,a.kt)("inlineCode",{parentName:"p"},"MigrateContract")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"DeleteAdmin"),". The intrinsic cosmos-sdk processes such proposals via a dedicated ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/tree/master/baseapp"},"handler"),". The Admin module on Neutron, in line with these processes, can execute such proposals if they are part of a whitelisted group. Despite this mechanism being labeled deprecated in the recent sdk-47 update, its support remains due to certain modules (like ibc) not transitioning as per the sdk-47 guidelines."),(0,a.kt)("p",null,"2) ",(0,a.kt)("strong",{parentName:"p"},"Proposal"),": The advent of sdk-47 heralded a fresh approach. Actions, rather than being bound by predefined standards, could now be executed using the versatile ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/tree/master/types"},(0,a.kt)("inlineCode",{parentName:"a"},"sdk.Msg")),". This necessitated an overhaul in permission structures across modules. Modules have now integrated an ",(0,a.kt)("inlineCode",{parentName:"p"},"authority")," field, signifying an address (or a group of addresses) that have been permissioned to dispatch critical messages, such as UpdateParams."),(0,a.kt)("h3",{id:"implementation-in-neutron"},"Implementation in Neutron"),(0,a.kt)("p",null,"The Admin module in Neutron utilizes both the aforementioned proposal mechanisms. Specifically, these are executed within the msg.server of the admin module, ensuring seamless integration with the larger Neutron infrastructure. Our commitment is to keep abreast of the cosmos-sdk updates while preserving the unique governance structure that Neutron network requires."),(0,a.kt)("h3",{id:"whitelisting"},"Whitelisting"),(0,a.kt)("p",null,"As soon as we want to control the list of proposals that may be executed via adminmodule, we have ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/update-sdk47/app/proposals_allowlisting.go"},"a simple whitelisting")," mechanism."),(0,a.kt)("h2",{id:"challenges-related-to-cosmos-sdk-047"},"Challenges related to Cosmos SDK 0.47"),(0,a.kt)("p",null,"Transitioning to ",(0,a.kt)("inlineCode",{parentName:"p"},"Cosmos SDK 0.47")," introduced several hurdles:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Original Admin Module's Dormancy:")," Prior to ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/releases/tag/v2.0.0"},"V2"),", Neutron used the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Ethernal-Tech/admin-module"},"original Admin Module"),". This module, no longer actively maintained, needs an upgrade.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Deprecation of ",(0,a.kt)("inlineCode",{parentName:"strong"},"x/params"),":")," With the new SDK version, the ",(0,a.kt)("inlineCode",{parentName:"p"},"x/params")," module has been deprecated, pushing each Cosmos Module to implement custom parameter handling logic.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Change in Governance Logic:")," The new SDK has moved away from the ",(0,a.kt)("inlineCode",{parentName:"p"},"ProposalHandler")," logic in modules. Instead, the ",(0,a.kt)("inlineCode",{parentName:"p"},"gov")," module can now issue direct messages to any Cosmos Module."))),(0,a.kt)("h3",{id:"enhancements--solutions"},"Enhancements & Solutions"),(0,a.kt)("h4",{id:"proposalexecutemessage-binding"},"ProposalExecuteMessage Binding"),(0,a.kt)("p",null,"Introduced a new ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/261f47c30dcfc7cd51eef2b78bd770abd059208b/wasmbinding/bindings/msg.go#L105"},(0,a.kt)("inlineCode",{parentName:"a"},"ProposalExecuteMessage"))," binding, allowing the AdminModule to process any type of Cosmos message. A ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/261f47c30dcfc7cd51eef2b78bd770abd059208b/wasmbinding/message_plugin.go#L441"},"signer verification")," ensures authenticity."),(0,a.kt)("h4",{id:"whitelisting-of-executable-messages"},"Whitelisting of Executable Messages"),(0,a.kt)("p",null,"Implemented a ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/261f47c30dcfc7cd51eef2b78bd770abd059208b/app/proposals_allowlisting.go#L48"},"whitelist mechanism")," to ensure that only pre-approved messages are executed."),(0,a.kt)("h4",{id:"legacy-proposals--handler"},"Legacy Proposals & Handler"),(0,a.kt)("p",null,"For ensuring backward compatibility, we have retained ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/261f47c30dcfc7cd51eef2b78bd770abd059208b/wasmbinding/bindings/msg.go#L102"},"ClientUpdateProposal, UpgradeProposal, and ParamChangeProposal"),". Additionally, a handler named ",(0,a.kt)("inlineCode",{parentName:"p"},"MsgSubmitProposalLegacy")," has been ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/admin-module/blob/feat/admin-module-sdk47/x/adminmodule/keeper/msg_server_submit_proposal_legacy.go"},"introduced")," for pre-sdk47 proposals."),(0,a.kt)("h4",{id:"revamped-msgsubmitproposal"},"Revamped MsgSubmitProposal"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/admin-module/blob/feat/admin-module-sdk47/x/adminmodule/keeper/msg_server_submit_proposal.go"},(0,a.kt)("inlineCode",{parentName:"a"},"MsgSubmitProposal"))," has been redesigned to handle any type of Cosmos message."),(0,a.kt)("h4",{id:"streamlined-logic-and-execution"},"Streamlined Logic and Execution"),(0,a.kt)("p",null,"We've removed unnecessary logic and the cache context, leading to immediate proposal execution within the msgServer/keeper and the removal of Active and Inactive queues."),(0,a.kt)("h2",{id:"conclusion"},"Conclusion"),(0,a.kt)("p",null,"With these updates, Neutron remains at the forefront of the evolving Cosmos ecosystem, ensuring our governance remains robust, safe and compatible."))}u.isMDXComponent=!0}}]);