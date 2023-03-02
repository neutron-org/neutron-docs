# Credits contract

## Overview
Used as a CW20 token for distributing (vesting) airdropped tokens.

## Description

Basically it's a modified for our purposes CW20 token that holds balances for addresses and can transfer them to others.
Modifications include:
- `Mint` mints to the airdrop address only and requires NTRN's sent along
- specific permissions for some operations
- `Burn`/`BurnFrom`/`Withdraw` not only burns tokens, but also transfers NTRN's to addresses in 1:1 proportion to burned ucNTRNs
- `Withdraw` has a vesting mechanism attached (tokens are linearly vested for a given amount of time)

The contract is owned by the Neutron DAO and needs to know airdrop and lockdrop contract addresses for permission purposes.

DAO also executes `Mint()` with NTRN's to create CUNTRN funds in 1:1 proportion and assigns CUNTRN funds to the airdrop address.

## Main usage scenarios

### Initialization and Mint
1. DAO initializes contract
2. DAO executes `UpdateConfig(airdrop_address, lockdrop_address)` of contract to assign config addresses for airdrop and lockdrop contract
3. DAO executes `Mint()` along with NTRN's funds, that mints CUNTRNS in 1:1 proportion and assigns them to airdrop contract balance

### Airdrop distribution
1. Airdrop calculates amount of needed airdrops for users and uses `Transfer(recipient, amount)` together with `AddVesting(address, amount, start_time, duration)` to transfer funds and set vesting schedule (Always a linear vesting with 0 CLIFF time).
2. Users that have CUNTRN's on balance, have two ways of getting NTRN's:
- can execute `Withdraw()` to burn CNTRNs and get NTRN's according to the vesting schedule. They can look into how much they can withdraw now using `WithdrawableAmount(address)` query. `Withdraw()` can be called only after `config.when_withdrawable` passed (Should be set to lockdrop phase 2 end).
- lockdrop can execute `BurnFrom(owner, amount)` to send `amount` of NTRN's to `owner` (This action skips vesting as a reward for lockdrop participation).
> NOTE: `BurnFrom` does not affect vested amounts. So for example if user can get 200 NTRNs from `Withdraw()`, he will get exactly 200 NTRNs even if `BurnFrom` is called just prior to this. `Withdraw()` method also has additional check to ensure that no more than user balance will be withdrawn.

3. At the end of airdrop stage (3 months after event add), airdrop executes `Burn(amount)` to burn unclaimed CNTRN's.
