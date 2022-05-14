const controller = require('../controller/contact')

module.exports = (app, router) => {
  // all contacts
  router.post('/contact/all-contacts', controller.getAllContacts)
  // router.post('/contact/add-friends', controller.addContacts)
}
