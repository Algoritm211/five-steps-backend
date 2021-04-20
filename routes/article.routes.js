const ArticleController = require('../controllers/articleController')
const Router = require('express')
const router = new Router()


router.post('/create', ArticleController.createArticle)
router.get('', ArticleController.getAllArticles)


module.exports = router
