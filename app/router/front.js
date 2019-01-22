// 前台系统的路由接口

module.exports = app => {
  const { router, controller } = app
  // All
  router.post('/login', controller.user.login)
  router.post('/register', controller.user.register)

  router.get('/auth', app.middlewares.ifUser(), controller.user.auth)

  // User
  router.get('/user', controller.user.getMe)
  router.put('/user', controller.user.updateMyInfo)

  // FIXME: 这块数据结构太恶心了，看能不能改掉
  router.get('/user/following', controller.user.getFollowingsByUId)
  router.get('/user/follower', controller.user.getFollowersByFId)
  router.get('/user/:id', controller.user.getUserById)
  // FIXME: 获取关注数并不需要暴露出来，service统和
  router.get('/user/:uId/following', controller.user.getFollowingCountByUId)
  router.get('/user/follow/:fId', controller.user.isFollow)
  router.post('/user/follow', controller.user.createFollow)
  router.delete('/user/follow', controller.user.destroyFollow)

  // Article
  // TODO: 根据 title 获取文章(模糊搜索) FIXME: 其实可以删除，已经放到搜索路由上了
  router.get('/article/title', controller.article.getArticlesByTitle)
  router.get('/article/latest', controller.article.getArticlesByTime)
  router.get('/article/hottest', controller.article.getArticlesByLike)
  router.get('/article/user/:id', controller.article.getArticlesByUId)
  router.resources('article', '/article', controller.article)

  // Comment
  router.get('/article/:aId/comments', controller.article.getCommentsByAId)
  router.post('/article/:aId/comment', controller.article.createComment)

  // Reply
  router.post('/comment/:cId/reply', controller.article.createReply)

  // Category
  router.get('/category', controller.category.index)
  router.get('/category/:cId', controller.category.getArticlesByCId)

  // Like
  router.get('/like', controller.like.isLike)
  router.post('/like', controller.like.createLike)
  router.delete('/like', controller.like.destroyLike)

  // search
  router.get('/search', controller.common.search)

  // upload
  router.post('/upload/img/:type', controller.upload.imgUpload)
}
