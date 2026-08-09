# feed-service

Serves the video feed for the Matreshka platform — video metadata, views, favorites. Part of the [matreshka](../) microservices monorepo.

## Stack

- **Java / Spring Boot** — Spring Security
- **PostgreSQL** — versioned with **Flyway**
- **Redis** — video cache
- **Kafka** — consumes user/media events, publishes media-delete events
- **JWT** — stateless auth

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumers/producers
application/ → use cases / services
internal/    → domain entities, repositories, mappers, config
```

## Running locally

Needs Postgres, Redis and Kafka reachable at the URLs configured via env vars (see `application.yml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
