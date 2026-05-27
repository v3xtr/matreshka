ALTER TABLE adverts ADD COLUMN IF NOT EXISTS is_in_elastic BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_adverts_elastic_pending
    ON adverts (id)
    WHERE is_in_elastic IS FALSE;