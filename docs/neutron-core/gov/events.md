# Events
> NOTE: events are similar to vanilla cosmos gov module

The governance module emits the following events:

## EndBlocker

| Type              | Attribute Key   | Attribute Value  |
| ----------------- | --------------- | ---------------- |
| inactive_proposal | proposal_id     | {proposalID}     |
| inactive_proposal | proposal_result | {proposalResult} |
| active_proposal   | proposal_id     | {proposalID}     |
| active_proposal   | proposal_result | {proposalResult} |

## Handlers

### MsgSubmitProposal

| Type                | Attribute Key       | Attribute Value |
| ------------------- | ------------------- | --------------- |
| submit_proposal     | proposal_id         | {proposalID}    |
| submit_proposal [0] | voting_period_start | {proposalID}    |
| proposal_deposit    | amount              | {depositAmount} |
| proposal_deposit    | proposal_id         | {proposalID}    |
| message             | module              | governance      |
| message             | action              | submit_proposal |
| message             | sender              | {senderAddress} |

* [0] Event only emitted if the voting period starts during the submission.

### MsgVote

| Type          | Attribute Key | Attribute Value |
| ------------- | ------------- | --------------- |
| proposal_vote | option        | {voteOption}    |
| proposal_vote | proposal_id   | {proposalID}    |
| message       | module        | governance      |
| message       | action        | vote            |
| message       | sender        | {senderAddress} |

### MsgVoteWeighted

| Type          | Attribute Key | Attribute Value          |
| ------------- | ------------- | ------------------------ |
| proposal_vote | option        | {weightedVoteOptions}    |
| proposal_vote | proposal_id   | {proposalID}             |
| message       | module        | governance               |
| message       | action        | vote                     |
| message       | sender        | {senderAddress}          |

### MsgDeposit

| Type                 | Attribute Key       | Attribute Value |
| -------------------- | ------------------- | --------------- |
| proposal_deposit     | amount              | {depositAmount} |
| proposal_deposit     | proposal_id         | {proposalID}    |
| proposal_deposit [0] | voting_period_start | {proposalID}    |
| message              | module              | governance      |
| message              | action              | deposit         |
| message              | sender              | {senderAddress} |

* [0] Event only emitted if the voting period starts during the submission.

<!-- order: 5 -->

# Future Improvements

The current documentation only describes the minimum viable product for the
governance module. Future improvements may include:

* **`BountyProposals`:** If accepted, a `BountyProposal` creates an open
  bounty. The `BountyProposal` specifies how many Atoms will be given upon
  completion. These Atoms will be taken from the `reserve pool`. After a
  `BountyProposal` is accepted by governance, anybody can submit a
  `SoftwareUpgradeProposal` with the code to claim the bounty. Note that once a
  `BountyProposal` is accepted, the corresponding funds in the `reserve pool`
  are locked so that payment can always be honored. In order to link a
  `SoftwareUpgradeProposal` to an open bounty, the submitter of the
  `SoftwareUpgradeProposal` will use the `Proposal.LinkedProposal` attribute.
  If a `SoftwareUpgradeProposal` linked to an open bounty is accepted by
  governance, the funds that were reserved are automatically transferred to the
  submitter.
* **Complex delegation:** Delegators could choose other representatives than
  their validators. Ultimately, the chain of representatives would always end
  up to a validator, but delegators could inherit the vote of their chosen
  representative before they inherit the vote of their validator. In other
  words, they would only inherit the vote of their validator if their other
  appointed representative did not vote.
* **Better process for proposal review:** There would be two parts to
  `proposal.Deposit`, one for anti-spam (same as in MVP) and an other one to
  reward third party auditors.



