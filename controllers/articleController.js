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
      const {page, all, filters: rawFilters} = req.query
      const ARTICLES_ON_PAGE = 6

      const pageFilters = rawFilters.split(',')

      let filterParam = {category: {$in: pageFilters}, isReady: {$ne: false}}
      if (pageFilters.length === 0 || pageFilters[0] === '') {
        filterParam = {isReady: {$ne: false}}
      }

      const articles = await Article.find(filterParam)
        .skip(Number(page - 1) * ARTICLES_ON_PAGE)
        .limit(6)
      const articlesCount = await Article.countDocuments(filterParam)
      return res.status(200).json({
        articlesCount: articlesCount,
        articles: articles
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error while getting articles'})
    }
  }
}


module.exports = new ArticleController()
