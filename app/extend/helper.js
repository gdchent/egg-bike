// 获取 Token
exports.getAccessToken = ctx => {
  let bearerToken = ctx.request.header.authorization
  return bearerToken && bearerToken.replace('Bearer ', '')
}

// 解析token
exports.parseToken = async (ctx) => {
  let token = this.getAccessToken(ctx)
  let verifyResult = await ctx.service.token.verifyToken(token)
  return verifyResult.message
}

// 校验 Token
exports.verifyToken = async (ctx, userId) => {
  let token = this.getAccessToken(ctx)
  let verifyResult = await ctx.service.token.verifyToken(token)
  if (!verifyResult.verify) {
    ctx.helper.error(ctx, 401, verifyResult.message)
    return false
  }
  if (userId !== verifyResult.message.id) {
    ctx.helper.error(ctx, 401, '用户 ID 与 Token 不一致')
    return false
  }
  return true
}

// 处理成功响应
exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    message: message,
    data: result
  }
  ctx.status = status
}

// 处理失败响应
exports.error = (ctx, code, message, status = 200) => {
  ctx.body = {
    code: code,
    message: message
  }
  ctx.status = status
}
