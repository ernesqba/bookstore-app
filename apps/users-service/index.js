const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

app.use(bodyParser.json());

app.get('/users', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, email, password FROM users');
    rows.forEach(row => {delete row.password})

    return res.status(200).send({users: rows});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred getting the users' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT user_id, email, password FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while logging in' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(409).send({ message: 'Email address is already in use' });
    }

    await pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)', [email, password, first_name, last_name]);
    const [rows2] = await pool.query('SELECT user_id, email, password FROM users WHERE email = ?', [email]);

    res.status(201).send({user: rows2[0]})
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while creating user account' });
  }
});

app.use(['/$', '/health'], (_, res) => {
    return res.status(200).send({uptime: process.uptime()});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});