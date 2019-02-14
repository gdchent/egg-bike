// 前台系统的路由接口

module.exports = app => {
  const { router, controller, io } = app
  // All
  router.post('/login', controller.user.login)
  router.post('/register', controller.user.register)

  // router.get('/auth', app.middlewares.ifUser(), controller.user.auth)

  // User
  router.get('/user', controller.user.getMe)
  router.put('/user', controller.user.updateMyInfo)

  router.get('/user/following', controller.user.getFollowingsByUId)
  router.get('/user/follower', controller.user.getFollowersByFId)
  router.get('/user/:id', controller.user.getUserById)
  router.get('/user/:uId/followings', controller.user.getFollowingsByUId)
  router.get('/user/:fId/followers', controller.user.getFollowersByFId)
  router.get('/user/follow/:fId', controller.user.isFollow)
  router.post('/user/follow', controller.user.createFollow)
  router.delete('/user/follow', controller.user.destroyFollow)

  // Article
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
  router.get('/likelist', controller.like.getLikeList)
  router.post('/like', controller.like.createLike)
  router.delete('/like', controller.like.destroyLike)

  // plan
  router.get('/plan', controller.plan.getPlans)
  router.post('/plan', controller.plan.createPlan)

  // search
  router.get('/search', controller.common.search)

  // upload
  router.post('/upload/img/:type', controller.upload.imgUpload)

  // message
  // 获取聊天内容
  router.get('/chat/:roomId', controller.message.getMsgsByRoomId)
  router.post('/chat/:roomId', controller.message.createMessage)

  router.get('/chat', controller.message.getRooms)
  // 创建房间先mock

  // socket io
  io.of('/').route('chat', io.controller.chat.test)
  io.of('/').route('toOther', io.controller.chat.sendToOther)
  io.of('/').route('exchange', io.controller.chat.exchange)
}
