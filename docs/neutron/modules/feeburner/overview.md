# Overview

## Abstract

This document specifies the FeeBurner module for the Neutron network.

The FeeBurner module is called in the end of processing of every block and manages consumer part of fees: all Neutron fees are burned and fees in any other denom are sent to Reserve.

## Params

- `NeutronDenom` — denom of Neutron token, fees in Neutrons are burned;
- `ReserveAddress` — address of Neutron Reserve smart contract, fees in all non-Neutron tokens will be transferred here.

## Concepts

Interchain Security splits deducted fees into two parts. 25% of fees go to the provider fee pool, the remaining 75% are transferred to [`"cons_redistribute"`](https://github.com/cosmos/interchain-security/blob/6c0d718d8c59339d112feb5850589258a504756e/x/ccv/consumer/types/keys.go#L23) account. Interchain Security doesn't care what happens with these funds afterwards.

During block finalization, FeeBurner module wakes up in EndBlocker. It burns all funds from [`"cons_redistribute"`](https://github.com/cosmos/interchain-security/blob/6c0d718d8c59339d112feb5850589258a504756e/x/ccv/consumer/types/keys.go#L23) in Neutron denom, specified in [Params](#Params). Everything else will be transferred to `TreasuryAddress` and further managed by Neutron Treasury.
