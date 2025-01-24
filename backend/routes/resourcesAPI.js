const express = require('express');
const router = express.Router();
const resourceService = require('../services/resourceService');

router.get('/', async (req, res) => {
  try {
    const resources = await resourceService.getResources();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

router.get('/items', async (req, res) => {
  try {
    const resources = await resourceService.getResources();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

module.exports = router; 