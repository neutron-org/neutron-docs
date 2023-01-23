# Overview

This document describes the Distribution contract for the Neutron network.

Distribution contract is instantiated in genesis and owned by DAO. It fullfils the purpose of _distributing_ earned
tokens between configurable set of shareholders.

This contract stores shares as an array of `(address, weight)` pairs and distributes incoming funds among
shareholders by their weight.

Contract can only be configured by DAO. DAO can do two things to this contract:
- transfer ownership to anyone else;
- alter shareholders' weights.
