// 前台系统的路由接口

module.exports = app => {
  const { router, controller } = app
  // All
  router.post('/login', controller.user.login)

  router.get('/auth', app.middlewares.ifUser(), controller.user.auth)

  // User
  router.get('/user', controller.user.index)

  // Article
  // TODO: 根据 title 获取文章(模糊搜索) FIXME: 其实可以删除，已经放到搜索路由上了
  router.get('/article/title', controller.article.getArticlesByTitle)
  router.get('/article/latest', controller.article.getArticlesByTime)
  router.get('/article/hottest', controller.article.getArticlesByView)
  router.resources('article', '/article', controller.article)
  // router.get('/article', controller.article.index)

  // Category
  router.get('/category', controller.category.index)
  router.get('/category/:id', controller.category.getArticlesByCId)

  // search
  router.get('/search', controller.common.search)

  // upload
  router.post('/upload/avatar', controller.upload.avatarImgUpload)
  router.post('/upload/article-img', controller.upload.articleImgUpload)
}
