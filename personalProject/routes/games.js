const routes = require('express').Router();
const gamesController = require('../controllers/index');

const validation = require('../middleware/validate');

routes.get('/', gamesController.getAllGames);
routes.get('/:id', gamesController.getSingleGame);

routes.post('/', validation.saveGame, gamesController.createGame);

routes.put('/:id', validation.saveGame, gamesController.updateGame);

routes.delete('/:id', gamesController.deleteGame);

module.exports = routes;
