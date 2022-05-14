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
// const addContacts = async (ctx) => {
//   const { selfEmail, target } = ctx.request.body
//   await UserModel.findOne({ where: { email: selfEmail }, attributes: ['contacts']}).then(async res => {
//     const { contacts } = res
//     const temp = {
//       ...target,
//       special: false,
//       timestamp: new Date().toLocaleString()
//     }
//     const new_contacts = [...JSON.parse(contacts), temp]
//     await UserModel.update({ contacts: JSON.stringify(new_contacts) }, { where: { email: selfEmail } }).then(() => {
//       const sortByFirstLetter = require('../utils/sortByFirstLetter')
//       const list = sortByFirstLetter(new_contacts, 'username')
//       ctx.body = {
//         code: 200,
//         data: list
//       }
//     })
//   }).catch(err => {
//     console.log('errno: ' + err)
//   })
// }

// 添加好友建立连接
const addContacts = async (self, target) => {
  const users = await UserModel.findAll({
    where: { email: [self, target] },
    attributes: ['uid', 'email', 'username', 'avatar', 'contacts']
  })
  let a_temp = [...JSON.parse(users[0].contacts), {
    ...users[1].dataValues,
    timestamp: Date.now()
  }]
  let b_temp = [...JSON.parse(users[1].contacts), {
    ...users[0].dataValues,
    timestamp: Date.now()
  }]
  users[0].contacts = JSON.stringify(a_temp)
  users[1].contacts = JSON.stringify(b_temp)
  await users[0].save()
  await users[1].save()
  const a_list = a_temp.filter(item => Reflect.deleteProperty(item, 'contacts'))
  const b_list = b_temp.filter(item => Reflect.deleteProperty(item, 'contacts'))
  // 联系人按首字母排序
  const sortByFirstLetter = require('../utils/sortByFirstLetter')
  return {
    a: sortByFirstLetter(a_list, 'username'),
    b: sortByFirstLetter(b_list, 'username')
  }
}

module.exports = {
  getAllContacts,
  addContacts
}
