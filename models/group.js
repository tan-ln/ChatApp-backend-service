const { DataTypes } = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
const Group = sequelize.define('groups', {
  gid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  gname: { type: DataTypes.STRING },
  gavatar: { type: DataTypes.STRING },
  gmember: { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, unique: true },
})

module.exports = Group
