"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[12890],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),p=u(r),d=o,f=p["".concat(i,".").concat(d)]||p[d]||m[d]||c;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,l=new Array(c);l[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a[p]="string"==typeof e?e:o,l[1]=a;for(var u=2;u<c;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},75585:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>c,metadata:()=>a,toc:()=>u});var n=r(87462),o=(r(67294),r(3905));const c={},l="Metrics",a={unversionedId:"neutron/modules/cron/metrics",id:"version-2.0/neutron/modules/cron/metrics",title:"Metrics",description:"Cron module collects these metrics:",source:"@site/versioned_docs/version-2.0/neutron/modules/cron/metrics.md",sourceDirName:"neutron/modules/cron",slug:"/neutron/modules/cron/metrics",permalink:"/2.0/neutron/modules/cron/metrics",draft:!1,tags:[],version:"2.0",frontMatter:{},sidebar:"docs",previous:{title:"State",permalink:"/2.0/neutron/modules/cron/state"},next:{title:"Overview",permalink:"/2.0/neutron/modules/3rdparty/cosmoshub/globalfee/overview"}},i={},u=[],s={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"metrics"},"Metrics"),(0,o.kt)("p",null,"Cron module collects these metrics:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"execute_ready_schedules")," - ","[hist]"," how long it takes to execute all ready schedules in EndBlocker"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"schedule_count")," - ","[gauge]"," how many schedules do we currently have"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"schedule_executions_count")," - ","[counter]"," counts each schedule executions labeled by success result and schedule name")))}m.isMDXComponent=!0}}]);