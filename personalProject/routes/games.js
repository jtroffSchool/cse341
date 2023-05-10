const routes = require('express').Router();
const gamesController = require('../controllers/index');

const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

routes.get('/', gamesController.getAllGames);
routes.get('/:id', gamesController.getSingleGame);

routes.post(
	'/',
	auth.isAuthenticated,
	validation.saveGame,
	gamesController.createGame
);

routes.put(
	'/:id',
	auth.isAuthenticated,
	validation.saveGame,
	gamesController.updateGame
);

routes.delete('/:id', auth.isAuthenticated, gamesController.deleteGame);

module.exports = routes;
