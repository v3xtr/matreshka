# chat-service

> Real-time messaging between users on the Matreshka platform.

Part of the [matreshka](../) microservices monorepo.

## Responsibilities

- Rooms and messages
- Real-time delivery over WebSocket (STOMP)
- Mirrors user records for chat participants

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | MongoDB (document shape fits chat's access patterns) |
| Cache | Redis |
| Messaging | Kafka (Spring Cloud Stream) |
| Real-time | WebSocket / STOMP over SockJS |
| Auth | JWT, validated in `AuthFilter` |

## Architecture

```
delivery/    → HTTP controllers, WebSocket handlers, Kafka consumers/producers
application/ → use cases / services
internal/    → domain documents, repositories, mappers, config
```

`index.html` at the repo root is a minimal manual STOMP/WebSocket test page — not part of the service, just a smoke-test client for local development.

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | consume | mirror user records for chat participants |
| `chat-messages-topic` | produce | outbound chat message events, consumed by `notification-service` |

## Running locally

Needs MongoDB, Redis and Kafka reachable at the URLs configured via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
