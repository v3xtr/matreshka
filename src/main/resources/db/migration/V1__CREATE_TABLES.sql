CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE videos (
    id UUID PRIMARY KEY,
    media_id VARCHAR(255),
    cdn_url VARCHAR(255),
    mime_type VARCHAR(255),
    likes BIGINT NOT NULL DEFAULT 0,
    user_id VARCHAR(255),
    CONSTRAINT fk_videos_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE comments (
    id UUID PRIMARY KEY,
    text TEXT,
    parent_id UUID,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    user_id VARCHAR(255),
    video_id UUID,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_video FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_video_id ON comments(video_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

CREATE TABLE favorite_videos (
     id UUID PRIMARY KEY,
     user_id VARCHAR(255) NOT NULL,
     video_id UUID NOT NULL,
     is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
     CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     CONSTRAINT fk_favorites_video FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
     CONSTRAINT uq_user_video UNIQUE (user_id, video_id)
);

CREATE INDEX idx_favorite_videos_user_id ON favorite_videos(user_id);