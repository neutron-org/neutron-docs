# Admin Module

## Overview

The [Admin module](https://github.com/neutron-org/admin-module) in the Neutron network is a central governance tool, enabling the DAO to propose and execute pivotal operations. Developed using the [cosmos-sdk](https://github.com/cosmos/cosmos-sdk), this module is upgraded to align with the `Cosmos SDK 0.50`.


## Concepts

### Network Administration and Governance

Being the network's admin, our [DAO](/neutron/dao/overview) is empowered to execute proposals that can significantly change the network state. These proposals can encapsulate a myriad of operations including but not limited to:
- Modifying parameters of a specific module, like adjusting transaction fees or validator incentives.
- A full spectrum of `wasm` proposals, leveraging the WebAssembly smart contract functionalities in Cosmos.
- [Upgrade proposals](https://github.com/cosmos/cosmos-sdk/blob/main/x/upgrade/types/upgrade.pb.go), enabling seamless interoperability and data transfer between distinct blockchains.
- Execution of any [sdk.msg](https://github.com/cosmos/cosmos-sdk/tree/master/types), the standard message format in the Cosmos ecosystem.

### Mechanism of Operation

We achieve governance through a dual mechanism approach. A message, structured as per cosmos-sdk's guidelines, is sent to the admin module using wasmbindings from MainDao. This message typically contains one of the two global types of [proposals](https://github.com/cosmos/cosmos-sdk/tree/master/x/gov/spec):

1) **Legacy Proposal**: Rooted in the [`x/gov` module](https://github.com/cosmos/cosmos-sdk/tree/master/x/gov) of the cosmos-sdk, certain modules like wasm can have predefined proposals. Classic examples include `MigrateContract` or `DeleteAdmin`. The intrinsic cosmos-sdk processes such proposals via a dedicated [handler](https://github.com/cosmos/cosmos-sdk/tree/master/baseapp). The Admin module on Neutron, in line with these processes, can execute such proposals if they are part of a whitelisted group. Despite this mechanism being labeled deprecated in the recent sdk-47 update, its support remains due to certain modules (like ibc) not transitioning as per the sdk-47 guidelines.

2) **Proposal**: The advent of sdk-47 heralded a fresh approach. Actions, rather than being bound by predefined standards, could now be executed using the versatile [`sdk.Msg`](https://github.com/cosmos/cosmos-sdk/tree/master/types). This necessitated an overhaul in permission structures across modules. Modules have now integrated an `authority` field, signifying an address (or a group of addresses) that have been permissioned to dispatch critical messages, such as UpdateParams.

### Implementation in Neutron

The Admin module in Neutron utilizes both the aforementioned proposal mechanisms. Specifically, these are executed within the msg.server of the admin module, ensuring seamless integration with the larger Neutron infrastructure. Our commitment is to keep abreast of the cosmos-sdk updates while preserving the unique governance structure that Neutron network requires.

## Challenges related to Cosmos SDK 0.47 and Cosmos SDK 0.50

Transitioning to `Cosmos SDK 0.47` and `Cosmos SDK 0.50`  introduced several hurdles:

- **Original Admin Module's Dormancy:** Prior to [V2](https://github.com/neutron-org/neutron/releases/tag/v2.0.0), Neutron used the [original Admin Module](https://github.com/Ethernal-Tech/admin-module). This module, no longer actively maintained, needs an upgrade.

- **Deprecation of `x/params`:** With the new SDK version, the `x/params` module has been deprecated, pushing each Cosmos Module to implement custom parameter handling logic.

- **Change in Governance Logic:** The new SDK has moved away from the `ProposalHandler` logic in modules. Instead, the `gov` module can now issue direct messages to any Cosmos Module.

### Enhancements & Solutions

#### ProposalExecuteMessage Binding
Introduced a new [`ProposalExecuteMessage`](https://github.com/neutron-org/neutron/blob/5def8658ff80afe6851d3992afde0e002b7a82c8/wasmbinding/bindings/msg.go#L107) binding, allowing the AdminModule to process any type of Cosmos message. A [signer verification](https://github.com/neutron-org/neutron/blob/5def8658ff80afe6851d3992afde0e002b7a82c8/wasmbinding/message_plugin.go#L563) ensures authenticity.

#### Revamped MsgSubmitProposal
The [`MsgSubmitProposal`](https://github.com/neutron-org/admin-module/blob/master/x/adminmodule/keeper/msg_server_submit_proposal.go) has been redesigned to handle any type of Cosmos message.

#### Streamlined Logic and Execution
We've removed unnecessary logic and the cache context, leading to immediate proposal execution within the msgServer/keeper and the removal of Active and Inactive queues.

## Conclusion

With these updates, Neutron remains at the forefront of the evolving Cosmos ecosystem, ensuring our governance remains robust, safe and compatible.
