const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(helmet());
// авторизация
app.use(auth);

app.disable('x-powered-by');

app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {});
