var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

// Port to connect to
var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();
// Express router
var router = express.Router();
// require routes file
require("./config/routes")(router);

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine","handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));

// Router middleware
app.use(router);

// Mongo DB connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log("mongoose connection successful!")
    }
});



// Use morgan logger for logging requests
// app.use(logger("dev"));
// app.use(express.json());



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });