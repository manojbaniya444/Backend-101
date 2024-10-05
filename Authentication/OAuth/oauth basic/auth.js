const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      // get the facebook app id and secret key from developer site
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      // our redirect url
      callbackURL: "http://localhost:8080/auth/facebook/callback",
    },
    // if user present or not then add to the database accordingly
    async function (accessToken, refreshToken, profile, cb) {
      const user = await UserActivation.findOne({
        accountId: profile.id,
        provider: "facebook",
      });

      if (!user) {
        // do something with the accessToken and the user
        console.log("Add the user to the database");
      } else {
        console.log("User already exists in the database");
        return cb(null, profile);
      }
    }
  )
);

