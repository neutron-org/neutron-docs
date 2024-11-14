# Neutron build from sources

This page contains information about building Neutron node from sources

## Prerequisites

- Golang v1.22 ([go releases and instructions](https://go.dev/dl/)).

## Build and run

### 1. Make sure you have the required golang version

```sh
go version
```

The output should comply with the golang version mentioned in the [Prerequisites](#prerequisites) section.

### 2. Clone Neutron core repository and cd into it

```sh
git clone -b main https://github.com/neutron-org/neutron.git
cd neutron
```

### 3. Build a Neutron node image

```sh
make install
```

The command above will build a Neutron binary and store it under your `$GOBIN` directory. If you have it in your `$PATH`, `neutrond` binary should be available for execution:

```sh
neutrond version
4.1.0
```

If you have problems with PATH-related stuff, please refer to the go releases and instructions link in the [prerequisites](#prerequisites) section.
