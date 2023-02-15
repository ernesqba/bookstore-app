const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
  secret: process.env.SECRET || 'my-secret',
  resave: false,
  saveUninitialized: true,
}));

app.engine('hbs', handlebars.engine({extname: 'hbs', defaultLayout: null, helpers: {
  gt: function(a, b, options) {
    if (a > b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  formatDate: function(date) {
    return date.split('T')[0]
  }
}}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersUrl = process.env.USERS_URL || 'http://localhost:3000';
const booksUrl = process.env.BOOKS_URL || 'http://localhost:3001';
const reviewsUrl = process.env.REVIEWS_URL || 'http://localhost:3002';


// Define the routes
app.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const {books} = (await axios.get(`${booksUrl}/books`)).data;
    await Promise.all(books.map(async (book) => {
      const {reviews} = (await axios.get(`${reviewsUrl}/reviews/book/${book.book_id}`)).data;
      book.reviews = reviews
      return book;
    }));
    return res.render('home', { user: req.session.user, books });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/book/:id', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const { id } = req.params;

    const {books} = (await axios.get(`${booksUrl}/books`)).data;
    const book = books.find(book => book.book_id == id);

    const {reviews} = (await axios.get(`${reviewsUrl}/reviews/book/${id}`)).data;
    const {users} = (await axios.get(`${usersUrl}/users`)).data
    
    reviews.forEach(review => {
      review.user = users.find(user => user.user_id = review.user_id)
    })
    
    book.reviews = reviews;
    
    res.render('book-details', { user: req.session.user, book, stars: [1, 2, 3, 4, 5] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/book/:id/review', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const { id } = req.params;
    const {rating, comments} = req.body

    await axios.post(`${reviewsUrl}/reviews/book/${id}`, {rating, comments, user_id: req.session.user.user_id, color: 1})

    
    res.redirect('/book/' + id)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (_, res) => {
  return res.render('login');
});

app.post('/login', async (req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;

    const response = await axios.post(`${usersUrl}/login`, {email, password});
      req.session.user = {...response.data, password: undefined};
      return res.redirect('/');
    
  } catch(err) {
    if(err.response?.status <= 500){
      return res.render('login', { error: err.response?.data?.message });
    }
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/signup', (_, res) => {
  return res.render('signup');
});

app.post('/signup', async (req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const {user} = (await axios.post(`${usersUrl}/signup`, {email, password, first_name, last_name})).data;
      req.session.user = {...user, password: undefined};
      return res.redirect('/');
    
  } catch(err) {
    if(err.response?.status <= 500){
      return res.render('signup', { error: err.response?.data?.message });
    }
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.session?.destroy();
  res.redirect('/login');
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});