const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/books', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books');
    return res.status(200).send({books: rows})
  } catch (error) {
    console.error('Failed to get books:', error);
    res.status(500).send('Failed to get books');
  }
});

app.use(['/$', '/health'], (_, res) => {
    return res.status(200).send({uptime: process.uptime()});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});