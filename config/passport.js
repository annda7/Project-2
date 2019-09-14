const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require('bcryptjs');
const passport = require('passport');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, function(username,password,done){
            //Match user
            db.Users.findOne({
                where:{
                    username:username}})
            .then(function(user){
                console.log('!!!!!!!!!!!!!!!' + user)
                if(!user){
                    return done(null, false, {message: 'That username is not registered'})
                }

                //Match password
                bcrypt.compare(password, user.password,function(err,isMatch){
                    if (err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Password Incorrect'})
                    }
                })
            })
        })
    );
    passport.serializeUser(function(user, done){
        console.log("######################" + user.id)
        done(null,user.id);
    });
    
    passport.deserializeUser(function(id,done){
        User.findByID(id, function(err,user){
            done(err,user);
        });
    });
}