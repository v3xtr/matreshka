# admin-service

Scaffolding for platform administration (moderation, admin-only operations) on the Matreshka platform. Part of the [matreshka](../) microservices monorepo.

## Status

Early stage — project skeleton with the standard layered structure (`application` / `delivery` / `internal`) and a Kafka broker consumer wired up, but `AdminService` and `AdminController` are not yet implemented.

## Stack

- **Java / Spring Boot**
- **Kafka** — broker consumer already scaffolded (`BrokerConsumer`)
