const Store = require('../store')
const redis = new Store()

module.exports = (io, socket) => {
  const dispatchMsg = async (msg) => {
    const { type, data } = msg
    // 群聊
    if (data.group) {
      // root group 消息 广播
      if (data.group === 'root') {
        // 其他人广播
        socket.to('root').emit('__broadcast', {
          type: 'plain_msg',
          data
        })
      } else {
        // 其他 group/room
      }
    } else {
      // 私聊消息
      console.log(data)
      const target = data.to
      const socketId = await redis.get_socket(target)
      socket.to(socketId).emit('__private', msg)
    }

  }
  socket.on('msg:dispatch', dispatchMsg)
}
