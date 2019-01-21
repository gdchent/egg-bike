'use strict'

const fs = require('fs')
const path = require('path')
const awaitStreamReady = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')

const Controller = require('egg').Controller

class UploadController extends Controller {
  // FIXME: 写一个总的图片上传，避免重复代码
  // TODO: 其实应该写一个头像不超过200kb这类型的拦截
  async imgUpload () {
    const ctx = this.ctx
    let type = ctx.params.type
    const stream = await ctx.getFileStream()
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename)
    const target = path.join(this.config.baseDir, `app/public/upload/${type}Imgs`, filename)
    const writeStream = fs.createWriteStream(target)

    try {
      await awaitStreamReady(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    ctx.helper.success(ctx, {
      url: `/public/upload/${type}Imgs/` + filename
    })
  }
}

module.exports = UploadController
