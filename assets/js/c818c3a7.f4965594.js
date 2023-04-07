"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[6509],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>m});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),c=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=c(e.components);return r.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},l=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),l=c(t),m=i,b=l["".concat(u,".").concat(m)]||l[m]||p[m]||o;return t?r.createElement(b,a(a({ref:n},d),{},{components:t})):r.createElement(b,a({ref:n},d))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=l;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}l.displayName="MDXCreateElement"},2131:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=t(7462),i=(t(7294),t(3905));const o={},a="Messages",s={unversionedId:"neutron/tokenomics/reserve/messages",id:"neutron/tokenomics/reserve/messages",title:"Messages",description:"InstantiateMsg",source:"@site/docs/neutron/tokenomics/reserve/messages.md",sourceDirName:"neutron/tokenomics/reserve",slug:"/neutron/tokenomics/reserve/messages",permalink:"/neutron/tokenomics/reserve/messages",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/neutron/tokenomics/reserve/overview"},next:{title:"Queries",permalink:"/neutron/tokenomics/reserve/queries"}},u={},c=[{value:"InstantiateMsg",id:"instantiatemsg",level:2},{value:"ExecuteMsg",id:"executemsg",level:2},{value:"TransferOwnership",id:"transferownership",level:3},{value:"Distribute",id:"distribute",level:3},{value:"UpdateConfig",id:"updateconfig",level:3},{value:"Pause",id:"pause",level:3},{value:"Unpause",id:"unpause",level:3}],d={toc:c};function p(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"messages"},"Messages"),(0,i.kt)("h2",{id:"instantiatemsg"},"InstantiateMsg"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct InstantiateMsg {\n    /// Address of the Neutron DAO contract\n    pub main_dao_address: String,\n\n    /// Denom of the main coin\n    pub denom: String,\n\n    /// Distribution rate [0;1] which goes to distribution contract\n    pub distribution_rate: Decimal,\n\n    /// Minimum period between distribution calls\n    pub min_period: u64,\n\n    /// Address of distribution contract\n    pub distribution_contract: String,\n\n    /// Address of treasury contract\n    pub treasury_contract: String,\n\n    /// Address of security DAO contract\n    pub security_dao_address: String,\n\n    /// Vesting release function denominator\n    pub vesting_denominator: u128,\n}\n")),(0,i.kt)("h2",{id:"executemsg"},"ExecuteMsg"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},"#[pausable]\npub enum ExecuteMsg {\n    /// Transfer the contract's ownership to another account [permissioned - executable only by Neutron DAO]\n    TransferOwnership(String),\n\n    /// Distribute pending funds between Bank and Distribution accounts [permissionless]\n    Distribute {},\n\n    /// Update config [permissioned - executable only by Neutron DAO]\n    UpdateConfig {\n        distribution_rate: Option<Decimal>,\n        min_period: Option<u64>,\n        distribution_contract: Option<String>,\n        treasury_contract: Option<String>,\n        security_dao_address: Option<String>,\n        vesting_denominator: Option<u128>,\n    },\n\n    /// Pause the contract for `duration` amount of blocks [permissioned - executable only by Neutron DAO or the Security DAO]\n    Pause { duration: u64 },\n    \n    /// Unpauses the contract [permissioned - executable only by Neutron DAO]\n    Unpause {},\n}\n")),(0,i.kt)("h3",{id:"transferownership"},"TransferOwnership"),(0,i.kt)("p",null,"Transfer the contract's ownership to another account. Can be executed by ",(0,i.kt)("inlineCode",{parentName:"p"},"main_dao_address")," only."),(0,i.kt)("h3",{id:"distribute"},"Distribute"),(0,i.kt)("p",null,"Distribute pending funds between Bank and Distribution accounts. Can be executed by any address, but not more than ",(0,i.kt)("inlineCode",{parentName:"p"},"min_period")," of heights between calls."),(0,i.kt)("h3",{id:"updateconfig"},"UpdateConfig"),(0,i.kt)("p",null,"Update reserve contract configuration. Permissioned, can be executed only by ",(0,i.kt)("a",{parentName:"p",href:"/neutron/dao/overview#neutron-dao"},"Neutron DAO"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},"UpdateConfig {\n    /// Distribution rate [0; 1] which goes to distribution contract\n    distribution_rate: Option<Decimal>,\n\n    /// Minimum period between distribution calls in amount of blocks\n    min_period: Option<u64>,\n\n    /// Address of distribution contract which will receive funds defined by distribution_rate %\n    distribution_contract: Option<String>,\n\n    /// Address of treasury contract, which will receive funds defined by 100-distribution_rate %\n    treasury_contract: Option<String>,\n\n    /// Address of the security DAO contract\n    security_dao_address: Option<String>,\n\n    /// Denominator used in the vesting release function\n    vesting_denominator: Option<u128>,\n")),(0,i.kt)("h3",{id:"pause"},"Pause"),(0,i.kt)("p",null,"Pause contract for ",(0,i.kt)("inlineCode",{parentName:"p"},"duration")," amount of blocks. Permissioned can be executed only by ",(0,i.kt)("a",{parentName:"p",href:"/neutron/dao/overview#neutron-dao"},"Neutron DAO")," or the Security DAO. If contract is in paused state it disables ",(0,i.kt)("inlineCode",{parentName:"p"},"execute")," method processing for any message except ",(0,i.kt)("inlineCode",{parentName:"p"},"Pause")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Unpause"),"."),(0,i.kt)("h3",{id:"unpause"},"Unpause"),(0,i.kt)("p",null,"Unpause paused contract. Permissioned can be executed only by ",(0,i.kt)("a",{parentName:"p",href:"/neutron/dao/overview#neutron-dao"},"Neutron DAO"),"."))}p.isMDXComponent=!0}}]);