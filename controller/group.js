const fs = require('fs')
const UserModel = require('../models/user')
const GroupModel = require('../models/group')
const stringRandom = require('string-random')
const { checkSession } = require('./user')

const joinRootGroup = async function (user) {
  let data = {
    gid: stringRandom(16),
    gname: 'root',
    gavatar: `http://127.0.0.1:5000/images/group/default.png`,
    gmember: [],
    timestamp: new Date().toLocaleString()
  }
  await GroupModel.findOrCreate({ where: { gname: 'root' }, defaults: data }).then(async res => {
    const newmember = [user]
    const oldmember = JSON.parse(res[0].dataValues.gmember)
    // 合并 组内成员
    const merg = oldmember.concat(gmember)
    const execRes = await GroupModel.update({ gmember: JSON.stringify(merg) }, { where: { gname: 'root' } })
    // response
    data = execRes[0] === 1 ? res[0].dataValues : false
  }).catch(async err => {
    console.log('errno: ' + err)
    console.log('try to join group root again')
    await joinRootGroup(user)
  })
  // const rootGroupInfo = await getGroupInfo('root', data)
  // return rootGroupInfo
  return data
}

// const getAllUsersInGroup = async function (group, email) {
//   if (group === 'root') {
//     const users = await UserModel.findAll({ attributes: ['email', 'username', 'avatar'] })
//   } else {
//     const users = await UserModel.findAll({
//       where: { email },
//       attributes: ['email', 'username', 'avatar']
//     })
//   }
// }

// const getGroupInfo = async function (group, data = {}) {
  // const { gmember } = data
  // const users = getAllUsersInGroup(group, gmember)
  // return data
// }

module.exports = {
  joinRootGroup
}
