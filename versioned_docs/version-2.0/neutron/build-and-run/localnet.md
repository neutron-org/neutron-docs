# Localnet

This page describes how to run Neutron, Gaia, IBC and ICQ relayers locally, without Docker environment.
Beware: you will have to clone all these repositories in the same parent directory, just like this:
```
.
├── neutron
├── gaia
└── neutron-query-relayer
```

## Prerequisites

- Go version 1.20 or newer
- Rust toolchain v1.69 or newer

### 1. Install Neutron

```bash
git clone -b v3.0.1 https://github.com/neutron-org/neutron
cd neutron
make install
```

### 2. Install Gaia

1. clone gaia: `git clone -b v15.0.0 https://github.com/cosmos/gaia.git`
2. `cd gaia`
3. run `make install`

### 3. Install Hermes

```bash
cargo install ibc-relayer-cli --bin hermes --version 1.6.0 --locked
```

### 4. Install Neutron Query Relayer

```bash
git clone -b v0.2.0 https://github.com/neutron-org/neutron-query-relayer
cd neutron-query-relayer
make install
```

## Start Localnet

1. go to `neutron/` folder and run `make init`, this will start Neutron and Gaia chains
2. after `make init` completes, run `make start-rly`, this will start IBC relayer
3. (if you want to use [ICQ](/tutorials/cosmwasm_icq)) go to `neutron-query-relayer/` folder and run `export $(grep -v '^#' .env.example.dev | xargs) && make dev`, this will start ICQ relayer 

## Some wallets and RPC's you could use

Gaia chain's RPC is exposed at `0.0.0.0:16657`,
you can add and use mnemonic with some preallocated funds using

```bash
echo "banner spread envelope side kite person disagree path silver will brother under couch edit food venture squirrel civil budget number acquire point work mass" | gaiad keys add test --recover
```

You can also check your balance using

```bash
gaiad query bank balances "$(gaiad keys show test -a)" --node tcp://0.0.0.0:16657
```

Neutron chain's RPC is exposed at `0.0.0.0:26657`,
you can add and use mnemonic with some preallocated funds using

```bash
echo "veteran try aware erosion drink dance decade comic dawn museum release episode original list ability owner size tuition surface ceiling depth seminar capable only" | neutrond keys add test --recover
```

You can also check your balance using

```bash
neutrond query bank balances "$(neutrond keys show test -a)" --node tcp://0.0.0.0:26657
```
