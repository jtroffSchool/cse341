const routes = require('express').Router();
const data = require('../controllers/index');

routes.get('/', data.getUser);
routes.get('/username', data.getUsername);

module.exports = routes;