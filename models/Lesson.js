const {model, Schema, ObjectId} = require('mongoose')

const Lesson = new Schema({
  title: {type: String},
  body: {type: String},
  homeWork: {type: String},
  course: {type: ObjectId, ref: 'Course'}
})

module.exports = model('Lesson', Lesson)
