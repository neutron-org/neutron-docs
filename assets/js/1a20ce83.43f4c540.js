"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[852],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4315:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const o={},i="Metadata",c={unversionedId:"neutron/gov/metadata",id:"neutron/gov/metadata",title:"Metadata",description:"NOTE: Metadata are similar to the original gov module. The gov module has two locations for metadata where users can",source:"@site/docs/neutron/gov/metadata.md",sourceDirName:"neutron/gov",slug:"/neutron/gov/metadata",permalink:"/neutron/gov/metadata",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"Proposal",id:"proposal",level:2},{value:"Vote",id:"vote",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"metadata"},"Metadata"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"NOTE: Metadata are similar to the original ",(0,a.kt)("inlineCode",{parentName:"p"},"gov")," module. The gov module has two locations for metadata where users can\nprovide further context about the on-chain actions they are taking. By default all metadata fields have a 255 character\nlength field where metadata can be stored in json format, either on-chain or off-chain depending on the amount of data\nrequired. Here we provide a recommendation for the json structure and where the data should be stored. There are two\nimportant factors in making these recommendations. First, that the gov and group modules are consistent with one\nanother, note the number of proposals made by all groups may be quite large. Second, that client applications such as\nblock explorers and governance interfaces have confidence in the consistency of metadata structure accross chains.")),(0,a.kt)("h2",{id:"proposal"},"Proposal"),(0,a.kt)("p",null,"Location: off-chain as json object stored on IPFS (mirrors group proposal):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "title": "",\n  "authors": "",\n  "summary": "",\n  "details": "",\n  "proposalForumURL": "",\n  "voteOptionContext": ""\n}\n')),(0,a.kt)("h2",{id:"vote"},"Vote"),(0,a.kt)("p",null,"Location: on-chain as json within 255 character limit (mirrors group vote):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "justification": ""\n}\n')))}p.isMDXComponent=!0}}]);