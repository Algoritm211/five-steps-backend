const UserController = require('../controllers/userController')
const Router = require('express')
const authMiddleware = require("../middlewares/auth.middleware");
const router = new Router()


router.patch('/update', authMiddleware, UserController.updateUser)
router.post('/avatar', authMiddleware, UserController.uploadAvatar)
router.delete('/avatar', authMiddleware, UserController.deleteAvatar)
router.delete('', authMiddleware, UserController.deleteAccount)

module.exports = router
