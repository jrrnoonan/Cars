const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

//Connection Information
const connection =  mysql.createPool({
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

    const car_make = req.body.car_make;
    const car_model = req.body.car_model;
    const car_year = req.body.car_year;
    const car_kilometers = req.body.car_kilometers;
    const car_vin = req.body.car_vin;
    const insert_R = 'INSERT INTO cars(car_make, car_model,car_year, car_kilometers, car_vin) VALUE(?,?,?,?,?)';

    connection.query(insert_R,[car_make, car_model, car_year, car_kilometers, car_vin], 

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


  const read_R = 'SELECT * FROM cars';
  
 
      
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
  const car_id = req.body.car_id;
  const car_make = req.body.car_make;
  const car_model = req.body.car_model;
  const car_year = req.body.car_year;
  const car_kilometers = req.body.car_kilometers;
  const car_vin = req.body.car_vin;
  const insert_U = 'UPDATE cars set car_make = ?, car_model =?, car_year = ?, car_kilometers = ?, car_vin = ? WHERE car_id= ?';

    


  connection.query(insert_U,[car_make, car_model, car_year, car_kilometers,car_vin, car_id], 

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
  const car_id = req.body.car_id;
    const insert_D = 'DELETE FROM cars WHERE car_id = ?';

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
const server = app.listen(8081, function () { 

    const host = server.address().address

    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

 })

	