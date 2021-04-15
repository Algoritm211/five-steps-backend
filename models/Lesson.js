const {model, Schema, ObjectId} = require('mongoose')

const Lesson = new Schema({
  title: {type: String},
  body: {type: String},
  homeWork: {type: String},
})

module.exports = model('Lesson', Lesson)
