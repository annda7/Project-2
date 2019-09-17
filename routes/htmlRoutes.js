
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load home page
  app.get("/", function(req, res) {
    if(req.user){
      res.redirect("/home")
    }
    res.render("landing");
  });

    app.get("/login", function(req, res) {
      if(req.user){
        res.redirect("/home")
      }
      res.render("login");
  });


  app.get("/register", function(req, res) {
    if(req.user){
      res.redirect("/home")
    }
    res.render("register");
  });


  app.get("/home", isAuthenticated, function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
