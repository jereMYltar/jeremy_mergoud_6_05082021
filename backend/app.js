const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const helmet = require('helmet');


const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users');

//MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLL}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//helmet
app.use(helmet());

//rate-limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//CORS implementation
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //l'étoile remplace l'adresse IP du frontend
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;