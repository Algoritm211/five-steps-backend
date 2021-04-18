const passport = require('passport')
const FacebookStrategy = require("passport-facebook").Strategy
const User = require('../models/User')

const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} = process.env



passport.use(
  'facebook',
  new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "https://dff85c1d6017.ngrok.io/api/auth/facebook/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      try {
        const currentUser = await User.findOne({facebookId: profile.id});
        // console.log(currentUser)
        if (currentUser) {
          return done(null, currentUser, {statusCode: 200});
        }

        // const email = profile.emails[0].value;
        // const userName = profile.name.familyName;

        // const checkEmail = await User.findOne({email: email});

        // if (checkEmail) {
        //   const user = await User.findByIdAndUpdate(
        //     checkEmail._id,
        //     {googleId: profile.id},
        //     {new: true}
        //   );
        //   return done(null, user, {statusCode: 200});
        // }

        // const userObj = new User({
        //   googleId: profile.id,
        //   name: userName,
        //   email,
        //   surName: '', age: '', birthdayDate: ''
        // });

        // const user = await userObj.save({validateBeforeSave: false});
        // return done(null, user, {statusCode: 201});
      } catch (err) {
        done(err, false);
      }
    }
  )
)

module.exports = passport
