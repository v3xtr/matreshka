# thumbnail-service

> Generates video thumbnails on the Matreshka platform.

Part of the [matreshka](../) microservices monorepo. A background worker, not an HTTP service.

## Flow

1. Consumes `media.created` from RabbitMQ
2. Extracts a frame via **FFmpeg**
3. Uploads the thumbnail to **S3**
4. Publishes the result to `media.thumbnail.results`

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Messaging | RabbitMQ (predates the platform's move to Kafka, not yet migrated) |
| Thumbnail extraction | FFmpeg (external process) |
| Storage | AWS S3-compatible (Beget Cloud) |
| Logging | Elasticsearch |

## Running locally

Requires FFmpeg installed locally (`ffmpeg.path` in config) and RabbitMQ/S3/Elasticsearch reachable. Config lives in `application.properties`, which is **not version-controlled** — it currently holds plaintext credentials directly (DB, RabbitMQ, AWS S3), not env-var placeholders like the other services.

## Deployment

Deployed to Kubernetes; the deployment manifest is not version-controlled (carries plaintext credentials).
