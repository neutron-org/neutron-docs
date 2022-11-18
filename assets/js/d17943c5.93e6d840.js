"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[730],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=l(n),h=r,d=m["".concat(c,".").concat(h)]||m[h]||p[h]||o;return n?a.createElement(d,i(i({ref:t},u),{},{components:n})):a.createElement(d,i({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9179:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const o={},i="Overview",s={unversionedId:"neutron/interchain-txs/overview",id:"neutron/interchain-txs/overview",title:"Overview",description:"This document specifies the Interchain Transactions module for the Neutron network.",source:"@site/docs/neutron/interchain-txs/overview.md",sourceDirName:"neutron/interchain-txs",slug:"/neutron/interchain-txs/overview",permalink:"/neutron/interchain-txs/overview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/"},next:{title:"Messages",permalink:"/neutron/interchain-txs/messages"}},c={},l=[{value:"IBC events",id:"ibc-events",level:2},{value:"Relaying",id:"relaying",level:2}],u={toc:l};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"overview"},"Overview"),(0,r.kt)("p",null,"This document specifies the Interchain Transactions module for the Neutron network."),(0,r.kt)("p",null,"The Interchain Transactions module manages the creation of IBC Accounts and executing interchain transactions on behalf\nof CosmWasm smart contracts. The current implementation allows a smart contract to:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Register multiple interchain accounts on a remote zone using an existing IBC connection;"),(0,r.kt)("li",{parentName:"ol"},"Execute transactions with multiple messages on a remote zone;"),(0,r.kt)("li",{parentName:"ol"},"Process the ",(0,r.kt)("inlineCode",{parentName:"li"},"OnChanOpenAck"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"Acknowledgement")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"Timeout")," events as they are delivered by a relayer.")),(0,r.kt)("h2",{id:"ibc-events"},"IBC events"),(0,r.kt)("p",null,'Registering an interchain account or executing an interchain transaction are asynchronous actions. In most cases, the\nrespective handlers of the Interchain Transactions module immediately return an empty successful response. The "real"\nresponse (with information about the status of execution on a remote zone) is later delivered in a separate IBC packet\nby a relayer. We call such packets the ',(0,r.kt)("strong",{parentName:"p"},"IBC events"),"."),(0,r.kt)("p",null,"A smart contract that tries to register an interchain account or to execute an interchain transaction naturally expects\nto receive the IBC events related to these actions. The Interchain Transactions module solves this task by passing these\nIBC events to the smart contract using\na ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/blob/288609255ad92dfe5c54eae572fe7d6010e712eb/x/wasm/keeper/keeper.go#L453"},"Sudo() call"),"\nand a custom ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/blob/master/internal/sudo/sudo.go"},"message scheme"),". You can find a\ncomplete list of IBC events for each module message in the ",(0,r.kt)("a",{parentName:"p",href:"./messages"},"messages")," section."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),": if your Sudo handler fails, the acknowledgment won't be marked as processed inside the IBC module. This will\nmake most IBC relayers try to submit the acknowledgment over and over again. And since the ICA channels are ",(0,r.kt)("inlineCode",{parentName:"p"},"ORDERED"),",\nACKs must be processed in the same order as corresponding transactions were sent, meaning no further acknowledgments\nwill be process until the previous one processed successfully."),(0,r.kt)("p",{parentName:"blockquote"},"We strongly recommend developers to write Sudo handlers very carefully and keep them as simple as possible. If you do\nwant to have elaborate logic in your handler, you should verify the acknowledgement data before making any state\nchanges; that way you can, if the data received with the acknowledgement is incompatible with executing the handler\nlogic normally, return an ",(0,r.kt)("inlineCode",{parentName:"p"},"Ok()")," response immediately, which will prevent the acknowledgement from being resubmitted.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),": there is no dedicated event for a closed channel (ICA disables all messages related to closing the channels)\n. Your channel, however, can still be closed if a packet timeout occurs; thus, if you are notified about a packet\ntimeout, you can be sure that the affected channel was closed. Please note that it is generally a good practice to set\nthe packet timeout for your interchain transactions to a really large value."),(0,r.kt)("p",{parentName:"blockquote"}," If the timeout occurs anyway, you can just\nexecute ",(0,r.kt)("a",{parentName:"p",href:"/neutron/interchain-txs/messages#msgregisterinterchainaccount"},"RegisterInterchainAccount message")," again to\nrecover access to your interchain account.")),(0,r.kt)("h2",{id:"relaying"},"Relaying"),(0,r.kt)("p",null,"Neutron introduces smart-contract level callbacks for IBC packets. From an IBC relayer's perspective, this means that\ncustom application logic can be executed when a packet is submitted to Neutron, which can potentially drain the\nrelayer's funds. This naturally brings us to a situation in which protocols would prefer to set up their own relayers\nand restrict the channels they are willing to relay for. For example,\nin ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/informalsystems/ibc-rs"},"Hermes")," you can do this by adding a ",(0,r.kt)("inlineCode",{parentName:"p"},"chains.packet_filter")," config:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml"},"[chains.packet_filter]\npolicy = 'allow'\nlist = [\n    # allow relaying only for chanels created by a certain contract  \n    ['icacontroller-neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq*', '*'],\n]\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note: you can have a look at the ",(0,r.kt)("inlineCode",{parentName:"p"},"MsgRegisterInterchainQuery")," documentation in the ",(0,r.kt)("a",{parentName:"p",href:"/neutron/interchain-txs/messages"},"Messages")," chapter\nto learn how IBC port naming works.")),(0,r.kt)("p",null,"Please refer to the ",(0,r.kt)("a",{parentName:"p",href:"/relaying/ibc-relayer"},"IBC Relaying")," section for full IBC relaying documentation."))}p.isMDXComponent=!0}}]);