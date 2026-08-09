# products-service

Manages adverts (listings) for the Matreshka platform — creation, search, media attachment, favorites. Part of the [matreshka](../) microservices monorepo.

## Stack

- **Java / Spring Boot** — Spring Data JPA, Spring Security, Spring Cloud Stream
- **PostgreSQL** — system of record, versioned with **Flyway**
- **Elasticsearch** — read-optimized search index (CQRS: Postgres for writes, ES for search)
- **Redis** — caching
- **Kafka** (via Spring Cloud Stream) — consumes user/media events, publishes advert-related events
- **JWT** — stateless auth via a custom `AuthFilter` + `SecurityConfig`

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumers/producers (inbound/outbound adapters)
application/ → use cases / services, orchestrates domain + infrastructure
internal/    → domain entities, repositories, mappers, config — not exposed outside the module
```

Advert writes go to Postgres inside a transaction; on commit, the same advert is projected into Elasticsearch for search. Media (photos/video) is uploaded separately and processed asynchronously — a `MediaEvent` arrives over Kafka once processing finishes, and the resulting `media` row is linked back to its advert.

## Kafka topics

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | mirror user records needed for adverts |
| `media-processor-result` | consume | media (photo/video) finished processing, ready to link |
| `media.deleted` | consume | remove a media record |

`media-processor-result` is configured with retry (backoff) + DLQ (`media-processor-result.DLQ`) — a message that fails repeatedly (e.g. the advert isn't in Postgres yet) is retried before being routed to the DLQ instead of being silently dropped.

## Running locally

Needs Postgres, Redis, Elasticsearch and Kafka reachable at the URLs configured via env vars (see `application.yaml`). Flyway migrations run automatically on startup.

## Deployment

Deployed to Kubernetes via `deployment.sh` + `products-deployment.yaml`. The deployment manifest is **not** version-controlled (it carries plaintext credentials for the cluster's Postgres/Redis/S3/JWT signing key) — it lives only on the deploying machine.
