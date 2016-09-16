/**
 * Created by cshlovjah on 16.09.16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;