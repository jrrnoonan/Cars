const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require('mysql');
//Path to Read Route
const read = require('./routes/read');
//Path to Insert Route
const insert = require('./routes/insert');
//Path to delete route
const del = require('./routes/delete');
//Path to edit route
const edit = require('./routes/edit')

  

app.use(bodyParser.json());

//Tells the server to include the read, insert, delete, and edit paths outlines above
app.use('/', read, insert, del, edit);


//Connection Information for Mysql database
const connection =  mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: '',
  database: 'cars'
  });
  
  
  //Below a test connection is done when the server is started.
  //If connected, the server say Mysql connected, if failed it will throw an error
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

//Starts the server at port 8081 
const server = app.listen(8081, function () { 

    const host = server.address().address

    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

 })

	