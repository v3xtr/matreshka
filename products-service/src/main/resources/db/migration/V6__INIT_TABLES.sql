CREATE TABLE IF NOT EXISTS work_period
(
    id        VARCHAR(255) NOT NULL,
    from_day  INTEGER      NOT NULL,
    to_day    INTEGER      NOT NULL,
    from_time VARCHAR(255),
    to_time   VARCHAR(255),
    is24h     BOOLEAN      NOT NULL,
    advert_id VARCHAR(255) NOT NULL,
    CONSTRAINT pk_work_period PRIMARY KEY (id)
);

ALTER TABLE work_period
    ADD CONSTRAINT FK_WORK_PERIOD_ON_ADVERT FOREIGN KEY (advert_id) REFERENCES adverts (id);