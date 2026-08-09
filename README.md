# feed-service

> Serves the video feed for the Matreshka platform — video metadata, views, favorites.

Part of the [matreshka](../) microservices monorepo.

## Responsibilities

- Video metadata for the feed
- View tracking
- Favorites

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | PostgreSQL, versioned with Flyway |
| Cache | Redis (video cache) |
| Messaging | Kafka (Spring Cloud Stream) |
| Auth | JWT |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumers/producers
application/ → use cases / services
internal/    → domain entities, repositories, mappers, config
```

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | mirror user records |
| `media-processor-result` | consume | video finished processing |
| `media.deleted` | consume/produce | media removal flow |

## Running locally

Needs Postgres, Redis and Kafka reachable at the URLs configured via env vars (see `application.yml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
