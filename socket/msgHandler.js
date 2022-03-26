module.exports = (io, socket) => {
  const dispatchMsg = (data) => {
    io.emit('__broadcast', {
      type: 'plain_msg',
      data
    })
  }
  socket.on('msg:dispatch', dispatchMsg)
}
