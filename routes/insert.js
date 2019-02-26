const routes = require('express').Router();
const mysql = require('mysql');


const connection =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'cars'
    });
    

    routes.post('/insert', function (req, res) {

        const car_make = req.body.car_make;
        const car_model = req.body.car_model;
        const car_year = req.body.car_year;
        const car_kilometers = req.body.car_kilometers;
        const car_vin = req.body.car_vin;
        //mysql statement to be sent to database
        const insert_R = 'INSERT INTO cars(car_make, car_model,car_year, car_kilometers, car_vin) VALUE(?,?,?,?,?)';

        //connecting to mysql database and sending query
        connection.query(insert_R,[car_make, car_model, car_year, car_kilometers, car_vin], 
    
        function(err,response){
        if(err) throw err;
        else {
            res.send(JSON.stringify('Details added successfully')); 
            console.log('Details added successfully');
        }
      });
    
    
     
    });	

    module.exports =routes;
  