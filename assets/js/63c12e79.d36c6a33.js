"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[88722],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(r),m=i,f=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return r?n.createElement(f,a(a({ref:t},d),{},{components:r})):n.createElement(f,a({ref:t},d))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},35718:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(87462),i=(r(67294),r(3905));const o={},a="AMMs and Orderbooks",s={unversionedId:"neutron/modules/dex/overview/concepts/amms-and-orderbooks",id:"neutron/modules/dex/overview/concepts/amms-and-orderbooks",title:"AMMs and Orderbooks",description:"AMMs",source:"@site/docs/neutron/modules/dex/overview/concepts/amms-and-orderbooks.md",sourceDirName:"neutron/modules/dex/overview/concepts",slug:"/neutron/modules/dex/overview/concepts/amms-and-orderbooks",permalink:"/neutron/modules/dex/overview/concepts/amms-and-orderbooks",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/neutron/modules/dex/overview/"},next:{title:"Liquidity Pools",permalink:"/neutron/modules/dex/overview/concepts/liquidity-pools"}},c={},l=[],d={toc:l},p="wrapper";function u(e){let{components:t,...o}=e;return(0,i.kt)(p,(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"amms-and-orderbooks"},"AMMs and Orderbooks"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"AMMs")),(0,i.kt)("p",null,"AMMs were the first time that capital markets were created on-chain, in a computationally efficient manner. This was a transformative innovation. However, these AMMs were extremely capital inefficient, meaning that a significant amount of the liquidity deposited in them was not used. This led to extremely high price impact (aka slippage) for traders."),(0,i.kt)("p",null,"Recently, AMMs have introduced concentrated liquidity to increase their capital efficiency. This enabled liquidity providers to decide at what prices they wanted their liquidity to be used as, and gave liquidity providers better prices. These concentrated liquidity paradigms are often implemented in complicated manners, and still don't reach the full capital efficiency of orderbooks."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Orderbooks")),(0,i.kt)("p",null,"Orderbooks are the dominant trading mechanism of traditional finance, and involve a set of limit orders that can be filled by other traders and market makers. They are extremely capital efficient: limit orders, by definition, have zero price impact for traders. While they offer a familiar UX and capital efficient trading experience, they are extremely computationally inefficient to implement on-chain, and don't offer the same liveness and composability properties that make AMMs a core DeFi primitive."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"A summary of the pros and cons of AMMs and orderbooks",src:r(67372).Z,width:"1221",height:"366"})),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Neutron DEX")),(0,i.kt)("p",null,"Neutron DEX's mechanism combines the best of AMMs and orderbooks. It is a series of constant-priced pools where LPs can deposit their capital. For example, an LP can deposit capital at the 1.000:1.000 price on a DAI/USDC pair."),(0,i.kt)("p",null,"This simple design has significant consequences. Neutron DEX can reach order-book levels of capital efficiency (zero price impact on trades, swaps, and limit orders) while still maintaining the computational efficiency and liveness properties of AMMs."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"A Quick Note on Fees and Value Accrual")),(0,i.kt)("p",null,"Concentrated liquidity and orderbooks differ slightly in how liquidity providers accrue value. On concentrated liquidity AMMs, liquidity providers accrue value through a ",(0,i.kt)("a",{parentName:"p",href:"/neutron/modules/dex/overview/concepts/fees"},"fee")," that they choose when placing the liquidity. The fee is a predetermined premium that traders pay when using the liquidity to swap between two assets."),(0,i.kt)("p",null,"Orderbook liquidity providers accrue value through maintaining a bid-ask spread, which entails them offering to sell assets slightly above the current price and buy them slightly below the current price. It turns out that these two mechanism are actually very similar in that they describe the difference in prices between the best sell and buy prices."))}u.isMDXComponent=!0},67372:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/Dual_Chart_bg-2261b37b31526be3cbcd4f1a6a0f44c5.png"}}]);