var db = require("../models");
const bcrypt = require('bcryptjs')
const passport = require('passport');
module.exports = function (app) {
  // Register Account
  app.post("/register/new", function (req, res) {
    const user = req.body
    let password = req.body.password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'+ hash)
         db.Users.create({
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          password: hash
        }).then(function (results) {
          console.log('##############################' + password)
          res.redirect('/register')
        })
      })
    })
  });

  //Login Check
  app.post('/login/check',function(req,res,next){
    passport.authenticate('local',{
      successRedirect:'/home',
      failureRedirect: '/login'
    })(req,res,next);
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
