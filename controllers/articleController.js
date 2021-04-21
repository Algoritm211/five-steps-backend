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
      const {page, ...filterObjFromClient} = req.query
      const ARTICLES_ON_PAGE = 6
      let arrFilter = []

      for (let key in filterObjFromClient) {
        if (filterObjFromClient.hasOwnProperty(key)) {
          if (filterObjFromClient[key] === 'true') {
            arrFilter.push(key)
          }
        }
      }

      let articles = []
      let articlesCount = 0
      if (page !== 'all') {
        articles = await Article.find({category: {$in: arrFilter}})
          .skip(Number(page - 1) * ARTICLES_ON_PAGE)
          .limit(6)
        articlesCount = await Article.countDocuments({category: {$in: arrFilter}})
      } else {
        articles = await Article.find({})
          .skip(Number(page - 1) * ARTICLES_ON_PAGE)
          .limit(6)
        articlesCount = await Article.estimatedDocumentCount()
      }


      return res.status(200).json({
        message: 'Articles was received',
        articles: articles,
        articlesCount: articlesCount
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting articles'})
    }
  }

}


module.exports = new ArticleController()
