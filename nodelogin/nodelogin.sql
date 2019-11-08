CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` ( `username`, `password`) VALUES ('test', 'test');

ALTER TABLE `accounts` ADD PRIMARY KEY (`username`);
ALTER TABLE `accounts` MODIFY `username` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;