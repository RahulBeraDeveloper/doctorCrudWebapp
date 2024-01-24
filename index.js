// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctor_db'
});

db.connect();

// CRUD operations

// Add a doctor
app.post('/api/doctors', (req, res) => {
  const { name, email, specialization } = req.body;
  const sql = 'INSERT INTO doctors (name, email, specialization) VALUES (?, ?, ?)';
  db.query(sql, [name, email, specialization], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Get all doctors
app.get('/api/doctors', (req, res) => {
  const sql = 'SELECT * FROM doctors';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update a doctor
app.put('/api/doctors/:id', (req, res) => {
  const { name, email, specialization } = req.body;
  const sql = 'UPDATE doctors SET name=?, email=?, specialization=? WHERE id=?';
  db.query(sql, [name, email, specialization, req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Delete a doctor
app.delete('/api/doctors/:id', (req, res) => {
  const sql = 'DELETE FROM doctors WHERE id=?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
