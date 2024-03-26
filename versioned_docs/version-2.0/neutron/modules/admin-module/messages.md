# Messages

## Overview

This section provides detailed specifications for the messages within the Admin module of the Neutron network. Messages serve as the primary vehicle for users, administrators, and the [DAO](/neutron/dao/overview) to communicate and propose changes within the Neutron ecosystem. Based on the cosmos-sdk architecture, the Admin module offers a range of standardized message structures for seamless governance and operations.

---

## MsgDeleteAdmin

Deletes an existing admin from the Neutron network, ensuring that the particular admin no longer has governance rights or permissions.

**Parameters:**
- `creator`: `string` - The originator or sender of this message. It's usually the address of the entity proposing the removal of the admin.
- `admin`: `string` - The target admin's address to be revoked from its administrative rights.

**Response:** MsgDeleteAdminResponse

---

## MsgDeleteAdminResponse

The standard response message after processing `MsgDeleteAdmin`. If successful, it confirms the deletion of the specified admin.

(No fields)

---

## MsgAddAdmin

Facilitates the addition of a new admin. This admin, once added, will be endowed with governance and operational rights as per the Neutron network's configuration.

**Parameters:**
- `creator`: `string` - The initiator or sender of this message. Typically, the address of the entity proposing the addition of a new admin.
- `admin`: `string` - The address of the new admin to be onboarded.

**Response:** MsgAddAdminResponse

---

## MsgAddAdminResponse

The definitive response message after processing `MsgAddAdmin`. A successful response ensures the addition of the specified admin into the Neutron network's governance mechanism.

(No fields)

---

## MsgSubmitProposalLegacy

Leveraging the legacy mechanisms, this message type is tailored for submitting proposals structured before the sdk-47 update. This ensures backward compatibility and a wider range of proposal support.

**Parameters:**
- `content`: `google.protobuf.Any` - The intrinsic content of the proposal. Typically aligns with the `Content` interface specifications.
- `proposer`: `string` - The address of the entity submitting the proposal.

**Response:** MsgSubmitProposalLegacyResponse

---

## MsgSubmitProposalLegacyResponse

The response message confirming the processing of `MsgSubmitProposalLegacy`.

**Fields:**
- `proposal_id`: `uint64` - The unique identifier assigned to the submitted proposal. This ID serves as a reference for future operations or queries related to this proposal.

---

## MsgSubmitProposal

In line with the updates in sdk-47, this message type provides a structure for submitting proposals using the revamped message structures. It encapsulates a diverse array of actions and changes.

**Parameters:**
- `messages`: `Array<google.protobuf.Any>` - A collection of arbitrary messages detailing the changes or actions proposed. These messages are executed contingent upon the proposal's approval.
- `proposer`: `string` - The originator's address proposing the changes.

**Response:** MsgSubmitProposalResponse

---

## MsgSubmitProposalResponse

The standardized response message post-processing `MsgSubmitProposal`.

**Fields:**
- `proposal_id`: `uint64` - A unique identifier for the newly submitted proposal. It serves as a pivotal reference for all related actions, queries, or updates.

