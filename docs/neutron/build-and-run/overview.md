# Overview

The main topic we want to cover here is how to build and run a Neutron node in a standalone way. If you need only a Neutron node to be running and plan no interactions with other chains or you have your own setup for running a sidechain and relaying applications, stick with the [Neutron node sole running manual](/neutron/build-and-run/neutron-docker). This is the easiest way to get a running Neutron node.

However, we assume that a ready-to-use multi-chain setup with relayers in between can also be handy for developers who want to deploy on Neutron. Therefore we decided to describe a guide on how to run a Neutron node along with a Gaia node connected via a Hermes IBC Relayer and a Neutron ICQ Relayer. The Neutron's integration tests project is the base for this setup. If this is your case, stick with the [Cosmopark running manual](/neutron/build-and-run/cosmopark). This is likely your option if you're up to create a smart contract that will take advantage of [Neutron cosmwasm SDK](https://github.com/neutron-org/neutron-sdk) and its interchain queries and interchain transactions. This is a more advanced section than the basic sole Neutron node flow.

Overall, these sections can be useful if you're up to develop/debug/test your Neutron-related apps and smart contracts. If you need to prepare a production version of Neutron, please refer to [this repository](https://github.com/neutron-org/mainnet-assets) which contains all details you need.

In some cases, you might be required to run an archive node with the entire blockchain history. If you want, you can start syncing your node from the very beginning, or you can use our [snapshot service](https://snapshot.neutron.org/) to download a complete history snapshot.
