# Overview

🌐 **The Block SDK is a toolkit for building customized blocks.** The Block SDK is a set of Cosmos SDK and ABCI++ primitives that allows chains to fully customize blocks to specific use cases. It turns your chain's blocks into a highway consisting of individual lanes with their own special functionality.

Skip has built out a number of plug-and-play lanes on the SDK that your protocol can use, including in-protocol MEV recapture and Oracles! Additionally, the Block SDK can be extended to add your own custom lanes to configure your blocks to exactly fit your application needs.

> **Note:** you can find more info about Block SDK, how it works and how to use the module in the official Skip's Block SDK docs: https://docs.skip.money/blocksdk/searcher-docs

## Which Block SDK Lanes does Neutron support?
Currently, Neutron supports only one type of Block SDK Lanes:
* **Base Lane** is intended to hold all txs that are not matched by any lanes ordered before this lane.
