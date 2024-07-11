"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[9750],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),p=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(u.Provider,{value:n},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},k=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),s=p(t),k=o,g=s["".concat(u,".").concat(k)]||s[k]||d[k]||a;return t?r.createElement(g,l(l({ref:n},c),{},{components:t})):r.createElement(g,l({ref:n},c))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,l=new Array(a);l[0]=k;var i={};for(var u in n)hasOwnProperty.call(n,u)&&(i[u]=n[u]);i.originalType=e,i[s]="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=t[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}k.displayName="MDXCreateElement"},38274:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=t(87462),o=(t(67294),t(3905));const a={},l="Queries",i={unversionedId:"neutron/token-generation-event/lockdrop/queries",id:"neutron/token-generation-event/lockdrop/queries",title:"Queries",description:"config",source:"@site/docs/neutron/token-generation-event/lockdrop/queries.md",sourceDirName:"neutron/token-generation-event/lockdrop",slug:"/neutron/token-generation-event/lockdrop/queries",permalink:"/neutron/token-generation-event/lockdrop/queries",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Messages",permalink:"/neutron/token-generation-event/lockdrop/messages"},next:{title:"Overview",permalink:"/neutron/token-generation-event/vesting-lp/overview"}},u={},p=[{value:"<code>config</code>",id:"config",level:2},{value:"<code>state</code>",id:"state",level:2},{value:"<code>pool</code>",id:"pool",level:2},{value:"<code>user_info</code>",id:"user_info",level:2},{value:"<code>user_info_with_lockup_list</code>",id:"user_info_with_lockup_list",level:2},{value:"<code>lockup_info</code>",id:"lockup_info",level:2},{value:"<code>query_user_lockup_total_at_height</code>",id:"query_user_lockup_total_at_height",level:2},{value:"<code>query_lockup_total_at_height</code>",id:"query_lockup_total_at_height",level:2}],c={toc:p},s="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(s,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"queries"},"Queries"),(0,o.kt)("h2",{id:"config"},(0,o.kt)("inlineCode",{parentName:"h2"},"config")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "config": {}\n}\n')),(0,o.kt)("p",null,"Returns the config info"),(0,o.kt)("h2",{id:"state"},(0,o.kt)("inlineCode",{parentName:"h2"},"state")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "state": {}\n}\n')),(0,o.kt)("p",null,"Returns the contract's global state."),(0,o.kt)("h2",{id:"pool"},(0,o.kt)("inlineCode",{parentName:"h2"},"pool")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "pool": {\n    "pool_type": "usdc"\n  }\n}\n')),(0,o.kt)("p",null,"Returns info regarding a certain supported LP token pool."),(0,o.kt)("h2",{id:"user_info"},(0,o.kt)("inlineCode",{parentName:"h2"},"user_info")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "user_info": {\n    "address": "neutron...."\n  }\n}\n')),(0,o.kt)("p",null,"Returns info regarding a user."),(0,o.kt)("h2",{id:"user_info_with_lockup_list"},(0,o.kt)("inlineCode",{parentName:"h2"},"user_info_with_lockup_list")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "user_info_with_lockup_list": {\n    "address": "neutron..."\n  }\n}\n')),(0,o.kt)("p",null,"Returns a full info regarding a user (total ",(0,o.kt)("inlineCode",{parentName:"p"},"NTRN")," rewards, list of lockup positions)."),(0,o.kt)("h2",{id:"lockup_info"},(0,o.kt)("inlineCode",{parentName:"h2"},"lockup_info")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "lockup_info": {\n    "user_address": "neutron...",\n    "pool_type": "usdc",\n    "duration": 100,\n  }\n}\n')),(0,o.kt)("p",null,"Returns info regarding a particular lockup position with a given duration and identifier for the LP tokens locked."),(0,o.kt)("h2",{id:"query_user_lockup_total_at_height"},(0,o.kt)("inlineCode",{parentName:"h2"},"query_user_lockup_total_at_height")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "query_user_lockup_total_at_height": {\n    "pool_type": "usdc",\n    "user_address": "neutron...",\n    "height": 100\n  }\n}\n')),(0,o.kt)("p",null,"Returns info regarding a particular lockup position with a given duration and identifier for the LP tokens locked for a given height."),(0,o.kt)("h2",{id:"query_lockup_total_at_height"},(0,o.kt)("inlineCode",{parentName:"h2"},"query_lockup_total_at_height")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "query_lockup_total_at_height": { \n    "pool_type": "usdc", \n    "height": 100\n  }\n}\n')),(0,o.kt)("p",null,"Returns total locked LP tokens amount for a given pool type and height."))}d.isMDXComponent=!0}}]);