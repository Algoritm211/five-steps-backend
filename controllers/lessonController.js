const Lesson = require('../models/Lesson')
const Course = require('../models/Course')


class LessonController {
  async createLesson(req, res) {
    try {
      const {body, homeWork, courseId} = req.body

      const course = await Course.findOne({_id: courseId})
      const lesson = new Lesson({body: body, homeWork: homeWork, course: courseId})
      course.lessons.push(lesson._id)

      await lesson.save()
      await course.save()

      return res.status(201).json({
        lesson: lesson
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while creating lesson'})
    }
  }

  async updateLesson(req, res) {
    try {
      const {body, homeWork, lessonId} = req.body

      const newLesson = await Lesson.findOneAndUpdate(
        {_id: lessonId},
        {body: body, homeWork: homeWork},
        {new: true})

      return res.status(200).json({
        message: 'Lesson updated successfully', lesson: newLesson
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while updating lesson'})
    }
  }

  async getLesson(req, res) {
    try {
      const {courseId, lessonNumber} = req.query
      const course = await Course.findOne({_id: courseId})
        .populate({path: 'lessons'})
        .populate({path: 'author'})

      const lesson = course.lessons[lessonNumber - 1]
      return res.status(200).json({
        course: course,
        lesson: lesson
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting lesson'})
    }
  }

}


module.exports = new LessonController()
