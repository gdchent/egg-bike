// 后台系统的路由接口

module.exports = app => {
  const { router, controller } = app
  // router.get('/admin/list', controller.)
  // 需要进行token认证的，进行路由中间件
  // 测试用 admin
  router.post('/admin/login', controller.admin.admin.login)
  // router.get('/admin/auth', app.middlewares.ifAdmin(), controller.admin.admin.auth)

  // 用户管理
  router.get('/admin/user', app.middlewares.ifAdmin(), controller.user.getUsers)
}
