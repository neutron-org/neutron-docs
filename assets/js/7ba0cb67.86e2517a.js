"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[72151],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=a,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},99824:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={},i="Overview",s={unversionedId:"neutron/modules/feerefunder/overview",id:"neutron/modules/feerefunder/overview",title:"Overview",description:"Abstract",source:"@site/docs/neutron/modules/feerefunder/overview.md",sourceDirName:"neutron/modules/feerefunder",slug:"/neutron/modules/feerefunder/overview",permalink:"/neutron/modules/feerefunder/overview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"State",permalink:"/neutron/modules/contract-manager/state"},next:{title:"Client",permalink:"/neutron/modules/feerefunder/client"}},l={},c=[{value:"Abstract",id:"abstract",level:2},{value:"Concepts",id:"concepts",level:2},{value:"General mechanics",id:"general-mechanics",level:3}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"overview"},"Overview"),(0,a.kt)("h2",{id:"abstract"},"Abstract"),(0,a.kt)("p",null,"This document specifies the FeeRefunder module for the Neutron network."),(0,a.kt)("p",null,"The FeeRefunder module implements a mechanism and contains methods to make refunds to IBC relayers for their submission of IBC ",(0,a.kt)("inlineCode",{parentName:"p"},"Ack")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Timeout")," packets."),(0,a.kt)("h2",{id:"concepts"},"Concepts"),(0,a.kt)("p",null,"Due to the fact that contracts are allowed to make calls to the IBC as well as process all received data, a problem arieses in which a malicious contract can make a call to the IBC and, during the response of the ",(0,a.kt)("inlineCode",{parentName:"p"},"Ack")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"Timeout"),", make another IBC call and so on forever. Which will lead to drainage of relayer's funds and spamming of the network."),(0,a.kt)("p",null,"In order to avoid such problem, the code in the module forces the contract to pay for all Acknowledgements and Timeout messages it processes."),(0,a.kt)("p",null,"The mechanism behind the module is inspired by ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/ibc/tree/main/spec/app/ics-029-fee-payment"},"ICS-29"),". ICS-29 itself requires both chains (target and source chains) to support the specifications which is not quite good for Neutron, since we want to connect as many chains as possible, and that's hard with ICS-29, since not so many chains use the latest ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/ibc-go"},"ibc-go")," version."),(0,a.kt)("p",null,"That is why we decided to implement our own IBC Fees module, which allows to refund relayers for their ",(0,a.kt)("inlineCode",{parentName:"p"},"Ack/Timeout"),' submission, but with the same interface for the smart-contract developers. So when Neutron will support native ICS-29, there will no need for smart-contract developers to change their contracts, upgrading to the "official" fees module will be very smooth.'),(0,a.kt)("h3",{id:"general-mechanics"},"General mechanics"),(0,a.kt)("p",null,"The module requires smart-contracts, which use ",(0,a.kt)("a",{parentName:"p",href:"../transfer/messages#msgtransfer"},"Transfer")," and ",(0,a.kt)("a",{parentName:"p",href:"../interchain-txs/messages#msgsubmittx"},"SubmitTx")," messages from respective ",(0,a.kt)("a",{parentName:"p",href:"../transfer/overview"},"Transfer")," and ",(0,a.kt)("a",{parentName:"p",href:"../interchain-txs/overview"},"Interchain Transactions")," modules, to provide fee values to refund relayers for particular type of IBC packet acknoledgements when sending such messages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"ack_fee")," - amount of coins to refund relayer for submittting ack message for a particular IBC packet (i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},"500untrn"),");"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"timeout_fee")," - amount of coins to refund relayer for submitting timeout message for a particular IBC packet (i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},"500untrn"),");"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"recv_fee")," - currently is used for compatibility with ICS-29 interface only and ",(0,a.kt)("strong",{parentName:"li"},"must be set to zero")," (i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},"0untrn"),"), because Neutron's fee module can't refund relayers for submission of ",(0,a.kt)("inlineCode",{parentName:"li"},"Recv")," IBC packets due to compatibility with target chains.")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Note:")," the fees can be specified only in native Cosmos-SDK coins. CW-20 coins are not supported!")),(0,a.kt)("p",null,"When a smart-contract issues ",(0,a.kt)("inlineCode",{parentName:"p"},"Transfer")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"SubmitTx")," message, the fee Module deduct the whole specified fee amount (",(0,a.kt)("inlineCode",{parentName:"p"},"ack_fee + timeout_fee + recv_fee"),") and locks that amount in the module's escrow address. When a relayer submits ",(0,a.kt)("inlineCode",{parentName:"p"},"Ack")," message for a particular packet, the module sends the specified amount of ",(0,a.kt)("inlineCode",{parentName:"p"},"ack_fee")," to the relayer from the escrow address and return the specified ",(0,a.kt)("inlineCode",{parentName:"p"},"timeout_fee")," to the contract which issued the original ",(0,a.kt)("inlineCode",{parentName:"p"},"Transfer")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"SubmitTx")," message. In case when relayer submits ",(0,a.kt)("inlineCode",{parentName:"p"},"Timeout")," message, things go the other way around: the relayer is refunded with ",(0,a.kt)("inlineCode",{parentName:"p"},"timeout_fee")," and the contract gets ",(0,a.kt)("inlineCode",{parentName:"p"},"ack_fee")," back."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Note:")," the minimal amount of fee to be specified for the messages above is defined via parameter ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/v4.2.4/proto/neutron/feerefunder/params.proto#L13"},(0,a.kt)("inlineCode",{parentName:"a"},"min_fee"))," controlled by governance proposal.\nIf provided fees are less than ",(0,a.kt)("inlineCode",{parentName:"p"},"min_fee")," parameter, ",(0,a.kt)("inlineCode",{parentName:"p"},"Transfer")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"SubmitTx")," or message will be rejected.")))}m.isMDXComponent=!0}}]);