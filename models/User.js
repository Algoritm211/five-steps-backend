
const {Schema, model, ObjectId} = require('mongoose')


const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  age: {type: Number},
  surName: {type: String},
  dateRegistration: {type: Date, default: Date.now()},
  role: {type: String, default: 'student'}
})


module.exports = model('User', User)
