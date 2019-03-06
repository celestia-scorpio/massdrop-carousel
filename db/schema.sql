BEGIN; 
CREATE TABLE IF NOT EXISTS pics (prod_id SERIAL PRIMARY KEY, urls JSONB); 
/*TRUNCATE TABLE pics;*/
COPY pics (urls) FROM '/home/ross/Bootcamp/Galvanize/part2/SDC/massdrop-carousel/data.txt';

/*
CREATE TABLE item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name VARCHAR
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  img_url VARCHAR,
  item_id INTEGER,
  FOREIGN KEY (item_id) REFERENCES item(id)
);
*/