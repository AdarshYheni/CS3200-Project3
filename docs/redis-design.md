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