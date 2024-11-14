"use strict";(self.webpackChunkneutron=self.webpackChunkneutron||[]).push([[81082],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>w});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),o=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=o(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,u=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=o(n),g=i,w=d["".concat(l,".").concat(g)]||d[g]||p[g]||u;return n?r.createElement(w,s(s({ref:t},c),{},{components:n})):r.createElement(w,s({ref:t},c))}));function w(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var u=n.length,s=new Array(u);s[0]=g;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[d]="string"==typeof e?e:i,s[1]=a;for(var o=2;o<u;o++)s[o]=n[o];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},94842:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>u,metadata:()=>a,toc:()=>o});var r=n(87462),i=(n(67294),n(3905));const u={},s="Client",a={unversionedId:"neutron/modules/interchain-queries/client",id:"version-3.0/neutron/modules/interchain-queries/client",title:"Client",description:"Transactions",source:"@site/versioned_docs/version-3.0/neutron/modules/interchain-queries/client.md",sourceDirName:"neutron/modules/interchain-queries",slug:"/neutron/modules/interchain-queries/client",permalink:"/3.0/neutron/modules/interchain-queries/client",draft:!1,tags:[],version:"3.0",frontMatter:{},sidebar:"docs",previous:{title:"Messages",permalink:"/3.0/neutron/modules/interchain-queries/messages"},next:{title:"State",permalink:"/3.0/neutron/modules/interchain-queries/state"}},l={},o=[{value:"Transactions",id:"transactions",level:2},{value:"submit-query-result",id:"submit-query-result",level:3},{value:"Queries",id:"queries",level:2},{value:"registered-query",id:"registered-query",level:3},{value:"registered-queries",id:"registered-queries",level:3},{value:"query-result",id:"query-result",level:3},{value:"query-last-remote-height",id:"query-last-remote-height",level:3}],c={toc:o},d="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"client"},"Client"),(0,i.kt)("h2",{id:"transactions"},"Transactions"),(0,i.kt)("h3",{id:"submit-query-result"},"submit-query-result"),(0,i.kt)("p",null,"Submits query result:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond tx interchainqueries submit-query-result [query-id] [result-file]\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example"),"Register an interchain query to get delegations of delegator on remote chain:",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond tx interchainqueries submit-query-result result.json --from demowallet1 --gas 10000000 --gas-adjustment 1.4 --gas-prices 0.5stake --broadcast-mode block --chain-id test-1\n")),(0,i.kt)("p",null,"Example content of ",(0,i.kt)("inlineCode",{parentName:"p"},"result.json")," file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "kv_results": [\n        {\n            "storage_prefix": "staking",\n            "key": "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==",\n            "value": "Ci5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",\n            "Proof": {\n                "ops": [\n                    {\n                        "type": "ics23:iavl",\n                        "key": "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==",\n                        "data": "CvwDCisxFATsqdZ/sFxTJBNf+tv6rtckvn3TFATsqdZ/sFxTJBNf+tv6rtckvn3TEoUBCi5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMBoLCAEYASABKgMAAgIiKQgBEiUCBAQg/XaR47+Bw1YRGxSWwyiaAq5OSBQJIJ1qSFWbOe/5msIgIisIARIEBAgYIBohIK8BCwRz+Fod0SUgzLUhUK6VU2mEVhOqM53DZgtpytmXIikIARIlBhAcIEDf0aJaZU9bWVCd7T6zPbZoDp9Z+5w4qnurGAYVS85jICIrCAESBAgYJCAaISDJJKeGrIRSJj3EYotsdiXp6QNsqlzjMJuy4aELAnFvYiIrCAESBAo4SiAaISDcflhqTQQJl5EG2W37BWlPexWgUWXE0agE9ir+M5zA6SIsCAESBQxkjgEgGiEg4dZUUhewJTuJ2dNjKe7cJCKzJANcYVTprAPKkjQOtQciLQgBEgYOpgGaASAaISBRJQpR01RPTxIakznqcierctkEkx3Sp51sbw4+cAXnIQ=="\n                    },\n                    {\n                        "type": "ics23:simple",\n                        "key": "c3Rha2luZw==",\n                        "data": "Cq8BCgdzdGFraW5nEiAX2lqGKZJW473ICfGb3Wa2lotPFt1cTLN+R9aZJjs2xBoJCAEYASABKgEAIicIARIBARogOqsHULjzmZkig3Kxczq2JoCMuiq6iXWpKHea7ZB9gWAiJwgBEgEBGiBp76tKiIQVkrMiaBxiQMYu0e/01Saw7T/PjyEPDPlQbiIlCAESIQEmmrFm4aKKJReopSqK+rTjZSDTKuV0duBPSipjJxPzaA=="\n                    }\n                ]\n            }\n        },\n        {\n            "storage_prefix": "staking",\n            "key": "IRQE7KnWf7BcUyQTX/rb+q7XJL590w==",\n            "value": "CjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiA/t9hdbTKV91SkxZmBgg39qOod/0vO76wK5QW4V6ZyiyADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJLCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBIMCIvg1pYGEMCl3pgBWgEx",\n            "Proof": {\n                "ops": [\n                    {\n                        "type": "ics23:iavl",\n                        "key": "IRQE7KnWf7BcUyQTX/rb+q7XJL590w==",\n                        "data": "CuYEChYhFATsqdZ/sFxTJBNf+tv6rtckvn3TEoICCjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiA/t9hdbTKV91SkxZmBgg39qOod/0vO76wK5QW4V6ZyiyADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJLCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBIMCIvg1pYGEMCl3pgBWgExGgsIARgBIAEqAwACAiIrCAESBAIEAiAaISAUEQIV7Mowp74roi0TppU27U2MG6vmxyfOJv0qCgfKqyIpCAESJQQIAiCCcJylC1/v/+M5ac1A5fvMcAA+5C+mG74CeoXjOScF1SAiKwgBEgQGEBwgGiEgD6ziA96HscsB249ulbBxQa4rSR8BzLzeJNkXjOakvjoiKwgBEgQIGCQgGiEgySSnhqyEUiY9xGKLbHYl6ekDbKpc4zCbsuGhCwJxb2IiKwgBEgQKOEogGiEg3H5Yak0ECZeRBtlt+wVpT3sVoFFlxNGoBPYq/jOcwOkiLAgBEgUMZI4BIBohIOHWVFIXsCU7idnTYynu3CQisyQDXGFU6awDypI0DrUHIi0IARIGDqYBmgEgGiEgUSUKUdNUT08SGpM56nInq3LZBJMd0qedbG8OPnAF5yE="\n                    },\n                    {\n                        "type": "ics23:simple",\n                        "key": "c3Rha2luZw==",\n                        "data": "Cq8BCgdzdGFraW5nEiAX2lqGKZJW473ICfGb3Wa2lotPFt1cTLN+R9aZJjs2xBoJCAEYASABKgEAIicIARIBARogOqsHULjzmZkig3Kxczq2JoCMuiq6iXWpKHea7ZB9gWAiJwgBEgEBGiBp76tKiIQVkrMiaBxiQMYu0e/01Saw7T/PjyEPDPlQbiIlCAESIQEmmrFm4aKKJReopSqK+rTjZSDTKuV0duBPSipjJxPzaA=="\n                    }\n                ]\n            }\n        }\n    ],\n    "height": 77,\n    "revision": 2\n}\n'))),(0,i.kt)("h2",{id:"queries"},"Queries"),(0,i.kt)("p",null,"In this section we describe the queries required on grpc server."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},'// Query defines the gRPC querier service.\nservice Query {\n  // returns all the registered queries in the module with filtration by owner and/or connection id\n  rpc RegisteredQueries(QueryRegisteredQueriesRequest)\n      returns (QueryRegisteredQueriesResponse) {\n    option (google.api.http).get =\n        "/neutron/interchainqueries/interchainqueries/registered_queries";\n  }\n\n  // returns registered query by id\n  rpc RegisteredQuery(QueryRegisteredQueryRequest)\n      returns (QueryRegisteredQueryResponse) {\n    option (google.api.http).get =\n        "/neutron/interchainqueries/interchainqueries/registered_query";\n  }\n\n  // returns query result for a particular registered interchain query by id\n  rpc QueryResult(QueryRegisteredQueryResultRequest) returns (QueryRegisteredQueryResultResponse) {\n    option (google.api.http).get = "/neutron/interchainqueries/interchainqueries/query_result";\n  }\n\n  // returns last height about which Neutron knows for the particular remote chain\n  rpc LastRemoteHeight(QueryLastRemoteHeight) returns (QueryLastRemoteHeightResponse) {\n    option (google.api.http).get = "/neutron/interchainqueries/interchainqueries/remote_height";\n  }\n}\n')),(0,i.kt)("h3",{id:"registered-query"},"registered-query"),(0,i.kt)("p",null,"Returns registered query by id."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"neutrond query interchainqueries registered-query [id]\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example"),"Returns info about registered query with id 1:",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond query interchainqueries registered-query 1\n")),(0,i.kt)("p",null,"Output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'registered_query:\n  connection_id: connection-0\n  id: "1"\n  owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"\n  last_submitted_result_local_height: "0"\n  last_submitted_result_remote_height: "0"\n  transactions_filter: "{}"\n  keys:\n  - path: "staking"\n    key: "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==" \n  query_type: kv\n  update_period: "1"\n'))),(0,i.kt)("h3",{id:"registered-queries"},"registered-queries"),(0,i.kt)("p",null,"Returns all the registered queries in the module with filtration by owner and/or connection id."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"neutrond query interchainqueries registered-queries\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example"),"Returns all registered interchain queries in the module with connection id `connection-0` and owner `neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq`:",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond query interchainqueries registered-queries --connection-id connection-0 --owners neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq\n")),(0,i.kt)("p",null,"Output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'registered_queries:\n- connection_id: connection-0\n  id: "1"\n  owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"\n  last_submitted_result_local_height: "206"\n  last_submitted_result_remote_height: "203"\n  transactions_filter: "{}"\n  keys:\n  - path: "staking"\n    key: "MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==" \n  query_type: kv\n  update_period: "1"\n- connection_id: connection-0\n  id: "2"\n  owner: "neutron14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s5c2epq"\n  last_submitted_result_local_height: "199"\n  last_submitted_result_remote_height: "188"\n  transactions_filter: \'{"message.module": "bank"}\'\n  query_type: tx\n  update_period: "5"\n'))),(0,i.kt)("h3",{id:"query-result"},"query-result"),(0,i.kt)("p",null,"Returns KV-storage result for particular registered interchain query by id."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"neutrond query interchainqueries query-result [query-id]\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example"),"Returns KV-storage result for registered interchain query with id 1:",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond query interchainqueries query-result 1\n")),(0,i.kt)("p",null,"Output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'result:\n  blocks: []\n  height: "203"\n  kv_results:\n  - Proof: null\n    key: MRQE7KnWf7BcUyQTX/rb+q7XJL590xQE7KnWf7BcUyQTX/rb+q7XJL590w==\n    storage_prefix: staking\n    value: Ci5uZXV0cm9uMXFuazJuNG5sa3B3OXhmcW50bGFkaDc0dzZ1anR1bHduNmR3cTh6EjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBocNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==\n  - Proof: null\n    key: IRQE7KnWf7BcUyQTX/rb+q7XJL590w==\n    storage_prefix: staking\n    value: CjVuZXV0cm9udmFsb3BlcjFxbmsybjRubGtwdzl4ZnFudGxhZGg3NHc2dWp0dWx3bnFzaGVweBJDCh0vY29zbW9zLmNyeXB0by5lZDI1NTE5LlB1YktleRIiCiCGVtQII4Ok0ieJqHiQcBkW42FKCSKPv+3poD5Me4zh1SADKgo3MDAwMDAwMDAwMhw3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOgYKBHRlc3RKAFJKCjsKEjEwMDAwMDAwMDAwMDAwMDAwMBISMjAwMDAwMDAwMDAwMDAwMDAwGhExMDAwMDAwMDAwMDAwMDAwMBILCKLo1pYGEKjc/G1aATE=\n  revision: "0"\n'))),(0,i.kt)("h3",{id:"query-last-remote-height"},"query-last-remote-height"),(0,i.kt)("p",null,"Returns last height about which Neutron knows for the particular remote chain by connection id."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"neutrond query interchainqueries query-last-remote-height [connection-id]\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example"),"Returns last height remote chain by connection id `connection-0`:",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"neutrond query interchainqueries query-last-remote-height connection-0\n")),(0,i.kt)("p",null,"Output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'height: "29"\n'))))}p.isMDXComponent=!0}}]);