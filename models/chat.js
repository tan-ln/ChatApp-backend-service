const { DataTypes } = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
const Chat = sequelize.define('chats', {
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

module.exports = Chat
