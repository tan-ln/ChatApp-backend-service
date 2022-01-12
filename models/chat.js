const { DataTypes } = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
// user => users 单数的user会自动对应users 
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, unique: true },
})

module.exports = User
