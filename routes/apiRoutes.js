var db = require("../models");
const passport = require('../config/passport');

module.exports = function (app) {

  //when a login request is made, we use passport to authenticate, if successful, we send back a json of the users data.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Register an account. 
  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's data
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        username: req.user.username,
        first_name: req.user.firstname,
        last_name: req.user.lastname,
      });
    };
  });
};
