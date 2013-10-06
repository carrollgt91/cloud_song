USE cloudsong;
DROP TABLE IF EXISTS lists;
CREATE TABLE lists(
  id INT,
  title VARCHAR(256),
  owner_id INT REFERENCES artists(id),
  PRIMARY KEY (id)
);