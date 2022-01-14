const controller = require('../controller/chat')

module.exports = (app, router) => {

  router.post('/chat', controller.getChatMsg)
  router.get('/chat', controller.getChatMsg)
  // router.get('/api/signin/token', controller.verfiyToken)

  // router.post('/user/signup', controller.postSignUp)

  // router.delete('/api/signin/token', controller.deleteToken)
}
