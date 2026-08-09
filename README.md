# matreshka

> A microservices marketplace/social platform — listings, video feed, chat, and the infrastructure behind them.

This is the monorepo root: each service lives on its **own branch**, named after the service. `main` holds only this document — no application code, no cluster config, no manifests. Deployment manifests and monitoring config carry live credentials for the current cluster, so they're never committed; they live only on the deploying machine, gitignored per service branch.

## Services

| Branch | Directory | Stack | Responsibility |
|---|---|---|---|
| `auth-service` | auth-service | Java / Spring Boot | Registration, login, email verification, JWT issuance |
| `vk-oauth-service` | vk-oauth | Java / Spring Boot | "Sign in with VK" |
| `google-oauth-service` | google-oauth-service | TypeScript / Prisma | "Sign in with Google" *(not yet ported to Java)* |
| `advert-service` | products-service | Java / Spring Boot | Listings (adverts): CRUD, search, media linking |
| `feed-service` | feed-service | Java / Spring Boot | Video feed: metadata, views, favorites |
| `profile-service` | profile-service | Java / Spring Boot | User profiles, employees, reviews |
| `chat-service` | chat-service | Java / Spring Boot | Real-time messaging (WebSocket/STOMP) |
| `notification-service` | notification-service | Java / Spring Boot | Push notifications (Firebase) |
| `media-service` | media-service | Java / Spring Boot | Media upload, storage orchestration |
| `video-converter-worker` | video-converter-worker | Java / Spring Boot | Video transcoding (ffmpeg → S3) |
| `thumbnail-service` | thumbnail-service | Java / Spring Boot | Thumbnail generation (ffmpeg → S3) |
| `admin-service` | admin-service | Java / Spring Boot | Platform administration *(early stage)* |
| `cryptography-app` | cryptography-app | Java / Spring Boot | AES-GCM encrypt/decrypt utility *(standalone, not wired in)* |

## System design

```mermaid
flowchart TB
    subgraph Identity
        AUTH[auth-service]
        VK[vk-oauth-service]
        GOOGLE[google-oauth-service<br/>TypeScript, legacy]
    end

    subgraph Core
        PRODUCTS[products-service]
        FEED[feed-service]
        PROFILE[profile-service]
        CHAT[chat-service]
        NOTIF[notification-service]
        ADMIN[admin-service]
    end

    subgraph Media pipeline
        MEDIA[media-service]
        CONVERTER[video-converter-worker]
        THUMB[thumbnail-service]
    end

    AUTH -- user.created --> KAFKA((Kafka))
    KAFKA -- user.created --> PRODUCTS
    KAFKA -- user.created --> FEED
    KAFKA -- user.created --> CHAT

    VK -. UserRegisteredEvent .-> KAFKA
    GOOGLE -. user.created via fanout .-> RABBIT((RabbitMQ))

    MEDIA -- media-created-topic --> KAFKA
    KAFKA -- media-processor-process --> CONVERTER
    CONVERTER -- media-processor-result / error --> KAFKA
    KAFKA -- media-processor-result --> PRODUCTS
    MEDIA -- media.deleted --> KAFKA
    KAFKA -- media.deleted --> PRODUCTS

    MEDIA -. thumbnail job .-> RABBIT
    RABBIT -. thumbnail job .-> THUMB

    CHAT -- chat-messages-topic --> KAFKA
    KAFKA -- chat-messages-topic --> NOTIF
    NOTIF -- push --> FCM[(Firebase)]

    PRODUCTS -- write --> PG_P[(Postgres)]
    PRODUCTS -- search index --> ES[(Elasticsearch)]
```

*Dashed edges are known integration gaps — see below, not aspirational design.*

### Identity: two brokers, one intent

`auth-service` is the source of truth for the `user.created` Kafka topic — written via a **transactional outbox** (the event is committed in the same DB transaction as the user row, then relayed by a background worker), and it's the only producer that `products-service`, `feed-service`, and `chat-service` actually consume.

`vk-oauth-service` (Java, already migrated) publishes its own `UserRegisteredEvent` to Kafka, but to a different topic than `user.created` — so a VK sign-up doesn't currently fan out to the other services the way a password sign-up does. `google-oauth-service` (still TypeScript/Prisma, the one OAuth provider not yet ported to Java the way `vk-oauth-service` and `profile-service` were) publishes on a RabbitMQ fanout exchange instead of Kafka entirely, which no downstream consumer currently listens to. Both are real gaps, not a deliberate multi-broker design — worth closing before either signup path scales.

### Media pipeline: two brokers, by necessity not accident

`thumbnail-service` predates the Kafka migration and still runs on RabbitMQ for its inbound job queue; everything else in the media pipeline (`media-service`, `video-converter-worker`, `products-service`) is on Kafka. Unlike the identity-layer split above, this one is intentional — documented in `thumbnail-service`'s own history as "not yet migrated," not a silent gap.

### Reliability patterns in use

- **Transactional outbox** (`auth-service`) — see above; a Kafka outage delays `user.created`, it doesn't lose it.
- **Retry + DLQ** (`products-service`, consuming `media-processor-result`) — a message that fails repeatedly (e.g. the advert isn't in Postgres yet when the media event arrives) is retried with backoff before landing in a dead-letter topic instead of being silently dropped.
- **CQRS** (`products-service`) — writes go to Postgres; on commit the same advert is projected into Elasticsearch, which serves search/read traffic.

### Data stores

| Store | Used by |
|---|---|
| PostgreSQL | auth, vk-oauth, products, profile, feed, chat (user mirror), notification, media, thumbnail, admin, cryptography-app |
| MongoDB | chat-service (rooms/messages) |
| Elasticsearch | products-service (search), platform logging |
| Redis | caching — auth, vk-oauth, products, profile, feed, chat, notification, media, thumbnail, admin |
| S3-compatible (Beget Cloud) | media, video-converter-worker, thumbnail |
| Firebase | notification-service (push delivery) |

### Known gaps

- VK and Google sign-ups aren't wired into the `user.created` fan-out that password sign-ups get — see "Identity" above.
- `cryptography-app` has a working `CryptoService` (AES/GCM, random IV per call) but no HTTP layer and no caller yet; it's a standalone module waiting to be adopted.
- `admin-service` is early-stage — infrastructure (Postgres, Redis, Kafka) is wired, feature surface is minimal.

## Working in this repo

Each service branch is self-contained — clone/checkout the branch you need, it doesn't depend on `main` being checked out alongside it. `main` is documentation only: no yml/yaml/json, no manifests, no config — those are gitignored on every branch that has them, and never committed.
