USE cloudsong;

ALTER TABLE songs DROP COLUMN track_url;
ALTER TABLE songs ADD COLUMN track_id INT unsigned NOT NULL;