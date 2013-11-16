USE cloudsong;

ALTER TABLE song ADD COLUMN track_url VARCHAR(256) NOT NULL;

ALTER TABLE  `song` ADD FOREIGN KEY (  `artist_id` ) REFERENCES  `cloudsong`.`artist` (
`id`
) ON DELETE CASCADE ON UPDATE CASCADE ;