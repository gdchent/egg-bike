'use strict'

const Service = require('egg').Service

class CategoryService extends Service {
  // 生成category json
  async generateCategory () {
    let data = await this.app.model.Category.findAll()
    let res = []
    let idx = 0
    data.forEach(item => {
      if (item.parentId === 0) {
        res[idx++] = {
          value: item.Id,
          label: item.name,
          children: []
        }
      } else {
        res.forEach((sub, index) => {
          if (item.parentId === sub.value) {
            res[index]['children'].push({
              value: item.Id,
              label: item.name
            })
          }
        })
      }
    })

    return res
  }
}

module.exports = CategoryService
