# auth-service

> Registration, login, and email verification for the Matreshka platform.

Part of the [matreshka](../) microservices monorepo.

## Responsibilities

- User registration + email verification code (send/check)
- Login, JWT (access + refresh) issuance
- Publishes `user.created` reliably via the **transactional outbox pattern** — the event row is written in the same DB transaction as the user, then a background worker publishes it to Kafka, so a Kafka outage can't silently lose a registration event

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | PostgreSQL |
| Cache | Redis |
| Messaging | Kafka (outbox pattern) |
| Auth | JWT (access + refresh), password hashing |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka producer
application/ → AuthService, VerificationService, NotificationService
internal/    → entities (User, OutboxEvent), repositories, mappers,
               outbox worker/listener, JWT builder, password hashing
```

## Why an outbox instead of publishing directly

Publishing to Kafka directly inside the request that creates the user risks losing the event if Kafka is down at that exact moment, with no retry. The outbox worker instead polls unpublished `OutboxEvent` rows and retries independently of the request lifecycle — the user record and its "needs to be published" marker are always consistent, since both are written in one transaction.

## Running locally

Needs Postgres, Redis and Kafka reachable at the URLs configured via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via a deployment manifest that is **not** version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
