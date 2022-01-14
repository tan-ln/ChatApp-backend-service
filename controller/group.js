const fs = require('fs')
const GroupModel = require('../models/group')
const stringRandom = require('string-random')

const joinRootGroup = async function (data) {
  const { email } = data
  let respData = {
    gid: stringRandom(16),
    gname: 'root',
    gavatar: `http://127.0.0.1:5000/images/group/default.png`,
    gmember: `${email}`,
    timestamp: new Date().toLocaleString()
  }
  await GroupModel.findOrCreate({ where: { gname: 'root' }, defaults: respData }).then(async res => {
    const member = res[0].dataValues.gmember
    const execRes = await GroupModel.update({ gmember: email+ ',' + member }, { where: { gname: 'root' } })
    // response
    respData = execRes[0] === 1 ? res[0].dataValues : false
  }).catch(async err => {
    console.log('errno: ' + err)
    console.log('try to join group root again')
    await joinRootGroup(email)
  })
  return respData
}

module.exports = {
  joinRootGroup
}
