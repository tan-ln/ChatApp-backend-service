const Sequelize = require('sequelize')
const { database } = require('../config')

// 创建实例 配置 数据库名 用户 密码
const sequelize = new Sequelize(database.DATABASE, database.USERNAME, database.PASSWORD, {
	host: database.HOST,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	define: {
		timestamps: false,
	}
})

sequelize.authenticate().then(() => {
	console.log('Connection has been esablished successfully.')
}).catch(err => {
	console.error('Unable to connect to the databases: ' + err)
})

module.exports = sequelize
