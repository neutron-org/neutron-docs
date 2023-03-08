# Overview
NOTE: this contract is an [Astroport Oracle](https://docs.astroport.fi/docs/develop/smart-contracts/oracle) which is modified to store historical TWAP values .

Oracle contract calculates a 1 day TWAP for a xy=k Neutron pool and stores historical TWAP values. 

In order to provide a fair price of NTRN to lockdropVotingVault at certain height we need to update astroports oracle to keep the price history (see [TWAPAtHeight at queries](queries.md) section).
