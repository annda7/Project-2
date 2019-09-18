var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load home page
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/home")
    }
    res.render("landing");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/home")
    }
    res.render("login");
  });

  app.get("/register", function (req, res) {
    if (req.user) {
      res.redirect("/home")
    }
    res.render("register");
  });

  app.get("/home", isAuthenticated, function (req, res) {
    console.log(req.user);
    res.render("index", {user: req.user});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404").send();
  });
};
