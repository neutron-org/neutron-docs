# Overview

> **NOTE: THE IMPLEMENTATION DESCRIBED IN THIS SECTION IS NOT FINALISED AND MIGHT BE CHANGED BEFORE THE LAUNCH.**

This document describes Neutron's governance module.

Neutron's governance module is a wrapper for the original Cosmos SDK `gov` module with some key differences, which are
described in this section:

* There is a special DAO contract that is deployed during chain initialisation;
* Voting power is retrieved from the DAO contract based on the amount of tokens locked;
* Funds staked using the standard `staking` module do not contribute to voting power;
* Tally logic is modified to get the voting power from the DAO contract.

## Delegations do not contribute to voting power

The original `gov` module computes voting power based on user's delegations. Since Neutron is an interchain-secured
network, native staking does not play an important role; users have to lock their `$NTRN` tokens in the chain's DAO
contract in order to be able to vote for proposals.

## Voting power is retrieved from the DAO contract

The DAO contract should only implement two handlers:

```rust
pub fn query_voting_power(deps: Deps, user_addr: Addr) -> StdResult<VotingPowerResponse> { ... }
```

```rust
pub fn query_voting_powers(deps: Deps) -> StdResult<Vec<VotingPowerResponse>> { ... }  
```

where ```VotingPowerResponse``` is defined as:

```rust
pub struct VotingPowerResponse {
    /// Address of the user
    pub user: String,
    /// The user's current voting power, i.e. the amount of NTRN tokens locked in voting contract
    pub voting_power: Uint128,
}
```

> Note: currently `neutron-core` only uses the `query_voting_powers` handler.

## Tally logic is modified

Tally interface hasn't changed, but instead of calculating voting results based on the delegation amounts, it uses the
above contract calls to get the voting power. This means that in order to vote, a user must first lock their tokens in
the DAO contract, and then use the standard `gov` module interface as usual.