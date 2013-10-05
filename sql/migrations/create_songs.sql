USE cloudsong;
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(256),
  likes INT,
  artist_id INT NOT NULL,
  PRIMARY KEY (id),
  
  FOREIGN KEY (artist_id)
    REFERENCES artists(id)
    ON DELETE CASCADE
);
