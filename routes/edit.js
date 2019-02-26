//requiring express with routet middlewate. all server request must begin with routes(the variable name)
//also, make sure you export the variable at the bottom
const routes = require('express').Router();
const mysql = require('mysql');

//Information for connection to mysql database
const connection =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'cars'
    });
    
// Post request that edits the car information in the database
    routes.post('/edit', function (req, res) {
        //putting information from post request into variables that can be used in mysql statement
        const car_id = req.body.car_id;
        const car_make = req.body.car_make;
        const car_model = req.body.car_model;
        const car_year = req.body.car_year;
        const car_kilometers = req.body.car_kilometers;
        const car_vin = req.body.car_vin;
        //mysql statement to be sent to database
        const insert_U = 'UPDATE cars set car_make = ?, car_model =?, car_year = ?, car_kilometers = ?, car_vin = ? WHERE car_id= ?';
      
               
        //Connecting to mysql database and sending query
        connection.query(insert_U,[car_make, car_model, car_year, car_kilometers,car_vin, car_id], 
      
        function(err,response){
        if(err) throw err;
        else {
            //Sending message to server that edit was successful
            console.log('Details edited successfully');
            //sending message to app informing user that details were edited successfully
            res.send(JSON.stringify('Details edited successfully'));
        }
      });
      
      });	
//exporting the server request
    module.exports =routes;
  