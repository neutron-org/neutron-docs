# Overview

This document describes the Treasury contract for the Neutron network.

**The Treasury** contract holds the vested NTRNs, and sends them to the Reserve and Distribution contracts. This
contract is owned by the Neutron DAO and is instantiated at genesis. It is responsible for the first step of tokens
distribution.
Treasury tokens are vested based on on-chain activity: the more NTRN tokens are burned while processing block fees (see
above), the more tokens distributed from the Treasury.

To calculate how many coins we distribute (release) we use following expression: $burnt\_tokens \times multiplier$,
where $multiplier = \frac{x}{configurable\_denominator}$. The configurable denominator should be
set based on coins burning rate and preferred total duration of vesting. Take into account that while initially one
burnt tokens equals multiple NTRN tokens made liquid, the flow of new tokens into the Treasury progressively slows down
until the tokens supply is exhausted and the tokenomics becomes deflationary.

Treasury contract can be configured only by the Neutron DAO. The contract has the `min_period` parameter, and
the `distribute`
method cannot be called more than once every `min_period`. The `distribute` call is permissionless and can be called by
anybody.

## Deployment

This is one of the contracts that are initialized at Neutron genesis. Initialization message contains The Neutron DAO and
Security DAO addresses.
