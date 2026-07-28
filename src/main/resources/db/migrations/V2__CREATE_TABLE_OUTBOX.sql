CREATE TABLE outbox_events (
    id BIGSERIAL PRIMARY KEY,
    aggregate_id VARCHAR(255),
    payload TEXT,
    topic VARCHAR(255),
    is_processed BOOLEAN NOT NULL DEFAULT FALSE
);