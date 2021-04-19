const User = require('../models/User')
const UserController = require('../controllers/userController')
const Router = require('express')
const authMiddleware = require("../middlewares/auth.middleware");
const router = new Router()


router.patch('/update', authMiddleware, UserController.updateUser)

module.exports = router
