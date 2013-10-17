USE cloudsong;

ALTER TABLE artists ADD COLUMN encrypted_password VARCHAR(64) NOT NULL;

