USE cloudsong;
DROP TABLE IF EXISTS list;
CREATE TABLE list(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(256),
  artist_id INT NOT NULL,
  FOREIGN KEY (artist_id)
    REFERENCES artist(id)
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);