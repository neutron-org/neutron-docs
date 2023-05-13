# F.A.Q.

## Technical questions

### I am a developer who builds on Neutron. How can I get in touch with the dev team?

There is two places to check out:

* **Neutron Builders Announcements** (https://t.me/+Q6C_kb0xLaoxYzE1): this is the channel with official announcements;
* **Neutron Builders Chat** (https://t.me/+b9f8m8iybLdhYjE9): this is a chat where smart contract developers can ask
  technical questions to the devs. Please note that non-technical questions and spam can result in an immediate ban;
* **Neutron Dev Blog** (https://t.me/+GK5KVutIvQhhNmNi): a channel for various technical notes from the dev team.

### Where is block explorer?

We encourage everyone to use the Mintscan explorer:

* Mainnet (`neutron-1`): https://www.mintscan.io/neutron;
* Testnet (`pion-1`): https://testnet.mintscan.io/neutron-testnet.

### Where can I get the public REST and RPC nodes?

You can check out the Cosmos Chain Registry:

* [Mainnet](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json#L86) (`neutron-1`);
* [Testnet](https://github.com/cosmos/chain-registry/blob/master/testnets/neutrontestnet/chain.json#L81) (`pion-1`).

We are always keeping our REST and RPC nodes running and available for everyone to use; if you experience any problems
with the public nodes, feel free to report to the Neutron Technical Support group (see above).

### What CosmWasm version is used?

We are using a [patched](https://github.com/neutron-org/neutron/blob/v1.0.1/go.mod#L158) 0.31.1 version of `wasmd`.