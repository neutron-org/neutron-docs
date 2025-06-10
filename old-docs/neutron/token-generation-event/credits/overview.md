# Overview

Used as a CW20 like token for distributing (vesting) airdropped NTRN tokens.

## Description

Main alterations from cw20-base contract:
- `Mint` mints to the airdrop address only and requires untrn tokens sent along;
- `Burn`/`BurnFrom`/`Withdraw` not only burn tokens, but also transfer untrn tokens to addresses in 1:1 proportion to burned cNTRN tokens;
- Only `Withdraw` is permissionless and can be called directly by the user;
- `Withdraw` has a vesting mechanism attached (tokens are linearly vested for a given amount of time);
- `Transfer` only accessible for airdrop contract address.

The contract is owned by the Neutron DAO and needs to know airdrop and lockdrop contract addresses on initialization for permission purposes.

DAO executes `Mint()` with untrn sent along to mint cNTRN funds in 1:1 proportion and assigns newly minted cNTRN funds to the airdrop address.

## Vesting

Vesting algorithm is linear with no cliff.

Users can use query `WithdrawableAmount` to find out how many tokens they can `Withdraw()` now.

## Main usage scenarios

### Initialization and Mint
1. DAO initializes contract, specifies token info with minter, airdrop and lockdrop contract addresses.
2. DAO executes `Mint()` with untrn sent along, that mints cNTRN in 1:1 proportion and assigns them to airdrop contract balance.

### Airdrop distribution
1. Airdrop calculates the amount of airdrops for users and uses `Transfer(recipient, amount)` together with `AddVesting(address, amount, start_time, duration)` to transfer funds and set vesting schedule (Always a linear vesting with 0 CLIFF time).
2. There are two ways of burning cNTRN and sending untrn to user:
- users can execute `Withdraw()` to burn cNTRN and get untrn according to the vesting schedule. They can look into how much they can withdraw now using `WithdrawableAmount(address)` query. `Withdraw()` can be called only after `config.when_withdrawable` passed (Should be set to lockdrop phase 2 end).
- lockdrop can execute `BurnFrom(owner, amount)` to send `amount` of untrn to `owner` (This action skips vesting as a reward for lockdrop participation).
> NOTE: `BurnFrom` does not affect vested amounts. So for example if user can get 200 untrn from `Withdraw()`, he will get exactly 200 untrn even if `BurnFrom` is called just prior to this. `Withdraw()` method also has additional check to ensure that no more than user balance will be withdrawn.
3. At the end of airdrop stage (3 months after event add), airdrop executes `Burn(amount)` to burn unclaimed cNTRN.
