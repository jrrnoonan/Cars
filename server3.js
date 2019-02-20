var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());

//Connection Information
var connection =  mysql.createPool({
host : 'localhost',
user : 'root',
password: '',
database: 'cars'
});


//Connecting to the Database
  connection.getConnection((err) =>{
    if (err) throw err;
    console.log('Mysql connected');
  });

//Route for inserting cars to the database  
app.post('/', function (req, res) {

    var car_make = req.body.car_make;
    var car_model = req.body.car_model;
    var car_year = req.body.car_year;
    var car_vin = req.body.car_vin;
    var insert_R = 'INSERT INTO cars(car_make,car_model,car_year,car_vin) VALUE(?,?,?,?)';

    connection.query(insert_R,[car_make, car_model, car_year, car_vin], 

    function(err,response){
    if(err) throw err;
    else {
        res.send(JSON.stringify('Details added successfully')); 
        console.log('Details added successfully');
    }
  });


 
});	

//Route for getting information from the database
app.get('/read', function(req, res){


  var read_R = 'SELECT * FROM cars';
  
 
      
    //retrieving a record from details
     connection.query(read_R, function(err, data){
      if(err) throw err;
      else {
          res.send(JSON.stringify(data));
      }
    });
    
  });

  //Route for editing record from the database
app.post('/edit', function (req, res) {
  var car_id = req.body.car_id;
  var car_make = req.body.car_make;
  var car_model = req.body.car_model;
  var car_year = req.body.car_year;
  var car_vin = req.body.car_vin;
  var insert_U = 'UPDATE cars set car_make = ?, car_model =?, car_year = ?, car_vin = ? WHERE car_id= ?';

    


  connection.query(insert_U,[car_make, car_model ,car_year ,car_vin, car_id], 

  function(err,response){
  if(err) throw err;
  else {
      console.log('Details edited successfully');
      res.send(JSON.stringify('Details edited successfully'));
  }
});

});	

//Route for deleting a car from the database
app.post('/delete', function (req, res) {
  var car_id = req.body.car_id;
    var insert_D = 'DELETE FROM cars WHERE car_id = ?';

  connection.query(insert_D,[car_id], 

  function(err,response){
  if(err) throw err;
  else {
      console.log('Details deleted successfully');
      res.send(JSON.stringify('Car Profile was deleted'));
  }
});

});	  

//Server connection information. Server is available at localhost:8081
var server = app.listen(8081, function () {

    var host = server.address().address

    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

 })

	