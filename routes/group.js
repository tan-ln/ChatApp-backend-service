const controller = require('../controller/group')

module.exports = (app, router) => {
  router.get('/group/root', controller.getRootGroup)
  router.get('/group/source-files', controller.getGroupFiles)
}
