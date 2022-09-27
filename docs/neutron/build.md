# Build Neutron source code

## Neutron Core

### Install Go 1.18
Currently, Neutron uses Go 1.18 to compile the code.
Install [Go 1.18](https://go.dev/doc/install) using following instructions there.

Verify the installation by executing `go version` in your terminal:
```shell
$ go version
go version go1.18.1 darwin/arm64
```

### Build Neutron
In order to build Neutron you need [the source code](https://github.com/neutron-org/neutron).

Build Neutron from the source code:

```shell
cd neutron
make build
```

After building, you should see a new executable file `neutron/build/neutrond`.

### Run Tests
Run tests from the source code:

```shell
cd neutron
make test
```

## Neutron Smart-Contracts SDK

### Install dependencies

- Rust v1.60.0+
- `wasm32-unknown-unknown` target
- Docker

1. Install `rustup` via https://rustup.rs/
2. Run the following:
    ```shell
    rustup default stable
    rustup target add wasm32-unknown-unknown
    ```
3. Make sure [Docker](https://www.docker.com/) is installed

### Build Neutron SDK
In order to build Neutron SDK you need [the source code](https://github.com/neutron-org/neutron-contracts).

For production builds, run the following:
```shell
cd neutron-contracts
make build
```

### Run Tests
Run tests from the source code:

```shell
cd neutron-contracts
make test
```