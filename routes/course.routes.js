const authMiddleware = require("../middlewares/auth.middleware");
const CourseController = require('../controllers/courseController')
const Router = require('express')
const router = new Router()


router.post('/create', authMiddleware, CourseController.createCourses)


module.exports = router
