const router = require('koa-router')()
const user = require('./user')
// const blog = require('./blogs')
// const tags = require('./tags')

module.exports = function withRouter(app) {
  // const prefix = app.config.router.prefix
  // router.prefix(prefix)

  user(app, router)

  // blog(app, router)
  // tags(app, router)

  // 启用路由， 
  app.use(router.routes()).use(router.allowedMethods())
}