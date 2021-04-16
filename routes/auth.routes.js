const Router = require('express')
const AuthController = require('../controllers/authController')
const authMiddleware = require("../middlewares/auth.middleware");
const passport = require('passport')
const {passportGoogle} = require('../passport/passport-google');
const {passportFacebook} = require('../passport/passport-facebook')


const router = new Router()


router.post('/registration', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/authorization', authMiddleware, AuthController.authorizationUser)


//Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  AuthController.socialAuth
);


//Facebook auth
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router
