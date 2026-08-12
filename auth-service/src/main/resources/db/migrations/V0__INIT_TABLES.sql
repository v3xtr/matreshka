CREATE TABLE users
(
    id          VARCHAR(255) NOT NULL,
    email       VARCHAR(255),
    password    VARCHAR(255)[],
    name        VARCHAR(255),
    phone       VARCHAR(255),
    description TEXT,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE outbox_events
(
    id           BIGSERIAL             NOT NULL,
    aggregate_id VARCHAR(255),
    payload      TEXT,
    topic        VARCHAR(255),
    is_processed BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT pk_outbox_events PRIMARY KEY (id)
);