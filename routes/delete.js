const routes = require('express').Router();
const mysql = require('mysql');

//connection information for mySql database
const connection =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'cars'
    });
    
    //post request to delete data from database
    routes.delete('/delete', function (req, res) {
        const car_id = req.body.car_id;
        //mysql statement to be sent to database
          const insert_D = 'DELETE FROM cars WHERE car_id = ?';
        //connecting to mysql database and sending query
        connection.query(insert_D,[car_id], 
      
        function(err,response){
        if(err) throw err;
        else {
            console.log('Details deleted successfully');
            res.send(JSON.stringify('Car Profile was deleted'));
        }
      });
      
      });

    module.exports =routes;
  