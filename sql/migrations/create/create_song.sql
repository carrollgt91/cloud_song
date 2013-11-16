USE cloudsong;
DROP TABLE IF EXISTS song;

CREATE TABLE song (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(256),
  likes INT,
  artist_id INT NOT NULL,
  PRIMARY KEY (id),
  
  FOREIGN KEY (artist_id)
    REFERENCES artist(id)
    ON DELETE CASCADE
);
