const express = require('express');
const {createUser,getUserData,updateUserData,deleteUserData,loginUser} = require('../controller/userController')
const router = express.Router();


router.post('/create', createUser);
router.get('/get', getUserData);
router.put('/update/:id', updateUserData)
router.delete('/delete/:id', deleteUserData)
router.post('/login',loginUser)

module.exports = router