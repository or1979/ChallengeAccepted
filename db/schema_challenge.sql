DROP DATABASE IF EXISTS challenge_DB;
USE challenge_DB;
CREATE TABLE challenge
(
    id INT NOT NULL AUTO_INCREMENT,
    url_route VARCHAR(200) NULL,
    PRIMARY KEY (id)
);

