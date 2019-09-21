var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function (app) {
  // Load home page
  app.get("/", function (req, res) {
    if (req.user) {
      return res.redirect("/home")
    }
    res.render("landing");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      return res.redirect("/home");
    }
    res.render("login");
  });

  app.get("/register", function (req, res) {
    if (req.user) {
      return res.redirect("/home")
    }
    res.render("register");
  });

  app.get("/home", isAuthenticated, function (req, res) {
    //DB query to look into the todo table and get the to do items where createby = req.user.username
    db.toDo
      .findAll({
        where: {
          createdBy: req.user.username
        }
      })
      .then(function(results) {
        console.log(results);
        res.render("index", {
          user: req.user,
          todo: results
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404").send();
  });
};
