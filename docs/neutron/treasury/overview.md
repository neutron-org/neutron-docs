# Overview

This document describes the treasury contract for the Neutron network.

**The Treasury** contract holds the vested NTRNs and sends them to the Reserve and Distribution contracts. Contract is owned by DAO and is instantiated in Genesis and responsible of the first step of tokens distribution. Treasury tokens are vested based on on-chain activity: the more NTRN tokens are burned while processing block fees (see above), the more tokens get unlocked in the treasury; 

Main approach in the released coins calculation based on the following expression: `burnt_tokens * a_multiplier`. The `a_multiplier` is a linear function: fn(y) = x / `<configurable denominator>`. Configurable denominator should be set based on coins burning rate and preferred duration. Take into account that while initially, one burnt tokens equals multiple NTRN tokens made liquid, the flow of new tokens into the Treasury progressively slows down until the tokens supply is exhausted and the tokenomy becomes deflationary.

Treasury contract can be configured only by DAO. The contract has the `min_period` parameter, and the `distribute` method can not be called more than once every `min_period`. The `distribute` call is permissionless and can be called by anybody.
