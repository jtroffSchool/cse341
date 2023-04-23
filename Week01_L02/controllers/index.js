const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const getUser = async (req, res, next) => {
    const result = await mongodb.getDb().db('L02').collection('User').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getUsername = async (req, res, next) => {
    const objectId = new ObjectId(req.query.id);
    const result = await mongodb.getDb().db('L02').collection('User').find({_id: objectId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

module.exports = {
    getUser,
    getUsername,
};