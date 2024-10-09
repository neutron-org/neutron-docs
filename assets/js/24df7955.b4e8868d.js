"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[9625],{3905:(e,t,o)=>{o.d(t,{Zo:()=>m,kt:()=>f});var r=o(67294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var c=r.createContext({}),d=function(e){var t=r.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},m=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),l=d(o),p=n,f=l["".concat(c,".").concat(p)]||l[p]||u[p]||a;return o?r.createElement(f,s(s({ref:t},m),{},{components:o})):r.createElement(f,s({ref:t},m))}));function f(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,s=new Array(a);s[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[l]="string"==typeof e?e:n,s[1]=i;for(var d=2;d<a;d++)s[d]=o[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,o)}p.displayName="MDXCreateElement"},29836:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var r=o(87462),n=(o(67294),o(3905));const a={},s="Params",i={unversionedId:"neutron/modules/3rdparty/osmosis/tokenfactory/params",id:"neutron/modules/3rdparty/osmosis/tokenfactory/params",title:"Params",description:"The TokenFactory module uses params in this format:",source:"@site/docs/neutron/modules/3rdparty/osmosis/tokenfactory/params.md",sourceDirName:"neutron/modules/3rdparty/osmosis/tokenfactory",slug:"/neutron/modules/3rdparty/osmosis/tokenfactory/params",permalink:"/neutron/modules/3rdparty/osmosis/tokenfactory/params",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Messages",permalink:"/neutron/modules/3rdparty/osmosis/tokenfactory/messages"},next:{title:"Overview",permalink:"/neutron/modules/3rdparty/osmosis/ibc-hooks/overview"}},c={},d=[],m={toc:d},l="wrapper";function u(e){let{components:t,...o}=e;return(0,n.kt)(l,(0,r.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"params"},"Params"),(0,n.kt)("p",null,"The TokenFactory module uses params in this format:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-protobuf"},'// WhitelistedHook describes a beforeSendHook which is allowed to be added and executed\n// SetBeforeSendHook can only be called on denoms where the denom creator and\n// code_id for the `contract_addr` match a WhitelistedHook\nmessage WhitelistedHook {\n  uint64 code_id = 1 [(gogoproto.customname) = "CodeID"];\n  string denom_creator = 2;\n}\n\n// Params defines the parameters for the tokenfactory module.\nmessage Params {\n  // DenomCreationFee defines the fee to be charged on the creation of a new\n  // denom. The fee is drawn from the MsgCreateDenom\'s sender account, and\n  // transferred to the community pool.\n  repeated cosmos.base.v1beta1.Coin denom_creation_fee = 1 [\n    (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins",\n    (gogoproto.moretags) = "yaml:\\"denom_creation_fee\\"",\n    (gogoproto.nullable) = false\n  ];\n\n  // DenomCreationGasConsume defines the gas cost for creating a new denom.\n  // This is intended as a spam deterrence mechanism.\n  //\n  // See: https://github.com/CosmWasm/token-factory/issues/11\n  uint64 denom_creation_gas_consume = 2 [\n    (gogoproto.moretags) = "yaml:\\"denom_creation_gas_consume\\"",\n    (gogoproto.nullable) = true\n  ];\n\n  // FeeCollectorAddress is the address where fees collected from denom creation\n  // are sent to\n  string fee_collector_address = 3;\n  // whitelisted_hooks is the list of hooks which are allowed to be added and executed\n  repeated WhitelistedHook whitelisted_hooks = 4;\n}\n')))}u.isMDXComponent=!0}}]);