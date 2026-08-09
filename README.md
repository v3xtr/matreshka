# vk-oauth

Handles "Sign in with VK" for the Matreshka platform: OAuth exchange with VK, user creation/linking, JWT issuance. Part of the [matreshka](../) microservices monorepo.

Recently rewritten from TypeScript to Java/Spring Boot to match the rest of the platform's stack.

## Stack

- **Java / Spring Boot** — Spring Security
- **PostgreSQL** — user records
- **Redis** — token cache
- **Kafka** — publishes `user.created` for other services to consume
- **JWT** — issues access/refresh tokens after successful VK auth

## Architecture

```
delivery/    → HTTP controllers, DTOs, Kafka producer
application/ → OAuth flow orchestration
internal/    → domain entities, repositories, mappers, JWT/config
```

## Running locally

Needs Postgres, Redis and Kafka reachable, plus VK OAuth app credentials, all via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes via `deployment.sh`. The k8s deployment manifest is not version-controlled (carries plaintext credentials) — it lives only on the deploying machine.
