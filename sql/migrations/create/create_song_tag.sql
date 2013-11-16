USE cloudsong;
CREATE TABLE song_tag (
  song_id INT NOT NULL REFERENCES song(id),
  tag_name VARCHAR(128) NOT NULL REFERENCES tag(name)
);