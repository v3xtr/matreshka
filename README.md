# video-converter-worker

> Transcodes uploaded video into a web-playable format for the Matreshka platform.

Part of the [matreshka](../) microservices monorepo. A background worker, not an HTTP service — it only reacts to Kafka events.

## Flow

1. Consumes a video job from `media-processor-process`
2. Transcodes the video via **ffmpeg**
3. Uploads the result to **S3**
4. Publishes `media-processor-result` on success, or `media-processor-error` on failure

`products-service` consumes `media-processor-result` to link the finished video back to its advert.

## Stack

| Concern | Technology |
|---|---|
| Language / framework | Java, Spring Boot |
| Messaging | Kafka (Spring Cloud Stream) |
| Transcoding | ffmpeg (external process) |
| Storage | AWS S3-compatible (Beget Cloud) |

## Architecture

```
delivery/broker/ → Kafka consumer/producer, event DTOs
application/     → VideoProcessor, VideoConverter, S3Service
internal/        → thread pool config, S3 client/bucket config
```

## Running locally

Requires ffmpeg installed locally and Kafka + S3 reachable, configured via env vars (see `application.yaml`).

## Deployment

Deployed to Kubernetes; the deployment manifest is not version-controlled (carries plaintext AWS credentials).
