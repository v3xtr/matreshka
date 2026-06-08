CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE videos (
    id UUID PRIMARY KEY,
    media_id VARCHAR(255),
    cdn_url VARCHAR(255),
    mime_type VARCHAR(50),
    likes BIGINT DEFAULT 0,
    user_id VARCHAR(255),
    CONSTRAINT fk_video_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id UUID PRIMARY KEY,
    text TEXT NOT NULL,
    parent_id UUID,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    video_id UUID,

    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_comment_video FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_comments_video_id ON comments(video_id);