const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

passport.use(
  new FacebookStrategy(
    {
      clientID: "app_id",
      clientSecret: "secret",
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
