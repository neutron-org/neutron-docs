# Price Feeds

Price feeds are specialised tools that provide asset prices data to smart contracts and other consumers. There is a number of on- and off-chain solutions available on Neutron that you as a developer can benefit from.

## Oracles

An oracle in blockchain is a specialized service that acts as a bridge between the blockchain and the outside world, enabling smart contracts to interact with real-world data and events. Unlike traditional systems that rely on centralized data sources, oracles provide decentralized, tamper-resistant mechanisms to fetch, verify, and relay external information onto the blockchain.

### Slinky (coming soon)

Slinky is an on-chain consensus-level oracle running by the chain validators. Slinky is coming to Neutron in the next release in July 2024. You can read more about the oracle, how it works, its upcoming features and how to use by the link to the oracle's official docs: https://docs.skip.money/slinky/overview/. Learn how to easily interact with Slinky using Neutron SDK: https://docs.skip.money/slinky/using-slinky/neutron-sdk.

### Pyth

Pyth is a broadly used oracle that offers not only real-time price feeds, but also historical price data and on-chain random numbers generator. Read more about it by the link to the official docs: https://docs.pyth.network/home.

### Ojo

Ojo is a decentralized security-first oracle network that sources price data from a diverse catalog of on- and off-chain sources. Here's a link to the docs so you can get familiar with its advantages and usage: https://docs.ojo.network/.

### Band

Band is a cross-chain data oracle platform that provides reliable, secure, and real-time data to smart contracts on various blockchain networks. Read more about its architecture, functionalities, client libraries, and tools by the link to the docs: https://docs.bandchain.org/.

## On-chain TWAP

TWAP, or Time-Weighted Average Price, is a trading algorithm and pricing strategy used in financial markets. It calculates the average price of an asset over a specified period of time to get a more even result and reduce market impact.

### Astroport oracle

Astroport has an oracle contract that calculates TWAP for x*y=k type of pools: https://docs.astroport.fi/docs/develop/smart-contracts/oracle.
