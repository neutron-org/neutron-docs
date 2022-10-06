"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[356],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,k=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?r.createElement(k,u(u({ref:t},c),{},{components:n})):r.createElement(k,u({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,u=new Array(l);u[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,u[1]=a;for(var s=2;s<l;s++)u[s]=n[s];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9581:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>p,frontMatter:()=>l,metadata:()=>a,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const l={},u="Build Neutron source code",a={unversionedId:"neutron/build",id:"neutron/build",title:"Build Neutron source code",description:"Neutron Core",source:"@site/docs/neutron/build.md",sourceDirName:"neutron",slug:"/neutron/build",permalink:"/neutron/build",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Events",permalink:"/neutron/gov/events"},next:{title:"Contributing",permalink:"/neutron/contribute"}},i={},s=[{value:"Neutron Core",id:"neutron-core",level:2},{value:"Install Go 1.18",id:"install-go-118",level:3},{value:"Build Neutron",id:"build-neutron",level:3},{value:"Run Tests",id:"run-tests",level:3},{value:"Neutron Smart-Contracts SDK",id:"neutron-smart-contracts-sdk",level:2},{value:"Install dependencies",id:"install-dependencies",level:3},{value:"Build Neutron SDK",id:"build-neutron-sdk",level:3},{value:"Run Tests",id:"run-tests-1",level:3}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"build-neutron-source-code"},"Build Neutron source code"),(0,o.kt)("h2",{id:"neutron-core"},"Neutron Core"),(0,o.kt)("h3",{id:"install-go-118"},"Install Go 1.18"),(0,o.kt)("p",null,"Currently, Neutron team uses Go 1.18 to compile the code.\nInstall ",(0,o.kt)("a",{parentName:"p",href:"https://go.dev/doc/install"},"Go 1.18")," using following instructions there."),(0,o.kt)("p",null,"Verify the installation by executing ",(0,o.kt)("inlineCode",{parentName:"p"},"go version")," in your terminal:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ go version\ngo version go1.18.1 darwin/arm64\n")),(0,o.kt)("h3",{id:"build-neutron"},"Build Neutron"),(0,o.kt)("p",null,"In order to build Neutron you need ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron"},"the source code"),"."),(0,o.kt)("p",null,"Build Neutron from the source code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"cd neutron\nmake build\n")),(0,o.kt)("p",null,"After building, you should see a new executable file ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron/build/neutrond"),"."),(0,o.kt)("h3",{id:"run-tests"},"Run Tests"),(0,o.kt)("p",null,"Run tests from the source code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"cd neutron\nmake test\n")),(0,o.kt)("h2",{id:"neutron-smart-contracts-sdk"},"Neutron Smart-Contracts SDK"),(0,o.kt)("h3",{id:"install-dependencies"},"Install dependencies"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Rust v1.60.0+"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"wasm32-unknown-unknown")," target"),(0,o.kt)("li",{parentName:"ul"},"Docker")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Install ",(0,o.kt)("inlineCode",{parentName:"li"},"rustup")," via ",(0,o.kt)("a",{parentName:"li",href:"https://rustup.rs/"},"https://rustup.rs/")),(0,o.kt)("li",{parentName:"ol"},"Run the following:",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"rustup default stable\nrustup target add wasm32-unknown-unknown\n"))),(0,o.kt)("li",{parentName:"ol"},"Make sure ",(0,o.kt)("a",{parentName:"li",href:"https://www.docker.com/"},"Docker")," is installed")),(0,o.kt)("h3",{id:"build-neutron-sdk"},"Build Neutron SDK"),(0,o.kt)("p",null,"In order to build Neutron SDK you need ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-contracts"},"the source code"),"."),(0,o.kt)("p",null,"For production builds, run the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"cd neutron-contracts\nmake build\n")),(0,o.kt)("h3",{id:"run-tests-1"},"Run Tests"),(0,o.kt)("p",null,"Run tests from the source code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"cd neutron-contracts\nmake test\n")))}p.isMDXComponent=!0}}]);