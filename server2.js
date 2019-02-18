var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());

var connection =  mysql.createConnection({
host : 'localhost',
user : 'root',
password: '',
database: 'cars'
});

var connect =  mysql.createPool({
  host : 'localhost',
  user : 'root',
  password: '',
  database: 'cars'
  });


  connection.connect();

app.post('/', function (req, res) {

    var car_make = req.body.car_make;
    var car_model = req.body.car_model;
    var car_year = req.body.car_year;
    var car_vin = req.body.car_vin;
    var insert_R = 'INSERT INTO cars(car_make,car_model,car_year,car_vin) VALUE(?,?,?,?)';

    //Connect to Database
    
  //Inserting a record into details

    connection.query(insert_R,[car_make, car_model, car_year, car_vin], 

    function(err,res){
    if(err) throw err;
    else {
        console.log('Details added successfully');
    }
  });

//releasing connection
 
});	

app.get('/read', function(req, res){


  var read_R = 'SELECT * FROM cars';
  //establishing connection
 
      
    //retrieving a record from details
     connection.query(read_R, function(err, data){
      if(err) throw err;
      else {
          res.send(JSON.stringify(data));
      }
    });
  
  //releasing connection
 
  
  });

app.post('/edit', function (req, res) {
  var car_id = req.body.car_id;
  var car_make = req.body.car_make;
  var car_model = req.body.car_model;
  var car_year = req.body.car_year;
  var car_vin = req.body.car_vin;
  var insert_U = 'UPDATE cars set car_make = ?, car_model =?, car_year = ?, car_vin = ? WHERE car_id= ?';

  //Connect to Database
   
//Inserting a record into details

  connection.query(insert_U,[car_make, car_model ,car_year ,car_vin, car_id], 

  function(err,res){
  if(err) throw err;
  else {
      console.log('Details edited successfully');
  }
});

//releasing connection

});	

app.post('/delete', function (req, res) {
  var car_id = req.body.car_id;
    var insert_D = 'DELETE FROM cars WHERE car_id = ?';

  //Connect to Database
  


  connection.query(insert_D,[car_id], 

  function(err,res){
  if(err) throw err;
  else {
      console.log('Details deleted successfully');
  }
});

//releasing connection

});	  





var server = app.listen(8081, function () {

    var host = server.address().address

    var port = server.address().port

    

    console.log("Example app listening at http://%s:%s", host, port)

 })

	