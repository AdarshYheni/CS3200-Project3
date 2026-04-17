# Redis Design for SubletSync

## Original Project Context:
SubletSync is an apartment subleasing marketplace that manages users, properties, units, leases, tenants, sublease listings, applications, and sublease contracts. In the original project design, users can browse listings, apply to available subleases, and track application outcomes, while landlords review applications and approve or reject them based on lease rules and availability.

## Redis Feature Selection:
For the Redis portion of the SubletSync project, I selected application tracking for sublease listings as the in-memory key-value functionality. This feature is central to the platform because users must apply to listings, landlords must review those applications, and applicants must be able to track their status.

## Redis Suitability Justification:
Application tracking is a strong candidate for Redis because it involves frequent read and write operations. Users frequently retrieve application statuses, and landlords frequently update those statuses during the review process. Additionally, applications must be retrieved efficiently based on different access patterns, such as by listing (all applications for a listing) and by user (all applications submitted by a user). Redis supports these patterns effectively through key-based lookups and data structures such as hashes and sets, allowing fast access and updates without complex joins.

## Redis Use Cases:
The Redis implementation will support the following use cases:
- Create a new application for a sublease listing
- Retrieve one application by application ID
- Retrieve all applications for a specific listing
- Retrieve all applications submitted by a specific user
- Update an application's status
- Update an application's message
- Delete an application

## Redis Data Structures

### 1. Application Record
- Redis Type: Hash
- Key Pattern: `application:{applicationId}`
- Purpose: Stores the complete details of one application as a structured record.
- Fields:
  - `application_id`
  - `listing_id`
  - `applicant_user_id`
  - `applied_at`
  - `status`
  - `message`

Example:
- Key: `application:app1001`
- Value:
  - `application_id = app1001`
  - `listing_id = list501`
  - `applicant_user_id = user33`
  - `applied_at = 2026-04-17T10:15:00Z`
  - `status = pending`
  - `message = Interested in subleasing from June to August`

### 2. Applications by Listing
- Redis Type: Set
- Key Pattern: `listing:{listingId}:applications`
- Purpose: Stores all application IDs associated with a specific sublease listing.
- Members: application IDs

Example:
- Key: `listing:list501:applications`
- Members:
  - `app1001`
  - `app1002`
  - `app1003`

### 3. Applications by User
- Redis Type: Set
- Key Pattern: `user:{userId}:applications`
- Purpose: Stores all application IDs submitted by a specific user.
- Members: application IDs

Example:
- Key: `user:user33:applications`
- Members:
  - `app1001`
  - `app1020`