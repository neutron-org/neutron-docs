# Overview

A flash loan is a type of uncollateralized loan in the cryptocurrency and decentralized finance (DeFi) space. It allows
borrowers to borrow funds without providing any collateral, on the condition that the loan is repaid within the same
transaction. If the borrower fails to repay the loan by the end of the transaction, the entire transaction is
reversed, effectively canceling the loan. Flash loans are typically used for arbitrage, collateral swapping, and
refinancing, taking advantage of price discrepancies or temporary liquidity needs without requiring long-term capital.

## Implementations

### Neutron flashloans

The `neutron-flashloans` contract facilitates provision of flash loans to smart contracts operating on the Neutron network. The `neutron-flashloans` contract does not hold any funds. Instead, it uses `authz` permission from the `source` address to execute `/cosmos.bank.v1beta1.MsgSend` on its behalf. For this particular instance, the `source` address is the [Treasury (Neutron DAO core)](https://neutron.celat.one/neutron-1/contracts/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff) contract address.

- **contract address**: TODO add celatone link to the contract instance when deployed
- **source code and usage manual**: https://github.com/neutron-org/neutron-dao/blob/main/contracts/dao/neutron-flashloans
