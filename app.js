
var express = require('express');
var bodyParser = require('body-parser');
var  cors = require('cors');
// var db = require('./db');
const db = require('./yugabyte') // importing pg config

var app = express()
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());



// app.get('/users',(req,res) => {
//   db.connect((err) => {
//     if (err) {
//         throw err;
//     }  
//     console.log('Connected to MySQL database!');
//     db.query("SELECT * FROM login_users", function (err, result, fields) {
//       if (err) throw err;
//      let userData = {
//         success : true,
//         data: result
//       };
//         res.send(userData);
//       });
//   });
// })


// app.post('/add', (req, res) => {
//   const data = req.body; 
//   db.connect((err, db) => {
//       if (err) throw err;
//       console.log('Connected to MySQL database!');
//   const sql = "INSERT INTO `login_users` (`first name`, `last name`, `phone`, `email`) VALUES (?, ?, ?, ?)";
//   db.query(sql, [data["first_name"], data["last_name"], data["phone"], data["email"]], (err, result) => {
//         if (err) throw err
//       });
//   });
//   console.log('Added Successfuly!!!');
//   res.send('1 record inserted successfully');
// });

// app.put('/update', (req, res) => {
//   const data = req.body;
//   db.connect((err, connection) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
//     const sql = `UPDATE authentication.login_users SET \`first name\` = 'Nandimandalam Sivakumar ', \`last name\` = 'Raju' WHERE \`phone\` ='${data.phone}'`;
//     connection.query(sql, [data["first_name"], data["last_name"], data["phone"]], (err, result) => {
//       if (err) {
//         throw err;
//       }
//       console.log('Updated successfully!!!');
//       res.send('1 record updated successfully');
//     });
//   });
// });




// app.post('/delete', (req, res)=>{
//   const id = req.body;
//   db.connect((err, db) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
  
//     const sql = `DELETE FROM authentication.login_users WHERE phone = '${id.phone}'`;
//     db.query(sql, (err, result) => {
//       if (err) throw err;
//     });
//   });
//   console.log('Removed Successfuly!!!');
//   res.send('1 record removed successfully');
// })

app.get('/users', (req, res) => {
  // Write your SQL query
  const sqlQuery = 'SELECT * FROM logins';

  // Execute the SQL query
  db.query(sqlQuery, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    } else {
      // Send the query result as JSON response
      res.json(result.rows);
    }
  });
});


app.post('/add',(req,res)=>{
// SQL query to create a table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS logins (
    id serial PRIMARY KEY,
    first_name VARCHAR(255),
    second_name VARCHAR(255),
    phone VARCHAR(20)
  )
`;

// Connect to the database and execute the query
db.query(createTableQuery, (error, results) => {
  if (error) {
    console.error('Error creating table:', error);
    res.send(error);
  } else {
    console.log('Table created successfully');
    res.send(results);
  }

  // Close the database connection
  db.end();

});

})

var server = app.listen(3000, () =>{
console.log("server is listening on port", server.address().port);
})






