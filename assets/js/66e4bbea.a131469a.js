"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[97608],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>f});var r=n(67294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var c=r.createContext({}),l=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=l(t.components);return r.createElement(c.Provider,{value:e},t.children)},m="mdxType",p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),m=l(n),d=a,f=m["".concat(c,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(f,i(i({ref:e},u),{},{components:n})):r.createElement(f,i({ref:e},u))}));function f(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s[m]="string"==typeof t?t:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9475:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(87462),a=(n(67294),n(3905));const o={},i="Overview",s={unversionedId:"tutorials/overview",id:"version-2.0/tutorials/overview",title:"Overview",description:"This documentation section contains various information about smart contracts and their development and usage on Neutron:",source:"@site/versioned_docs/version-2.0/tutorials/overview.md",sourceDirName:"tutorials",slug:"/tutorials/overview",permalink:"/2.0/tutorials/overview",draft:!1,tags:[],version:"2.0",frontMatter:{},sidebar:"docs",previous:{title:"ICQ Relayer",permalink:"/2.0/relaying/icq-relayer"},next:{title:"Introduction to CosmWasm",permalink:"/2.0/tutorials/introduction_to_cosmwasm"}},c={},l=[],u={toc:l},m="wrapper";function p(t){let{components:e,...n}=t;return(0,a.kt)(m,(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"overview"},"Overview"),(0,a.kt)("p",null,"This documentation section contains various information about smart contracts and their development and usage on Neutron:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/introduction_to_cosmwasm"},"Introduction to CosmWasm")," page will gently dive with you into the nature of smart contracts. There you can expect to find help in understanding of smart contract basic terms like contract's state and entry points, instantiation of a smart contract and interaction with it using a sample counter contract;"),(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/cosmwasm_remix"},"CosmWasm + Remix IDE")," page will guide you into the way of smart contracts development and deployment without any setup in a web-only way using Remix IDE;"),(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/cosmwasm_wasmkit"},"CosmWasm + WasmKit")," page will give you a brief introduction to WasmKit and how it can be leveraged to simplify and add structure to your CosmWasm smart contract development flow;"),(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/cosmwasm_ica"},"CosmWasm + ICA")," page will demonstrate you the way a smart contract can make use of the Neutron's Interchain Accounts module;"),(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/cosmwasm_icq"},"CosmWasm + ICQ")," page will demonstrate you the way a smart contract can make use of the Neutron's Interchain Queries module;"),(0,a.kt)("li",{parentName:"ul"},"the ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/integration-tests/chain"},"Chain integration tests")," and ",(0,a.kt)("a",{parentName:"li",href:"/tutorials/integration-tests/smart_contracts"},"Smart contracts integration tests")," pages will help you in testing your chain or smart contracts code by providing hints on how to setup interchain environment and define integration testing flow.")))}p.isMDXComponent=!0}}]);