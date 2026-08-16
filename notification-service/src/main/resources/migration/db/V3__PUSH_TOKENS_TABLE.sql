CREATE TABLE IF NOT EXISTS push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(512) NOT NULL
);

INSERT INTO push_tokens (user_id, token)
SELECT user_id, token FROM notifications
WHERE token IS NOT NULL AND token <> ''
ON CONFLICT (user_id) DO NOTHING;

ALTER TABLE notifications DROP COLUMN IF EXISTS token;
