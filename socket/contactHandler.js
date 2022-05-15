const Store = require('../store')
const redis = new Store()
const { addContacts } = require('../controller/contact')

module.exports = (io, socket) => {
  // 申请添加加好友
  // self: self_email / target: target_email
  const requestSubscribe = async ({ self, target }) => {
    const socketId = await redis.get_socket(target)
    const msg = {
      group: null,
      from: self,
      to: target,
      type: 'system',
      content: self + ' 请求添加你为好友',
      timestamp: Date.now()
    }
    socket.to(socketId).emit('__private', {
      type: 'system',
      data: msg
    })    
  }

  // 双向订阅
  const userSubscribe = async ({ self, target }) => {
    await addContacts(self, target)
    const b_socketId = await redis.get_socket(target)
    // to self
    socket.emit('__private', {
      type: 'subscribe',
      data: {
        group: null,
        from: target,
        to: self,
        type: 'text',
        content: '我们已经是好友了，快开始对线吧！',
        timestamp: Date.now()
      }
    })
    // to target
    socket.to(b_socketId).emit('__private', {
      type: 'subscribe',
      data: {
        group: null,
        from: self,
        to: target,
        type: 'text',
        content: '我们已经是好友了，快开始对线吧！',
        timestamp: Date.now()
      }
    })
  }

  socket.on('contact:req-subscribe', requestSubscribe)
  socket.on('contact:user-subscribe', userSubscribe)
}
