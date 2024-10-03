const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser"); // Import body-parser to handle JSON requests
const port = 5000;
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//database connecting credentials

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Aadharv17@#',
    database:'aivagam',
    multipleStatements: true
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Display all employee
app.get('/employee', (request, response) => {
  connection.query('SELECT * FROM topgrep', (error, result) =>{
    if (error) throw error;

    response.send(result)
  });
});

// Display an employee
app.get('/employee/:id', (request, response) => {
  connection.query('SELECT * FROM topgrep WHERE emp_id = ?', [request.params.id], (error, result) =>{
    if (error) throw error;

    response.send(result)
  });
});


//post
app.post('/employee', (request, response) => {
  let emp = request.body;
  var sql = "INSERT INTO topgrep(emp_id, emp_name, dept, email_id, salary, phone_no) VALUES (?, ?, ?, ?, ?, ?);"; 
  
  connection.query(sql, [emp.emp_id, emp.emp_name, emp.dept, emp.email_id, emp.salary, emp.phone_no], (error, result) => {
    if (error) {
      console.error(error);  
      return response.status(500).send('Error occurred'); 
    }
    response.send(emp);  
  });
});


//Patch
app.patch('/employee/:id', (request, response) => {
  let emp = request.body;
  console.log(request.body)

  var sql = "UPDATE topgrep SET emp_name = ?, dept = ?, email_id = ?, salary = ?, phone_no = ? WHERE emp_id = ?";

  connection.query(sql, [emp.emp_name, emp.dept, emp.email_id, emp.salary, emp.phone_no,request.params.id], (error, result) => {
    if (error) {
      console.error(error);
      return response.status(500).send('Error updating employee');

    }
    response.send(emp);
  });
});


// Delete
app.delete('/employee/:id', (request, response) => {
  connection.query('DELETE FROM topgrep WHERE emp_id = ?', [request.params.id], (error, result) =>{
    if (error) throw error;
    
    response.send(result)
    response.send('Deleted Successfully!')
  });
}); 
