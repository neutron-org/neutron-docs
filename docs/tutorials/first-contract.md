# Deploy your first contract
This guide will explore the basics of creating a simple cosmwasm contract.


## Wasmkit

WasmKit is a development framework for building the cosmwasm contracts. The aim of the project is to make cosmwasm contracts development process simple, efficient and scalable. Users can focus on the logic of cosmwasm contracts and not much about further steps in development. It facilitates features such as initiating project repo from contract templates, easy compilation of contracts, deployment, Interacting with contracts using schema and contract testing framework.
<!-- ```
.
├── neutron
├── gaia
└── neutron-query-relayer
``` -->

## Prerequisites
The minimum packages/requirements are as follows:
- Node 14+
- Yarn v1.22+ or NPM `v6.0+**
- Connection to a Secret node.

## Setup rust environment
WasmKit requires a Rust environment installed on a local machine to work properly. This Rust environment can be installed with the help of wasmKit in just a command.
```bash
wasmkit install
```

### Install wasmkit
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
This will create a directory inside the current directory with boiler-plate code. The `contracts/` directory has all the rust files for the contract logic. `scripts/` directory contains `.js` scripts that users can write according to the use case, a sample script has been added to give some understanding of how a user script should look like. `test/` directory contains `.js` scripts to run tests for the deployed contracts.

## Listing Tasks
To see the possible tasks (commands) that are available, go to the project's folder.
```bash
wasmkit
```
This is the list of built-in tasks. This is your starting point to find out what tasks are available to run.

## Compile the project
To compile the contracts, Go to project directory:
```bash
cd <project-name>
wasmkit compile
```
This command will generate compiled `.wasm` files in `artifacts/contracts/` dir and schema `.json` files in `artifacts/schema/` dir.

## Cleanup Artifacts
To clear artifacts data, use
```bash
wasmkit clean
```
This will remove the artifacts directory completely. To clean artifacts for only one contract, use
```bash
wasmkit clean <contract-name>
```

## Running user scripts
User scripts are a way to define the flow of interacting with contracts on some network in the form of a script. These scripts can be used to deploy a contract, `query/transact` with the contract.A sample script `scripts/sample-script.js` is available in the boilerplate.

### Run tests
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