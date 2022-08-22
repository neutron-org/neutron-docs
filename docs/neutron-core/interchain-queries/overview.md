# Overview

The ICQ module (**I**nter**C**hain **Q**ueries) provides the logic to retrieve data from remote chains connected to Neutron via IBC.

## Concepts

Anyone (smart-contract, user) can register an Interchain Query for particular chain with some query payload and `update_period`.
The ICQ module emits an event with registered interchain query info every `update_period` blocks.

When [ICQ relayer](/relaying/icq-relayer-guide) receives such event, it performs a needed query on remote chain, gets data and publishes it on Neutron chain.
Neutron verifies data and saves it to the storage.

After that an interchain query response will be available for anyone on the Neutron.
