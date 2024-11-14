"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[13707],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),m=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=m(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=m(n),p=o,g=d["".concat(l,".").concat(p)]||d[p]||c[p]||r;return n?a.createElement(g,i(i({ref:t},u),{},{components:n})):a.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:o,i[1]=s;for(var m=2;m<r;m++)i[m]=n[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},77398:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>m});var a=n(87462),o=(n(67294),n(3905));const r={},i="Neutron Core Releases",s={unversionedId:"neutron/neutron-core-releases",id:"version-4.0/neutron/neutron-core-releases",title:"Neutron Core Releases",description:"Overview",source:"@site/versioned_docs/version-4.0/neutron/neutron-core-releases.md",sourceDirName:"neutron",slug:"/neutron/neutron-core-releases",permalink:"/4.0/neutron/neutron-core-releases",draft:!1,tags:[],version:"4.0",frontMatter:{},sidebar:"docs",previous:{title:"Neutron Launch Instructions",permalink:"/4.0/neutron/consumer-chain-launch"},next:{title:"Price Feeds",permalink:"/4.0/neutron/price-feeds"}},l={},m=[{value:"Overview",id:"overview",level:2},{value:"v4.0.0",id:"v400",level:2},{value:"Slinky integration",id:"slinky-integration",level:3},{value:"Feemarket integration",id:"feemarket-integration",level:3},{value:"Cosmos SDK Upgrade",id:"cosmos-sdk-upgrade",level:3},{value:"Wasmd Upgrade",id:"wasmd-upgrade",level:3},{value:"Notable changes:",id:"notable-changes",level:3},{value:"IBC-GO upgrade to v8.2.1",id:"ibc-go-upgrade-to-v821",level:3},{value:"Golang upgrade",id:"golang-upgrade",level:3},{value:"v3.0.0",id:"v300",level:2},{value:"Block SDK integration",id:"block-sdk-integration",level:3},{value:"CW bindings",id:"cw-bindings",level:3},{value:"Golang upgrade",id:"golang-upgrade-1",level:3},{value:"v2.0.0",id:"v200",level:2},{value:"Dependencies upgrade",id:"dependencies-upgrade",level:3},{value:"Cosmos SDK Upgrade",id:"cosmos-sdk-upgrade-1",level:4},{value:"Wasmd Upgrade",id:"wasmd-upgrade-1",level:4},{value:"Neutron Itself",id:"neutron-itself",level:4},{value:"Globalfee Module Integration",id:"globalfee-module-integration",level:5},{value:"Tokenfactory Module Update",id:"tokenfactory-module-update",level:5},{value:"Interchain Transactions and ContractManager Module Refactor",id:"interchain-transactions-and-contractmanager-module-refactor",level:5},{value:"Adminmodule Rework",id:"adminmodule-rework",level:5},{value:"Dex module intoduction",id:"dex-module-intoduction",level:5}],u={toc:m},d="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"neutron-core-releases"},"Neutron Core Releases"),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"This section provides a comprehensive overview of the significant changes and updates in Neutron, focusing on the upgrades to Cosmos SDK, Wasmd, and Neutron's internal modules."),(0,o.kt)("h2",{id:"v400"},(0,o.kt)("a",{parentName:"h2",href:"https://github.com/neutron-org/neutron/releases/tag/v4.0.0"},"v4.0.0")),(0,o.kt)("h3",{id:"slinky-integration"},"Slinky integration"),(0,o.kt)("p",null,"Neutron has integrated ",(0,o.kt)("a",{parentName:"p",href:"/4.0/neutron/modules/3rdparty/skip/slinky/overview"},"Skip's Slinky")," - A general purpose price oracle leveraging ABCI++;"),(0,o.kt)("h3",{id:"feemarket-integration"},"Feemarket integration"),(0,o.kt)("p",null,"Neutron V4 has integrated Skip\u2019s ",(0,o.kt)("a",{parentName:"p",href:"/4.0/neutron/modules/3rdparty/skip/feemarket/overview"},"Feemarket"),", which implements the Additive Increase Multiplicative Decrease (AIMD) feemarket similar to Ethereum EIP 1559, where the base fee adjusts according to the network's demand for block space."),(0,o.kt)("p",null,"This model could potentially reduce the impact of spam by making it more expensive to flood the network with non-essential transactions, and create a more predictable and efficient transaction environment, enhancing the network's stability and efficiency, and ensuring that Neutron can handle large volumes of transactions without compromising crucial processes like IBC transfers."),(0,o.kt)("p",null,"There will no longer be static gas prices on Neutron . Gas-prices will be \u2018dynamic\u2019, with the price of gas depending on activity on the chain."),(0,o.kt)("h3",{id:"cosmos-sdk-upgrade"},"Cosmos SDK Upgrade"),(0,o.kt)("p",null,"Neutron has transitioned from Cosmos SDK v0.47 to the more advanced v0.50, encompassing significant improvements and custom adaptations.  The key aspects of this upgrade include:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Reference to the main ",(0,o.kt)("a",{parentName:"li",href:"https://docs.cosmos.network/v0.50/learn/intro/overview"},"Cosmos SDK v0.50 documentation"),".\n() Access to the full changelog ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.50.7/CHANGELOG.md"},"here"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"ABCI 2.0 Integration"),": Cosmos SDK v0.50 upgrades to CometBFT v0.38 and fully implements ABCI 2.0."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Optimistic Execution"),": Cosmos SDK v0.50 introduces Optimistic Execution, which allows transactions to be executed and committed without waiting for confirmation from all validators. This can significantly improve the performance of chains with a high volume of transactions."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Modular SDK modules"),": Cosmos SDK v0.50 starts to extract core modules away from the SDK. These are separately versioned and follow their own release cadence."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"IAVL v1"),": Cosmos SDK v0.50 upgrades the IAVL tree implementation to v1, which provides a number of performance and security improvements."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"AutoCLI"),": Cosmos SDK v0.50 introduces AutoCLI, a library that makes it easier to create CLI commands for SDK applications."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Sign Mode Textual"),": Cosmos SDK v0.50 introduces a new sign mode that for hardware devices, as a replacement of Amino JSON."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Less boilerplate"),": Cosmos SDK v0.50 requires less boilerplate in general for modules code and applications. Be sure to read the UPGRADING.md to take advantage of these improvements.")),(0,o.kt)("h3",{id:"wasmd-upgrade"},"Wasmd Upgrade"),(0,o.kt)("p",null,"Our custom fork of ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/wasmd"},"wasmd"),", based on version ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/blob/v0.51.0/CHANGELOG.md"},"0.51"),", brings forward these notable changes:"),(0,o.kt)("h3",{id:"notable-changes"},"Notable changes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Upgrade to ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/releases/tag/v0.50.1"},"SDK v0.50.1")," Eden release"),(0,o.kt)("li",{parentName:"ul"},"Upgrade to ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/ibc-go/releases/tag/v8.0.0"},"IBC v8.0.0")," release")),(0,o.kt)("h3",{id:"ibc-go-upgrade-to-v821"},"IBC-GO upgrade to ",(0,o.kt)("a",{parentName:"h3",href:"https://github.com/cosmos/ibc-go/releases/tag/v8.2.1"},"v8.2.1")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Channel upgradability;"),(0,o.kt)("li",{parentName:"ul"},"Support for unordered channels in ICA")),(0,o.kt)("h3",{id:"golang-upgrade"},"Golang upgrade"),(0,o.kt)("p",null,"Neutron V4 uses ",(0,o.kt)("a",{parentName:"p",href:"https://go.dev/doc/devel/release#go1.22.0"},"Golang 1.22")),(0,o.kt)("h2",{id:"v300"},(0,o.kt)("a",{parentName:"h2",href:"https://github.com/neutron-org/neutron/releases/tag/v3.0.0"},"v3.0.0")),(0,o.kt)("h3",{id:"block-sdk-integration"},"Block SDK integration"),(0,o.kt)("p",null,"Neutron has integrated ",(0,o.kt)("a",{parentName:"p",href:"/4.0/neutron/modules/3rdparty/skip/block-sdk/overview"},"Skip's Block SDK")," which allows builders to implement different MEV strategies on Neutron."),(0,o.kt)("h3",{id:"cw-bindings"},"CW bindings"),(0,o.kt)("p",null,"Neutron V3 contains convenient ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron/pull/365"},"CW bindings")," for ",(0,o.kt)("a",{parentName:"p",href:"/4.0/neutron/modules/dex/overview/"},"Neutron DEX")," module which allows to build smart-contract applications in a more\nefficient way avoiding tricky Stargate messages and queries."),(0,o.kt)("h3",{id:"golang-upgrade-1"},"Golang upgrade"),(0,o.kt)("p",null,"Neutron V3 uses ",(0,o.kt)("a",{parentName:"p",href:"https://go.dev/doc/devel/release#go1.21.0"},"Golang 1.21")),(0,o.kt)("h2",{id:"v200"},(0,o.kt)("a",{parentName:"h2",href:"https://github.com/neutron-org/neutron/releases/tag/v2.0.0"},"v2.0.0")),(0,o.kt)("h3",{id:"dependencies-upgrade"},"Dependencies upgrade"),(0,o.kt)("p",null,"Neutron V3 bumps a lot of source code dependencies to the latest versions (at the time of the release) to resolve security and maintaining issues."),(0,o.kt)("h4",{id:"cosmos-sdk-upgrade-1"},"Cosmos SDK Upgrade"),(0,o.kt)("p",null,"Neutron has transitioned from Cosmos SDK v0.45 to the more advanced v0.47, encompassing significant improvements and custom adaptations. The key aspects of this upgrade include:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Primary Changes:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Reference to the main ",(0,o.kt)("a",{parentName:"li",href:"https://docs.cosmos.network/v0.47/learn/intro/overview"},"Cosmos SDK v0.47 documentation"),"."),(0,o.kt)("li",{parentName:"ul"},"Access to the full changelog ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.47.6/CHANGELOG.md"},"here"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"--broadcast-mode")," block was removed. You need to query the result for a TX with neutrond q tx hash instead."),(0,o.kt)("li",{parentName:"ul"},"the SDK version includes some key store migration for the CLI. Make sure you backup your private keys before testing this! You can not switch back to v0.45."),(0,o.kt)("li",{parentName:"ul"},"We have created ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/cosmos-sdk"},"our own fork")," of the Cosmos SDK, introducing unique enhancements tailored to our needs:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Gas Counting Exclusion:")," Removal of gas counting in the upgrade module's begin blocker for more consistent gas accounting."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"BankHooks Introduction:")," Implementation of ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/cosmos-sdk/pull/2"},"BankHooks"),", a pivotal feature for the new Tokenfactory."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("a",{parentName:"strong",href:"https://github.com/neutron-org/cosmos-sdk/pull/5"},"Optimized Slashing Calculation"),":")," Backporting of slashing missed blocks calculation from Cosmos SDK v0.50."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CometBFT Transition:")," A significant shift to CometBFT for enhanced consensus reliability."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"ABCI 1.0 Support:")," Enabling chains to implement their mempool with ABCI 1.0 compatibility."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Module Parameters Handling:")," Deprecation of the ",(0,o.kt)("a",{parentName:"li",href:"https://docs.cosmos.network/v0.47/modules/params"},"x/params module"),". Modules now manage parameters directly."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"IBC-Go Upgrade:")," Moving to ibc-go v7 for improved inter-blockchain communication."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Technical Enhancements:")," Several minor yet impactful technical improvements (see full list ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.47.6/CHANGELOG.md"},"here"),").")))))),(0,o.kt)("h4",{id:"wasmd-upgrade-1"},"Wasmd Upgrade"),(0,o.kt)("p",null,"Our custom fork of ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/wasmd"},"wasmd"),", based on version ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/blob/v0.45.0/CHANGELOG.md"},"0.45"),", brings forward these key developments:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Instantiate2 Activation:")," Enabling predictable contract addresses through the ",(0,o.kt)("a",{parentName:"li",href:"https://docs.rs/cosmwasm-std/1.2.1/cosmwasm_std/fn.instantiate2_address.html"},"instantiate2 feature"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Smart-Contract Size Limit Increase:")," Expansion of the binary size limit from 800KB to 1.6MB as ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/pull/320"},"explained here"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Legacy REST endpoints for queries and txs are completely removed")," and only gRPC endpoints must be used now;legacy REST endpoints for queries and txs are completely removed and only gRPC endpoints must be used now."),(0,o.kt)("li",{parentName:"ul"},"contracts are able to use ",(0,o.kt)("strong",{parentName:"li"},"floating point operations"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Additional Improvements:")," Various other technical modifications and advancements (see full changelog ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/CosmWasm/wasmd/blob/v0.45.0/CHANGELOG.md"},"here"),").")),(0,o.kt)("h4",{id:"neutron-itself"},"Neutron Itself"),(0,o.kt)("p",null,"Enhancements within Neutron focus on integrating new modules, refining existing functionalities, and ensuring better alignment with the upgraded Cosmos SDK:"),(0,o.kt)("h5",{id:"globalfee-module-integration"},"Globalfee Module Integration"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Minimum Gas Price Enforcement:")," A mechanism implemented via the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cosmos/gaia/blob/feat/sdk-47-ibc-7/docs/modules/globalfee.md"},"globalfee module")," to standardize gas prices across validators.")),(0,o.kt)("h5",{id:"tokenfactory-module-update"},"Tokenfactory Module Update"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"BankHooks Activation:")," Introduction of BankHooks for smart contracts handling token transfers, as detailed ",(0,o.kt)("a",{parentName:"li",href:"neutron/modules/3rdparty/osmosis/ibc-hooks/overview"},"here"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Fee Removal for Token Creation:")," Elimination of creation fees for Tokenfactory tokens, promoting free token generation on Neutron (",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/blob/e605ed3db4381994ee8185ba4a0ff0877d34e67f/app/upgrades/v2.0.0/upgrades.go#L157"},"source"),").")),(0,o.kt)("h5",{id:"interchain-transactions-and-contractmanager-module-refactor"},"Interchain Transactions and ContractManager Module Refactor"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"ICA Usability Improvements:")," Enhanced Interchain Account (ICA) functionality for a more user-friendly and secure experience for developers."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Sudo Execution Error Handling:")," Streamlined error message retrieval in the ContractManager module."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"New Fee Structure for ICA Creation:")," ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/neutron-org/neutron/pull/334"},"Introduction")," of a fee system for developers creating ICAs on remote chains. ",(0,o.kt)("a",{parentName:"li",href:"/neutron/modules/interchain-txs/messages#msgregisterinterchainaccount"},"Learn more"))),(0,o.kt)("h5",{id:"adminmodule-rework"},"Adminmodule Rework"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Module and Governance Alignment:")," The admin module has been redesigned to align with the deprecated params module and the new governance proposal handling mechanism in Cosmos SDK v0.47. For more details, visit ",(0,o.kt)("a",{parentName:"li",href:"/neutron/modules/admin-module/overview#challenges-related-to-cosmos-sdk-047"},"Adminmodule Overview"),".")),(0,o.kt)("h5",{id:"dex-module-intoduction"},"Dex module intoduction"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Neutrality:")," Bringing completely new ",(0,o.kt)("a",{parentName:"li",href:"/4.0/neutron/modules/dex/overview/"},"dex module"),". Users may interact with this module to provide liquidity and execute trades according to commonly-accepted exchange semantics.")))}c.isMDXComponent=!0}}]);