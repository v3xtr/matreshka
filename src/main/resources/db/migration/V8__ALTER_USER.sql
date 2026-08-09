ALTER TABLE users ADD COLUMN avatar VARCHAR(500);
ALTER TABLE users
    ADD COLUMN rating DOUBLE PRECISION DEFAULT 5.0;

ALTER TABLE users
    ADD CONSTRAINT check_rating_range
        CHECK (rating >= 1.0 AND rating <= 5.0);