"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[66074],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(t),m=i,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||a;return t?r.createElement(f,o(o({ref:n},u),{},{components:t})):r.createElement(f,o({ref:n},u))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=m;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c[d]="string"==typeof e?e:i,o[1]=c;for(var l=2;l<a;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},99018:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=t(87462),i=(t(67294),t(3905));const a={},o="Client",c={unversionedId:"neutron/modules/interchain-txs/client",id:"version-4.0/neutron/modules/interchain-txs/client",title:"Client",description:"Transactions",source:"@site/versioned_docs/version-4.0/neutron/modules/interchain-txs/client.md",sourceDirName:"neutron/modules/interchain-txs",slug:"/neutron/modules/interchain-txs/client",permalink:"/4.0/neutron/modules/interchain-txs/client",draft:!1,tags:[],version:"4.0",frontMatter:{},sidebar:"docs",previous:{title:"Messages",permalink:"/4.0/neutron/modules/interchain-txs/messages"},next:{title:"State",permalink:"/4.0/neutron/modules/interchain-txs/state"}},s={},l=[{value:"Transactions",id:"transactions",level:2},{value:"Queries",id:"queries",level:2},{value:"interchain-account",id:"interchain-account",level:3}],u={toc:l},d="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"client"},"Client"),(0,i.kt)("h2",{id:"transactions"},"Transactions"),(0,i.kt)("p",null,"The Interchain Transactions module only processes messages from smart contract addresses and does not have any ",(0,i.kt)("inlineCode",{parentName:"p"},"tx")," CLI entry points."),(0,i.kt)("h2",{id:"queries"},"Queries"),(0,i.kt)("h3",{id:"interchain-account"},"interchain-account"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"interchain-account")," command allows users to query the interchain account address for a combination of owner-address, connection-id and interchain-account-id:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond query interchaintxs interchain-account [owner-address] [connection-id] [interchain-account-id] [flags]\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"owner-address")," is the address of the contract that registered the account;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"connection-id")," is the identifier of the connection used to register the account;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"interchain-account-id")," is the identifier chosen by the contract for a specific interchain account.")))}p.isMDXComponent=!0}}]);