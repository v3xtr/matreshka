CREATE TABLE work_period
(
    id        UUID    NOT NULL PRIMARY KEY,
    from_day  INT     NOT NULL,
    to_day    INT     NOT NULL,
    from_time VARCHAR(50),
    to_time   VARCHAR(50),
    is24h     BOOLEAN NOT NULL DEFAULT FALSE,
    advert_id UUID    NOT NULL,
    CONSTRAINT fk_work_period_on_advert FOREIGN KEY (advert_id) REFERENCES adverts (id) ON DELETE CASCADE
);