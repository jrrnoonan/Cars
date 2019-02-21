To open this app direct the command prompt to the main directory, and type npm start or yarn start. 

To start the server once again direct the command prompt to the main directory. I have nodemon installed globally on my computer and 
used it as the server throughout development. If you don't have nodemon installed node server will work. 
Type node server.js or nodemon server.js in the command prompt after you directed to the main directory to start the server.
The servel will lauch on localhost:8081


Enter the following MYsql statement into mySQL to create the necessary table. The app is presently set up to connect to the localhost with a databse names cars, 
a user named root, and blank password . This can be changed by opening server.js and editing the connection information at the top of the file.:


CREATE TABLE `cars` (
  `car_id` int(50) NOT NULL AUTO_INCREMENT,
  `car_make` varchar(50) DEFAULT NULL,
  `car_model` varchar(100) DEFAULT NULL,
  `car_year` varchar(50) DEFAULT NULL,
  `car_kilometers` varchar(100) DEFAULT NULL,
  `car_vin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`car_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;