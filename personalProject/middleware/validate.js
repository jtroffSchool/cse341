const validator = require('../helpers/validate');

const saveGame = (req, res, next) => {
	const validationRule = {
		gameName: 'required|string',
		creator: 'required|string',
		gameType: 'required|string',
		gameGenre: 'required|string',
		numberPlayers: 'required|string',
		playTime: 'required|string',
		difficultyToLearn: 'required|string',
		recommended: 'required|string',
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next();
		}
	});
};

const savePlayer = (req, res, next) => {
	const validationRule = {
		firstName: 'required|string',
		lastName: 'required|string',
		phone: 'required|string',
		email: 'required|email',
		favoriteGenre: 'required|string',
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next();
		}
	});
};

module.exports = {
	saveGame,
	savePlayer,
};
