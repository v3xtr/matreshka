# admin-service

> Platform administration (moderation, admin-only operations) for the Matreshka platform.

Part of the [matreshka](../) microservices monorepo.

## Status

Early stage — project skeleton with the standard layered structure (`application` / `delivery` / `internal`) and a Kafka broker consumer wired up, but `AdminService` and `AdminController` are not yet implemented.

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Messaging | Kafka (consumer already scaffolded) |

## Architecture

```
delivery/    → HTTP controller (empty), Kafka consumer
application/ → AdminService (empty)
internal/    → domain entity, repository, middleware
```
