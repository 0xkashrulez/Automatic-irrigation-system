const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {getPlantBySystem} = require('../controller/plantController');
const {
  updateHumidity,
  getPlantHumidity
} = require('../controller/plantController');

router.put('/:id/humidity', verifyToken, updateHumidity);

router.get('/:id/humidity', verifyToken, getPlantHumidity);

router.get('/by-system/:systemId', verifyToken, getPlantBySystem);

module.exports = router;
