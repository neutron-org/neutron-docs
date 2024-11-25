# F.A.Q.

## Technical questions

### I am a developer who builds on Neutron. How can I get in touch with the dev team?

There are two places to check out:

- **Neutron Builders Announcements** (https://t.me/+Q6C_kb0xLaoxYzE1): this is the channel with official announcements;
- **Neutron Builders Chat** (https://t.me/+b9f8m8iybLdhYjE9): this is a chat where smart contract developers can ask
  technical questions to the devs. Please note that non-technical questions and spam can result in an immediate ban;
- **Neutron Dev Blog** (https://t.me/+GK5KVutIvQhhNmNi): a channel for various technical notes from the dev team.

### Where is the block explorer?

We encourage everyone to use the Mintscan explorer:

- Mainnet (`neutron-1`): https://mintscan.io/neutron;
- Testnet (`pion-1`): https://mintscan.io/neutron-testnet.

We also recommend to use this awesome smart contracts [explorer](https://neutron.celat.one/mainnet/query?contract=neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff) by Celatone: it provides a great UI to
upload, query and execute contracts.

### Where to download latest snapshots?

If you want to spin up your own archive node, you can use our snapshot service, which allows you to do so without the requirement to sync from the very beginning.

- [Snapshot service](https://snapshot.neutron.org)

### Where can I get the public REST and RPC nodes?

You can check out the Cosmos Chain Registry:

- [Mainnet](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json) (`neutron-1`);
- [Testnet](https://github.com/cosmos/chain-registry/blob/master/testnets/neutrontestnet/chain.json) (`pion-1`).

We are always keeping our REST and RPC nodes running and available for everyone to use; if you experience any problems
with the public nodes, feel free to report to the Neutron Technical Support group (see above).

### How can I check the current status of Neutron's RPCs?
For the most current information on the status of our RPCs and any scheduled maintenance, please visit our Neutron Status page:

 - [Neutron Status](https://neutron.betteruptime.com)

This page provides real-time updates and alerts regarding the operational status of all Neutron services.

### What CosmWasm version is used?

We are using a [patched](https://github.com/neutron-org/neutron/blob/5def8658ff80afe6851d3992afde0e002b7a82c8/go.mod#L257) 0.51.0 version of `wasmd`.

### Where is the testnet faucet?

You can request from Testnet(`pion-1`) Faucet on the #testnet-faucet channel on Neutron’s Discord server with the following command:

```text
$request <NEUTRON-ADDRESS>
```

Where `<NEUTRON-ADDRESS>` is a `neutron1******` generated address.

Also you can use [Telegram Faucet](https://t.me/+SyhWrlnwfCw2NGM6) with the following command:

```text
/request <NEUTRON-ADDRESS>
```
