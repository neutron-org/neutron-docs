# Overrules

## Overview

Being inspired by the [Lido's EasyTracks](https://docs.lido.fi/guides/easy-track-guide#general-overview), Overrules
allows to reduce governance load on the main Neutron DAO.
Instead of creating the special motions that allow making actions on behalf of the main DAO, Overrules allows for a
subDAOs to manage things by themselves still being limited by the main DAO.

It works in the following way:
1. Special-purpose subDAO is created (e.g. Security subDAO, Grants subDAO, Liquidity Mining subDAO, etc.)
2. This subDAO gets allocated budget from the main DAO and also gets any permissions needed
3. This subDAO can now manage its budget and permissions without the need to ask the main DAO for every action
4. Still, every subDAO proposal can be overruled by the main DAO within a specified timelock period

To make subDAOs not to stuck on operations, the timelock period should be short enough (e.g. 3 days).
At the same time, overruling should be easy enough, so the threshold should be low enough (e.g. 10 times lower than
regular proposal threshold).

## Technical details

This section describes the technical details of the overrules implementation. It can be interesting for developers who
want to understand how it works for using Overrules in their DAO or making the integrations with Neutron DAO.

### Smart contracts design

To implement the overrules, we add several smart contracts to the DAO:
1. [Overrule pre proposal module for main DAO](https://github.com/neutron-org/neutron-dao/tree/main/contracts/dao/pre-propose/cwd-pre-propose-single-overrule)
2. [subDAO pre proposal module for subDAOs](https://github.com/neutron-org/neutron-dao/tree/main/contracts/subdaos/pre-propose/cwd-subdao-pre-propose-single)
3. [Timelock contract](https://github.com/neutron-org/neutron-dao/tree/main/contracts/subdaos/cwd-subdao-timelock-single)

This design allows to implement the overrules in a way that doesn't require any changes in the main DAO smart contracts.
(The only change made to the main DAO is the addition of
[the query to check if subDAO is in the DAO's subDAOs list](https://github.com/neutron-org/neutron-dao/blob/376cd05df727fbf9c1730a469f94cb6f373e05db/contracts/dao/cwd-core/src/contract.rs#L333)).

How it works:
1. subDAO member submits the proposal to subDAO pre-propose module, which takes the proposal message and wraps it in a
TimelockProposal message.
2. subDAO members vote for the proposal and...
3. it gets executed, which means that Proposal becomes timelocked
   1. Timelock contract locks the proposal,
   2. Creates a new proposal in the Overrule pre proposal module
   3. Timelocks the Proposal so that it can't be executed until the Overrule proposal isn't get into rejected state
4. DAO members vote for the Overrule proposal
5. Overrule proposal is executed and subDAO proposal is rejected
```
                                                  subDAO members
                                                        │
                                                      2 │Vote                            
            1       ┌──────────────┐     1       ┌──────▼─────┐      3      ┌─────────────┐    3        ┌─────────┐
subDAO ────────────►│  sudDAO      ├────────────►│  proposal  ├────────────►│ subDAO core ├────────────►│ timelock│
member  Propose(    │  pre-propose │ Propose(    │            │ Execute(    │             │ Timelock(   │         │
        ProposeMsg) └──────────────┘ Timelock(   └────────────┘ Timelock(   └─────────────┘ ProposeMsg) └─┬────▲──┘
                                     ProposeMsg))               ProposeMsg))                              │    │
                                                                                                          │    │
                                                       3                                                  │    │
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┘    │
  │                              ProposeOverrule(timelock, proposal_id)                                        │
  │                                                                                                            │
  │                                                                                                            │
  │        ┌──────────────┐      3        ┌────────────┐         5       ┌────────────────┐        5           │
  └───────►│  overrule    ├──────────────►│  proposal  ├────────────────►│ DAO core       ├────────────────────┘
           │  pre-propose │ Propose(      │            │    Execute(     │                │    Overrule(
           └──────────────┘ Overrule(     └──────▲─────┘    Overrule(    └────────────────┘    proposal_id)
                            timelock,            │          timelock,
                            proposal_id))      4 │Vote      proposal_id))
                                                 │
                                             DAO members
```

...or

1-3. Same as above
4. DAO members ignore the Overrule proposal
5. Timelocked proposal can be executed once voting period of Overrule proposal is over

```
                                                   subDAO members
                                                         │
                                                       2 │Vote
             1       ┌──────────────┐     1       ┌──────▼─────┐      3      ┌─────────────┐    3        ┌─────────┐  5
 subDAO ────────────►│  sudDAO      ├────────────►│  proposal  ├─────────────┤ subDAO core ├────────────►│ timelock├────────────►
 member  Propose(    │  pre-propose │ Propose(    │            │ Execute(    │             │ Timelock(   │         │ ProposeMsg
         ProposeMsg) └──────────────┘ Timelock(   └────────────┘ Timelock(   └─────────────┘ ProposeMsg) └─┬───────┘
                                      ProposeMsg))               ProposeMsg))                              │
                                                                                                           │
                                                        3                                                  │
   ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┘
   │                              ProposeOverrule(timelock, proposal_id)
   │
   │
   │        ┌──────────────┐      3        ┌────────────┐                 ┌────────────────┐
   └───────►│  overrule    ├──────────────►│  proposal  │                 │ Main DAO core  │
            │  pre-propose │ Propose(      │            │                 │                │
            └──────────────┘ Overrule(     └────────────┘                 └────────────────┘
                             timelock,
                             proposal_id)) 
```

Overrule pre proposal module allows only overrule messages to be created, thus, it takes only timelock contract address
and subDAO proposal id as parameters.

When Overrule proposal is created, the overrule pre proposal module does some checks:
1. If the timelock contract corresponds to the subDAO
2. If the subDAO is in the DAO's subDAOs list
3. If the proposal is timelocked
4. If the overrule proposal is already created

Those checks are needed to avoid spam and duplications. It's pretty crucial since the spam proposals and duplications
can mislead DAO members and make the proposal that supposed to be overruled passed by washing out voting power to wrong
overrule proposals.
Lack of check also could allow to create overrule proposals for the unregistered subDAOs/contracts which is not great
either.

For p.4 pre proposal module stores the map from pair (timelock contract address, subDAO proposal id) to overrule
proposal id.
It also allows one to get the corresponding overrule proposal id for given subDAO proposal via 
[special query](https://github.com/neutron-org/neutron-dao/blob/376cd05df727fbf9c1730a469f94cb6f373e05db/contracts/dao/pre-propose/cwd-pre-propose-single-overrule/src/contract.rs#L277).
Reverse query (get subDAO proposal id for given overrule proposal id) is also possible, one just need to query the
overrule proposal content and get the subDAO proposal id from Proposal message.

In general, overrule proposal creation is permissionless. Still, since it's created in the very same transaction as the
proposal is timelocked and duplications aren't allowed, there's no moment in time when one can create overrule proposal
themself.

### Caveats

Current implementation has several caveats:

1. The subDAO can't be admin of its contracts, the main DAO should
2. Since timelock contract is one that executes the proposals, it essentially takes place of the subDAO core contract
(e.g. it should hold the funds and be registered in external entities).
3. The model might be a bit confusing in terms of proposal statuses. subDAO proposal now have two phases:
   1. subDAO-decision phase: the proposal is created, voted and executed by the subDAO. On this phase, the proposal has
regular statuses (e.g. Passed, Rejected, etc.). Still, "Executed" doesn't mean that Proposal is executed, it means that
subDAO sent the proposal to the Timelock contract.
   2. Timelock phase: the proposal is sent to the Timelock contract. On this phase, the proposal has statuses
Timelocked, Overruled, Executed. Here "Executed" means actual proposal execution.
4. The proposal module for Overrule proposal should be configured in a very special way:
   1. Obviously, it should have lower threshold and lower period
   2. It should have revoting disabled so that once threshold is reached, the Overrule can be executed
   3. It should have absolute count type of quorum so that even if significant voting power is against Overrule, it
would be executed
   4. It should have no deposit since rejection of the Overrule proposal is the only way to execute the subDAO proposal
and considered normal, no one should be punished for creation such proposal
5. Overrules modules requires both from main DAO and a subDAO to be configured in a very special way:
   1. Main DAO should have the Overrule pre proposal module 
   2. subDAO should have the subDAO pre proposal module
   > Actually, it can be avoided by changing the overrule proposal module in a way so that it won't create Proposal
message based on input parameters but will validate one. It'll make it fully compatible with regular pre proposal
modules and allow to use it already existing pre proposal modules for overrules.
   
### Deployment

Deployment itself is pretty easy.

Overrule pre proposal module is deployed pretty the same way as any other pre proposal module and doesn't have any
additional init message.

subDAO pre proposal module is also deployed the same way as regular pre proposal modules. Still, it instantiates
timelock module and should have the message to instantiate it (the only thing required is the overrule pre proposal
module address of main DAO: it's required so that timelock module could create overrule proposals and check their
statuses).

## UX

While Overrules are technically just another-proposal-type for main DAO, to avoid confusion, we should have a separate
UX for them.
Given that, the Overrule proposal can be voted on the subDAO proposal page.