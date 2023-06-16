# Deploy your first contract
This guide will explore the basics of creating a simple cosmwasm contract. You can check out more detailed usage of wasmkit [here](https://wasmkit.arufaresearch.com/), for entry-level tutorials.


## Wasmkit

WasmKit is a development framework specifically designed for building CosmWasm contracts. The primary goal of the project is to simplify, streamline, and enhance the process of developing CosmWasm contracts, making it more efficient and scalable.


## Why to use Wasmkit
WasmKit offers various features to aid developers in their contract development journey. These include:

1. Contract Templates: WasmKit provides ready-to-use contract templates for quick setup.
2. Contract Compilation: Effortlessly compile CosmWasm contracts into WebAssembly format.
3. Deployment Assistance: Simplify the process of deploying CosmWasm contracts onto the blockchain.
4. Schema-based Interaction: Interact with CosmWasm contracts using a structured schema.
5. Contract Testing Framework: Utilize a dedicated testing framework to ensure contract correctness and functionality.


## Prerequisites
The minimum packages/requirements are as follows:
- Node 14+
- Yarn v1.22+ or NPM `v6.0+**
- Connection to a Secret node.



## Quick start
### Installation
Installation from released version
- Using Yarn:
```bash
yarn global add @arufa/wasmkit
```
- Using NPM:
```bash
npm install -g @arufa/wasmkit
```

Installation from master
```bash
git clone https://github.com/arufa-research/wasmkit.git
cd wasmkit
yarn install
yarn build
cd packages/wasmkit
yarn link
chmod +x $HOME/.yarn/bin/wasmkit
```

### Setup rust environment
WasmKit requires a Rust environment installed on a local machine to work properly. This Rust environment can be installed with the help of wasmKit in just a command.
```bash
wasmkit install
```

### Install dependencies
Setup Rust compiler
```bash
$ cd infrastructure
$ make setup-rust
```

## Usage

### Initialize a project
```bash
wasmkit init <project-name>
```

This will create a directory inside the current directory with boiler-plate code. 
- The `contracts/` directory has all the rust files for the contract logic.
- `scripts/` directory contains `.js` scripts that users can write according to the use case, a sample script has been added to give some understanding of how a user script should look like.
- `test/` directory contains `.js` scripts to run tests for the deployed contracts.


### Compile the project
Begin by typing:
```bash
cd <project-name>
wasmkit help
```

- To compile all the contracts in the project:
```bash
wasmkit compile
```
-  To compile only one contracts or a subset of all contracts in the project:
```bash
wasmkit compile <contract-source-dir>
```
-  To skip schema generation while compiling:
```bash
wasmkit compile --skip-schema
```

This command will generate compiled `.wasm` files in `artifacts/contracts/` dir and schema `.json` files in `artifacts/schema/` dir.

### Listing Tasks
To see the possible tasks (commands) that are available, run wasmkit in project's folder.
```bash
wasmkit
```
This will display the list of built-in tasks. This is your starting point to find out what tasks are available to run.

### Cleanup Artifacts
- To clear artifacts data, use
```bash
wasmkit clean
```
This will remove the artifacts directory completely.
- To clean artifacts for only one contract, use
```bash
wasmkit clean <contract-name>
```

### Running user scripts
User scripts are a way to define the flow of interacting with contracts on some network in the form of a script. These scripts can be used to deploy a contract, `query/transact` with the contract. A sample script `scripts/sample-script.js` is available in the boilerplate.

## Run tests
```bash
yarn run test
```


## Initiate wasmkit playground
To initiate wamskit playground make sure you are in project directory and contracts are compiled and instantiated using compile and run commands of wasmkit respectively.

```bash
cd <project-name>
wasmkit playground
```
This command will clone a react application to interact with deployed contracts. User can also modify its theme and logo using config file.

## Configuration guide
If you examine the wasmkit.config.js file, you will find testnet/localnet accounts and various networks, allowing users to customize fee, account, and network information according to their requirements.

```javascript
const testnet_accounts = [
  {
    name: 'account_0',
    address: 'juno1e...dp5',
    mnemonic: 'omit...text'
  },
  {
    name: 'account_1',
    address: 'juno1n...z8h',
    mnemonic: 'student ... bicycle'
  }
];

const loclnet_Accounts = [
  {
    name: 'account_0',
    address: 'juno3f...sf2',
    mnemonic: 'clip ... choose'
  }
];
// TODO: update fixture tests
const networks = {
  localnet: {
    endpoint: 'http://localhost:26657/',
    accounts: loclnet_Accounts,
  },
  // uni-2
  testnet: {
    endpoint: 'https://rpc.uni.juno.deuslabs.fi/',//https://lcd.uni.juno.deuslabs.fi/
    chainId: 'uni-3',
    trustNode: true,
    keyringBackend: 'test',
    accounts: testnet_accounts,
  },
};

module.exports = {
  networks: {
    default: networks.testnet,
    localnet: networks.localnet,
  },
  mocha: {
    timeout: 60000
  },
  rust: {
    version: "1.59.0",
  }
};
```
