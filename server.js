// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const usersApiRoutes = require('./routes/users-api');
const mapsApiRoutes = require('./routes/maps-api');
const favouriteMapsApiRoutes = require('./routes/favourite-maps-api');
const placesApiRoutes = require('./routes/places-api');
const usersRoutes = require('./routes/users');
const mapsRoutes = require('./routes/maps');
const favouriteMapsRoutes = require('./routes/favourite-maps');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', usersApiRoutes);
app.use('/api/maps', mapsApiRoutes);
app.use('/api/favourite-maps', favouriteMapsApiRoutes);
app.use('/api/places', placesApiRoutes);
app.use('/users', usersRoutes);
app.use('/maps', mapsRoutes);
app.use('/favourite-maps', favouriteMapsRoutes);

// Home page
app.get('/', (req, res) => {
  res.redirect('/maps');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
