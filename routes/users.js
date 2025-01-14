const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleCreateUser,handleLogInUser,handleUsersProfile } = require("../controllers/users");
const router = express.Router();

router.get('/user', handleGetAllUsers);


router.get('/user/profile', handleUsersProfile);

router.get('/user/:userId', handleGetUserById);

router.delete("/user/:userId", handleDeleteUserById);

router.post('/user', handleCreateUser);

router.post('/user/login', handleLogInUser);

module.exports = router;
 