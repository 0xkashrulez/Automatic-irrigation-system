const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { deleteSystem, editSystem, addSystem, fatchSystem, fatchAllSystems } = require('../controller/systemController');

router.get('/system-globle',verifyToken, fatchAllSystems);
router.get('/:systemId',verifyToken, fatchSystem);
router.post('/',verifyToken, addSystem);
router.put('/:systemId',verifyToken, editSystem);
router.delete('/:systemId',verifyToken, deleteSystem);


module.exports = router;
