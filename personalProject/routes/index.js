const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/index');

router.get('/', gamesController.redirectBase);
router.use('/games', require('./games'));

module.exports = router;
