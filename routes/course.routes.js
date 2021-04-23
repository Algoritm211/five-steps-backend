const authMiddleware = require("../middlewares/auth.middleware");
const CourseController = require('../controllers/courseController')
const Router = require('express')
const router = new Router()


router.post('/create', authMiddleware, CourseController.createCourses)
router.get('', CourseController.getAllCourses)
router.get('/one', CourseController.getCourse)
router.get('/subscribe', authMiddleware, CourseController.subscribeToCourse)
router.get('/user', authMiddleware, CourseController.getUserCourses)

module.exports = router
