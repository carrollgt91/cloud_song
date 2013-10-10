USE cloudsong;

DROP TABLE IF EXISTS artists;
CREATE TABLE artists(
  id INT unsigned,
  name VARCHAR(256),
  location VARCHAR(256),
  tagline VARCHAR(1024),
  contact VARCHAR(256),
  website_url VARCHAR(512),
  PRIMARY KEY (id),
  UNIQUE (name)
);