# Overview

## Abstract

This document specifies the Admin module for the Neutron network, which serves as a central governance tool for administrators, developers, and the [DAO](link) members to propose and execute critical operations on the Neutron network.

The Admin module is a product of leveraging the functionalities and structures provided by the [cosmos-sdk](https://github.com/cosmos/cosmos-sdk), tailored specifically for the requirements of the Neutron network.

## Concepts

### Network Administration and Governance

Being the network's admin, our [DAO](link) is empowered to execute proposals that can significantly change the network state. These proposals can encapsulate a myriad of operations including but not limited to:
- Modifying parameters of a specific module, like adjusting transaction fees or validator incentives.
- A full spectrum of wasm proposals, leveraging the WebAssembly smart contract functionalities in Cosmos.
- [IBC (Inter-Blockchain Communication) proposals](https://github.com/cosmos/ibc-go), enabling seamless interoperability and data transfer between distinct blockchains.
- Execution of any [sdk.msg](https://github.com/cosmos/cosmos-sdk/tree/master/types), the standard message format in the Cosmos ecosystem.

### Mechanism of Operation

We achieve governance through a dual mechanism approach. A message, structured as per cosmos-sdk's guidelines, is sent to the admin module using wasmbindings from MainDao. This message typically contains one of the two global types of [proposals](https://github.com/cosmos/cosmos-sdk/tree/master/x/gov/spec):

1) **Legacy Proposal**: Rooted in the [`x/gov` module](https://github.com/cosmos/cosmos-sdk/tree/master/x/gov) of the cosmos-sdk, certain modules like wasm can have predefined proposals. Classic examples include `MigrateContract` or `DeleteAdmin`. The intrinsic cosmos-sdk processes such proposals via a dedicated [handler](https://github.com/cosmos/cosmos-sdk/tree/master/baseapp). The Admin module on Neutron, in line with these processes, can execute such proposals if they are part of a whitelisted group. Despite this mechanism being labeled deprecated in the recent sdk-47 update, its support remains due to certain modules (like ibc) not transitioning as per the sdk-47 guidelines.

2) **Proposal**: The advent of sdk-47 heralded a fresh approach. Actions, rather than being bound by predefined standards, could now be executed using the versatile [`sdk.Msg`](https://github.com/cosmos/cosmos-sdk/tree/master/types). This necessitated an overhaul in permission structures across modules. Modules have now integrated an `authority` field, signifying an address (or a group of addresses) that have been permissioned to dispatch critical messages, such as UpdateParams.

### Implementation in Neutron

The Admin module in Neutron utilizes both the aforementioned proposal mechanisms. Specifically, these are executed within the msg.server of the admin module, ensuring seamless integration with the larger Neutron infrastructure. Our commitment is to keep abreast of the cosmos-sdk updates while preserving the unique governance structure that Neutron network requires.

