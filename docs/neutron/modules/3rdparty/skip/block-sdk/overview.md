# Overview

🌐 **The Block SDK is a toolkit for building customized blocks.** The Block SDK is a set of Cosmos SDK and ABCI++ primitives that allows chains to fully customize blocks to specific use cases. It turns your chain's blocks into a highway consisting of individual lanes with their own special functionality.

Skip has built out a number of plug-and-play lanes on the SDK that your protocol can use, including in-protocol MEV recapture and Oracles! Additionally, the Block SDK can be extended to add your own custom lanes to configure your blocks to exactly fit your application needs.

> **Note:** you can find more info about Block SDK, how it works and how to use the module in the official Skip's Block SDK docs: https://docs.skip.money/blocksdk/searcher-docs

## Which Block SDK Lanes does Neutron support?
Currently, Neutron supports only two type of Block SDK Lanes:
* **Base Lane** is intended to hold all txs that are not matched by any lanes ordered before this lane;
* [**MEV Lane**](https://docs.skip.money/blocksdk/lanes/existing-lanes/mev) - is the MEV lane, this lane is intended to hold all bid txs.

## Block SDK Auction parameters on Neutron

> **Note:**
> All auction parameters are accessible though the [/block-sdk/x/auction/v1/params](https://rpc-kralum.neutron-1.neutron.org//swagger/#/Query/Params) HTTP REST endpoint.

In order to participate in an auction, searchers must pay a fee. This fee is paid in the native token of the chain. The fee is determined by the auction parameters, which are set by the chain. The auction parameters are:
* **MaxBundleSize: `4`** - specifies the maximum number of transactions that can be included in a bundle (bundle = an ordered list of transactions). Bundles must be ≤ this number.
* **ReserveFee: `0.5 NTRN`** - specifies the bid floor to participate in the auction. Bids that are lower than the reserve fee are ignored.
* **MinBidIncrement: `0.1 NTRN`** - specifies how much greater each subsequent bid must be (as seen by an individual node) in order to be considered. If the bid is lower than the highest current bid + min bid increment, the bid is ignored.
* **ProposerFee: `25%`** - defines the portion of the winning bid that goes to the block proposer that proposed the block.
* **EscrowAccountAddress: `neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff` ([Neutron Main DAO](/neutron/dao/overview))** - is the address of the account that will receive a portion of the bid proceeds.
* **FrontRunningProtection: `false`** - determines whether front-running and sandwich protection is enabled.

> **Note:** **FrontRunningProtection**
> 
> If this is set to true, bundles must follow these guidelines:
> * A searcher must put your signed transactions after transactions searcher didn’t sign;
> * A searcher can only have at most two unique signers in the bundle.