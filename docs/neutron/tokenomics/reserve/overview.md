# Overview

This document describes the Reserve contract for the Neutron network.

The Reserve contract keeps and distributes funds vested from Treasury in form of one-off payments.

## Deployment

This is one of contracts that are prebaked and initialized into Neutron genesis.

[Initialization message](messages#instantiate) contains Main DAO and Security SubDAO address.

## Description

Contract gets the funds from the [Treasury contract](../treasury/overview) that didn't go to
[Distribution contract](../distribution/overview).

These funds are used for [one-off payments](messages#payout) to specified address.

One-off payments can only be made by the decision of the Main DAO.

Can be [paused](messages#pause) or [unpaused](messages#unpause).
