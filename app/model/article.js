module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, fn, col } = app.Sequelize

  const Article = app.model.define('article', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER(11),
      allowNull: false
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    title: {
      type: STRING,
      allowNull: true
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
      allowNull: false
    }
  })

  Article.associate = function () {
    this.hasOne(app.model.Adata, { as: 'gather', foreignKey: 'Id' })
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

  // 文章view值 +1
  Article.updateView = async function (Id, view) {
    let res = await this.update(
      { view },
      { where: { Id } }
    )
    return res
  }

  // 根据 title 查询文章 TODO: 改成分页
  Article.getArticlesByTitle = async function ({ q }) {
    let articles = await this.findAll({
      where: { title: q }
    })
    return articles
  }

  // 根据 time排序 查询文章 list
  Article.getArticlesByTime = async function ({ currPage = 1, size = 10 }) {
    let offset = (currPage - 1) * size
    let articles = await this.findAll({
      limit: size,
      offset,
      attributes: {
        exclude: ['content', 'userId']
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
      // FIXME: 联表的话就会出现错误的聚合，安装mysql5.7吧
      // attributes: [
      //   [fn('MAX', col('Article.Id')), 'total']
      // ]
    })
    return articles
  }

  // 根据 view排序 查询文章 list
  Article.getArticlesByView = async function ({ currPage = 1, size = 10 }) {
    let offset = (currPage - 1) * size
    let articles = await this.findAll({
      limit: size,
      offset,
      include: {
        model: app.model.User,
        as: 'author',
        attributes: {
          exclude: ['password']
        }
      },
      order: [
        ['view', 'DESC']
      ]
    })
    return articles
  }

  // 通过category id获取文章list
  Article.getArticlesByCId = async function ({ cid = 4, currPage = 1, size = 10 }) {
    let offset = (currPage - 1) * size
    let articles = await this.findAll({
      limit: size,
      offset,
      where: {
        category: cid
      },
      include: {
        model: app.model.User,
        as: 'author',
        attributes: {
          exclude: ['password']
        }
      },
      order: [
        ['time', 'DESC']
      ]
    })
    return articles
  }

  // 增加一篇文章
  Article.createArticle = async function (body) {
    let res = await this.create(body)
    return res
  }

  // 删除一篇文章
  Article.destroyArticle = async function (params) {
    let res = this.destroy({
      where: params
    })
    return res
  }

  return Article
}
