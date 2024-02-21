const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require("dotenv").config();

// console.log(process.env.host)
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.get('/', (req, res)=>{
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, rows)=>{
        if(err) return res.json(err);
        return res.json(rows);
    })
})

app.post('/add_user', (req, res)=>{
    const sql = "INSERT INTO employee (`Name`, `EmployeeID`, `Department`, `DOB`, `Gender`, `Designation`,`Salary`) VALUES (?,?,?,?,?,?,?)";
    const values = [
      req.body.Name,
      req.body.EmployeeID,
      req.body.Department,
      req.body.DOB,
      req.body.Gender,
      req.body.Designation,
      req.body.Salary,
    ];
    db.query(sql, values, (err, rows)=>{
        if(err) return res.json({message: "Something occur error " + err});
        return res.json({success: "Inserted " + rows});
    })
})


app.listen(5000, ()=>{
    console.log("listening on port");
})