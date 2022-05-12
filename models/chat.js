const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const ChatModel = sequelize.define('chats', {
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

module.exports = ChatModel
