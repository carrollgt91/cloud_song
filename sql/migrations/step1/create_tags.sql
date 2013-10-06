USE cloudsong;
DROP TABLE IF EXISTS tags;
CREATE TABLE tags(
  name VARCHAR(128),
  PRIMARY KEY (name)
);