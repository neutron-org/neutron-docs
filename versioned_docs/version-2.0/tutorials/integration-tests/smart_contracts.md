# Integration tests for smart contracts

There is an [improved version of integration tests framework](https://github.com/hadronlabs-org/demo-integration-tests) which is used for testing new smart contracts. It is based on top of [Cosmopark](https://github.com/neutron-org/cosmopark/) and [Contracts2ts](https://github.com/neutron-org/contracts2ts). 

## Cosmopark

Cosmopark – is a tool that allows to run multiple networks on the same machine. Under the hood it uses docker containers and require docker images for a network you want to run. It can spin up `Hermes Relayer` and `Neutron Query Relayer` for a deployment if required.

## Contracts2ts

Contracts2ts – is a tool that allows to generate typescript clients for set of contracts. It uses json generated schemas from contracts with `write_api` method.

## How to use

1. Clone the [repository](https://github.com/hadronlabs-org/demo-integration-tests)
2. Place your own contracts source code in the `contracts` folder. The `pump` contract is just an example which can be removed
3. Run `make schema` to generate json schemas for your contracts
4. `make build` - Build your contracts
5. `cd integration-tests`
6. `yarn`
7. `yarn build-images` - Build docker images for the networks used
7. `yarn build-ts-client` - Build TS client for your contracts
8. Implement you own tests in the `src/testcases` folder. The `pump` test files are examples which can be removed
9. `yarn test`

## What's inside the tests (`integration_tests` folder)

`src/testSuite.ts` contains configuration of the networks used with defined network params and docker image names.

`src/testcases` folder contains the tests for the contracts. Each test is a separate file with a set of tests for a contract. Please check the existing tests to understand how to write your own. In the `beforeAll` method you can see the configuration of the networks and the deployment of the contracts.

`src/vite.config.ts` contains of the configuration for the tests.

## Environment variables

`MAX_THREADS` - maximum threads to run tests in parallel