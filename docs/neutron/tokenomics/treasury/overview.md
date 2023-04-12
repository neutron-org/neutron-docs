# Overview

This document describes the Treasury contract for the Neutron network. The Treasury contract keeps and distributes funds
vested from Reserve in the form of one-off payments.

## Deployment

This is one of the contracts that are initialized at Neutron genesis. The [initialization message](messages#instantiate)
contains [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao) and Security SubDAO address.

## Description

Contract gets the funds from the [Reserve contract](../reserve/overview) that didn't go
to [Distribution contract](../distribution/overview).

These funds are used for [one-off payments](messages#payout) to specified address. One-off payments can only be made by
the decision of the [Neutron DAO](/docs/neutron/dao/overview.md#neutron-dao).

Can be [paused](messages#pause) or [unpaused](messages#unpause).
