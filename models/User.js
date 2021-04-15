
const {Schema, model, ObjectId} = require('mongoose')


const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  age: {type: Number},
  surName: {type: String},
  birthdayDate: {type: String},
  dateRegistration: {type: Date, default: Date.now()},
  role: {type: String, default: 'student'},
  courses: [{type: ObjectId, ref: 'Course'}],
  lessonsCompleted: [{type: ObjectId, ref: 'Lesson'}],
})


module.exports = model('User', User)
