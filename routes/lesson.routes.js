const authMiddleware = require("../middlewares/auth.middleware");
const LessonController = require('../controllers/lessonController')
const Router = require('express')
const router = new Router()


router.post('/create', authMiddleware, LessonController.createLesson)


module.exports = router
