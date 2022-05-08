const UserModel = require('../models/user')
const GroupModel = require('../models/group')
const stringRandom = require('string-random')

/**
 * 加入群组
 * @param {string} group 群组名
 * @param {object} user 用户
 * @returns 
 */
const joinGroup = async function (group, user) {
  if (!group) return 'error'
  // default root group
  // create if not exist
  let data = {
    gid: stringRandom(16),
    gname: group,
    gavatar: `http://127.0.0.1:5000/images/group/root.png`,   // root as default group avatar
    gmember: JSON.stringify([]),
    timestamp: new Date().toLocaleString()
  }
  await GroupModel.findOrCreate({ where: { gname: group }, defaults: data }).then(async res => {
    const [groups] = res
    const newmember = [user]
    const oldmember = JSON.parse(groups.gmember)
    // 合并 组内成员
    const merg = oldmember.concat(newmember)
    await GroupModel.update({ gmember: JSON.stringify(merg) }, { where: { gname: group } })
  }).catch(err => {
    console.log('errno: ' + err)
    console.log('try to join group root again')
    // await joinGroup(user)
  })
  // return await getGroupInfo()(group)
}


const getRootGroup = async (ctx) => {
  await GroupModel.findOne({ where: { gname: 'root' } }).then(res => {
    ctx.body = {
      code: 200,
      message: '',
      data: res
    }
  }).catch(err => {
    console.log(err)
  })
}

// const getGroupInfo = (ctx) => async (group) => {
//   await GroupModel.findOne({ where: { gname: group } }).then(res => {
//     return res
//   }).catch(err => {
//     console.log(err);
//   })
// }

module.exports = {
  joinGroup,
  getRootGroup
}
