const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  updateHumidity,
  getPlantHumidity
} = require('../controller/plantController');

router.put('/:id/humidity', verifyToken, updateHumidity);

router.get('/:id/humidity', verifyToken, getPlantHumidity);

module.exports = router;
