const express=require('express')
const router =express.Router()
const verifyToken=require('../middleware/verifyToken')
const { editUser, getCurrentUser, fetchAllUser, sendMessage } = require('../controller/userController')
router.get('/',verifyToken,fetchAllUser)
router.get('/current-account',verifyToken,getCurrentUser)
router.put('/edit-profile',verifyToken,editUser)
router.post('/cuntact-us',verifyToken,sendMessage)
module.exports=router