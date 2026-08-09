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
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'15px'}}}%%
flowchart TB
    classDef identity fill:#3b82f6,stroke:#1d4ed8,stroke-width:1.5px,color:#ffffff
    classDef core fill:#8b5cf6,stroke:#6d28d9,stroke-width:1.5px,color:#ffffff
    classDef media fill:#f97316,stroke:#c2410c,stroke-width:1.5px,color:#ffffff
    classDef broker fill:#0f766e,stroke:#134e4a,stroke-width:2.5px,color:#ecfeff,font-weight:bold
    classDef store fill:#e2e8f0,stroke:#475569,stroke-width:1.5px,color:#0f172a

    subgraph Identity["🔑 Identity"]
        AUTH[auth-service]
        VK[vk-oauth-service]
        GOOGLE["google-oauth-service<br/><i>TypeScript, legacy</i>"]
    end

    subgraph Core["⚙️ Core"]
        PRODUCTS[products-service]
        FEED[feed-service]
        PROFILE[profile-service]
        CHAT[chat-service]
        NOTIF[notification-service]
        ADMIN[admin-service]
    end

    subgraph MediaPipeline["🎬 Media pipeline"]
        MEDIA[media-service]
        CONVERTER[video-converter-worker]
        THUMB[thumbnail-service]
    end

    KAFKA(("⚡ Kafka"))

    AUTH -- user.created --> KAFKA
    KAFKA -- user.created --> PRODUCTS
    KAFKA -- user.created --> FEED
    KAFKA -- user.created --> CHAT

    VK -. "UserRegisteredEvent<br/>(different topic, not yet consumed)" .-> KAFKA

    MEDIA -- media-created-topic --> KAFKA
    KAFKA -- media-processor-process --> CONVERTER
    CONVERTER -- "media-processor-result / error" --> KAFKA
    KAFKA -- media-processor-result --> PRODUCTS
    MEDIA -- media.deleted --> KAFKA
    KAFKA -- media.deleted --> PRODUCTS
    MEDIA -- thumbnail job --> KAFKA
    KAFKA -- thumbnail job --> THUMB

    CHAT -- chat-messages-topic --> KAFKA
    KAFKA -- chat-messages-topic --> NOTIF
    NOTIF -- push --> FCM[("Firebase")]

    PRODUCTS -- write --> PG_P[("Postgres")]
    PRODUCTS -- search index --> ES[("Elasticsearch")]

    class AUTH,VK,GOOGLE identity
    class PRODUCTS,FEED,PROFILE,CHAT,NOTIF,ADMIN core
    class MEDIA,CONVERTER,THUMB media
    class KAFKA broker
    class PG_P,ES,FCM store
```

*The dashed edge is a known integration gap, not aspirational design — see below.*

### Kafka is the backbone

Every service talks through Kafka — `auth-service` and the media pipeline included. `auth-service` is the source of truth for the `user.created` topic, written via a **transactional outbox** (the event is committed in the same DB transaction as the user row, then relayed by a background worker); `products-service`, `feed-service`, and `chat-service` are its only real consumers.

`vk-oauth-service` also publishes to Kafka (`UserRegisteredEvent`, via `StreamBridge`), but to a different topic than `user.created` — so a VK sign-up doesn't currently fan out to the other services the way a password sign-up does. That's a routing gap to close, not a broker problem. `google-oauth-service` is the one straggler: still TypeScript/Prisma rather than the Java/Kafka pattern `vk-oauth-service` and `profile-service` already migrated to, so it isn't in the diagram's Kafka flow at all yet — porting it is the natural next step.

`thumbnail-service`'s `build.gradle` still declares a `spring-cloud-stream-binder-rabbit` dependency left over from before the Kafka migration; worth confirming it's actually dead weight and deleting it if so.

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

- VK and Google sign-ups aren't wired into the `user.created` fan-out that password sign-ups get — see "Kafka is the backbone" above.
- `google-oauth-service` hasn't made the TypeScript → Java / Kafka jump that `vk-oauth-service` and `profile-service` already went through.
- `thumbnail-service` has a leftover RabbitMQ binder dependency in `build.gradle` — clean up once confirmed unused.
- `cryptography-app` has a working `CryptoService` (AES/GCM, random IV per call) but no HTTP layer and no caller yet; it's a standalone module waiting to be adopted.
- `admin-service` is early-stage — infrastructure (Postgres, Redis, Kafka) is wired, feature surface is minimal.

## Working in this repo

Each service branch is self-contained — clone/checkout the branch you need, it doesn't depend on `main` being checked out alongside it. `main` is documentation only: no yml/yaml/json, no manifests, no config — those are gitignored on every branch that has them, and never committed.
