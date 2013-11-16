USE cloudsong;
DROP TABLE IF EXISTS list;
CREATE TABLE list(
  id INT,
  title VARCHAR(256),
  artist_id INT REFERENCES artist(id),
  PRIMARY KEY (id)
);