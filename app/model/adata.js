module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Adata = app.model.define('adatas', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    aId: {
      type: INTEGER(11),
      allowNull: false
    },
    commentCount: {
      type: INTEGER(11),
      allowNull: false
    },
    likeCount: {
      type: INTEGER(11),
      allowNull: false
    },
    collectionCount: {
      type: INTEGER(11),
      allowNull: false
    }
  })

  Adata.associate = function () {
    // app.model.Adata.hasOne(app.model.Article, { foreignKey: 'aId' })
    app.model.Adata.belongsTo(app.model.Article, { foreignKey: 'aId', target: 'Id' })
  }

  // 升级数据
  Adata.updateTable = async function ({ aId, type, way = 'up' }) {
    let res = await this.findOne({
      where: {
        aId
      }
    })

    let one = way === 'up' ? 1 : -1
    let result

    switch (type) {
      case 'like':
        let likeCount = res.likeCount + one
        result = await this.update(
          { likeCount },
          {
            where: {
              aId
            }
          }
        )
        break
      case 'comment':
        break
      case 'collection':
        break
    }
    return result
  }

  // TODO: 要和文章表联立一下，
  return Adata
}
