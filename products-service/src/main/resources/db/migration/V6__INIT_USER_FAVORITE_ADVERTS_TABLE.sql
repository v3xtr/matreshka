CREATE TABLE user_favorite_adverts
(
    user_id   VARCHAR(255) NOT NULL,
    advert_id UUID         NOT NULL,
    CONSTRAINT pk_user_favorite_adverts PRIMARY KEY (user_id, advert_id),
    CONSTRAINT fk_userafav_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_userafav_on_advert FOREIGN KEY (advert_id) REFERENCES adverts (id) ON DELETE CASCADE
);