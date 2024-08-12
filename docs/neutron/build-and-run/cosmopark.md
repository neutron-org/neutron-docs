# Cosmopark

This page contains information about building and running Neutron node interconnected with a Gaia node by a Hermes IBC Relayer and a Neutron ICQ Relayer. This is a more advanced section than the basic sole Neutron node flow which is based on the Neutron's integration tests setup.

## Prerequisites

- Docker engine;
- Golang v1.22 ([go releases and instructions](https://go.dev/dl/)).

## Build and run

### 1. Make sure you have the required golang version:

```sh
go version
```

The output should comply with the golang version mentioned in the [Prerequisites](#prerequisites) section.

### 2. Clone necessary repositories

You'll have to clone several repositories into a single parent folder. Choose a parent directory and make clonings from it. This is crucial to have all the repositories cloned and stored in the same parent folder.

#### Clone Neutron repositories

```sh
git clone -b main https://github.com/neutron-org/neutron.git
git clone https://github.com/neutron-org/neutron-integration-tests.git
git clone -b v0.2.0 https://github.com/neutron-org/neutron-query-relayer.git
```

#### Clone and prepare Gaia

We use the Gaia network as a target network for interchain operations. We use v19.0.0 for the tests.

```sh
git clone https://github.com/cosmos/gaia.git
cd gaia
git checkout v19.0.0
```

### 3. Build images

The commands from this section are available from the `setup` folder in the `neutron-integration-tests` project.

If it's the first time you're here, run

```sh
make build-all
```

If you have the images built and you want to rebuild one of them, the following commands which build each component separately are also available:

```sh
make build-gaia
make build-neutron
make build-hermes
make build-relayer
```

### 4. Download Neutron DAO contracts

Neutron has Neutron DAO contracts in genesis, so before running you need to download the latest version of contracts:

```sh
npx @neutron-org/get-artifacts neutron-dao -b main -d contracts
```

### 5. Run Cosmopark

The commands from this section are available from the `setup` folder in the `neutron-integration-tests` project.

```sh
make start-cosmopark
```

A Neutron node, a Gaia node, a Hermes instance and an ICQ Relayer instance are now running in the background. To see the apps logs, run:

```
docker ps
```

And use the container ID you want to observe logs of:

```sh
docker logs -f <contained-id>
```

Cumulative logs are available via running

```sh
docker-compose logs -f
```

To stop cosmopark, run

```sh
make stop-cosmopark
```

### 6. Usage

#### Neutron node

The Neutron node usage guidelines (exposed ports, CLI, prepared accounts) for Cosmopark are the same as for the sole run. Please refer to the [corresponding section](/neutron/build-and-run/neutron-docker#usage) to see more details on it.

#### Hermes

For more information about Hermes, refer to the [dedicated section](/relaying/ibc-relayer) and its [configuration folder](https://github.com/neutron-org/neutron-integration-tests/tree/main/setup/hermes) in the neutron-integraton-tests repo.

#### ICQ Relayer

For more information about ICQ Relayer, refer to the [dedicated section](/relaying/icq-relayer) and its configuration via [docker-compose file](https://github.com/neutron-org/neutron-integration-tests/blob/main/setup/docker-compose.yml) in the integration-tests repo.

#### Gaia

The Gaia node running in the Cosmopark is configured via [docker-compose file](https://github.com/neutron-org/neutron-integration-tests/blob/main/setup/docker-compose.yml).
