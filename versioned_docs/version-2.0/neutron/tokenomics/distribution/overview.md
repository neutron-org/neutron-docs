# Overview

This document describes the Distribution contract for the Neutron network.

The Distribution contract is instantiated at genesis and is owned by the [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao). It fulfills the purpose of _
distributing_ earned tokens between configurable set of shareholders (e.g., a multisig subDAO).

This contract stores shares as an array of `(address, weight)` pairs and distributes incoming funds among
shareholders by their weight. At funding stage, contract keeps incoming funds on its balance and calculates
the amount of coins each shareholder is eligible for. When shareholder sends `Claim` message, contract sends back
all coins pending for a given shareholder, if they are eligible for any, otherwise the transaction will fail.

The contract can only be configured by the [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao). The Neutron DAO can do two things with this contract:

- transfer ownership;
- alter shareholder weights.

## Deployment

This is one of the contracts that are initialized at Neutron genesis. The initialization message contains Neutron DAO and
Security DAO address.
