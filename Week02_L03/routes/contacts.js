const routes = require('express').Router();
const contactsController = require('../controllers/index');

routes.get('/', contactsController.getAllContacts);
routes.get('/:id', contactsController.getSingleContact);

routes.post('/', contactsController.createContact);

routes.put('/:id', contactsController.updateContact);

routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;
