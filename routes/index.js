const router = require('koa-router')()
const user = require('./user')
const chat = require('./chat')
const contact = require('./contact')
const group = require('./group')

module.exports = function withRouter(app) {
  // const prefix = app.config.router.prefix
  // router.prefix(prefix)

  user(app, router)
  chat(app, router)
  contact(app, router)
  group(app, router)

  // 启用路由， 
  app.use(router.routes()).use(router.allowedMethods())
}
