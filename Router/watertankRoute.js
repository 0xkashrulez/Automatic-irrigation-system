const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { fetchWaterTank, editWaterTank,createWaterTank } = require('../controller/waterTankController');

router.get('/:userId', verifyToken, fetchWaterTank);
router.post('/', verifyToken, createWaterTank);
router.post('/:id', verifyToken, editWaterTank);

module.exports = router;
