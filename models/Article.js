const {ObjectId, model, Schema} = require('mongoose')

const Article = new Schema({
  title: {type: String},
  previewImg: {type: String},
  body: {type: String},
  category: {type: String},
  views: {type: Number, default: 0},
  releaseDate: {type: Date, default: Date.now()},
})

module.exports = model('Article', Article)
