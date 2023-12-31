///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();
require('./config/db.connection.js')

const usersRouter = require('./routes/users')
const casesRouter = require('./routes/cases')

const cors = require("cors")
const morgan = require("morgan")


// const favicon = require('serve-favicon')


// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;


// import express
const express = require("express");

// create application object
const app = express();

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.urlencoded({extended:true}))
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router

app.use(require('./config/checkToken'));


// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));


app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

///////////////////////////////
// ROUTES
////////////////////////////////

// all requests for endpoints that begin with '/users'
app.use('/users', usersRouter)
app.use('/cases', casesRouter)


app.get("/", (req, res) => {
    res.send("hello world");
});


// app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));