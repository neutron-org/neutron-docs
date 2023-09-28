# Differences from DAO-DAO

> **Note:** We forked DAO-DAO contracts from commit [9e496379a1c1e89e00133865c9a1041dfdb20612](https://github.com/DA0-DA0/dao-contracts/tree/9e496379a1c1e89e00133865c9a1041dfdb20612)

### DAO Core Contract
1. Admin functionality is removed (`ExecuteMsg::ExecuteAdminMsgs`, `ExecuteMsg::NominateAdmin`, `ExecuteMsg::AcceptAdminNomination`,
`ExecuteMsg::WithdrawAdminNomination` messages are removed with all the corresponding handlers);
2. Some config fields are removed (`image_url`, `automatically_add_cw20s`, `automatically_add_cw721s`);
3. We use [Voting Registry Contract](/neutron/dao/overview#voting-power-registry) instead of Voting Module Contract;
4. Vanilla `Response` is replaced with `Response<NeutronMsg>`;
5. CW20 and CW721 handlers are removed (`ExecuteMsg::Receive`, `ExecuteMsg::ReceiveNft`, `ExecuteMsg::UpdateCw20List`,
`ExecuteMsg::UpdateCw721List` messages are removed).

### Pre-Propose Contracts (Single and Multiple)
1. `CosmosMsg<Empty>` is replaced with `CosmosMsg<NeutronMsg>`;
2. `ExecuteMsg::Extension` is removed;
3. Couple of changes in dependency versions (upgrades, replaces with Neutron packages instead of DA0-DA0).

> **Note:** **Pre-Propose Single Overrule Contract** is a completely new contract!

### Proposal Single Contract
1. Couple of changes in dependency versions;
2. `CosmosMsg<Empty>` is replaced with `CosmosMsg<NeutronMsg>`;
3. `only_members_execute` field is removed from `Config` with all the corresponding logic;
4. [`IsActive`](https://github.com/DA0-DA0/dao-contracts/blob/9e496379a1c1e89e00133865c9a1041dfdb20612/contracts/proposal/cwd-proposal-single/src/contract.rs#L173) query to a voting module is removed;
5. Migration logic from `V1` is removed;

### Proposal Multiple Contract
1. Couple of changes in dependency versions (upgrades, replaces with Neutron packages instead of DA0-DA0).

### Voting contracts

1. **cwd-voting-cw20-staked**, **cwd-voting-cw4**, **cwd-voting-cw721-staked**, **cwd-voting-native-staked**,
**cwd-voting-staking-denom-staked** source codes are completely removed from our DAO repo,
but we use vanilla **CW4 Group** and **CW4 Voting** precompiled contract binaries in our DAO system.
2. We've developed two completely new contracts: [Voting Registry Contract](/neutron/dao/overview#voting-power-registry)
and [Bonding Vault Contract](/neutron/dao/overview#neutron-bonding-vault).

### SubDao contracts
Generally speaking, all **SubDao** contracts are the same as **DAO Core** contracts
(meaning they have the same functionality and differences with DAO-DAO), except some changes:
* [Pausing logic](https://github.com/neutron-org/neutron-dao/blob/448c7c91e85ccd02d13fdaf7cddb66f04abf8ca9/contracts/subdaos/cwd-subdao-core/src/contract.rs#L128) - **SubDAO** contract can be paused by **Core DAO** contract or by special **Security SubDAO** contract.
But **SubDAO Core** can be unpaused only by main **Core DAO** contract;
* Completely new [**Timelock contract**](/neutron/dao/overview#timelocks--overrules) is introduced;
* **Pre-Propose Single Contract** is patched to use **Timelock** module - `Propose` messages
[are wrapped now](https://github.com/neutron-org/neutron-dao/blob/448c7c91e85ccd02d13fdaf7cddb66f04abf8ca9/contracts/subdaos/pre-propose/cwd-subdao-pre-propose-single/src/contract.rs#L105)
into `TimelockExecuteMsg::TimelockProposal` message.