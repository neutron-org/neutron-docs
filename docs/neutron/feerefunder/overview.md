# Overview

## Abstract

This document specifies the FeeRefunder module for the Neutron network.

The FeeRefunder module implements a mechanism and contains methods to make refunder IBC relayers for their submission of IBC ACK and Timeout packets.

## Concepts

Due to the fact that contracts are allowed to make calls to the IBC as well as process all received data, a problem arieses in which a malicious contract can make a call to the IBC and, during the response of the ACK or Timeout, make another IBC call and so on forever. Which will lead to drainage of relayer's funds and spamming of the network.

In order to avoid such problem, the code in the module forces the contract to pay for all Acknoledgements and Timeout messages it processes.

The mechanism behind the module is inspired by [ICS-29](https://github.com/cosmos/ibc/tree/main/spec/app/ics-029-fee-payment). ICS-29 itself requires both chains (target and source chains) to support the specifications which is not quite good for Neutron, since we want to connect as many chains as possible, and that's hard with ICS-29, since not so many chains are upgrade to the latest [ibc-go](https://github.com/cosmos/ibc-go) version.

That is why we decided to implement our own IBC Fees module, which allows to refund relayers for their Ack/Timeout submission, but with the same interface for the smart-contract developers. So when Neutron will support native ICS-29, there will no need for smart-contract developers to change their contracts, upgrade of the fees module will be very smooth.

The module requires smart-contracts, which use [Transfer] and [SunmitTx] messages from respective [Transfer](TODO) and [Interchain Transactions](TODO) modules, to provide fee values to refund relayers for particular type of IBC packet acknoledgements when sending such messages.