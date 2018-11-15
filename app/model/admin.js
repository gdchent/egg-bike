module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Admin = app.model.define('admin', {
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

  // 查询指定管理员
  Admin.getUser = async function (params) {
    let admin = await this.findOne({
      where: params
    })
    return admin
  }

  return Admin
}
