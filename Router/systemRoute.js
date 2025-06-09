const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  fetchAllSystems,
  fetchSystem,
  addSystem,
  editSystem,
  deleteSystem
} = require('../controller/systemController');

// جلب كل السيستمز
router.get('/', verifyToken, fetchAllSystems);

// جلب سيستم محدد
router.get('/:systemId', verifyToken, fetchSystem);

// إضافة سيستم جديد (وبيعمل بلانت مرتبط أوتوماتيكي)
router.post('/', verifyToken, addSystem);

// تعديل سيستم
router.put('/:systemId', verifyToken, editSystem);

// حذف سيستم مع نباتاته
router.delete('/:systemId', verifyToken, deleteSystem);

module.exports = router;
