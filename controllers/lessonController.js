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

}


module.exports = new LessonController()
