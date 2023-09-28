# Overview

## Transaction Fees

Transaction fees constitute Neutron’s main source of revenue. They originate from local transactions and cross-chain
transactions through Neutron’s IBC fee model. Transaction fees are paid in NTRN or ATOM tokens.

- 25% of the fees are sent to the hub as payment for ICS;
- The remaining 75% are either burnt (NTRN) or sent to the Reserve (ATOM, etc.).

## Reserve, Treasury and Distribution Contract

There are 3 contracts that manage Neutron’s funds:

- [The Reserve](reserve/overview) holds the vested NTRNs and sends them to the Neutron DAO core contract and the Distribution contract. Reserve tokens are
  vested based on on-chain activity: the more NTRN tokens are burned while processing block fees (see above), the more
  tokens get unlocked in the reserve;
- [The Distribution](distribution/overview) contract is responsible for the second step of token distribution where tokens sent to this
  contract are distributed between `share holders`, where `share holders` are a configurable set of addresses with
  number of shares. This contract allows shareholders to withdraw collected tokens.
- The third one is [Neutron DAO core module](../dao/overview) itself.
