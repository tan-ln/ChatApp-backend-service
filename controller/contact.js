const UserModel = require('../models/user')

// 好友列表
const getAllContacts = async (ctx) => {
  const { email } = ctx.request.body
  await UserModel.findOne({ where: { email }, attributes: ['contacts']}).then(async res => {
    const { contacts } = res
    const sortByFirstLetter = require('../utils/sortByFirstLetter')
    const list = sortByFirstLetter(JSON.parse(contacts), 'username')
    ctx.body = {
      code: 200,
      data: list
    }
  }).catch(err => {
    console.log('errno: ' + err)
  })
}

// 添加好友
const addContacts = async (ctx) => {
  const { selfEmail, target } = ctx.request.body
  await UserModel.findOne({ where: { email: selfEmail }, attributes: ['contacts']}).then(async res => {
    const { contacts } = res
    const temp = {
      ...target,
      special: false,
      timestamp: new Date().toLocaleString()
    }
    const new_contacts = [...JSON.parse(contacts), temp]
    await UserModel.update({ contacts: JSON.stringify(new_contacts) }, { where: { email: selfEmail } }).then(() => {
      const sortByFirstLetter = require('../utils/sortByFirstLetter')
      const list = sortByFirstLetter(new_contacts, 'username')
      ctx.body = {
        code: 200,
        data: list
      }
    })
  }).catch(err => {
    console.log('errno: ' + err)
  })
}

module.exports = {
  getAllContacts,
  addContacts
}
