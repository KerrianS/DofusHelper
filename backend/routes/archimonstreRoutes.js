const express = require('express');
const router = express.Router();
const monstreController = require('../controllers/archimonstreController');

router.get('/', monstreController.getMonstres);
router.post('/update', monstreController.updateMonstre);

module.exports = router;