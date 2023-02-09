# Overview

## Transaction Fees

Transaction fees constitute Neutron’s main source of revenue. They originate from local transactions and cross-chain
transactions through Neutron’s IBC fee model. Transaction fees are paid in NTRN or ATOM tokens.

- 25% of the fees are sent to the hub as payment for ICS;
- The remaining 75% are either burnt (NTRN) or sent to the Treasury (ATOM, etc.).

## Treasury, Reserve and Distribution Contract

There are 3 contracts that manage Neutron’s funds:

- [The Treasury](treasury/overview) holds the vested NTRNs and sends them to the Reserve and Distribution contracts. Treasury tokens are
  vested based on on-chain activity: the more NTRN tokens are burned while processing block fees (see above), the more
  tokens get unlocked in the treasury;
- [The Reserve](reserve/overview) contract keeps the funds that have already vested, but were not sent to the Distribution contract. It
  is used by the [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao) for one-off payouts;
- [The Distribution](distribution/overview) contract is responsible for the second step of token distribution where tokens sent to this
  contract are distributed between `share holders`, where `share holders` are a configurable set of addresses with
  number of shares. This contract allows shareholders to withdraw collected tokens.
