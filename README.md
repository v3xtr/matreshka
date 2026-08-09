# cryptography-app

> A standalone AES-GCM encrypt/decrypt utility, built as a Spring Boot module.

Part of the [matreshka](../) microservices monorepo.

## Status

Experimental / standalone — `CryptoService` implements AES/GCM/NoPadding encryption with a random IV per call, but this module is **not yet wired into any other service** (no HTTP layer, no Kafka).

## Stack

- **Java / Spring Boot**
- `javax.crypto` (AES-GCM, 128-bit auth tag)
