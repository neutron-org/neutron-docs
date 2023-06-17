# Deploy your first contract

This guide will explore an overview of lifecycle of a simple CosmWasm contract using WasmKit. You can check out more detailed WasmKit usage [here](https://wasmkit.arufaresearch.com/).

WasmKit is a development framework specifically designed for building CosmWasm contracts. The primary goal of the project is to simplify, streamline, and enhance the process of developing CosmWasm contracts.

## Prerequisites

The minimum packages/requirements are as follows:
- Node `v14+`
- Yarn `v1.22+` or Npm `v6.0+`
- Connection to a Neutron node

## Quick start

### Contract development cycle

TODO: explain list of steps to take from start to end for developing contracts.

### Setup rust environment

WasmKit requires a Rust environment installed on local machine to work properly. A working instance of `rustup` and `rustc` should be enough to get started.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup --version
rustc --version
```

### Installation

```bash
yarn global add @arufa/wasmkit
```

or

```bash
npm install -g @arufa/wasmkit
```

Installation from source:

```bash
git clone https://github.com/arufa-research/wasmkit.git
cd wasmkit && yarn install && yarn build
cd packages/wasmkit && yarn link
chmod +x $HOME/.yarn/bin/wasmkit
```

## Usage

### Initialize a project

```bash
npx wasmkit init <project-name>
```

This will create a directory inside the current directory with boiler-plate code.

- The `contracts/` directory has all the rust files for the contract logic.
- `scripts/` directory contains `.ts` scripts that users can write according to the use case, a sample script has been added to give some understanding of how a user script should look like.
- `test/` directory contains `.ts` scripts to run intergation tests for the deployed contracts.

### Compile the project

Begin by typing:

```bash
cd <project-name>
npx wasmkit --help
```

The `compile` command generates compiled `.wasm` files in `artifacts/contracts/`, schema `.json` files in `artifacts/schema/` and typescript clients in `artifacts/typescript_schema/`.

- Compile all the contracts in the project:
```bash
npx wasmkit compile
```

- Compile only one contracts or a subset of all contracts in the project:
```bash
npx wasmkit compile <contract-source-dir>
```

- Skip schema generation while compiling:
```bash
npx wasmkit compile --skip-schema
```

### Listing Tasks

To see the tasks (commands) that are available, run wasmkit in project's directory.
```bash
npx wasmkit
```

This will display the list of built-in tasks. This is your starting point to find out what tasks are available to run.

### Cleanup Artifacts

- Clear artifacts data:
```bash
wasmkit clean
```

This will remove the `artifacts/` directory completely.

- Clean artifacts for only one contract:
```bash
wasmkit clean <contract-name>
```

### Running user scripts

User scripts are a way to define the flow of interacting with contracts on some network in the form of a script. These scripts can be used to deploy a contract, query or execute a contract. A sample script `scripts/sample-script.ts` is available in the boilerplate.

```bash
npx wasmkit run scripts/<script-name>
```

## Run tests

To run all the tests in `test/` directory:
```bash
npx wasmkit test
```

To run a specific test or a subset of tests, just pass the path of test files:
```bash
npx wasmkit test test/<test-name>
```

For example:
```bash
npx wasmkit test test/sample-test.ts test another-test.ts
```

## Initiate wasmkit playground

To initiate wamskit playground make sure you are in project directory and contracts are compiled and instantiated using compile and run commands of wasmkit respectively.

```bash
cd <project-name>
npx wasmkit playground
```

This command will clone a react application to interact with deployed contracts. User can also modify its theme and logo using config file.

## Configuration guide

If you examine the `wasmkit.config.js` file, you will find testnet/localnet accounts and various networks, allowing users to customize fee, account, and network information according to their requirements.

```javascript
const testnet_accounts = [
  {
    name: 'account_0',
    address: 'neutron1e...dp5',
    mnemonic: 'omit ... text'
  },
  {
    name: 'account_1',
    address: 'neutron1n...z8h',
    mnemonic: 'student ... bicycle'
  }
];

const localnet_accounts = [
  {
    name: 'account_0',
    address: 'neutron3f...sf2',
    mnemonic: 'clip ... choose'
  }
];

const networks = {
  localnet: {
    endpoint: 'http://localhost:26657/',
    chainId: 'test-1',
    accounts: localnet_accounts,
  },
  testnet: {
    endpoint: 'https://rpc.uni.juno.deuslabs.fi/',
    chainId: 'pion-1',
    accounts: testnet_accounts,
  },
};

module.exports = {
  networks: {
    default: networks.testnet,
    testnet: networks.testnet,
    localnet: networks.localnet,
  },
  mocha: {
    timeout: 60000
  },
  rust: {
    version: "1.63.0",
  }
};
```
