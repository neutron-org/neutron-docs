# DAO

## Overview

![Governance.png](/img/governance.png)

Being an Interchain Secured network, Neutron does not use standard Cosmos SDK governance module. Neutron governance
is based on [DAO DAO](https://github.com/DA0-DA0/dao-contracts) contracts, with some modifications. It consists of two
parts:

1. The Neutron DAO,
2. Multiple subDAOs.

For privileged actions (e.g., changing network parameters and making software update proposals) Neutron uses
the [admin-module](https://github.com/Ethernal-Tech/admin-module) fork managed by the Informal team. This module allows
to specify a list of admin addresses that are able to submit proposals that are automatically executed. Neutron DAO
smart contract address is added as an admin during genesis, allowing the DAO to manage the network as it sees fit. 

## Neutron DAO

The Neutron DAO
supports [single-choice](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/proposal/dao-proposal-single)
and [multiple-choice](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/proposal/dao-proposal-multiple)
proposals by registering the corresponding proposal contracts in the core contract, along with a special type of *
overrule* proposals (see below). In the future, additional types of proposals might be introduced (e.g., gauges).

Each type of proposal can only be submitted through a
dedicated [pre-propose contract](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/pre-propose) (separate
pre-propose contracts for single-, multi-choice and overrule proposals exist), which manages deposits and makes sure
that only DAO members can submit proposals.

### Voting Power Registry

Instead of a single voting power module, Neutron DAO core contract interacts with the *Voting Power Registry* contract
that keeps track of multiple *Voting Vaults*. There can be many Voting Vault implementations, but at the launch Neutron
will only have one vault implementation for bonding native NTRN tokens.

### Neutron Bonding Vault

This vault will allow its users to Bond NTRN tokens without locking them (i.e., you can bond and unbond tokens with this
vault with no unbonding period). Just as with normal DAO DAO voting modules, for each specific proposal, you can only
use the voting power that was available to you at the time of proposal submission. No additional restrictions are
imposed on the vault funds.

### Overrule proposals

*N.B.: you need to read the subDAOs design below to understand this section.*

The *Overrule* proposal type has a low threshold (0.01 of the total voting power). It only allows to call the *
overrule_proposal()* method of a subDAO proposal contract.

Re-voting should be disabled for such proposals (execute immediately after the threshold is reached).

## subDAOs

The Neutron DAO creates subDAOs by executing Neutron DAO proposals that contain *Instantiate* messages for the subDAO
contracts. At the launch time, only the *Multisig-type* subDAO will be available, which is similar to the main DAO, but
uses the [cw4 voting module](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/voting/dao-voting-cw4)
implementation for voting power (that’s where the multisig logic is implemented).

One important feature of the subDAOs is that their proposals can be overruled by the Neutron DAO within a specified
timelock period.

### Timelocks & Overrules

Proposals approved by a subDAO are timelocked. During the timelock period, the Neutron DAO can overrule any proposal by
creating a new Overrule proposal; this proposal has a lower threshold than the regular proposals, and is executed
immediately after reaching the threshold.

The timelock mechanism is implemented as follows. When creating a proposal, the user sends a regular proposal message to
the subDAO pre-propose contract. This contract wraps the messages to be executed in a *TimelockProposal* message that is
defined by the **Timelock** **contract**. When the proposal passes, the subDAO core contract does not execute the
original messages; instead, it sends them wrapped in a *TimelockProposal* message to the Timelock contract.

The Timelock contract has 3 handlers:

- `execute_timelock_proposal(proposal_id, msgs)`: timelocks the given proposal messages, (permissioned, only by subDAO
  core contract);
- `execute_execute_proposal(proposal_id)`: executes the proposal if the timelock period has passed (permissionless);
- `execute_overrule_proposal(proposal_id)`: overrules the proposal (permissioned, only by the Neutron DAO).

When a *TimelockProposal* message is processed by the Timelock contract, the submission time is recorded in the state.
The Timelock contract has a parameter *timelock_period* that defines how much time needs to pass before the proposal can
be executed.

### Important notes

1. The wasmd-level admin of the Timelock contract is the Neutron DAO core contract;
2. The owner of the Timelock contract is the Neutron DAO core contract;
3. The Timelock contract is instantiated by the pre-propose contract;
4. The subDAO address is queried from the pre-propose module during instantiation.

### Security subDAO

There is a special *Security subDAO* that can only execute *pause()* methods on the following contracts:

1. All other subDAOs;
2. [Treasury](https://www.notion.so/Treasury-and-Distribution-Technical-Design-44a57336ea11457d880e436c213d5eab)
   contract;
3. [Distribution](https://www.notion.so/Treasury-and-Distribution-Technical-Design-44a57336ea11457d880e436c213d5eab)
   contract;
4. [Reserve](https://www.notion.so/Treasury-and-Distribution-Technical-Design-44a57336ea11457d880e436c213d5eab)
   contract.

The Security subDAO implements a modified version of the single-choice proposal that only allows to send *pause()*
messages to smart contracts.

## Neutron DAO and DAO-DAO differences

> **Note:** We forked DAO-DAO contracts from commit [9e496379a1c1e89e00133865c9a1041dfdb20612](https://github.com/DA0-DA0/dao-contracts/tree/9e496379a1c1e89e00133865c9a1041dfdb20612)

### DAO Core Contract
1. Admin functionality is removed (`ExecuteMsg::ExecuteAdminMsgs`, `ExecuteMsg::NominateAdmin`, `ExecuteMsg::AcceptAdminNomination`,
`ExecuteMsg::WithdrawAdminNomination` messages are removed and all the corresponding handlers);
2. Some config fields are removed (`image_url`, `automatically_add_cw20s`, `automatically_add_cw721s`);
3. We use [Voting Registry Contract](/neutron/dao#voting-power-registry) instead of Voting Module Contract;
4. Vanilla `Response` is replaced with `Response<NeutronMsg>`;
5. CW20 and CW721 handlers are removed (`ExecuteMsg::Receive`, `ExecuteMsg::ReceiveNft`, `ExecuteMsg::UpdateCw20List`,
`ExecuteMsg::UpdateCw721List` msg are removed).

### Pre-Propose Contracts (Single and Multiple)
1. `CosmosMsg<Empty>` is replaced with `CosmosMsg<NeutronMsg>`;
2. `ExecuteMsg::Extension` is removed;
3. Couple of changes in dependency versions.

> **Note:** **Pre-Propose Single Overrule Contract** is a completely new contract!

### Proposal Single Contract
1. Couple of changes in dependency versions;
2. `CosmosMsg<Empty>` is replaced with `CosmosMsg<NeutronMsg>`;
3. `only_members_execute` field is removed from `Config` (and all the corresponding checks of the field);
4. [`IsActive`](https://github.com/DA0-DA0/dao-contracts/blob/9e496379a1c1e89e00133865c9a1041dfdb20612/contracts/proposal/cwd-proposal-single/src/contract.rs#L173) query to a voting module is removed;
5. Migration logic from `V1` is removed;

### Proposal Multiple Contract
1. Couple of changes in dependency versions.

### Voting contracts

1. **cwd-voting-cw20-staked**, **cwd-voting-cw4**, **cwd-voting-cw721-staked**, **cwd-voting-native-staked**,
**cwd-voting-staking-denom-staked** source codes are completely removed from our DAO repo, 
but we use vanilla **CW4 Group** and **CW4 Voting** precompiled contract binaries in our DAO system.
2. We've developed two completely new contracts: [Voting Registry Contract](/neutron/dao#voting-power-registry)
and [Bonding Vault Contract](/neutron/dao#neutron-bonding-vault).

### SubDao contracts
Generally speaking all **SubDao** contracts has the same functionality and diff as **DAO Core** contracts except:
* [Pausing logic](https://github.com/neutron-org/neutron-dao/blob/448c7c91e85ccd02d13fdaf7cddb66f04abf8ca9/contracts/subdaos/cwd-subdao-core/src/contract.rs#L128) - **SubDAO** contract can be paused by **Core DAO** contract or special by **Security SubDAO** contract.
But **SubDAO Core** can be unpaused only by main **Core DAO** contract;
* Completely new [**Timelock contract**](/neutron/dao#timelocks--overrules) is introduced;
* **Pre-Propose Single Contract** is patched to use **Timelock** module - `Propose` messages
[are wrapped now](https://github.com/neutron-org/neutron-dao/blob/448c7c91e85ccd02d13fdaf7cddb66f04abf8ca9/contracts/subdaos/pre-propose/cwd-subdao-pre-propose-single/src/contract.rs#L105)
into `TimelockExecuteMsg::TimelockProposal` message.