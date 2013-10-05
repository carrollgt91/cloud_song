USE cloudsong;
DROP TABLE IF EXISTS lists;
CREATE TABLE lists(
  id INT unsigned,
  title VARCHAR(256),
  owner_id INT unsigned,
  PRIMARY KEY (id)
);