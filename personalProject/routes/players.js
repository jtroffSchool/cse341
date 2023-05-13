const routes = require('express').Router();
const playersController = require('../controllers/players');

const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

routes.get('/', playersController.getAllPlayers);
routes.get('/:id', playersController.getSinglePlayer);

routes.post(
	'/',
	auth.isAuthenticated,
	validation.savePlayer,
	playersController.createPlayer
);

routes.put(
	'/:id',
	auth.isAuthenticated,
	validation.savePlayer,
	playersController.updatePlayer
);

routes.delete('/:id', auth.isAuthenticated, playersController.deletePlayer);

module.exports = routes;
