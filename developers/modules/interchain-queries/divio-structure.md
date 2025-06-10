# Interchain Queries Module Documentation Structure

Following the Divio documentation system pattern for the Interchain Queries (ICQ) module:

## 1. Overview (Explanation)
- Abstract/Introduction
- Concepts
  - KV Queries
  - TX Queries
  - Query Deposit System
  - Limitations and Known Issues
- Architecture
  - Components
  - Process Flow
  - Security Model

## 2. How-to Guides (Task-oriented)
- How to Register a KV Query
- How to Register a TX Query
- How to Handle KV Query Results
- How to Handle TX Query Results
- How to Update an Existing Query
- How to Remove a Query
- How to Query Account Balances on Remote Chains
- How to Monitor Transaction Activity on a Remote Chain
- Best Practices

## 3. Reference (Information-oriented)
- Messages
  - MsgRegisterInterchainKVQuery
  - MsgRegisterInterchainTXQuery
  - MsgUpdateInterchainKVQuery
  - MsgUpdateInterchainTXQuery
  - MsgRemoveInterchainQuery
  - MsgSubmitKVResult
  - MsgSubmitTXResult
- Queries
  - registered-query
  - registered-queries
  - query-result
  - query-last-remote-height
- Events
  - EventTypeNeutronMessage
- State
- CosmWasm Integration
- CLI Commands

## 4. Tutorials (Learning-oriented)
- Building a Cross-Chain Monitoring Application
  - Setup
  - Creating the Contract
  - Registering Queries
  - Processing Query Results
  - Testing and Deployment 