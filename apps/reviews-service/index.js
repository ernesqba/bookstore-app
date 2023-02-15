const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/reviews/book/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM reviews WHERE book_id = ?',
      [bookId]
    );

    res.status(200).send({reviews: rows});
  } catch (error) {
    console.error('Error getting reviews', error);
    res.status(500).send('Error getting reviews');
  }
});

app.post('/reviews/book/:id', async (req, res) => {
  const book_id = req.params.id;
  const { user_id, rating, comments, color } = req.body;

  try {
    await pool.query(
      'INSERT INTO reviews (user_id, book_id, rating, comments, color) VALUES (?, ?, ?, ?, ?)',
      [user_id, book_id, rating, comments, color]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error('Error creating review', error);
    res.status(500).send('Error creating review');
  }
});

app.use(['/$', '/health'], (_, res) => {
    return res.status(200).send({uptime: process.uptime()});
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});