'use strict'

const Controller = require('egg').Controller
const bcrypt = require('bcryptjs')

class UserController extends Controller {
  // FIXME: 获取自己(其实并不需要验证token，这个api调用前就先验证token了)
  async getMe () {
    const ctx = this.ctx
    let token = ctx.helper.getAccessToken(ctx)
    if (!token) ctx.helper.error(ctx, -1, '你的token呢')
    let verifyResult = await ctx.service.token.verifyToken(token)
    // ctx.body = verifyResult
    if (!verifyResult.verify) {
      ctx.helper.error(ctx, 401, verifyResult.message)
      return false
    }
    let id = verifyResult.message.id
    let user = await ctx.service.user.getUserById(id)
    ctx.helper.success(ctx, user)
  }

  async login () {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    let user = await ctx.model.User.getUserByName(username)
    if (!user) {
      ctx.helper.error(ctx, -1, '该账户不存在')
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        ctx.helper.error(ctx, -1, '密码错误')
      } else {
        let token = await ctx.service.token.createToken({ role: 'user', id: user.Id })
        ctx.helper.success(ctx, { token })
      }
    }
  }

  async register () {
    const ctx = this.ctx
    // FIXME: 尝试添加手机验证码
    const { username, password } = ctx.request.body

    let user = await ctx.model.User.getUserByName(username)
    if (user) {
      ctx.helper.error(ctx, -1, '该用户名已存在')
    } else {
      let hash = await ctx.service.user.encrypt(password)
      let res = await ctx.model.User.create({
        username,
        password: hash
      })
      if (res) {
        ctx.helper.success(ctx, { msg: '注册成功' })
      } else {
        ctx.helper.error(ctx, -1, '注册失败')
      }
    }
  }

  async getUserById () {
    const ctx = this.ctx
    const id = ctx.params.id
    let user = await ctx.service.user.getUserById(id)
    if (!user) {
      ctx.helper.error(ctx, -1, '该账户不存在')
    } else {
      ctx.helper.success(ctx, user)
    }
  }

  // 更新个人资料
  async updateMyInfo () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let Id = token.id

    let res = await ctx.model.User.updateMyInfo(Id, ctx.request.body)
    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '信息更新失败')
    }
  }

  /**
   * 关注关系
  */
  async isFollow () {
    const ctx = this.ctx
    const fId = ctx.params.fId
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Follow.isFollow({ fId, uId })
    if (res) {
      ctx.helper.success(ctx, { isFollow: true })
    } else {
      ctx.helper.success(ctx, { isFollow: false })
    }
  }

  // 获取关注列表
  async getFollowingsByUId () {
    const ctx = this.ctx
    let uId = ctx.params.uId
    let res = await ctx.model.Follow.getFollowingsByUId(uId)
    // 提取那个恶心心的数据结构
    let list = []
    res['list'].forEach(item => {
      list.push(item['dataValues']['fInfo'])
    })
    ctx.helper.success(ctx, {
      list,
      count: res.count,
      size: res.size,
      current: res.current
    })
  }

  // 获取粉丝列表
  async getFollowersByFId () {
    const ctx = this.ctx
    let fId = ctx.params.fId
    let res = await ctx.model.Follow.getFollowersByFId(fId)
    let list = []
    res['list'].forEach(item => {
      list.push(item['dataValues']['uInfo'])
    })
    ctx.helper.success(ctx, {
      list,
      count: res.count,
      size: res.size,
      current: res.current
    })
  }

  async createFollow () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Follow.createFollow({ ...ctx.request.body, uId })
    ctx.helper.success(ctx, res)
  }

  async destroyFollow () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Follow.destroyFollow({ ...ctx.request.body, uId })
    ctx.helper.success(ctx, res)
  }

  async auth () {
    const ctx = this.ctx
    ctx.body = {
      auth: 'ok'
    }
  }
}

module.exports = UserController
