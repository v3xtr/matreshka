# notification-service

> Delivers push notifications to users on the Matreshka platform.

Part of the [matreshka](../) microservices monorepo.

## Responsibilities

- Consumes chat message events and turns them into a push notification
- Manages device tokens for Firebase Cloud Messaging

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | PostgreSQL, versioned with Flyway |
| Cache | Redis |
| Messaging | Kafka (Spring Cloud Stream) |
| Push delivery | Firebase Cloud Messaging |
| Auth | JWT, validated in `AuthFilter` |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumer
application/ → use cases / services
internal/    → domain entities, repositories, mappers, config, FCM worker
```

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `chat-messages-topic` | consume | trigger a push notification for a new chat message |

## Running locally

Needs Postgres, Redis and Kafka reachable at the URLs configured via env vars (see `application.yml`), plus a Firebase service account key (not version-controlled) for FCM.

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest and Firebase credentials are not version-controlled (both carry live secrets) — they live only on the deploying machine.
