const controller = require('../controller/group')

module.exports = (app, router) => {
  router.get('/group/root', controller.getRootGroup)
  // router.get('/group/all-groups', controller.getGroupInfo)
}
