USE cloudsong;
CREATE TABLE list_song (
list_id INT NOT NULL,  
song_id INT NOT NULL,  
PRIMARY KEY (list_id,song_id),  
FOREIGN KEY (list_id) REFERENCES list(id) ON UPDATE CASCADE,  
FOREIGN KEY (song_id) REFERENCES song(id) ON UPDATE CASCADE);