const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
	const result = await mongodb.getDb().db('L02').collection('User').find();
	result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists);
	});
};

const getSingleContact = async (req, res) => {
	const objectId = new ObjectId(req.query.id);
	const result = await mongodb
		.getDb()
		.db('L02')
		.collection('User')
		.find({ _id: objectId });
	result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists);
	});
};

const createContact = async (req, res) => {
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday,
	};
	const response = await mongodb
		.getDb()
		.db('L02')
		.collection('User')
		.insertOne(contact);
	if (response.acknowledged) {
		res.status(201).json(response);
	} else {
		res
			.status(500)
			.json(response.error || 'Could not add user due to some error.');
	}
};

const updateContact = async (req, res) => {
	const objectId = new ObjectId(req.query.id);
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday,
	};
	const response = await mongodb
		.getDb()
		.db('L02')
		.collection('User')
		.replaceOne({ _id: objectId }, contact);
	if (response.modifiedCount > 0) {
		res.status(200).send();
	} else {
		res
			.status(500)
			.json(response.error || 'Could not update user due to some error.');
	}
};

const deleteContact = async (req, res) => {
	const objectId = new ObjectId(req.query.id);
	const response = await mongodb
		.getDb()
		.db('L02')
		.collection('User')
		.deleteOne({ _id: objectId });
	if (response.deletedCount > 0) {
		res.status(200).send();
	} else {
		res
			.status(500)
			.json(response.error || 'Could not delete user due to some error.');
	}
};

module.exports = {
	getAllContacts,
	getSingleContact,
	createContact,
	updateContact,
	deleteContact,
};
