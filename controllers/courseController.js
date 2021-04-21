const Course = require('../models/Course')
const User = require('../models/User')

class CourseController {

  async createCourses(req, res) {
    try {
      const {title, description, category} = req.body

      const course = new Course({
        author: req.user.id, // from auth.middleware
        title: title,
        category: category,
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

  async getAllCourses(req, res) {
    try {
      const {page, all, filters: rawFilters} = req.query
      const COURSES_ON_PAGE = 6

      const pageFilters = rawFilters.split(',')

      let filterParam = {category: {$in: pageFilters}}
      if (pageFilters.length === 0 || pageFilters[0] === '') {
        filterParam = {}
      }

      const courses = await Course.find(filterParam)
        .populate('author')
        .skip(Number(page - 1) * COURSES_ON_PAGE)
        .limit(6)
      const coursesCount = await Course.countDocuments(filterParam)
      return res.status(200).json({
        coursesCount: coursesCount,
        courses: courses
      })


    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not get courses'})
    }
  }

  async getCourse(req, res) {
    try {
      const {courseId} = req.query
      const course = await Course.findOne({_id: courseId})
      return res.status(200).json({
        course: course
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting course'})
    }
  }

  async getUserCourses(req, res) {
    try {
      const user = await User.findOne({_id: req.user.id}).populate({path: 'courses', populate: {path: 'author'}})

      return res.status(200).json({courses: user.courses})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting user courses'})
    }
  }
}


module.exports = new CourseController()
