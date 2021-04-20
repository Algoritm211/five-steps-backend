const Article = require('../models/Article')


class ArticleController {

  async createArticle(req, res) {
    try {
      const {title, body, category} = req.body

      const article = new Article({title, body, category})
      await article.save()

      return res.status(201).json({
        article: article,
        message: 'Article created successfully'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while creating article'})
    }
  }

  async getAllArticles(req, res) {
    try {
      const {page} = req.query
      const articlesNumberOnPage = 6

      const articles = await Article.find({})
        .skip(Number(page - 1) * articlesNumberOnPage)
        .limit(6)

      return res.status(200).json({
        message: 'Articles was received',
        articles: articles
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting articles'})
    }
  }

}


module.exports = new ArticleController()
