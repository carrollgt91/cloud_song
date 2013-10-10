USE cloudsong;
CREATE TABLE Songs_Tags (
  song_id INT NOT NULL REFERENCES songs(id),
  tag_name VARCHAR(128) NOT NULL REFERENCES tags(name)
);