create database game1;

use game1;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  password varchar(75) DEFAULT NULL,
  gameNumber int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE room (
  id INT NOT NULL AUTO_INCREMENT,
  game_id VARCHAR(20) NOT NULL,
  creator INT NOT NULL,
  PRIMARY KEY (id,game_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8