const Course = require('../models/Course')
const User = require('../models/User')

class CourseController {

  async createCourses(req, res) {
    try {
      const {title, description} = req.body

      const course = new Course({
        author: req.user.id, // from auth.middleware
        title: title,
        description: description,
        rating: 0,
      })
      const user = await User.findOne({_id: req.user.id})
      user.courses.push(course._id)

      await course.save()
      await user.save()

      return res.status(201).json({
        course: course,
        message: 'Course was created successfully'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while adding courses'})
    }
  }

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
