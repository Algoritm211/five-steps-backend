const {model, Schema, ObjectId} = require('mongoose')

const Course = new Schema({
  title: {type: String},
  description: {type: String},
  rating: {type: Number},
  author: {type: ObjectId, ref: 'User'},
  lessons: [{type: ObjectId, ref: 'Lesson'}],
  students: [{type: ObjectId, ref: 'User'}]
})

module.exports = model('Course', Course)