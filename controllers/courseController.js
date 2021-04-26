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
      user.coursesAuthor.push(course._id)

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
      const course = await Course.findOne({_id: courseId}).populate('coursesAuthor')
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

  async getCoursesFromAuthor(req, res) {
    try {
      const user = await User.findOne({_id: req.user.id}).populate('coursesAuthor').populate({path: 'courses', populate: {path: 'author'}})

      return res.status(200).json({
        coursesAuthor: user.coursesAuthor
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not get author`s courses'})
    }
  }

  async subscribeToCourse(req, res) {
    try {
      const {courseId} = req.query
      const user = await User.findOne({_id: req.user.id})
      const course = await Course.findOne({_id: courseId})
      user.courses.push(course._id)
      course.students.push(user._id)
      await course.save()
      await user.save()
      return res.status(200).json({
        user: user,
        course: course
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while subscribing'})
    }
  }

  async unsubscribeCourse(req, res) {
    try {
      const {courseId} = req.query

      // const user = await User.findOne({_id: req.user.id})
      // const course = await Course.findOne({_id: courseId})

      const course = await Course.findOneAndUpdate(
        {_id: courseId},
        {$pull: {students: req.user.id}},
        {new: true}
      )

      const user = await User.findOneAndUpdate(
        {_id: req.user.id},
        {$pull: {courses: courseId}},
        {new: true}
      )

      return res.status(200).json({
        user: user,
        course: course
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not unsubscribe course'})
    }
  }

  async likeCourse(req, res) {
    try {

      const {courseId} = req.query

      const user = await User.findOne({_id: req.user.id})
      const course = await Course.findOne({_id: courseId}).populate('author')
      if (user.likedCourses && user.likedCourses.includes(courseId)) {
        course.rating = course.rating - 1
        user.likedCourses.remove(course._id)
      } else {
        course.rating = course.rating + 1
        user.likedCourses.push(course._id)
      }

      await course.save()
      await user.save()
      return res.status(200).json({
        course: course,
        user: user
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not like course'})
    }
  }
}


module.exports = new CourseController()
