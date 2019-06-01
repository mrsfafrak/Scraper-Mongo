var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Port to connect to
var PORT = process.env.PORT || 3000;

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
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(router);

// Mongo DB connection
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log("mongoose connection successful!")
    }
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });