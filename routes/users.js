const express = require('express');
const jwt = require('jsonwebtoken');
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleCreateUser,handleLogInUser,handleUsersProfile } = require("../controllers/users");
const { handleGetUserByIdMiddleware } = require("../middleware/usersmiddleware");

const router = express.Router();

router.get('/user', handleGetAllUsers);


router.get('/user/profile', handleUsersProfile);

router.get('/user/:userId', handleGetUserByIdMiddleware, handleGetUserById);

router.delete("/user/:userId", handleDeleteUserById);

router.post('/user', handleCreateUser);

router.post('/user/login', handleLogInUser);

module.exports = router;
 