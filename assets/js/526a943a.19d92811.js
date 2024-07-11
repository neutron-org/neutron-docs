"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[4738],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(h,i(i({ref:t},p),{},{components:n})):a.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},23066:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(87462),o=(n(67294),n(3905));const r={},i="CosmWasm + Remix IDE",l={unversionedId:"tutorials/cosmwasm_remix",id:"version-2.0/tutorials/cosmwasm_remix",title:"CosmWasm + Remix IDE",description:"This tutorial details how to deploy and run Neutron smart contract on Remix IDE. It is a no-setup tool with a GUI for developing Neutron smart contract.",source:"@site/versioned_docs/version-2.0/tutorials/cosmwasm_remix.md",sourceDirName:"tutorials",slug:"/tutorials/cosmwasm_remix",permalink:"/2.0/tutorials/cosmwasm_remix",draft:!1,tags:[],version:"2.0",frontMatter:{},sidebar:"docs",previous:{title:"Introduction to CosmWasm",permalink:"/2.0/tutorials/introduction_to_cosmwasm"},next:{title:"CosmWasm + WasmKit",permalink:"/2.0/tutorials/cosmwasm_wasmkit"}},s={},c=[{value:"Connect to Remix IDE",id:"connect-to-remix-ide",level:2},{value:"Select a Chain",id:"select-a-chain",level:2},{value:"Install a browser extension wallet",id:"install-a-browser-extension-wallet",level:2},{value:"Create the Project",id:"create-the-project",level:2},{value:"Create Template",id:"create-template",level:3},{value:"New Project",id:"new-project",level:3},{value:"Writing Contracts in Rust",id:"writing-contracts-in-rust",level:4},{value:"Compile the Contract",id:"compile-the-contract",level:2},{value:"Store Code",id:"store-code",level:2},{value:"Instantiate the Contract",id:"instantiate-the-contract",level:2},{value:"Execute the Contract",id:"execute-the-contract",level:2},{value:"Migrate the Contract",id:"migrate-the-contract",level:2}],p={toc:c},m="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(m,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"cosmwasm--remix-ide"},"CosmWasm + Remix IDE"),(0,o.kt)("p",null,"This tutorial details how to deploy and run Neutron smart contract on Remix IDE. It is a no-setup tool with a GUI for developing Neutron smart contract."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"remix-plugin",src:n(26971).Z,title:"remix-plugin",width:"2862",height:"1746"})),(0,o.kt)("h2",{id:"connect-to-remix-ide"},"Connect to Remix IDE"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://docs.welldonestudio.io/code"},"WELLDONE Code")," is the official Remix IDE Plug-in. Please visit the ",(0,o.kt)("a",{parentName:"p",href:"https://remix.ethereum.org/"},"Remix IDE")," and follow the guide below."),(0,o.kt)("p",null,"Click ",(0,o.kt)("strong",{parentName:"p"},"Plugin Manager")," button in the left bar and search for ",(0,o.kt)("strong",{parentName:"p"},"CODE BY WELLDONE STUDIO")," and click the Activate button."),(0,o.kt)("img",{src:n(97016).Z,alt:"plugin-manager",style:{width:"500px",marginRight:"10px",display:"inline"}}),(0,o.kt)("img",{src:n(72064).Z,alt:"active-plugin",style:{width:"300px",display:"inline"}}),(0,o.kt)("h2",{id:"select-a-chain"},"Select a Chain"),(0,o.kt)("p",null,"Click on Neutron(CosmWasm) in the list of chains."),(0,o.kt)("p",null,"If you click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Documentation")," button, go to WELLDONE Docs, and if you find a problem or have any questions while using it, click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Make an issue")," button to go to the ",(0,o.kt)("a",{parentName:"p",href:"https://support.welldonestudio.io/"},"Support Channel")," and feel free to create an issue."),(0,o.kt)("img",{src:n(56381).Z,alt:"select-chain",style:{width:"318px"}}),(0,o.kt)("h2",{id:"install-a-browser-extension-wallet"},"Install a browser extension wallet"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Other wallets will be supported soon, and WELLDONE Wallet can be used now.")),(0,o.kt)("p",null,"After choosing a chain, click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Connect to WELLDONE")," button to connect to the ",(0,o.kt)("strong",{parentName:"p"},"WELLDONE Wallet.")," "),(0,o.kt)("p",null,"If you haven't installed the WELLDONE Wallet yet, please follow the following ",(0,o.kt)("a",{parentName:"p",href:"https://docs.welldonestudio.io/wallet/manual/"},"manual")," to install and create a wallet and create an account for Neutron. Finally, go into the Setting tab of your wallet and activate Developer Mode."),(0,o.kt)("img",{src:n(85182).Z,alt:"wallet-developer-mode",style:{width:"318px",marginBottom:"10px"}}),(0,o.kt)("p",null,"And you must click the Refresh button in the upper right corner of the plug-in to apply changes to your wallet."),(0,o.kt)("h2",{id:"create-the-project"},"Create the Project"),(0,o.kt)("p",null,"In Neutron, you can write smart contracts with Rust language. ",(0,o.kt)("strong",{parentName:"p"},"WELLDONE Code")," provides two features to help developers new to Neutron."),(0,o.kt)("h3",{id:"create-template"},"Create Template"),(0,o.kt)("p",null,"Create a simple example contract code written in Rust. You can create a sample contract by selecting the template option and clicking the ",(0,o.kt)("inlineCode",{parentName:"p"},"Create")," button. More templates may be found at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/deus-labs/cw-contracts"},"CosmWasm Samples"),"."),(0,o.kt)("img",{src:n(83174).Z,alt:"template-code-neutron",style:{width:"50%"}}),(0,o.kt)("h3",{id:"new-project"},"New Project"),(0,o.kt)("p",null,"Automatically generate a contract structure. Click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Create")," button to create a contract structure."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"You can create your own contract projects without using the features above. However, for the remix plugin to build and deploy the contract, it must be built within the directory ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron/"),". If you start a new project, the structure should look like the following.")),(0,o.kt)("h4",{id:"writing-contracts-in-rust"},"Writing Contracts in Rust"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"neutron\n\u2514\u2500\u2500 <YOUR_PROJECT_NAME>\n    \u251c\u2500\u2500 Cargo.toml\n    \u2514\u2500\u2500 src\n        \u2514\u2500\u2500 contract.rs\n    \u2514\u2500\u2500 examples\n        \u2514\u2500\u2500 schema.rs    \n")),(0,o.kt)("h2",{id:"compile-the-contract"},"Compile the Contract"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"We now only support the AMD compilation server. The build environment is crucial for contract verification due to the non-deterministic nature of building Rust into Wasm.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": Select the project you want to compile in the ",(0,o.kt)("strong",{parentName:"p"},"TARGET PROJECT")," section."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 2"),": Select a compilation option and click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Compile")," button."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 3"),": When the compilation is complete, a wasm and schema files are returned."),(0,o.kt)("img",{src:n(29260).Z,alt:"neutron-compile",style:{width:"318px"}}),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"You can check the returned wasm file and schema files in ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron/<YOUR_PROJECT_NAME>/artifacts")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"neutron/<YOUR_PROJECT_NAME>/schema"),"."),(0,o.kt)("p",{parentName:"admonition"},"When you run the recompilation, the existing ",(0,o.kt)("inlineCode",{parentName:"p"},"artifacts")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"schema")," folders will be deleted and the compilation process will start anew.")),(0,o.kt)("h2",{id:"store-code"},"Store Code"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"The WELLDONE Wallet automatically finds and imports networks associated with your wallet address. As a result, before deploying, you should choose whether you want to send a transaction to mainnet or testnet.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": If you have a compiled contract code, then ",(0,o.kt)("inlineCode",{parentName:"p"},"Store Code")," button will be activated."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 2"),": Gas price is set to 0.025 untrn/untrnx as a default and can be modified. "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 3"),": Click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store Code")," button."),(0,o.kt)("img",{src:n(75320).Z,alt:"neutron-store-code",style:{width:"70%"}}),(0,o.kt)("h2",{id:"instantiate-the-contract"},"Instantiate the Contract"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"You have the option to Instantiate or Migrate. In the current version, if you want to run either of them again, you need to start over from the compilation process. This will be updated in the future for greater convenience.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": When the Store Code is completed, a ",(0,o.kt)("inlineCode",{parentName:"p"},"Code ID")," is generated."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 2"),": You can choose whether to allow contract upgrades or make them unmodifiable through the immutable option."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 3"),": If there are arguments for contract instantiation, input the parameters and click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Instantiate")," button. The arguments are generated through ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rjsf-team/react-jsonschema-form"},"react-jsonschema-form"),"."),(0,o.kt)("img",{src:n(83466).Z,alt:"neutron-instantiate",style:{width:"318px"}}),(0,o.kt)("h2",{id:"execute-the-contract"},"Execute the Contract"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": Select the method to run."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 2"),": Add parameters as you needed."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 4"),": Run the method via clicking ",(0,o.kt)("inlineCode",{parentName:"p"},"Query")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Execute")," button. If you are sending a transaction, you must sign the transaction by clicking the ",(0,o.kt)("inlineCode",{parentName:"p"},"Send")," button in the ",(0,o.kt)("strong",{parentName:"p"},"WELLDONE Wallet"),"."),(0,o.kt)("img",{src:n(87775).Z,alt:"neutron-execute",style:{width:"100%"}}),(0,o.kt)("h2",{id:"migrate-the-contract"},"Migrate the Contract"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"You have the option to Instantiate or Migrate. In the current version, if you want to run either of them again, you need to start over from the compilation process. This will be updated in the future for greater convenience.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": When the Store Code is completed, a ",(0,o.kt)("inlineCode",{parentName:"p"},"Code ID")," is generated."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 2"),": Select the method as ",(0,o.kt)("inlineCode",{parentName:"p"},"migrate"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 3"),": Enter the target contract address for the migration and click the ",(0,o.kt)("inlineCode",{parentName:"p"},"Migrate")," button."),(0,o.kt)("img",{src:n(5460).Z,alt:"neutron-migrate",style:{width:"318px"}}))}u.isMDXComponent=!0},72064:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/activate-plugin-b290e8fbbad84e87d39c63cce9d4a1ae.png"},29260:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/compile-neutron-3cb09fb4a3361dda74f242d17a6d2999.png"},87775:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/neutron-execute-bd82e6757e180aa24cbd85b5580e4164.png"},83466:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/neutron-instantiate-4d17efe1d0cd02019a1ad7a966c8a47d.png"},5460:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/neutron-migrate-d828179875e2d8ae62f554dbcdfebea9.png"},75320:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/neutron-store-code-3f097f8777216205609b16ddcc0340f4.png"},97016:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugin-manager-92eebcf01852f4afab0bace1427e0bb6.png"},56381:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/select-chain-f81465a0896293f3fcee49d6c2e7075d.png"},83174:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/template-code-neutron-7a08437d450cd74c638086b594036f0c.png"},85182:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/wallet-developer-mode-bf69ff26e36b2854a800cd1fbdf6fac8.png"},26971:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix-ide-955ef8ffe36e3e2402f85526d0c2c412.png"}}]);