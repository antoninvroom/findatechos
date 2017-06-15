const bcrypt = require('bcrypt-nodejs');
const db = require("./db");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin").Strategy;

passport.use(new LocalStrategy(authenticate));
passport.use(new GitHubStrategy({
    clientID: "167103ece046e94a096b",
    clientSecret: "5bd59bf04f6eb0f2987b5f0e47131a68b4c5331b",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   	db('users')
   		.where('oauth_provider', 'github')
   		.where('username', profile.username)
      .first()
      .then((user) => {
        if(user) {
          return done(null, user)
        }
        const newUser = {
          oauth_provider: "github",
          username: profile.username
        }
        return db('users')
          .insert(newUser)
          .then((ids) => {
            newUser.id = ids[0]
            done(null, newUser)
          })
      })
  }
));

passport.use(new LinkedInStrategy({
    consumerKey: "77lo9dyw6lrq7h",
    consumerSecret: "8oCOJZMg3PweoubA",
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(token, tokenSecret, profile, done) {
    db('users')
   		.where('oauth_provider', 'linkedin')
   		.where('username', profile.first-name)
      .first()
      .then((user) => {
        if(user) {
          return done(null, user)
        }
        const newUser = {
          oauth_provider: "github",
          username: profile.username
        }
        return db('users')
          .insert(newUser)
          .then((ids) => {
            newUser.id = ids[0]
            done(null, newUser)
          })
      })
  }
));

function authenticate(email, password, done) {
   db('users')
      .where('email', email)
      .first()
      .then((user) => {
        if(!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: "user not found with these informations"});
        }
        done(null, user);
      }, done);
}

function register(req, email, password, done) {
	db('users')
		.where('email', email)
		.first()
		.then((user) => {
			if(user) {
				return done(null, false, {message: "An user with this address have already been created."});
			}
			if(password !== req.body.password2) {
				return done(null, false, {message: "Passwords don't match"});
			}
			const newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: email,
				password: bcrypt.hashSync(password),

			};
			db('users')
				.insert(newUser)
				.then((ids) => {
					newUser.id = ids[0]
					done(null, newUser)
				})
		})
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db('users')
      .where("id", id)
      .first()
      .then((user) => {
        done(null, user);
      }, done);
});
