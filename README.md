# profile-service

> User profiles, employee records, and reviews for the Matreshka platform.

Part of the [matreshka](../) microservices monorepo. Originally written in TypeScript, rewritten in Java/Spring Boot to match the rest of the platform's stack.

## Responsibilities

- Owns the **user profile** (mirrored from `auth`/`vk-oauth` via Kafka, extended with platform-specific fields)
- Manages **employees** attached to a business profile
- Manages **reviews** — ratings and answers between users

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | PostgreSQL, versioned with Flyway |
| Messaging | Kafka (Spring Cloud Stream) |
| Auth | JWT, validated in `AuthFilter` |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumer/producer
application/ → ProfileService, ReviewService (use cases)
internal/    → entities, repositories, mappers, security config
```

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | create the local profile mirror for a new user |
| `user.updated` | consume | keep the profile mirror in sync |
| `media.created` | consume | attach uploaded media (e.g. avatar) to a profile |

## Database

Migrations run automatically via Flyway on startup:

| Migration | Adds |
|---|---|
| V0 | `users` table |
| V1 | `employees` table |
| V2 | `reviews` table |
| V3 | `created_at` column |
| V4 | `product_id` linkage |

## Running locally

Needs Postgres and Kafka reachable at the URLs configured via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is **not** version-controlled — it carries plaintext credentials and lives only on the deploying machine.
