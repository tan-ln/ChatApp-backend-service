const { joinRootGroup } = require('../controller/group')

module.exports = (io, socket) => {
  const getRootGroup = async (user) => {
    // 注册成功自动加入 root 群聊，返回 root 群详情，推送xx加入群聊消息
    const rootGroup = await joinRootGroup(user)
    const newMsg = {
      from: 'app',
      to: 'all',
      type: 'text',
      content: user.email + '加入群聊',
      timestamp: new Date().toLocaleString()
    }
    io.emit('getRootGroup', rootGroup)
    io.emit('callRootGroup', JSON.stringify(newMsg))
    console.log(res)
  }

  // const readOrder = (orderId, callback) => {
  //   console.log(orderId)
  // }

  socket.on('user:getRootGroup', getRootGroup)
  // socket.on('order:read', readOrder)
}
