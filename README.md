# vk-oauth

> "Sign in with VK" for the Matreshka platform.

Part of the [matreshka](../) microservices monorepo. Recently rewritten from TypeScript to Java/Spring Boot to match the rest of the platform's stack.

## Responsibilities

- OAuth exchange with VK
- User creation/linking
- JWT issuance after successful auth

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Persistence | PostgreSQL |
| Cache | Redis (token cache) |
| Messaging | Kafka |
| Auth | JWT (issues access/refresh tokens) |

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka producer
application/ → OAuth flow orchestration
internal/    → domain entities, repositories, mappers, JWT/config
```

## Events

| Topic | Direction | Purpose |
|---|---|---|
| `user.created` | produce | published after successful VK auth, consumed by products/feed/profile/chat services |

## Running locally

Needs Postgres, Redis and Kafka reachable, plus VK OAuth app credentials, all via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
