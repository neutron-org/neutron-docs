# Reserve Contract

## Overview

**The Reserve** contract keeps funds vested from Treasury for one-off payments.

## Deployment

This is one of contracts that are prebaked and initialized into neutron genesis.

Initialization message contains Main DAO and Security DAO address.

## Description
Contract gets the funds from the `Treasury contract` (TODO: LINK) that didn't go to `Distribution contract`(TODO: LINK).

These funds are used for One-off payments to specified address.

Payments can only be made by the decision of the Main DAO.

Can be paused or unpaused.

## Doc structure
- [Messages](./messages.md)
- [Queries](./queries.md)
