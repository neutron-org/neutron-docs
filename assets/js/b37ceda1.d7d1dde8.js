"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[57102],{3905:(e,n,r)=>{r.d(n,{Zo:()=>d,kt:()=>f});var t=r(67294);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function u(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=t.createContext({}),s=function(e){var n=t.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):u(u({},n),e)),r},d=function(e){var n=s(e.components);return t.createElement(l.Provider,{value:n},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=a(e,["components","mdxType","originalType","parentName"]),c=s(r),m=o,f=c["".concat(l,".").concat(m)]||c[m]||p[m]||i;return r?t.createElement(f,u(u({ref:n},d),{},{components:r})):t.createElement(f,u({ref:n},d))}));function f(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,u=new Array(i);u[0]=m;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a[c]="string"==typeof e?e:o,u[1]=a;for(var s=2;s<i;s++)u[s]=r[s];return t.createElement.apply(null,u)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},97360:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>u,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var t=r(87462),o=(r(67294),r(3905));const i={},u="Neutron build from sources",a={unversionedId:"neutron/build-and-run/neutron-build",id:"version-3.0/neutron/build-and-run/neutron-build",title:"Neutron build from sources",description:"This page contains information about building Neutron node from sources",source:"@site/versioned_docs/version-3.0/neutron/build-and-run/neutron-build.md",sourceDirName:"neutron/build-and-run",slug:"/neutron/build-and-run/neutron-build",permalink:"/3.0/neutron/build-and-run/neutron-build",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Overview",permalink:"/3.0/neutron/build-and-run/overview"},next:{title:"Neutron standalone docker",permalink:"/3.0/neutron/build-and-run/neutron-docker"}},l={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Build and run",id:"build-and-run",level:2},{value:"1. Make sure you have the required golang version",id:"1-make-sure-you-have-the-required-golang-version",level:3},{value:"2. Clone Neutron core repository and cd into it",id:"2-clone-neutron-core-repository-and-cd-into-it",level:3},{value:"3. Build a Neutron node image",id:"3-build-a-neutron-node-image",level:3}],d={toc:s},c="wrapper";function p(e){let{components:n,...r}=e;return(0,o.kt)(c,(0,t.Z)({},d,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"neutron-build-from-sources"},"Neutron build from sources"),(0,o.kt)("p",null,"This page contains information about building Neutron node from sources"),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Golang v1.21 (",(0,o.kt)("a",{parentName:"li",href:"https://go.dev/dl/"},"go releases and instructions"),").")),(0,o.kt)("h2",{id:"build-and-run"},"Build and run"),(0,o.kt)("h3",{id:"1-make-sure-you-have-the-required-golang-version"},"1. Make sure you have the required golang version"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"go version\n")),(0,o.kt)("p",null,"The output should comply with the golang version mentioned in the ",(0,o.kt)("a",{parentName:"p",href:"#prerequisites"},"Prerequisites")," section."),(0,o.kt)("h3",{id:"2-clone-neutron-core-repository-and-cd-into-it"},"2. Clone Neutron core repository and cd into it"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"git clone -b v3.0.2 https://github.com/neutron-org/neutron.git\ncd neutron\n")),(0,o.kt)("h3",{id:"3-build-a-neutron-node-image"},"3. Build a Neutron node image"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"make install\n")),(0,o.kt)("p",null,"The command above will build a Neutron binary and store it under your ",(0,o.kt)("inlineCode",{parentName:"p"},"$GOBIN")," directory. If you have it in your ",(0,o.kt)("inlineCode",{parentName:"p"},"$PATH"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"neutrond")," binary should be available for execution:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"neutrond version\n2.0.3\n")),(0,o.kt)("p",null,"If you have problems with PATH-related stuff, please refer to the go releases and instructions link in the ",(0,o.kt)("a",{parentName:"p",href:"#prerequisites"},"prerequisites")," section."))}p.isMDXComponent=!0}}]);