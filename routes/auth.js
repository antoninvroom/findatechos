const passport = require('passport');
const router = require('express').Router();

router
	.get('/login', (req, res, next) => {
		res.render('login');
	})
	.post("/login", passport.authenticate("local", {
	    successRedirect: "/",
	    failureRedirect: "/login",
	}))
	.get('/logout', (req, res, next) => {
		req.session.destroy((err) => {
			res.redirect('/login')
		})
	})
	.get('/signup', (req, res, next) => {
		res.render('signup');
	})
	.post("/signup", passport.authenticate("local-register", {
	    successRedirect: "/",
	    failureRedirect: "/signup",
	}))
	.get('/auth/github', passport.authenticate('github', {
		scope: [ 'user:email' ]
	}))
	.get('/auth/github/callback', passport.authenticate('github', {
		failureRedirect: '/login' }),
	  	function(req, res) {
	    res.redirect('/');
	})
  .get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))
  .get('/auth/linkedin/callback', passport.authenticate('linkedin',
    { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
   });

module.exports = router;
