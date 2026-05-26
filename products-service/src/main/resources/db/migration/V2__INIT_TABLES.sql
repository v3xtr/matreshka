CREATE TABLE IF NOT EXISTS  pictures
(
    id          VARCHAR(255) NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    advert_id   VARCHAR(255) NOT NULL,
    CONSTRAINT pk_pictures PRIMARY KEY (id)
);

ALTER TABLE pictures
    ADD CONSTRAINT FK_PICTURES_ON_ADVERT FOREIGN KEY (advert_id) REFERENCES adverts (id);