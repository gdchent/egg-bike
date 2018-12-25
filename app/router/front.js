// 前台系统的路由接口

module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.post('/login', controller.user.login)
  router.get('/user', controller.user.index)
  router.get('/auth', app.middlewares.ifUser(), controller.user.auth)
  router.get('/article', controller.article.index)
}
