require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const session = require('express-session')
const passport = require('passport');

var db = require("./models");

var app = express();
//Passport config
require('./config/passport')(passport);
var PORT = process.env.PORT || 3000;


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));



//Express Session
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;


