# products-service

> Listings (adverts) for the Matreshka platform — creation, search, media attachment, favorites.

Part of the [matreshka](../) microservices monorepo.

## Responsibilities

- CRUD for adverts, with ownership tied to the authenticated user
- Full-text/faceted search via Elasticsearch
- Links uploaded media (photos, video) to an advert once processing finishes
- Favorites

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence (writes) | PostgreSQL, versioned with Flyway |
| Persistence (reads/search) | Elasticsearch |
| Cache | Redis |
| Messaging | Kafka (Spring Cloud Stream) |
| Auth | JWT, validated in `AuthFilter` |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka consumers/producers
application/ → use cases / services
internal/    → domain entities, repositories, mappers, config
```

**CQRS**: advert writes go to Postgres inside a transaction; on commit, the same advert is projected into Elasticsearch for search. Postgres is the system of record, Elasticsearch serves read/search traffic.

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | mirror user records needed for adverts |
| `media-processor-result` | consume | media finished processing, link it to its advert |
| `media.deleted` | consume | remove a media record |

`media-processor-result` has retry (backoff) + a dead-letter topic (`media-processor-result.DLQ`) — a message that fails repeatedly (e.g. the advert isn't in Postgres yet) is retried before being routed to the DLQ instead of silently dropped.

## Running locally

Needs Postgres, Redis, Elasticsearch and Kafka reachable at the URLs configured via env vars (see `application.yaml`). Flyway migrations run automatically on startup.

## Deployment

Deployed to Kubernetes via `deployment.sh` + a k8s manifest. The manifest is **not** version-controlled (carries plaintext credentials for Postgres/Redis/S3/JWT signing) — it lives only on the deploying machine.
