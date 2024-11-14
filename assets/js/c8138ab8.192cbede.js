"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[17946],{3905:(e,t,i)=>{i.d(t,{Zo:()=>d,kt:()=>k});var n=i(67294);function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,n,r=function(e,t){if(null==e)return{};var i,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var i=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(i),h=r,k=c["".concat(s,".").concat(h)]||c[h]||u[h]||o;return i?n.createElement(k,a(a({ref:t},d),{},{components:i})):n.createElement(k,a({ref:t},d))}));function k(e,t){var i=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=i.length,a=new Array(o);a[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,a[1]=l;for(var p=2;p<o;p++)a[p]=i[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,i)}h.displayName="MDXCreateElement"},12674:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=i(87462),r=(i(67294),i(3905));const o={},a="Liquidity Iteration",l={unversionedId:"neutron/modules/dex/overview/concepts/liquidity-iteration",id:"version-3.0/neutron/modules/dex/overview/concepts/liquidity-iteration",title:"Liquidity Iteration",description:"When swapping through liquidity via a Swap, Multi-Hop Swap, or a Taker Limit Order we iterate through the available TickLiquidity to fill the swap order. Liquidity is always iterated through in order of best to worst price. In the case of swapping Token0 (tokenIn) for Token1 (tokenOut) we iterate through tick indexes left to right (eg. -1, 0, 1, 2...) and for Token1 for Token0 we iterate from right to left (eg. 2, 1, 0, -1\u2026) For each swap we completely exhaust the available reserves before moving onto the next tick. For TickLiquidity instances at the same TickIndex they are iterated through in a deterministic order as follows:",source:"@site/versioned_docs/version-3.0/neutron/modules/dex/overview/concepts/liquidity-iteration.md",sourceDirName:"neutron/modules/dex/overview/concepts",slug:"/neutron/modules/dex/overview/concepts/liquidity-iteration",permalink:"/3.0/neutron/modules/dex/overview/concepts/liquidity-iteration",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Tick Liquidity",permalink:"/3.0/neutron/modules/dex/overview/concepts/tick-liquidity"},next:{title:"Swaps",permalink:"/3.0/neutron/modules/dex/overview/concepts/swaps"}},s={},p=[{value:"Example liquidity iteration swapping TokenA for TokenB",id:"example-liquidity-iteration-swapping-tokena-for-tokenb",level:4}],d={toc:p},c="wrapper";function u(e){let{components:t,...o}=e;return(0,r.kt)(c,(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"liquidity-iteration"},"Liquidity Iteration"),(0,r.kt)("p",null,"When swapping through liquidity via a Swap, Multi-Hop Swap, or a Taker Limit Order we iterate through the available ",(0,r.kt)("inlineCode",{parentName:"p"},"TickLiquidity")," to fill the swap order. Liquidity is always iterated through in order of best to worst price. In the case of swapping Token0 (tokenIn) for Token1 (tokenOut) we iterate through tick indexes left to right (eg. -1, 0, 1, 2...) and for Token1 for Token0 we iterate from right to left (eg. 2, 1, 0, -1\u2026) For each swap we completely exhaust the available reserves before moving onto the next tick. For ",(0,r.kt)("inlineCode",{parentName:"p"},"TickLiquidity")," instances at the same ",(0,r.kt)("inlineCode",{parentName:"p"},"TickIndex")," they are iterated through in a deterministic order as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves"),": In Ascending ",(0,r.kt)("inlineCode",{parentName:"li"},"Fee")," order"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"LimitOrderTranches"),": In ascending ",(0,r.kt)("inlineCode",{parentName:"li"},"TrancheKey")," order")),(0,r.kt)("p",null,"When swapping through ",(0,r.kt)("inlineCode",{parentName:"p"},"PoolReserves")," the proceeds from the swap are added to the reserves on the reciprocal side of the pool. Ie. The output of TokenA swapped through a ",(0,r.kt)("inlineCode",{parentName:"p"},"PoolReserves")," at tick 1, fee 1 will moved to a ",(0,r.kt)("inlineCode",{parentName:"p"},"PoolReserves")," holding TokenB at tick -1 fee 1."),(0,r.kt)("h4",{id:"example-liquidity-iteration-swapping-tokena-for-tokenb"},"Example liquidity iteration swapping TokenA for TokenB"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Example liquidity iteration ",src:i(85399).Z,width:"1472",height:"563"})),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The first available ",(0,r.kt)("inlineCode",{parentName:"li"},"TickLiquidity")," holding token TokenB is a ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 5, fee 1. When this is swapped through the TokenIn is deposited in the ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 3."),(0,r.kt)("li",{parentName:"ol"},"The pool ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 5, fee 2 is swapped through. The TokenIn is deposited in the ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 2."),(0,r.kt)("li",{parentName:"ol"},"The limit order at tick 5 is swapped through."),(0,r.kt)("li",{parentName:"ol"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 6, fee 1 is swapped through. The TokenIn is deposited in the ",(0,r.kt)("inlineCode",{parentName:"li"},"PoolReserves")," at tick 4.")))}u.isMDXComponent=!0},85399:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/duality_orderbook-5565198c9793426651f5ae2acd3b522b.png"}}]);