"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[4356],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>g});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),c=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(u.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=c(t),f=o,g=d["".concat(u,".").concat(f)]||d[f]||p[f]||i;return t?r.createElement(g,a(a({ref:n},l),{},{components:t})):r.createElement(g,a({ref:n},l))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=f;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s[d]="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},89495:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=t(87462),o=(t(67294),t(3905));const i={},a="Queries",s={unversionedId:"neutron/tokenomics/distribution/queries",id:"version-3.0/neutron/tokenomics/distribution/queries",title:"Queries",description:"Config",source:"@site/versioned_docs/version-3.0/neutron/tokenomics/distribution/queries.md",sourceDirName:"neutron/tokenomics/distribution",slug:"/neutron/tokenomics/distribution/queries",permalink:"/3.0/neutron/tokenomics/distribution/queries",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Messages",permalink:"/3.0/neutron/tokenomics/distribution/messages"},next:{title:"Overview",permalink:"/3.0/neutron/token-generation-event/overview"}},u={},c=[{value:"Config",id:"config",level:2},{value:"Pending",id:"pending",level:2},{value:"Shares",id:"shares",level:2},{value:"PauseInfo",id:"pauseinfo",level:2}],l={toc:c},d="wrapper";function p(e){let{components:n,...t}=e;return(0,o.kt)(d,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"queries"},"Queries"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub enum QueryMsg {\n    /// The contract's configurations\n    Config {},\n    /// List of pending funds to addresses (to be distributed)\n    Pending {},\n    /// List of current shareholder weights\n    Shares {},\n    /// Returns pause state info - whether contract is paused and if it is, until when\n    PauseInfo {},\n}\n")),(0,o.kt)("h2",{id:"config"},"Config"),(0,o.kt)("p",null,"Returns current config of contract. Config has a following schema:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Config {\n    /// Denom used for rewards distribution. All funds in any other denoms will be ignored.\n    pub denom: String,\n    /// The address of the Neutron DAO. It's capable of pausing and unpausing the contract\n    pub main_dao_address: Addr,\n    /// The address of the DAO guardian. The security DAO is capable only of pausing the contract.\n    pub security_dao_address: Addr,\n}\n")),(0,o.kt)("h2",{id:"pending"},"Pending"),(0,o.kt)("p",null,"Returns an array of ",(0,o.kt)("inlineCode",{parentName:"p"},"(address, amount)")," pairs of pending rewards to be distributed among all shareholders."),(0,o.kt)("h2",{id:"shares"},"Shares"),(0,o.kt)("p",null,"Returns an array of ",(0,o.kt)("inlineCode",{parentName:"p"},"(address, weight)")," pairs of shareholders' weights."),(0,o.kt)("h2",{id:"pauseinfo"},"PauseInfo"),(0,o.kt)("p",null,"Returns enum describing whether contract is paused, and if it is, also returns the height until which it is paused:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub enum PauseInfoResponse {\n    Paused { until_height: u64 },\n    Unpaused {},\n}\n")))}p.isMDXComponent=!0}}]);