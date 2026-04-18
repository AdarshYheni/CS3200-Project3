# SubletSync (Redis)

## Overview
This project extends the SubletSync apartment subleasing marketplace by implementing a Redis-based in-memory key-value feature for application tracking. The Redis portion of the project focuses on storing and managing applications for sublease listings, including creating, retrieving, updating, and deleting application records.

## Original Project Context
SubletSync is an apartment subleasing marketplace that manages users, properties, units, leases, tenants, sublease listings, applications, and sublease contracts. In the original project design, users can browse listings, apply to available subleases, and track application outcomes, while landlords review applications and approve or reject them based on lease rules and availability.

## Redis Feature Implemented
The Redis implementation focuses on application tracking for sublease listings. This includes:
- creating a new application
- retrieving one application by ID
- retrieving all applications for a listing
- retrieving all applications submitted by a user
- updating an application's status
- updating an application's message
- deleting an application

## Technologies Used
- Node.js
- Redis
- Redis Insight
- VS Code
- GitHub

## Project Structure
```text
CS3200-Project3/
├── docs/
│   ├── CS3200_Project2_BusinessReqDoc.pdf
│   ├── CS3200_Project2_MongoERD.png
│   ├── CS3200_Project2_UMLClassDiagram.png
│   ├── redis-design.md
│   ├── redis-commands.md
│   └── yt-video-link.txt
├── src/
│   ├── redisClient.js
│   ├── applicationStore.js
│   └── demo.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Redis Data Structures
The Redis implementation uses the following data structures:
- Hash
    - Key pattern: `application:{applicationId}`
    - Stores the full details of an individual application
- Set
    - Key pattern: `listing:{listingId}:applications`, `user:{userId}:applications`
    - Stores all application IDs associated with a listing and user respectively

## How to run
1. Install dependencies
```bash
npm install
```
2. Make sure Redis is running
This project expects Redis to be available at:
```redis
REDIS_URL=redis://localhost:6379
```
3. Start the demo
```bash
npm start
```

## CRUD Operations Demonstrated
The demo script demonstrates:
- Create: add new applications
- Read: retrieve one application, retrieve by listing, retrieve by user
- Update: modify application status and message
- Delete: remove an application and clean up related Redis sets

## Video Demo


## AI Usage
AI was used to help plan the Redis data structure design, organize the project documentation, and refine explanations of Redis commands and Node.js implementation details.

Exact prompt:
```text
I’m working on a database project where I need to adapt an existing apartment subleasing system to use Redis. I already have a relational/Mongo-style design with entities like users, listings, and applications.

I want to use Redis specifically for application tracking, but I’m not sure how to design the key-value structures properly. Can you help me:
1. choose appropriate Redis data structures (hash, set, etc.) for storing applications
2. define clear key patterns
3. map out CRUD operations using Redis commands
4. structure a simple Node.js implementation that connects to Redis and demonstrates these operations

I also need help organizing my documentation (design + commands) so it aligns with a grading rubric.
```


