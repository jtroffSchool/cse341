const routes = require('express').Router();
const data = require('../controllers/');

routes.get('/', data.getData);

module.exports = routes;