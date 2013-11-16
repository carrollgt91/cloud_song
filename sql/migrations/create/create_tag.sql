USE cloudsong;
DROP TABLE IF EXISTS tag;
CREATE TABLE tag(
  name VARCHAR(128),
  PRIMARY KEY (name)
);