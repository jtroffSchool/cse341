const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/', require('./contacts'));

module.exports = router;
