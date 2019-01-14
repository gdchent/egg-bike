module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Category = app.model.define('category', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: true
    },
    parentId: {
      type: INTEGER(11),
      allowNull: true
    }
  })

  return Category
}
