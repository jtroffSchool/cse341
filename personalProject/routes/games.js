const routes = require('express').Router();
const gamesController = require('../controllers/index');

routes.get('/', gamesController.getAllGames);
routes.get('/:id', gamesController.getSingleGame);

routes.post('/', gamesController.createGame);

module.exports = routes;
