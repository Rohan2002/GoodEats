CREATE DATABASE GoodEats;
USE GoodEats;
SET SQL_SAFE_UPDATES = 0;
show databases; -- Check Databases
CREATE TABLE IF NOT EXISTS users(
	id INT NOT NULL AUTO_INCREMENT,
	email varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
	age INT not null,
    weight INT not null,
    height INT not null,
    signup_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_online_date datetime default null,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE users ADD UNIQUE KEY `email`(`email`);

/* Test Commands */
-- INSERT INTO users(email, password, age, weight, height,last_online_date) VALUES('20rd094@wwprsd.org', 'Rohan2002', 18, 150, 180, current_timestamp());
-- TRUNCATE TABLE users; Restart Auto Increment from one
-- select * from users;
-- DELETE from users;
/* End Test Commands */