-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by evgenijtitovskij at 19-01-2021 00:07.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE room
DROP TABLE IF EXISTS room;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` varchar(20) NOT NULL,
  `creator` int NOT NULL,
  PRIMARY KEY (`id`,`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Inserting 2 rows into room
-- Insert batch #1
INSERT INTO room (id, game_id, creator) VALUES
(1, 'hq0508wd6f', 1),
(4, 'ygmwri4m0l', 7);

-- END TABLE room

-- BEGIN TABLE user
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(75) DEFAULT NULL,
  `gameNumber` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Inserting 4 rows into `user`
-- Insert batch #1
INSERT INTO `user` (id, username, email, password, gameNumber) VALUES
(1, 'Mark', 'markG@gmail.com', 'vfkhbsvm ajvbsm sascb', 0),
(5, 'a0464744', 'mifeex@gmail.com', '$2b$10$DomzsfQDDXcyrAlb4wfna.Q13KuERbzhWGvai7AC.uZqr1iwPigzu', 0),
(6, '', '', '$2b$10$TSiv54IURen0fQ7OsSRFMuJ9IPouNJRNi.T5FLljUVp8r0TOcvrFG', 0),
(7, 'root', 'tusink-265@yahoo.com', '$2b$10$GJJQfslRV36exAE0.xnAauoj9ZVApJte9sYzrzffWetsHR5glriIG', 4);

-- END TABLE user

