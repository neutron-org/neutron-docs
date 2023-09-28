# Overview

The LP Bootstrap via Auction contract facilitates `NTRN-NATIVE` Neutron pool initialization during the protocol launch.

**Phase 1 :: Bootstrapping `NTRN` and NATIVE Side of the LP Pool**

- Airdrop recipients and lockdrop participants can delegate part / all of their `NTRN` rewards to the auction contract.
- Any user can deposit UST directly to the auction contract to participate in the LP bootstrap auction.
- Both UST deposited & `NTRN` delegated (if any) balances are used to calculate user's LP token shares and additional `NTRN` incentives that he will receive for participating in the auction.

**Phase 2 :: Post `NTRN-NATIVE` Pool initialization**

- `NTRN` reward withdrawals from lockdrop & airdrop contracts are enabled during the `NTRN-USDC`/`NTRN-ATOM` Pool initializaiton.
- `NTRN-USDC`/`NTRN-ATOM` LP tokens are staked with the generator contract, with LP Staking rewards allocated equally among the users based on their % LP share
- `NTRN` incentives are directly claimable
- Users `NTRN-USDC`/`NTRN-ATOM` LP shares are vested linearly on a 90 day period