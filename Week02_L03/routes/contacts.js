const routes = require('express').Router();
const contactsController = require('../controllers/index');

routes.get('/', contactsController.getAllContacts);
routes.get('/user', contactsController.getSingleContact);

routes.post('/', contactsController.createContact);

routes.put('/user', contactsController.updateContact);

routes.delete('/user', contactsController.deleteContact);

module.exports = routes;
