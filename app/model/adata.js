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
    supportCount: {
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

  // TODO: 要和文章表联立一下，
  return Adata
}
