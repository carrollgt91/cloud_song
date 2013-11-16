USE cloudsong;

ALTER TABLE artist ADD COLUMN encrypted_password VARCHAR(64) NOT NULL;

