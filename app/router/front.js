// 前台系统的路由接口

module.exports = app => {
  const { router, controller } = app
  // All
  router.post('/login', controller.user.login)
  router.get('/auth', app.middlewares.ifUser(), controller.user.auth)

  // User
  router.get('/user', controller.user.index)

  // Article
  router.get('/article/title', controller.article.findArticleByTitle)
  router.resources('article', '/article', controller.article)
  // router.get('/article', controller.article.index)
}
