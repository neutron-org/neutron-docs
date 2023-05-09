# Neutron build from sources

This page contains information about building Neutron node from sources

## Prerequisites

- Neutron v1.0.1 
- Golang v1.20 ([go releases and instructions](https://go.dev/dl/)).

## Build and run

### 1. Make sure you have the required golang version

```sh
go version
```

The output should comply with the golang version mentioned in the [Prerequisites](#prerequisites) section.

### 2. Clone Neutron core repository and cd into it

```sh
git clone -b v1.0.1 https://github.com/neutron-org/neutron.git
cd neutron
```

### 3. Build a Neutron node image

```sh
make install
```
