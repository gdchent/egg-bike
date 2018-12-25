module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize

  const Article = app.model.define('article', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    title: {
      type: STRING,
      allowNull: true
    },
    author: {
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
    }
  })

  // 根据 id 查询指定文章
  Article.getArticle = async function (param) {
    let user = await this.findOne({
      where: param
    })

    return user
  }

  return Article
}
