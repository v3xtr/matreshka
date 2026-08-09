CREATE TABLE pictures
(
    id          UUID         NOT NULL PRIMARY KEY,
    picture_url VARCHAR(512) NOT NULL,
    advert_id   UUID         NOT NULL,
    CONSTRAINT fk_pictures_on_advert FOREIGN KEY (advert_id) REFERENCES adverts (id) ON DELETE CASCADE
);