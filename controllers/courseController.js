const Course = require('../models/Course')

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find({})
      return res.status(200).json({
        courses: courses
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not get courses'})
    }
  }
}


module.exports = new CourseController()
