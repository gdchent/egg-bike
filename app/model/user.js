module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const User = app.model.define('user', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: true
    },
    password: {
      type: STRING,
      allowNull: true
    }
  })

  User.associate = function () {
    app.model.User.hasMany(app.model.Article, { foreignKey: 'userId', targetKey: 'Id' })
  }

  // 查询指定用户
  User.getUser = async function (params) {
    let user = await this.findOne({
      where: params
    })

    return user
  }

  return User
}
