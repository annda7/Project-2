var db = require("../models");

module.exports = function(app) {
  // Load home page
  // app.get("/", function(req, res) {
  //   res.render("login");
  // });

    app.get("/login", function(req, res) {
    res.render("login");
  });  

  // Load example page and pass in an example by id
  app.get("/register", function(req, res) {
    res.render("register");
  });

  // Load example page and pass in an example by id
  app.get("/home", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
