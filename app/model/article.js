module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize

  const Article = app.model.define('article', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER(11),
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
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
      allowNull: false
    }
  })

  Article.associate = function () {
    app.model.Article.belongsTo(app.model.User, { as: 'author', foreignKey: 'userId', targetKey: 'Id' })
  }

  // 根据 id 查询指定文章
  Article.getArticle = async function (params) {
    let article = await this.findOne({
      where: params,
      include: {
        model: app.model.User,
        as: 'author',
        attributes: {
          exclude: ['password']
        }
      }
    })
    return article
  }

  // 根据 title 查询文章
  Article.getArticleByTitle = async function ({ q, type = 'article' }) {

    let articles = await this.findAll({
      where: { title: q }
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
