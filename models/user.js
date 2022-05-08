const { DataTypes } = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
// user => users 单数的user会自动对应users 
const User = sequelize.define('users', {
  uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  groups: { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, unique: true },
})
// CREATE TABLE IF NOT EXISTS `uses`
User.sync() // sync({ force:true }) => delete it if exists

module.exports = User
