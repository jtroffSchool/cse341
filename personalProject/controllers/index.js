const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const redirectBase = async (req, res) => {
	res.redirect(['/games']);
};

const getAllGames = async (req, res) => {
	try {
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
