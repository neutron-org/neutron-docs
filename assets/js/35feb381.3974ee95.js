"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[60532],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(t),m=o,g=c["".concat(s,".").concat(m)]||c[m]||d[m]||a;return t?r.createElement(g,i(i({ref:n},p),{},{components:t})):r.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=m;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},42910:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var r=t(87462),o=(t(67294),t(3905));const a={},i="Cosmopark",l={unversionedId:"neutron/build-and-run/cosmopark",id:"version-1.0/neutron/build-and-run/cosmopark",title:"Cosmopark",description:"This page contains information about building and running Neutron node interconnected with a Gaia node by a Hermes IBC Relayer and a Neutron ICQ Relayer. This is a more advanced section than the basic sole Neutron node flow which is based on the Neutron's integration tests setup.",source:"@site/versioned_docs/version-1.0/neutron/build-and-run/cosmopark.md",sourceDirName:"neutron/build-and-run",slug:"/neutron/build-and-run/cosmopark",permalink:"/1.0/neutron/build-and-run/cosmopark",draft:!1,tags:[],version:"1.0",frontMatter:{},sidebar:"docs",previous:{title:"Neutron standalone docker",permalink:"/1.0/neutron/build-and-run/neutron-docker"},next:{title:"Localnet",permalink:"/1.0/neutron/build-and-run/localnet"}},s={},u=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Build and run",id:"build-and-run",level:2},{value:"1. Make sure you have the required golang version:",id:"1-make-sure-you-have-the-required-golang-version",level:3},{value:"2. Clone necessary repositories",id:"2-clone-necessary-repositories",level:3},{value:"Clone Neutron repositories",id:"clone-neutron-repositories",level:4},{value:"Clone and prepare Gaia",id:"clone-and-prepare-gaia",level:4},{value:"3. Build images",id:"3-build-images",level:3},{value:"4. Download Neutron DAO contracts",id:"4-download-neutron-dao-contracts",level:3},{value:"5. Run Cosmopark",id:"5-run-cosmopark",level:3},{value:"6. Usage",id:"6-usage",level:3},{value:"Neutron node",id:"neutron-node",level:4},{value:"Hermes",id:"hermes",level:4},{value:"ICQ Relayer",id:"icq-relayer",level:4},{value:"Gaia",id:"gaia",level:4}],p={toc:u},c="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(c,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"cosmopark"},"Cosmopark"),(0,o.kt)("p",null,"This page contains information about building and running Neutron node interconnected with a Gaia node by a Hermes IBC Relayer and a Neutron ICQ Relayer. This is a more advanced section than the basic sole Neutron node flow which is based on the Neutron's integration tests setup."),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Docker engine;"),(0,o.kt)("li",{parentName:"ul"},"Golang v1.20 (",(0,o.kt)("a",{parentName:"li",href:"https://go.dev/dl/"},"go releases and instructions"),").")),(0,o.kt)("h2",{id:"build-and-run"},"Build and run"),(0,o.kt)("h3",{id:"1-make-sure-you-have-the-required-golang-version"},"1. Make sure you have the required golang version:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"go version\n")),(0,o.kt)("p",null,"The output should comply with the golang version mentioned in the ",(0,o.kt)("a",{parentName:"p",href:"#prerequisites"},"Prerequisites")," section."),(0,o.kt)("h3",{id:"2-clone-necessary-repositories"},"2. Clone necessary repositories"),(0,o.kt)("p",null,"You'll have to clone several repositories into a single parent folder. Choose a parent directory and make clonings from it. This is crucial to have all the repositories cloned and stored in the same parent folder."),(0,o.kt)("h4",{id:"clone-neutron-repositories"},"Clone Neutron repositories"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"git clone -b v1.0.4 https://github.com/neutron-org/neutron.git\ngit clone https://github.com/neutron-org/neutron-integration-tests.git\ngit clone https://github.com/neutron-org/neutron-query-relayer.git\n")),(0,o.kt)("h4",{id:"clone-and-prepare-gaia"},"Clone and prepare Gaia"),(0,o.kt)("p",null,"We use the Gaia network as a target network for interchain operations. We use v9.0.3 for the tests."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"git clone https://github.com/cosmos/gaia.git\ncd gaia\ngit checkout v9.0.3\n")),(0,o.kt)("h3",{id:"3-build-images"},"3. Build images"),(0,o.kt)("p",null,"The commands from this section are available from the ",(0,o.kt)("inlineCode",{parentName:"p"},"setup")," folder in the ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron-integration-tests")," project."),(0,o.kt)("p",null,"If it's the first time you're here, run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"make build-all\n")),(0,o.kt)("p",null,"If you have the images built and you want to rebuild one of them, the following commands which build each component separately are also available:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"make build-gaia\nmake build-neutron\nmake build-hermes\nmake build-relayer\n")),(0,o.kt)("h3",{id:"4-download-neutron-dao-contracts"},"4. Download Neutron DAO contracts"),(0,o.kt)("p",null,"Neutron has Neutron DAO contracts in genesis, so before running you need to download the latest version of contracts:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npx @neutron-org/get-artifacts neutron-dao -b main -d contracts\n")),(0,o.kt)("h3",{id:"5-run-cosmopark"},"5. Run Cosmopark"),(0,o.kt)("p",null,"The commands from this section are available from the ",(0,o.kt)("inlineCode",{parentName:"p"},"setup")," folder in the ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron-integration-tests")," project."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"make start-cosmopark\n")),(0,o.kt)("p",null,"A Neutron node, a Gaia node, a Hermes instance and an ICQ Relayer instance are now running in the background. To see the apps logs, run:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"docker ps\n")),(0,o.kt)("p",null,"And use the container ID you want to observe logs of:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"docker logs -f <contained-id>\n")),(0,o.kt)("p",null,"Cumulative logs are available via running"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"docker-compose logs -f\n")),(0,o.kt)("p",null,"To stop cosmopark, run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"make stop-cosmopark\n")),(0,o.kt)("h3",{id:"6-usage"},"6. Usage"),(0,o.kt)("h4",{id:"neutron-node"},"Neutron node"),(0,o.kt)("p",null,"The Neutron node usage guidelines (exposed ports, CLI, prepared accounts) for Cosmopark are the same as for the sole run. Please refer to the ",(0,o.kt)("a",{parentName:"p",href:"/neutron/build-and-run/neutron-docker#usage"},"corresponding section")," to see more details on it."),(0,o.kt)("h4",{id:"hermes"},"Hermes"),(0,o.kt)("p",null,"For more information about Hermes, refer to the ",(0,o.kt)("a",{parentName:"p",href:"/relaying/ibc-relayer"},"dedicated section")," and its ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-integration-tests/tree/main/setup/hermes"},"configuration folder")," in the neutron-integraton-tests repo."),(0,o.kt)("h4",{id:"icq-relayer"},"ICQ Relayer"),(0,o.kt)("p",null,"For more information about ICQ Relayer, refer to the ",(0,o.kt)("a",{parentName:"p",href:"/relaying/icq-relayer"},"dedicated section")," and its configuration via ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-integration-tests/blob/main/setup/docker-compose.yml"},"docker-compose file")," in the integration-tests repo."),(0,o.kt)("h4",{id:"gaia"},"Gaia"),(0,o.kt)("p",null,"The Gaia node running in the Cosmopark is configured via ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/neutron-org/neutron-integration-tests/blob/main/setup/docker-compose.yml"},"docker-compose file"),"."))}d.isMDXComponent=!0}}]);