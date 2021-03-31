const Router = require('express')
const AuthController = require('../controllers/authController')
const authMiddleware = require("../middlewares/auth.middleware");


const router = new Router()


router.post('/registration', AuthController.registerUser)

router.post('/login', AuthController.loginUser)
router.get('/authorization', authMiddleware, AuthController.authorizationUser)


module.exports = router
