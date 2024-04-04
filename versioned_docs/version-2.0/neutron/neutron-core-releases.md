# Neutron Core Releases

## Overview

This section provides a comprehensive overview of the significant changes and updates in Neutron, focusing on the upgrades to Cosmos SDK, Wasmd, and Neutron's internal modules.

## [v3.0.0](https://github.com/neutron-org/neutron/releases/tag/v3.0.0)

### Block SDK integration

Neutron has integrated [Skip's Block SDK](neutron/modules/3rdparty/skip/block-sdk/overview.md) which allows builders to implement different MEV strategies on Neutron.

### CW bindings

Neutron V3 contains convenient [CW bindings](https://github.com/neutron-org/neutron/pull/365) for [Neutron DEX](neutron/modules/dex/overview/overview.md) module which allows to build smart-contract applications in a more
efficient way avoiding tricky Stargate messages and queries.

### Golang upgrade

Neutron V3 uses [Golang 1.21](https://go.dev/doc/devel/release#go1.21.0)

## [v2.0.0](https://github.com/neutron-org/neutron/releases/tag/v2.0.0)

### Dependencies upgrade

Neutron V3 bumps a lot of source code dependencies to the latest versions (at the time of the release) to resolve security and maintaining issues.

#### Cosmos SDK Upgrade

Neutron has transitioned from Cosmos SDK v0.45 to the more advanced v0.47, encompassing significant improvements and custom adaptations. The key aspects of this upgrade include:

- **Primary Changes:**
    - Reference to the main [Cosmos SDK v0.47 documentation](https://docs.cosmos.network/v0.47/learn/intro/overview).
    - Access to the full changelog [here](https://github.com/cosmos/cosmos-sdk/blob/v0.47.6/CHANGELOG.md).
    - `--broadcast-mode` block was removed. You need to query the result for a TX with neutrond q tx hash instead.
    - the SDK version includes some key store migration for the CLI. Make sure you backup your private keys before testing this! You can not switch back to v0.45.
    - We have created [our own fork](https://github.com/neutron-org/cosmos-sdk) of the Cosmos SDK, introducing unique enhancements tailored to our needs:
        - **Gas Counting Exclusion:** Removal of gas counting in the upgrade module's begin blocker for more consistent gas accounting.
        - **BankHooks Introduction:** Implementation of [BankHooks](https://github.com/neutron-org/cosmos-sdk/pull/2), a pivotal feature for the new Tokenfactory.
        - **[Optimized Slashing Calculation](https://github.com/neutron-org/cosmos-sdk/pull/5):** Backporting of slashing missed blocks calculation from Cosmos SDK v0.50.
        - **CometBFT Transition:** A significant shift to CometBFT for enhanced consensus reliability.
        - **ABCI 1.0 Support:** Enabling chains to implement their mempool with ABCI 1.0 compatibility.
        - **Module Parameters Handling:** Deprecation of the [x/params module](https://docs.cosmos.network/v0.47/modules/params). Modules now manage parameters directly.
        - **IBC-Go Upgrade:** Moving to ibc-go v7 for improved inter-blockchain communication.
        - **Technical Enhancements:** Several minor yet impactful technical improvements (see full list [here](https://github.com/cosmos/cosmos-sdk/blob/v0.47.6/CHANGELOG.md)).

#### Wasmd Upgrade

Our custom fork of [wasmd](https://github.com/neutron-org/wasmd), based on version [0.45](https://github.com/CosmWasm/wasmd/blob/v0.45.0/CHANGELOG.md), brings forward these key developments:

- **Instantiate2 Activation:** Enabling predictable contract addresses through the [instantiate2 feature](https://docs.rs/cosmwasm-std/1.2.1/cosmwasm_std/fn.instantiate2_address.html).
- **Smart-Contract Size Limit Increase:** Expansion of the binary size limit from 800KB to 1.6MB as [explained here](https://github.com/neutron-org/neutron/pull/320).
- **Legacy REST endpoints for queries and txs are completely removed** and only gRPC endpoints must be used now;legacy REST endpoints for queries and txs are completely removed and only gRPC endpoints must be used now.
- contracts are able to use **floating point operations**.
- **Additional Improvements:** Various other technical modifications and advancements (see full changelog [here](https://github.com/CosmWasm/wasmd/blob/v0.45.0/CHANGELOG.md)).

#### Neutron Itself

Enhancements within Neutron focus on integrating new modules, refining existing functionalities, and ensuring better alignment with the upgraded Cosmos SDK:

##### Globalfee Module Integration

- **Minimum Gas Price Enforcement:** A mechanism implemented via the [globalfee module](https://github.com/cosmos/gaia/blob/feat/sdk-47-ibc-7/docs/modules/globalfee.md) to standardize gas prices across validators.

##### Tokenfactory Module Update

- **BankHooks Activation:** Introduction of BankHooks for smart contracts handling token transfers, as detailed [here](neutron/modules/3rdparty/osmosis/ibc-hooks/overview).
- **Fee Removal for Token Creation:** Elimination of creation fees for Tokenfactory tokens, promoting free token generation on Neutron ([source](https://github.com/neutron-org/neutron/blob/e605ed3db4381994ee8185ba4a0ff0877d34e67f/app/upgrades/v2.0.0/upgrades.go#L157)).

##### Interchain Transactions and ContractManager Module Refactor

- **ICA Usability Improvements:** Enhanced Interchain Account (ICA) functionality for a more user-friendly and secure experience for developers.
- **Sudo Execution Error Handling:** Streamlined error message retrieval in the ContractManager module.
- **New Fee Structure for ICA Creation:** [Introduction](https://github.com/neutron-org/neutron/pull/334) of a fee system for developers creating ICAs on remote chains. [Learn more](/neutron/modules/interchain-txs/messages#msgregisterinterchainaccount) 

##### Adminmodule Rework

- **Module and Governance Alignment:** The admin module has been redesigned to align with the deprecated params module and the new governance proposal handling mechanism in Cosmos SDK v0.47. For more details, visit [Adminmodule Overview](/neutron/modules/admin-module/overview#challenges-related-to-cosmos-sdk-047).

##### Dex module intoduction 
- **Neutrality:** Bringing completely new [dex module](neutron/modules/dex/overview/overview.md). Users may interact with this module to provide liquidity and execute trades according to commonly-accepted exchange semantics.
