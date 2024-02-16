# Overview

# Neutron Mainnet Fork

Neutron mainnet fork is the utility to automate the creation and execution of a mainnet fork for the Neutron network, facilitating integration tests. With the rapid changes in the blockchain landscape, preliminary testing is crucial. Forking the mainnet allows developers to rigorously test contracts, modules, and other functionalities in an environment that mirrors the current mainnet. 

⚠️ **The fork is using neutron image with disabled signature verification, so you can send transactions on behalf of any account. This is done to simplify testing process. Please do not use this fork for any other purposes. Testing scripts have a [helper](https://github.com/hadronlabs-org/rehearsal/blob/main/src/libs/wallet.ts#L3) to allow you to send transactions on behalf of any account.**⚠️

# Hardware Requirements

To ensure smooth operation with this project, the following hardware specifications are recommended:

1. **Central Processing Unit (CPU):** Minimum of 4 cores; 8 cores are recommended.
2. **Random Access Memory (RAM):** A minimum of 16GB, but 32GB or more is recommended for optimal performance.
3. **Storage:** At least 20GB of free space on an SSD. An NVMe SSD is recommended for faster read/write operations.
4. **Network:** A stable internet connection with a minimum download speed of 100 Mbps.

⚠️ **These requirements are based on the standard data volume processed by the Neutron network. More intensive operations or an increase in the blockchain's size may necessitate more robust hardware.**⚠️

## Software Requirements

Ensure that you have the following installed:

- **Docker**: Required to build and run the project containers.

## Importance of Mainnet Fork

Creating a mainnet fork has various applications and use cases:

1. **Safeguarding Real Assets:** Before deploying a major update, changes can be tested on the fork, ensuring that real assets are not jeopardized.
2. **Prototyping New Features:** New ideas and features can be rapidly prototyped and iterated upon using a fork, without disrupting the main network.
3. **Testing Contracts:** Before deploying, smart contracts can be tested rigorously in an environment that simulates the real world, catching potential vulnerabilities.
4. **Training and Education:** A fork provides an excellent environment for developers to learn and get accustomed to the network's nuances without any real-world consequences.
5. **Debugging and Troubleshooting:** If any issues arise on the mainnet, they can be reproduced on the fork for a deeper analysis.

This approach strengthens trust in the blockchain community and helps in preventing unforeseen problems when changes are made live.

# Directory Structure

- **`./snapshot` Directory:** This directory contains latest snapshot that was downloaded from [Neutron Network Snapshots Service](https://snapshot.neutron.org)(see `raw` snapshot). If you want to update snapshot simply delete contents of the `snapshot` directory and clear appropriate docker volumes using command like `docker-compose down -v`
- **`./custom` Directory:** This directory contains scripts for fork genesis customization.

## Using CLI

In case you need to send transaction using CLI from the name of any account, you need to: 
1. Create transaction using `--offline` flag. Eg. `neutron tx bank send <account you have private key for> neutron1f6s4550dzyu0yzp7q2acn47mp5u25k0xa96pqy 5000000untrn --offline`;
2. Sign this transaction with `neutrond tx sign tx-ex.json --chain-id pion-1 --from <account used in previous step>`;
3. Replace `from_address` in the `/cosmos.bank.v1beta1.MsgSend` message to the address from which you actually want to send funds;
4. Broadcast this transaction to the forked network using `neutrond tx broadcast`.

## Configuration example

In order to run mainnet fork simply create docker-compose configuration file like this:

```yaml
version: '3.8'
services:
  neutron-fork:
    image: neutronorg/rehearsal:latest
    container_name: neutron-mainnet-fork
    volumes:
      - ./snapshot/:/opt/neutron/snapshot
      - ./custom/:/opt/neutron/custom
    environment:
      - MAIN_WALLET=neutron1kyn3jx88wvnm3mhnwpuue29alhsatwzrpkwhu6
    ports:
      - 1317:1317
      - 26657:26657
      - 26656:26656
      - 9090:9090
```

where `snapshot` volume contains path to directory with snapshot (should be downloaded automatically), and `custom` contains path to directory with `config.sh` file which contains custom modifications for forked image but you can omit it.

`MAIN_WALLET` set account with enough amount of funds on it for testing purposes.

## Getting Started

1. **Starting and Stopping the Fork**
   - For detailed steps on snapshot management and launching your fork, refer to the commands section below.

## Customizing the Genesis

Users have the flexibility to integrate their own settings into the genesis. This can be easily accomplished by creating a script named `custom.sh`. The script will receive the paths to the current genesis and where to place the modified genesis as inputs. Follow the steps below:

1. **Create a Custom Script:**
   - Write a script named `custom.sh` that contains your specific configurations or logic.
   - The script will receive two arguments: the path to the current genesis and the path where the modified genesis should be placed.

2. **Script Example:**
    Here is an example of how the script might look:
    ```bash
    #!/bin/bash
    
    CURRENT_GENESIS_PATH="$1"
    MODIFIED_GENESIS_PATH="$2"

    # Your custom configurations and modifications here

    cp $CURRENT_GENESIS_PATH $MODIFIED_GENESIS_PATH
    ```

3. **Provide the Path to Docker Container:**
   - Ensure that the Docker container has access to the directory where your `custom.sh` script is stored. In the case of Docker Compose, you can add an entry like the following in the `docker-compose.yml` file:
   
     ```yaml
     volumes:
       - ./custom/:/opt/neutron/custom
     ```
   - This ensures that the custom script is accessible within the Docker container, enabling it to modify the genesis accordingly.

4. **Execution:**
   - The `custom.sh` script will be executed automatically, applying your personalized settings to the genesis during the initialization process.

This approach provides a seamless way to tailor the genesis to specific requirements or configurations while maintaining the integrity of the original setup. Ensure the `custom.sh` script has appropriate permissions to execute and handle the genesis files.

## Docker container

Use docker container from [official Neutron docker hub account](https://hub.docker.com/r/neutronorg/rehearsal).

## Commands

1. **Starting the Mainnet Fork**

   To initiate the `neutron-mainnet-fork` container:

   ```bash
   docker-compose up neutron-fork
   ```

2. **Stopping the Mainnet Fork Container**

   To cease the `neutron-mainnet-fork` container's operation:

   ```bash
   docker-compose down neutron-fork
   ```

### Running explorer

   To run PingPub explorer, please use the following command:

   ```bash
   docker run --rm -p 5173:5173 -p 1318:1318 -p 26858:26858 --env API_URL=http://dev_server:1317 --env RPC_URL=http://dev_server:26657 neutronorg/pingpub
   ```

## Contribution

If you wish to contribute to this project or report any issues, please open a pull request or raise an issue in the repository. For further study, we recommend checking out the [repository on GitHub](https://github.com/hadronlabs-org/rehearsal).

