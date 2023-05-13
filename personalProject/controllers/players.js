const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllPlayers = async (req, res) => {
	try {
		//#swagger.tags=['Players']
		//#swagger.summary=Get all players
		//#swagger.description=Get all the players from the database
		const result = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('players')
			.find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSinglePlayer = async (req, res) => {
	try {
		//#swagger.tags=['Players']
		//#swagger.summary=Get desired player
		//#swagger.description=Enter an id to get the corresponding player
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('Must use a valid player id to find a player.');
		}
		const objectId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('players')
			.find({ _id: objectId });
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createPlayer = async (req, res) => {
	try {
		//#swagger.tags=['Players']
		//#swagger.summary=Add new player
		//#swagger.description=Provide values to the fields to add a new player
		const player = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			email: req.body.email,
			favoriteGenre: req.body.favoriteGenre,
		};
		const response = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('players')
			.insertOne(player);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res
				.status(500)
				.json(response.error || 'Could not add player due to some error.');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updatePlayer = async (req, res) => {
	try {
		//#swagger.tags=['Players']
		//#swagger.summary=Update existing player
		//#swagger.description=Update player based on Id passed
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('Must use a valid player id to update a player.');
		}
		const objectId = new ObjectId(req.params.id);
		const player = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			email: req.body.email,
			favoriteGenre: req.body.favoriteGenre,
		};
		const response = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('players')
			.replaceOne({ _id: objectId }, player);
		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res
				.status(500)
				.json(response.error || 'Could not update player due to some error.');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deletePlayer = async (req, res) => {
	try {
		//#swagger.tags=['Players']
		//#swagger.summary=Delete existing player
		//#swagger.description=Delete player based on Id passed
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('Must use a valid player id to delete a player.');
		}
		const objectId = new ObjectId(req.params.id);
		const response = await mongodb
			.getDb()
			.db('board_card_games')
			.collection('players')
			.deleteOne({ _id: objectId });
		if (response.deletedCount > 0) {
			res.status(200).send();
		} else {
			res
				.status(500)
				.json(response.error || 'Could not delete user due to some error.');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	//redirectBase,
	getAllPlayers,
	getSinglePlayer,
	createPlayer,
	updatePlayer,
	deletePlayer,
};
