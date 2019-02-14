'use strict'

const Controller = require('egg').Controller

class PlanController extends Controller {
  async createPlan () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Plan.create({ uId,
      ...ctx.request.body
    })
    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '骑行计划创建失败')
    }
  }

  // FIXME:
  async deletePlan () {
    // const ctx = this.ctx
    // let token = await ctx.helper.parseToken(ctx)
    // let uId = token.uId
    // let res = await ctx.model.Plan.destroy
  }

  // 获取plans
  async getPlans () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Plan.getPlans(uId)
    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '骑行计划获取失败')
    }
  }

  // FIXME: 修改plan（也就改改短信是否已通知status）
  // async updatePlan () {
  //   const ctx = this.ctx
  //   let token = await ctx.helper.parseToken(ctx)
  //   let uId = token.uId
  //   let res = await ctx.model.Plan
  // }
}

module.exports = PlanController
