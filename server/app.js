'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./db/db.js');
const app = express();
const port = process.env.PORT || 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// Connect to the database
connect();

// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);