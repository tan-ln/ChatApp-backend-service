const controller = require('../controller/user')

module.exports = (app, router) => {

  router.post('/user/signin', controller.postSignIn)
  // router.get('/api/signin/token', controller.verfiyToken)

  router.post('/user/signup', controller.postSignUp)

  // router.delete('/api/signin/token', controller.deleteToken)
}
