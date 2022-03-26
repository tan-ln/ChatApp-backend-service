const controller = require('../controller/contact')

module.exports = (app, router) => {
  router.post('/contact/root-group', controller.getRootGroup)
  // all contacts
  router.post('/contact/all-contacts', controller.getAllContacts)
}
