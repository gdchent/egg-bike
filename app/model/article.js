const cheerio = require('cheerio')

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, Op, fn, col } = app.Sequelize

  const Article = app.model.define('article', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER(11),
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    title: {
      type: STRING,
      allowNull: false
    },
    time: {
      type: DATE,
      allowNull: true
    },
    category: {
      type: STRING,
      allowNull: false
    },
    view: {
      type: INTEGER(11),
      allowNull: true
    },
    digest: {
      type: STRING,
      allowNull: false
    },
    himg: {
      type: STRING,
      allowNull: true
    }
  })

  Article.associate = function () {
    this.hasOne(app.model.Adata, { as: 'gather', foreignKey: 'aId' })
    this.belongsTo(app.model.User, { as: 'author', foreignKey: 'userId', targetKey: 'Id' })
  }

  // 根据 id 查询指定文章
  Article.getArticleById = async function (params) {
    let article = await this.findOne({
      where: params,
      include: [
        {
          model: app.model.User,
          as: 'author',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: app.model.Adata,
          as: 'gather',
          attributes: {
            exclude: ['Id', 'aId']
          }
        }
      ]
    })
    return article
  }

  // 根据 userId 获取文章list
  Article.getArticlesByUId = async function ({ uId, current = 1, size = 5 }) {
    let offset = (current - 1) * size
    let total = await this.count({
      where: {
        userId: uId
      }
    })
    let articles = await this.findAll({
      limit: size,
      offset,
      where: {
        userId: uId
      },
      attributes: {
        exclude: ['content', 'userId']
        // include: [[fn('COUNT', col('article.Id')), 'total']]
      },
      include: [
        {
          model: app.model.Adata,
          as: 'gather',
          attributes: {
            exclude: ['Id', 'aId']
          }
        }
      ],
      order: [
        ['time', 'DESC']
      ]
    })

    return {
      list: articles,
      total,
      current,
      size
    }
  }

  // FIXME: 通过userId，查询到用户所有文章的adata的like总数 this.sum()

  // 文章view值 +1
  Article.updateView = async function (Id, view) {
    let res = await this.update(
      { view },
      { where: { Id } }
    )
    return res
  }

  // 根据 title 查询文章
  Article.getArticlesByTitle = async function ({ q }) {
    let reg = q.split('').join('|')
    let articles = await this.findAll({
      where: {
        title: {
          [Op.regexp]: reg
        }
      }
    })
    return articles
  }

  // 根据 time排序 查询文章 list
  Article.getArticlesByTime = async function ({ current = 1, size = 5 }) {
    let offset = (current - 1) * size
    let total = await this.count()
    let articles = await this.findAll({
      limit: size,
      offset,
      attributes: {
        exclude: ['content', 'userId']
        // include: [[fn('COUNT', col('article.Id')), 'total']]
      },
      include: [
        {
          model: app.model.User,
          as: 'author',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        },
        {
          model: app.model.Adata,
          as: 'gather',
          attributes: {
            exclude: ['Id', 'aId']
          }
        }
      ],
      order: [
        ['time', 'DESC']
      ]
    })

    return {
      list: articles,
      total,
      current,
      size
    }
  }

  // 根据 like排序 查询文章 list
  Article.getArticlesByLike = async function ({ current = 1, size = 5 }) {
    let offset = (current - 1) * size
    let total = await this.count()
    let articles = await this.findAll({
      limit: size,
      offset,
      attributes: {
        exclude: ['content', 'userId']
        // include: [[fn('COUNT', col('article.Id')), 'total']]
      },
      include: [
        {
          model: app.model.User,
          as: 'author',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        },
        {
          model: app.model.Adata,
          as: 'gather',
          attributes: {
            exclude: ['Id', 'aId']
          }
        }
      ],
      order: [
        [{ model: 'Adata' }, 'likeCount', 'DESC']
      ]
    })

    return {
      list: articles,
      total,
      current,
      size
    }
  }

  // 通过category id获取文章list
  Article.getArticlesByCId = async function ({ cid = 4, current = 1, size = 5 }) {
    let offset = (current - 1) * size
    let total = await this.count({
      where: {
        category: cid
      }
    })
    let articles = await this.findAll({
      limit: size,
      offset,
      where: {
        category: cid
      },
      include: [
        {
          model: app.model.User,
          as: 'author',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        },
        {
          model: app.model.Adata,
          as: 'gather',
          attributes: {
            exclude: ['Id', 'aId']
          }
        }
      ],
      attributes: {
        exclude: ['content', 'userId']
      },
      order: [
        ['time', 'DESC']
      ]
    })
    return {
      list: articles,
      total,
      current,
      size
    }
  }

  // 增加一篇文章, FIXME: 规范来说，应该拆到service，
  Article.createArticle = async function ({ uId, ...body }) {
    let $ = cheerio.load(body.content)
    let digest = $.text().substr(0, 74) + '...'
    let time = new Date()
    let res = await this.create({
      userId: uId,
      time,
      digest,
      ...body
    })
    return res
  }

  // FIXME: 删除一篇文章，删除文章应该要先判断该文章是否是该用户的
  Article.destroyArticle = async function (params) {
    // FIXME: 下面应该先获取到该文章的uID，然后跟token.id做比对
    let res = this.destroy({
      where: params
    })
    return res
  }

  return Article
}
