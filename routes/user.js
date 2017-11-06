var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


// Index page
router.get('/', function(req,res){
    res.render('home');
});


// Register User form
router.get('/register', function(req, res){
    res.render('./user/register');
});

// Register User logic
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Thanks for register, Welcome ' + user.username);
                res.redirect('/placecamp/page/0');
            });
        }
    });
});

// Login User form
router.get('/login', function(req, res){
    res.render('./user/login');
});

// Login User logic
router.post('/login', passport.authenticate('local', {
        successRedirect: '/placecamp/page/0',
        failureRedirect: '/login'
    }), function(req, res) {
});


// Logout User
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You has been logout');
    res.redirect('/placecamp/page/0');
});




// route to all page not difine
router.get('*', function(req, res){
    res.send('Error 404, this page doesnt exist');
});

module.exports = router;