const express = require('express');
const router = express.Router();
const craftController = require('../controllers/craftController');

router.get('/parse', craftController.getCraftList);

module.exports = router;
