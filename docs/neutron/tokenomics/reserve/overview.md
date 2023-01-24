# Overview

This document describes the **Reserve contract** for the Neutron network.

**The Reserve** contract keeps and distributes funds vested from Treasury in form of one-off payments.

## Deployment

This is one of contracts that are prebaked and initialized into Neutron genesis.

Initialization message contains Main DAO and Security DAO address.

## Description

Contract gets the funds from the [Treasury contract](../treasury/overview) that didn't go to
[Distribution contract](../distribution/overview).

These funds are used for One-off payments to specified address.

One-off payments can only be made by the decision of the Main DAO.

Can be paused or unpaused.
