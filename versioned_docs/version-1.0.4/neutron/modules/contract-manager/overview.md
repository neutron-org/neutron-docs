# Overview

## Abstract

This document specifies the ContractManager module for the Neutron network.

The ContractManager module implements a mechanism and contains methods to make sudo calls to the contracts as well it helps to store sudo handler calls errors during IBC ACK.

## Concepts

Due to the fact that contracts are allowed to make calls to the IBC, as well as process all received data, a problem arises in which a malicious contract can make a call to the IBC and, during the response of the ACK, make an error in the sudo handler, or simply do not implement it. Which will lead to disruption of the channel (in the case of a ORDERED channel), or force the relayer to send ACK requests over and over again, thereby loading the nodes serving the blockchain.

In order to avoid this problem, the code in the module from which the sudo handler is called should ignore the error and instead return the success status of the call.
But this in turn exposes the problem of informing the owner of the contract that a failure has occurred. To do this, in case of an unsuccessful call, the module from which the sudo handler is called must call the `AddContractFailure` method of the `keeper` of the `ContractManager` module.

To ensure that the state of the contract is consistent, the call to the sudo handler takes place in a temporary state (using `CacheContext`), which is written to the active state if the call succeeds.

But at the same time there is gas consumption for the sudo call. Two options for gas limitation were proposed:
1. Allocate only a certain amount of gas per sudo handler call, thereby limiting the handler's computational capabilities. The volume of the dediated amount of gas can be regulated by the help of governance proposal
2. Release gas dynamically depending on the remaining gas and the gas reserve required to complete the call with a failure record in the state.

In this implementation, the second approach was used. Also given the fact that Neutron makes the contract pay for all packets (using ibc fees), it's hard to spam / overflow neutron with failure records.
