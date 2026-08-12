CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY,
    target_user_id VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    owner_reply TEXT,
    is_replied BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_reviews_target_user FOREIGN KEY (target_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reviews_target_user ON reviews(target_user_id);