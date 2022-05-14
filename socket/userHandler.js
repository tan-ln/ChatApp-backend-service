const Store = require('../store')
const redis = new Store()
const { joinGroup } = require('../controller/group')

module.exports = (io, socket) => {
  const goOnLine = (user, path) => {
    const { email } = user
    // 注册 成功自动加入 root 群聊，返回 root 群详情，推送 xx 加入群聊消息
    if (path === 'signup') {
      joinGroup('root', user)

      const msg = {
        group: 'root',
        from: 'app',
        to: 'all',
        type: 'text',
        content: email + '加入群聊',
        timestamp: Date.now()
      }
      io.emit('__broadcast', {
        type: 'signup',
        data: msg
      })
      redis.set_socket(email, socket.id)
    }
    // 登录成功 广播 上线消息
    if (path === 'signin') {
      const msg = {
        group: 'root',
        from: 'app',
        to: 'all',
        type: 'text',
        content: email + '上线啦!',
        timestamp: Date.now()
      }
      io.emit('__broadcast', {
        type: 'signin',
        data: msg
      })
      redis.set_socket(email, socket.id)
    }
  }

  const offLine = (email) => {
    redis.del_socket(email)
  }

  socket.on('user:goOnLine', goOnLine)
  socket.on('user:offLine', offLine)
}
