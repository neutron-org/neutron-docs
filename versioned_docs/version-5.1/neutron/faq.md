# F.A.Q.

## Technical questions

### I am a developer who builds on Neutron. How can I get in touch with the dev team?

There are two places to check out:

- **Neutron Builders Announcements** (https://t.me/+Q6C_kb0xLaoxYzE1): this is the channel with official announcements;
- **Neutron Builders Chat** (https://t.me/+b9f8m8iybLdhYjE9): this is a chat where smart contract developers can ask
  technical questions to the devs. Please note that non-technical questions and spam can result in an immediate ban;
- **Neutron Dev Blog** (https://t.me/+GK5KVutIvQhhNmNi): a channel for various technical notes from the dev team.

### I think I’ve found a vulnerability, what should I do?

Check out our bug bounty program on Immunefi: https://immunefi.com/bug-bounty/neutron

### Where is the block explorer?

We encourage everyone to use the Mintscan explorer:

- Mainnet (`neutron-1`): https://mintscan.io/neutron;
- Testnet (`pion-1`): https://mintscan.io/neutron-testnet.

We also recommend to use this awesome smart contracts [explorer](https://neutron.celat.one/neutron-1) by Celatone: it
provides a great UI to
upload, query and execute contracts.

### Where to download latest snapshots?

If you're looking to spin up your own archive node, our snapshot service provides a convenient solution, enabling you
to skip syncing from scratch. We also offer small pruned snapshots for quick server bootstrapping.

- [Snapshot service](https://snapshot.neutron.org)

### Where can I get the public REST and RPC nodes?

You can check out the Cosmos Chain Registry:

- [Mainnet](https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json) (`neutron-1`);
- [Testnet](https://github.com/cosmos/chain-registry/blob/master/testnets/neutrontestnet/chain.json) (`pion-1`).

We are always keeping our REST and RPC nodes running and available for everyone to use; if you experience any problems
with the public nodes, feel free to report to the Neutron Technical Support group (see above).

### How can I check the current status of Neutron's RPCs?

For the most current information on the status of our RPCs and any scheduled maintenance, please visit our Neutron
Status page:

- [Neutron Status](https://neutron.betteruptime.com)

This page provides real-time updates and alerts regarding the operational status of all Neutron services.

### What CosmWasm version is used?

We are using
a [patched](https://github.com/neutron-org/neutron/blob/5def8658ff80afe6851d3992afde0e002b7a82c8/go.mod#L257) 0.51.0
version of `wasmd`.

### Where is the testnet faucet?

You can request from Testnet(`pion-1`) Faucet on the #testnet-faucet channel on Neutron’s Discord server with the
following command:

```text
$request <NEUTRON-ADDRESS>
```

Where `<NEUTRON-ADDRESS>`is a`neutron1******`generated address.

Also you can use [Telegram Faucet](https://t.me/+SyhWrlnwfCw2NGM6) with the following command:

```text
/request <NEUTRON-ADDRESS>
```

### How can I enable TokenFactory hooks for my application?

`SetBeforeSendHook` can only be called on denoms where the `denom_creator` and `code_id` match a `WhitelistedHook` in
module's [params](/neutron/modules/3rdparty/osmosis/tokenfactory/params). For hooks to be whitelist a governance
proposal must be created
to [update module's params](/neutron/modules/3rdparty/osmosis/tokenfactory/messages#updateparams).

Additionally, there is a privileged [TokenFactory Hooks SubDAO](https://daodao.zone/dao/neutron1u9nzxsr60vsysk673rwr8x4nepccaw4h2y2e049p7jxhswg6fu6sdn9llv/proposals)
that can fast-track such proposals. If you want to enable TokenFactory hooks for your application through the SubDAO,
please use this [form](https://forms.gle/9MnnW3LwRyziqCiq8) to file an application.

