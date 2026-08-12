CREATE TABLE media
(
    id           VARCHAR(255) NOT NULL PRIMARY KEY,
    cdn_url      VARCHAR(512),
    type         VARCHAR(50),
    mime_type    VARCHAR(100),
    user_id      VARCHAR(255),
    advert_id    UUID,
    published_at TIMESTAMP WITHOUT TIME ZONE,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT fk_media_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT fk_media_on_advert FOREIGN KEY (advert_id) REFERENCES adverts (id) ON DELETE SET NULL
);