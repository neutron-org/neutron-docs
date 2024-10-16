# Part 2: Calling Modules and Contracts

## Overview

In the previous part of this tutorial we learned how to implement a simple contract that manages its own state, and how
to write a simple UI for it. Real-world applications, however, are rarely that simple; in order to implement something
useful, you need to know how to interact with **other smart contracts** and with Neutron **modules**.

## Smart contracts

Technically speaking, executing and querying other smart contracts from your own smart contract involves sending
messages to the `wasmd` module, but the interface of this interaction is slightly different from what you will need to
do with other modules.

There are 3 things to cover here:

1. Sending messages to smart contracts,
2. Processing responses to those messages,
3. Querying data from smart contracts.

### Sending messages to smart contracts & processing the responses

### Querying data from smart contracts

## Modules

With modules, the interaction interface is slightly different, but semantically the same 3 things need to be covered:

1. Sending messages to modules,
2. Processing responses to those messages,
3. Querying data from modules.

<details><summary><b>Historical background:</b> Stargate and gRPC</summary>
<p>

Historically, some modules had their own WASM bindings implemented by developers to handle messages and queries from
smart contracts. For modules without these bindings, Stargate was used to achieve similar functionality. Stargate
primarily relied on gRPC for sending and receiving messages, but its interface was inconsistent, returning
protobuf-encoded messages for some queries and JSON-encoded ones for others—causing significant frustration for
developers. Now that Stargate is outdated, on Neutron, you only need to work with gRPC and protobuf-encoded messages to
interact with core modules.

</p>
</details>
