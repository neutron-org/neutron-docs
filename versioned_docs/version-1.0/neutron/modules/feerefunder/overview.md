# Overview

## Abstract

This document specifies the FeeRefunder module for the Neutron network.

The FeeRefunder module implements a mechanism and contains methods to make refunds to IBC relayers for their submission of IBC `Ack` and `Timeout` packets.

## Concepts

Due to the fact that contracts are allowed to make calls to the IBC as well as process all received data, a problem arieses in which a malicious contract can make a call to the IBC and, during the response of the `Ack` or `Timeout`, make another IBC call and so on forever. Which will lead to drainage of relayer's funds and spamming of the network.

In order to avoid such problem, the code in the module forces the contract to pay for all Acknowledgements and Timeout messages it processes.

The mechanism behind the module is inspired by [ICS-29](https://github.com/cosmos/ibc/tree/main/spec/app/ics-029-fee-payment). ICS-29 itself requires both chains (target and source chains) to support the specifications which is not quite good for Neutron, since we want to connect as many chains as possible, and that's hard with ICS-29, since not so many chains use the latest [ibc-go](https://github.com/cosmos/ibc-go) version.

That is why we decided to implement our own IBC Fees module, which allows to refund relayers for their `Ack/Timeout` submission, but with the same interface for the smart-contract developers. So when Neutron will support native ICS-29, there will no need for smart-contract developers to change their contracts, upgrading to the "official" fees module will be very smooth.

### General mechanics
The module requires smart-contracts, which use [Transfer](../transfer/messages#msgtransfer) and [SubmitTx](../interchain-txs/messages#msgsubmittx) messages from respective [Transfer](../transfer/overview) and [Interchain Transactions](../interchain-txs/overview) modules, to provide fee values to refund relayers for particular type of IBC packet acknoledgements when sending such messages:
* `ack_fee` - amount of coins to refund relayer for submittting ack message for a particular IBC packet (i.e. `500untrn`);
* `timeout_fee` - amount of coins to refund relayer for submitting timeout message for a particular IBC packet (i.e. `500untrn`);
* `recv_fee` - currently is used for compatibility with ICS-29 interface only and **must be set to zero** (i.e. `0untrn`), because Neutron's fee module can't refund relayers for submission of `Recv` IBC packets due to compatibility with target chains.

> **Note:** the fees can be specified only in native Cosmos-SDK coins. CW-20 coins are not supported!

When a smart-contract issues `Transfer` or `SubmitTx` message, the fee Module deduct the whole specified fee amount (`ack_fee + timeout_fee + recv_fee`) and locks that amount in the module's escrow address. When a relayer submits `Ack` message for a particular packet, the module sends the specified amount of `ack_fee` to the relayer from the escrow address and return the specified `timeout_fee` to the contract which issued the original `Transfer` or `SubmitTx` message. In case when relayer submits `Timeout` message, things go the other way around: the relayer is refunded with `timeout_fee` and the contract gets `ack_fee` back.

> **Note:** the minimal amount of fee to be specified for the messages above is defined via parameter [`min_fee`](https://github.com/neutron-org/neutron/blob/v1.0.4/proto/feerefunder/params.proto#L13) controlled by governance proposal.
If provided fees are less than `min_fee` parameter, `Transfer` or `SubmitTx` or message will be rejected.
