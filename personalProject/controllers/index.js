const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const redirectBase = async (req, res) => {
	//#swagger.tags=['Redirect']
	//#swagger.summary=Redirects base url
	//#swagger.description=Just redirects base url to /games
	res.redirect(['/games']);
};

const getAllGames = async (req, res) => {
	try {
		//#swagger.tags=['Games']
		//#swagger.summary=Get all games
		//#swagger.description=Get all the games from the database
		const result = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('games')
			.find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSingleGame = async (req, res) => {
	try {
		//#swagger.tags=['Games']
		//#swagger.summary=Get desired game
		//#swagger.description=Enter an id to get the corresponding game
		const objectId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('games')
			.find({ _id: objectId });
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createGame = async (req, res) => {
	try {
		//#swagger.tags=['Games']
		//#swagger.summary=Add new game
		//#swagger.description=Provide values to the fields to add a new game
		const game = {
			gameName: req.body.gameName,
			creator: req.body.creator,
			gameType: req.body.gameType,
			gameGenre: req.body.gameGenre,
			numberPlayers: req.body.numberPlayers,
			playTime: req.body.playTime,
			difficultyToLearn: req.body.difficultyToLearn,
			recommended: req.body.recommended,
		};
		const response = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('games')
			.insertOne(game);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res
				.status(500)
				.json(response.error || 'Could not add game due to some error.');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	redirectBase,
	getAllGames,
	getSingleGame,
	createGame,
};
