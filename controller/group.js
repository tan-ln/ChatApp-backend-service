const fs = require('fs')
const UserModel = require('../models/user')
const GroupModel = require('../models/group')
const stringRandom = require('string-random')

const joinRootGroup = async function (user) {
  let data = {
    gid: stringRandom(16),
    gname: 'root',
    gavatar: `http://127.0.0.1:5000/images/group/default.png`,
    gmember: JSON.stringify([]),
    timestamp: new Date().toLocaleString()
  }
  await GroupModel.findOrCreate({ where: { gname: 'root' }, defaults: data }).then(async res => {
    const [groups] = res
    const newmember = [user]
    const oldmember = JSON.parse(groups.gmember)
    // 合并 组内成员
    const merg = oldmember.concat(newmember)
    await GroupModel.update({ gmember: JSON.stringify(merg) }, { where: { gname: 'root' } })
  }).catch(async err => {
    console.log('errno: ' + err)
    console.log('try to join group root again')
    // await joinRootGroup(user)
  })
  return await getGroupInfo('root')
}

const getRootGroup = async (ctx) => {
  await UserModel.findAll().then(res => {
    ctx.body = {
      code: 200,
      message: '',
      data: res
    }
  }).catch(err => {
    console.log(err)
  })
}

const getGroupInfo = (ctx) => {
  let root = {
    // gid: stringRandom(16),
    gid: 'stringRandom(16)',
    gname: 'root',
    gavatar: `http://127.0.0.1:5000/images/group/default.png`,
    gmember: [],
    created: 146541684133
  }
  ctx.body = {
    code: 200,
    message: '',
    data: [root]
  }
}

module.exports = {
  joinRootGroup,
  getRootGroup,
  getGroupInfo
}
