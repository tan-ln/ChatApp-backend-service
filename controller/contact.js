// 登录 model
const getRootGroup = async (ctx) => {
  ctx.body = {
    code: 200,
    message: 'get root group'
  }
}

module.exports = {
  getRootGroup
}
