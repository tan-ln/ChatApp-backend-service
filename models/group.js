const { DataTypes } = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
const GroupModel = sequelize.define('groups', {
  gid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  gname: { type: DataTypes.STRING },
  gavatar: { type: DataTypes.STRING },
  gmember: { type: DataTypes.TEXT },
  timestamp: { type: DataTypes.DATE, unique: true },
})
// CREATE TABLE IF NOT EXISTS `groups`
GroupModel.sync() // sync({ force:true }) => delete it if exists

module.exports = GroupModel
