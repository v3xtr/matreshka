CREATE DATABASE IF NOT EXISTS media_db;

CREATE TABLE users (
    id UUID PRIMARY KEY
);

CREATE TABLE media (
    id UUID PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL UNIQUE,
    s3_key VARCHAR(255) NOT NULL UNIQUE,
    url TEXT NOT NULL,
    cdn_url TEXT,
    type VARCHAR(50) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL,
    thumbnail_url TEXT,
    published_at TIMESTAMP,
    processed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_media_user_id ON media(user_id);

CREATE INDEX idx_media_user_type ON media(user_id, type);