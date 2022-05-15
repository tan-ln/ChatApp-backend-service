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
  const userIns = await UserModel.findAll({
    where: { email: [self, target] },
    attributes: ['email', 'username', 'avatar']
  })
  const contactIns = await UserModel.findAll({
    where: { email: [self, target] },
    attributes: ['uid', 'contacts']
  })
  const self_contact = [
    ...JSON.parse(contactIns[0].contacts),
    {
      ...userIns[1].dataValues,
      timestamp: Date.now()
    }
  ]
  const target_contact = [
    ...JSON.parse(contactIns[1].contacts),
    {
      ...userIns[0].dataValues,
      timestamp: Date.now()
    }
  ]

  contactIns[0].contacts = JSON.stringify(self_contact)
  contactIns[1].contacts = JSON.stringify(target_contact)
  await contactIns[0].save()
  await contactIns[1].save()
}

module.exports = {
  getAllContacts,
  addContacts
}
