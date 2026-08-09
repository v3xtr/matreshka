# chat-service

Real-time messaging between users on the Matreshka platform — rooms, messages, WebSocket delivery. Part of the [matreshka](../) microservices monorepo.

## Stack

- **Java / Spring Boot** — Spring Security, Spring WebSocket (STOMP over SockJS)
- **MongoDB** — stores rooms and messages (document-shaped, fits chat's access patterns better than relational)
- **Redis** — caching
- **Kafka** (Spring Cloud Stream) — consumes `user.created` to mirror user records, publishes chat/notification events
- **JWT** — stateless auth via `AuthFilter` + `SecurityConfig`

## Architecture

```
delivery/    → HTTP controllers, WebSocket handlers, Kafka consumers/producers
application/ → use cases / services
internal/    → domain documents, repositories, mappers, config
```

`index.html` is a minimal manual STOMP/WebSocket test page — not part of the service, just a smoke-test client for local development.

## Kafka

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | mirror user records for chat participants |
| `chat-messages-topic` | produce | outbound chat message events |

## Running locally

Needs MongoDB, Redis and Kafka reachable at the URLs configured via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
