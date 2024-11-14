"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[52630],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var r=t(67294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},p="mdxType",l={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=u(t),m=s,g=p["".concat(c,".").concat(m)]||p[m]||l[m]||o;return t?r.createElement(g,a(a({ref:n},d),{},{components:t})):r.createElement(g,a({ref:n},d))}));function g(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var o=t.length,a=new Array(o);a[0]=m;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[p]="string"==typeof e?e:s,a[1]=i;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},21395:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var r=t(87462),s=(t(67294),t(3905));const o={},a="Messages",i={unversionedId:"neutron/token-generation-event/credits/messages",id:"version-1.0/neutron/token-generation-event/credits/messages",title:"Messages",description:"InstantiateMsg",source:"@site/versioned_docs/version-1.0/neutron/token-generation-event/credits/messages.md",sourceDirName:"neutron/token-generation-event/credits",slug:"/neutron/token-generation-event/credits/messages",permalink:"/1.0/neutron/token-generation-event/credits/messages",draft:!1,tags:[],version:"1.0",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/1.0/neutron/token-generation-event/credits/overview"},next:{title:"Queries",permalink:"/1.0/neutron/token-generation-event/credits/queries"}},c={},u=[{value:"InstantiateMsg",id:"instantiatemsg",level:2},{value:"ExecuteMsg",id:"executemsg",level:2}],d={toc:u},p="wrapper";function l(e){let{components:n,...t}=e;return(0,s.kt)(p,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"messages"},"Messages"),(0,s.kt)("h2",{id:"instantiatemsg"},"InstantiateMsg"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct InstantiateMsg {\n    /// Airdrop contract address\n    pub airdrop_address: String,\n    /// Lockdrop contract address,\n    pub lockdrop_address: String,\n    /// When can start withdrawing untrn tokens\n    pub when_withdrawable: Timestamp,\n}\n\n")),(0,s.kt)("h2",{id:"executemsg"},"ExecuteMsg"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"pub enum ExecuteMsg {\n    /// AddVesting is a message that allows address to claim particular amount of untrn tokens at particular time.\n    /// Can only store one vesting amount per address.\n    /// [Permissioned - Airdrop address]\n    AddVesting {\n        address: String,\n        amount: Uint128,\n        start_time: u64,\n        duration: u64,\n    },\n    /// Transfer is a base message to move tokens to another account without triggering actions.\n    /// [Permissioned - Airdrop address]\n    Transfer { recipient: String, amount: Uint128 },\n    /// Withdraw is a message that burns all vested cNTRN tokens\n    /// on the sender and sends untrn tokens in 1:1 proportion.\n    /// [Permissionless]\n    Withdraw {},\n    /// Burns is a message that burns certain amount of cNTRN tokens and sends untrn tokens in 1:1 proportion.\n    /// [Permissioned - Airdrop address]\n    Burn { amount: Uint128 },\n    /// BurnFrom burns owner's cNTRN tokens and mints untrn tokens in 1:1 proportion specified amount for owner.\n    /// Used to skip vesting as a reward for participating in the lockdrop.\n    /// [Permissioned - Lockdrop address]\n    BurnFrom { owner: String, amount: Uint128 },\n    /// Locks untrn tokens and mints cNTRN tokens in 1:1 proportion to the airdrop balance.\n    /// [Permissioned - DAO] (DAO address set in initialize func as cw20 minter)\n    Mint {},\n}\n")))}l.isMDXComponent=!0}}]);