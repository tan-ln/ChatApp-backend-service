const controller = require('../controller/contact')

module.exports = (app, router) => {
  router.post('/contact/root-group', controller.getRootGroup)
}
