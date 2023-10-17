# Overview

## Abstract

This document specifies the ContractManager module for the Neutron network.

The ContractManager module implements a mechanism and contains methods to make sudo calls to the contracts as well it helps to store sudo handler calls errors during IBC ACK.

## Concepts

Due to the fact that contracts are allowed to make calls to the IBC, as well as process all received data, a problem arises in which a malicious contract can make a call to the IBC and, during the response of the ACK, make an error in the sudo handler, or simply do not implement it. Which will lead to disruption of the channel (in the case of a ORDERED channel), or force the relayer to send ACK requests over and over again, thereby loading the nodes serving the blockchain.

In order to avoid this problem, the code in the module from which the sudo handler is called should ignore the error and instead return the success status of the call.
But this in turn exposes the problem of informing the owner of the contract that a failure has occurred. To do this, in case of an unsuccessful call, the module from which the sudo handler is called must call the `AddContractFailure` method of the `keeper` of the `ContractManager` module.

To ensure that the state of the contract is consistent, the call to the sudo handler takes place in a temporary state (using `CacheContext`), which is written to the active state if the call succeeds.

To make sure there are no exploits with infinite recursion of IBC messages which call other IBC messages in sudo handler we use constant gas `LIMIT` to spend. If your contracts need to do intense computational work in sudo handler, you can save the messages and do work later in a separate method.

If your contract exceeds this constant `LIMIT`, it will terminate sudo handler call and save a `Failure` with full call info. You can [resubmit failure](#resubmitfailure) from this contract.

We give an ability to resubmit bindings through the contract that initiated the IBC transaction.

## Binding msgs

### ResubmitFailure

Cosmwasm contracts that sent an IBC transfer or ICA transaction can resubmit their failures.

This binding is permissioned - only the contract that sent an IBC transfer or transaction can call it.

The format is as follows:
```go
type ResubmitFailure struct {
	FailureId uint64 `json:"failure_id"`
}
```

Binding in cosmwasm described [here](https://github.com/neutron-org/neutron-sdk/blob/feat/contract-manager-resubmit/packages/neutron-sdk/src/bindings/msg.rs#L184).

It will call sudo handler with exact same arguments as the original handler that failed.
The only difference is that this `SubmitHandler` will be called not from relayer, so the gas limitations above do not apply.

> Note that you can only resubmit failure through cosmwasm contract.

See examples on how to resubmit failure for [interchain txs](https://github.com/neutron-org/neutron-dev-contracts/blob/feat/contract-manager-resubmit/contracts/neutron_interchain_txs/src/contract.rs#L441) and for [ibc transfer](https://github.com/neutron-org/neutron-dev-contracts/blob/feat/contract-manager-resubmit/contracts/ibc_transfer/src/contract.rs#L271)

## Binding queries

Failures for contract address can be queried using [bindings](https://github.com/neutron-org/neutron/blob/feat/contract-manager-resubmit/wasmbinding/bindings/query.go#L39).

Query request struct should be like:

```go
type Failures struct {
	Address    string             `json:"address"`
	Pagination *query.PageRequest `json:"pagination,omitempty"`
}
```

Response:
```go
type FailuresResponse struct {
	Failures []contractmanagertypes.Failure `json:"failures"`
}
```

You're encouraged to use our neutron-sdk implementation in contracts - [request](https://github.com/neutron-org/neutron-sdk/blob/feat/contract-manager-resubmit/packages/neutron-sdk/src/bindings/query.rs#L61) and [response](https://github.com/neutron-org/neutron-sdk/blob/feat/contract-manager-resubmit/packages/neutron-sdk/src/bindings/query.rs#L119)
