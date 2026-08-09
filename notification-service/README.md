# notification-service

Delivers push notifications to users on the Matreshka platform, triggered by chat messages and other platform events. Part of the [matreshka](../) microservices monorepo.

## Stack

- **Java / Spring Boot** — Spring Security, Spring Cloud Stream
- **PostgreSQL** — stores notifications and device tokens, versioned with **Flyway**
- **Redis** — caching
- **Firebase Cloud Messaging** — actual push delivery to devices
- **Kafka** (Spring Cloud Stream) — consumes chat message events
- **JWT** — stateless auth via `AuthFilter`

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumers
application/ → use cases / services
internal/    → domain entities, repositories, mappers, config, FCM worker
```

## Kafka

| Topic | Direction | Purpose |
|---|---|---|
| `chat-messages-topic` | consume | trigger a push notification for a new chat message |

## Running locally

Needs Postgres, Redis and Kafka reachable at the URLs configured via env vars (see `application.yml`), plus a Firebase service account key (not version-controlled — see `.gitignore`) for FCM.

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest and Firebase credentials are not version-controlled (both carry live secrets) — they live only on the deploying machine.
