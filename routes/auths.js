var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    passport    = require('passport');
 /* ==================================
    Authentication Routes
   ================================*/
//  REGISTER
router.get('/register', function(req, res){
   res.render('signup');
});

router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Successfully registered, welcome ' + user.username);
            res.redirect('/');
        });
    });
});

//  LOGIN
router.get('/login', function(req, res){
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}) , function(req, res){
});
//  LOGOUT
router.get('/logout', function(req, res){
   req.logout();
   req.flash('success', 'Logged out');
   res.redirect('/');
});

module.exports  = router;