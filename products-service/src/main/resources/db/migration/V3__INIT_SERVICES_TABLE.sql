CREATE TABLE services
(
    id        UUID         NOT NULL PRIMARY KEY,
    text      VARCHAR(255) NOT NULL,
    advert_id UUID         NOT NULL,
    CONSTRAINT fk_services_on_advert FOREIGN KEY (advert_id) REFERENCES adverts (id) ON DELETE CASCADE
);