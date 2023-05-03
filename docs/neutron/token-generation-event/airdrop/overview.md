# Overview

This is a [cw-tokens/cw20-merkle-airdrop-contract](https://github.com/CosmWasm/cw-tokens/tree/main/contracts/cw20-merkle-airdrop) with several patches:
- removed native token distribution functionality;
- removed `burn`, `burn_all` and `withdraw` ExecuteMsg's;
- `claim` patched to issue `AddVesting` message to credits contract;
- `withdraw_all` patched to burn cNTRN tokens and send (received in exchange for burning) NTRN tokens to reserve contract. `withdraw_all` can only be called after 3 months after the end of the event;
- stages logic removed, since we will only need one airdrop stage, also merged register merkle tree and instantiate messages into one;
- unified owner logic, similar to other TGE contracts;
- tests moved to separate file;
- enforced start/expiration logic to accept only timestamps, since blocks will break vesting logic.
