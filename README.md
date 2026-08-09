# thumbnail-service

Generates video thumbnails on the Matreshka platform: consumes a media-ready event, extracts a frame via FFmpeg, uploads it to S3. Part of the [matreshka](../) microservices monorepo.

## Stack

- **Java / Spring Boot** — Spring Cloud Stream
- **RabbitMQ** — consumes `media.created`, publishes results to `media.thumbnail.results`
- **FFmpeg** — frame extraction (invoked as an external process, path configured via `ffmpeg.path`)
- **AWS S3** (Beget Cloud) — thumbnail storage
- **Elasticsearch** — logging

## Running locally

Requires FFmpeg installed locally (`ffmpeg.path` in config) and RabbitMQ/S3/Elasticsearch reachable. Config lives in `application.properties`, which is **not version-controlled** — it currently holds plaintext credentials directly (DB, RabbitMQ, AWS S3), not env-var placeholders like the other services.

## Deployment

Deployed to Kubernetes; the deployment manifest is not version-controlled (carries plaintext credentials).
