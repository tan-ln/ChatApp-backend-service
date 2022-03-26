module.exports = (io, socket) => {
  const goOnLine = (user, path) => {
    // 注册 成功自动加入 root 群聊，返回 root 群详情，推送 xx 加入群聊消息
    if (path === 'signup') {
      const msg = {
        group: 'root',
        from: 'root',
        to: 'all',
        type: 'text',
        content: user.email + '加入群聊',
        timestamp: Date.now()
      }
      io.emit('__broadcast', {
        type: 'signup',
        data: msg
      })
    }
    // 登录成功 广播 上线消息
    if (path === 'signin') {
      const msg = {
        group: 'root',
        from: 'root',
        to: 'all',
        type: 'text',
        content: user.email + '上线啦!',
        timestamp: Date.now()
      }
      io.emit('__broadcast', {
        type: 'signin',
        data: msg
      })
    }
  }

  socket.on('user:goOnLine', goOnLine)
}
