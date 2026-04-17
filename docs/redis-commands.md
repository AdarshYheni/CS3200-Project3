# Redis Commands for SubletSync

## 1. Initialize the Database

### Clear all keys during development/testing
```redis
FLUSHALL
```

## 2. Create Operations

### Create a new application record
```redis
HSET application:app1001 \
application_id app1001 \
listing_id list501 \
applicant_user_id user33 \
applied_at 2026-04-17T10:15:00Z \
status pending \
message "Interested in subleasing from June to August"
```

### Add the application to the listing's application set
```redis
SADD listing:list501:applications app1001
```

### Add the application to the user's application set
```redis
SADD user:user33:applications app1001
```

## 3. Read Operations
### Retrieve one application by ID
```redis
HGETALL application:app1001
```

### Retrieve all application IDs for a listing
```redis
SMEMBERS listing:list501:applications
```

### Retrieve all application IDs for a user
```redis
SMEMBERS user:user33:applications
```

### Retrieve full details for one application returned from a set
```redis
HGETALL application:app1001
```

## 4. Update Operations
### Update an application status
```redis
HSET application:app1001 status approved
```

### Update an application's message
```redis
HSET application:app1001 message "Updated application message"
```

### Update multiple fields at once
```redis
HSET application:app1001 status rejected message "Listing no longer available"
```

## 5. Delete Operations
### Remove the application from the listing's application set
```redis
SREM listing:list501:applications app1001
```

### Remove the application from the user's application set
```redis
SREM user:user33:applications app1001
```

### Delete the application hash
```redis
DEL application:app1001
```

## 6. Optional Supporting Commands
### Count how many applications a listing has
```redis
SCARD listing:list501:applications
```

### Check whether an application exists
```redis
EXISTS application:app1001
```

### Check whether an application belongs to a listing
```redis
SISMEMBER listing:list501:applications app1001
```

