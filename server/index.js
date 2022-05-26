const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

// database that holds our employee information
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employeesystem'
})

// create new values in our database
app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)',
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    );

})

// get values from our database
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees',
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result);
            }
        }
    )
})

// update values in our database
app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    )
});

// delete values in our database
app.delete('/delete/:id', (req, res) => {
    // unlike the other endpoints, 
    //we are getting the id variable in the PARAMS passed by the client side,
    //NOT the body
    const id = req.params.id;
    db.query('DELETE FROM employees WHERE id = ?', id,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})


app.listen(3001, () => {
    console.log("server is running on port 3001");
})