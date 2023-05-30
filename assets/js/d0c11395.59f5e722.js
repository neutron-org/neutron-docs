"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[1418],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),s=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(u.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=s(t),m=a,k=p["".concat(u,".").concat(m)]||p[m]||d[m]||l;return t?r.createElement(k,o(o({ref:n},c),{},{components:t})):r.createElement(k,o({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=p;var i={};for(var u in n)hasOwnProperty.call(n,u)&&(i[u]=n[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},9173:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=t(7462),a=(t(7294),t(3905));const l={},o="Localnet",i={unversionedId:"neutron/build-and-run/localnet",id:"neutron/build-and-run/localnet",title:"Localnet",description:"This page describes how to run Neutron, Gaia, IBC and ICQ relayers locally, without Docker environment.",source:"@site/docs/neutron/build-and-run/localnet.md",sourceDirName:"neutron/build-and-run",slug:"/neutron/build-and-run/localnet",permalink:"/neutron/build-and-run/localnet",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Cosmopark",permalink:"/neutron/build-and-run/cosmopark"},next:{title:"Contributing",permalink:"/neutron/contribute"}},u={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"1. install Neutron",id:"1-install-neutron",level:3},{value:"2. install Gaia",id:"2-install-gaia",level:3},{value:"3. install Hermes",id:"3-install-hermes",level:3},{value:"4. install Neutron Query Relayer",id:"4-install-neutron-query-relayer",level:3},{value:"Start Localnet",id:"start-localnet",level:2},{value:"Some wallets and RPC&#39;s you could use",id:"some-wallets-and-rpcs-you-could-use",level:2}],c={toc:s};function d(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"localnet"},"Localnet"),(0,a.kt)("p",null,"This page describes how to run Neutron, Gaia, IBC and ICQ relayers locally, without Docker environment.\nBeware: you will have to clone all these repositories in the same parent directory, just like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},".\n\u251c\u2500\u2500 neutron\n\u251c\u2500\u2500 gaia\n\u2514\u2500\u2500 neutron-query-relayer\n")),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Go version 1.20 or newer"),(0,a.kt)("li",{parentName:"ul"},"Rust toolchain v1.69 or newer")),(0,a.kt)("h3",{id:"1-install-neutron"},"1. install Neutron"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/neutron-org/neutron\ncd neutron\nmake install\n")),(0,a.kt)("h3",{id:"2-install-gaia"},"2. install Gaia"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"clone gaia: ",(0,a.kt)("inlineCode",{parentName:"li"},"git clone -b v9.0.3 https://github.com/cosmos/gaia.git")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"cd gaia")),(0,a.kt)("li",{parentName:"ol"},"for some reason, gaia v9.0.3 checks if you have go v1.18 installed,\nnot newer, not older, however, it builds fine with go v1.20, so, before\nrunning ",(0,a.kt)("inlineCode",{parentName:"li"},"make install"),", you will have to edit gaia's Makefile on line 110\nlike this:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-diff"},"-$(BUILD_TARGETS): check_version go.sum $(BUILDDIR)/\n+$(BUILD_TARGETS): go.sum $(BUILDDIR)/\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"finally, run ",(0,a.kt)("inlineCode",{parentName:"li"},"make install"))),(0,a.kt)("h3",{id:"3-install-hermes"},"3. install Hermes"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"cargo install ibc-relayer-cli --bin hermes --version 1.4.1 --locked\n")),(0,a.kt)("h3",{id:"4-install-neutron-query-relayer"},"4. install Neutron Query Relayer"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/neutron-org/neutron-query-relayer\ncd neutron-query-relayer\nmake build\n")),(0,a.kt)("h2",{id:"start-localnet"},"Start Localnet"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"go to ",(0,a.kt)("inlineCode",{parentName:"li"},"neutron/")," folder and run ",(0,a.kt)("inlineCode",{parentName:"li"},"make init"),", this will start Neutron and Gaia chains"),(0,a.kt)("li",{parentName:"ol"},"after ",(0,a.kt)("inlineCode",{parentName:"li"},"make init")," completes, run ",(0,a.kt)("inlineCode",{parentName:"li"},"make start-rly"),", this will start IBC relayer"),(0,a.kt)("li",{parentName:"ol"},"go to ",(0,a.kt)("inlineCode",{parentName:"li"},"neutron-query-relayer/")," folder and run ",(0,a.kt)("inlineCode",{parentName:"li"},"export $(grep -v '^#' .env.example.dev | xargs) && make dev"),", this will start ICQ relayer ")),(0,a.kt)("h2",{id:"some-wallets-and-rpcs-you-could-use"},"Some wallets and RPC's you could use"),(0,a.kt)("p",null,"Gaia chain's RPC is exposed at ",(0,a.kt)("inlineCode",{parentName:"p"},"0.0.0.0:16657"),",\nyou can add and use mnemonic with some preallocated funds using"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'echo "banner spread envelope side kite person disagree path silver will brother under couch edit food venture squirrel civil budget number acquire point work mass" | gaiad keys add test --recover\n')),(0,a.kt)("p",null,"You can also check your balance using"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'gaiad query bank balances "$(gaiad keys show test -a)" --node tcp://0.0.0.0:16657\n')),(0,a.kt)("p",null,"Neutron chain's RPC is exposed at ",(0,a.kt)("inlineCode",{parentName:"p"},"0.0.0.0:26657"),",\nyou can add and use mnemonic with some preallocated funds using"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'echo "veteran try aware erosion drink dance decade comic dawn museum release episode original list ability owner size tuition surface ceiling depth seminar capable only" | neutrond keys add test --recover\n')),(0,a.kt)("p",null,"You can also check your balance using"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'neutrond query bank balances "$(neutrond keys show test -a)" --node tcp://0.0.0.0:26657\n')))}d.isMDXComponent=!0}}]);