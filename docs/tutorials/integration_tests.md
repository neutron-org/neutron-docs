# Integration tests
There is a set of integration tests which cover main Neutron features. If you develop a smart contract for Neutron you can add some tests into this set to make sure everything works as expected.

* [Installation](#Installation)
* [Running the tests](#Running-the-tests)
* [Environment variables](#Environment-variables-you-can-redefine)
* [Creating your own tests](#Creating-your-own-tests)

## Installation
* `git clone git@github.com:neutron-org/neutron-integration-tests.git`
* `git clone git@github.com:neutron-org/neutron.git`
* `git clone git@github.com:neutron-org/cosmos-query-relayer.git`
* `git clone -b v7.0.3 git@github.com:cosmos/gaia.git`
* `cd neutron-integration-tests`
* \* `make -C setup build-all`
* `yarn`
* Make sure you have docker installed and docker daemon running

\* Only for the first run, to build hermes ibc relayer and gaiad containers

## Running the tests

```
yarn test # all tests
yarn test:simple # basic tests
yarn test:interchaintx # interchain txs test
yarn test:interchain_tx_query # interchain tx query test
yarn test:interchain_kv_query # interchain kv query test
```
## Environment variables you can redefine

```
NEUTRON_DIR - directory where Neutron is located
NEUTRON_DENOM - neutron network denom
COSMOS_DENOM - gaia (cosmoshub) network denom
CONTRACTS_PATH - path to contracts that will be used in tests
NEUTRON_ADDRESS_PREFIX - address prefix for neutron controller network
COSMOS_ADDRESS_PREFIX - address prefix for gaia (cosmoshub) host network
NODE1_URL - url to the first node
NODE2_URL - url to the second node
BLOCKS_COUNT_BEFORE_START - how many blocks we wait before start first test
NO_DOCKER - do not start cosmopark for tests
BLOCK_TIME - time in ms for 1 block production
```

## Config

```
src/config.json
```

## Creating your own tests
### Creating your contract
To create a new contract you can refer to [Neutron Cosmwasm SDK Repo](https://github.com/neutron-org/neutron-sdk) to have an idea how to use Neutron SDK.

### Updating artifacts
You'll need to update artifacts in `./contracts` folder in case you have created a new contract. Place your contract(s) into `./contracts/artifacts` folder. Let's say you have the contract  with name `my_contract.wasm`

### Your first test
Create a file named `new_one.test.ts` in `./src/testcases` with following code 
```js
import { CosmosWrapper } from '../helpers/cosmos';
import { TestStateLocalCosmosTestNet } from './common_localcosmosnet';

describe('Neutron / My test', () => {
  let testState: TestStateLocalCosmosTestNet;
  let cm: CosmosWrapper;
  let codeId: string;
  let contractAddress: string;

  beforeAll(async () => {
    testState = new TestStateLocalCosmosTestNet();
    await testState.init();
    cm = new CosmosWrapper(testState.sdk1, testState.wallets.demo1);
  });

  test('store contract', async () => {
    codeId = await cm.storeWasm('my_contract.wasm');
    expect(parseInt(codeId)).toBeGreaterThan(0);
  });
  test('instantiate', async () => {
    const res = await cm.instantiate(codeId, '{}', 'my_contract');
    contractAddress = res;
    expect(res).toStartWith('neutron');
  });
  test('execute contract', async () => {
    const res = await cm.executeContract(
      contractAddress,
      JSON.stringify({
        my_method: {
          //we assume you have this method in the contract
          foo: 'bar',
        },
      }),
    );
    expect(res.code).toEqual(0);
  });
});

```

Then update `package.json` in the root folder. Like this
```
...
    "test:new_one": "jest --runInBand -b src/testcases/new_one",
...
```
Now you can run your test:
```bash
yarn test:new_one
```