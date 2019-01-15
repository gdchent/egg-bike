'use strict'

const fs = require('fs')
const path = require('path')
const awaitStreamReady = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')

const Controller = require('egg').Controller

class UploadController extends Controller {
  async index () {}
  // TODO: 头像上传, 限制头像size不超过200kb
  async avatarImgUpload () {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename)
    const target = path.join(this.config.baseDir, 'app/public/upload/avatarImgs', filename)
    const writeStream = fs.createWriteStream(target)

    try {
      await awaitStreamReady(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    ctx.helper.success(ctx, {
      url: '/public/upload/avatarImgs/' + filename
    })
  }

  // TODO: 文章图片上传，可以一个文章id一个文件夹，如：articleImgs/:id/..
  async articleImgUpload () {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename)
    const target = path.join(this.config.baseDir, 'app/public/upload/articleImgs', filename)
    const writeStream = fs.createWriteStream(target)

    try {
      await awaitStreamReady(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    ctx.helper.success(ctx, {
      url: '/public/upload/articleImgs/' + filename
    })
  }
}

module.exports = UploadController
