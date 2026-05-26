CREATE TABLE IF NOT EXISTS videos
(
    id           VARCHAR(255) NOT NULL,
    cdn_url      VARCHAR(255),
    type         VARCHAR(255),
    mime_type    VARCHAR(255),
    user_id      VARCHAR(255),
    advert_id    VARCHAR(255),
    published_at TIMESTAMP WITHOUT TIME ZONE,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_videos PRIMARY KEY (id)
);

ALTER TABLE videos
    ADD CONSTRAINT uc_videos_advert UNIQUE (advert_id);

ALTER TABLE videos
    ADD CONSTRAINT FK_VIDEOS_ON_ADVERT FOREIGN KEY (advert_id) REFERENCES adverts (id);

ALTER TABLE videos
    ADD CONSTRAINT FK_VIDEOS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);