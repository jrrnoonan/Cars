const routes = require('express').Router();
const mysql = require('mysql');


const connection =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'cars'
    });
    

routes.get('/', function(req, res){

    //mysql statement to be sent to database  
    const read_R = 'SELECT * FROM cars';   
   
        
      //connecting to mysql database and sending mysql statement
       connection.query(read_R, function(err, data){
        if(err) throw err;
        else {
            res.send(JSON.stringify(data));
        }
      });
      
    });

    module.exports =routes;
  