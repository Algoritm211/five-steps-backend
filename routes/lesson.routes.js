const authMiddleware = require("../middlewares/auth.middleware");
const LessonController = require('../controllers/lessonController')
const Router = require('express')
const router = new Router()

router.get('', LessonController.getLesson)
router.post('/create', authMiddleware, LessonController.createLesson)
router.put('/update', authMiddleware, LessonController.updateLesson)

module.exports = router
