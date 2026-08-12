ALTER TABLE views
    DROP CONSTRAINT fk_views_on_video;

ALTER TABLE views
    ADD CONSTRAINT fk_views_on_video FOREIGN KEY (video_id) REFERENCES videos (id) ON DELETE CASCADE;
