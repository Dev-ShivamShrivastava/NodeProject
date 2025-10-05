const express = require('express');
const jwt = require('jsonwebtoken');
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleCreateUser,handleLogInUser,handleUsersProfile,handleCreateServiceRequest,handleGetServiceList,handleGetRequestsByStatus,handleUpdateServiceStatus } = require("../controllers/users");
const { authMiddleware } = require("../middleware/usersmiddleware");
const { createUserValidator } = require("../validator/userValidator");
const { validateRequest } = require("../middleware/validdata/validate");



const router = express.Router();

router.get('/user', handleGetAllUsers);


router.get('/user/profile', handleUsersProfile);

router.get('/user/:userId', authMiddleware, handleGetUserById);

router.delete("/user/:userId", handleDeleteUserById);

router.post('/createUser', createUserValidator,validateRequest, handleCreateUser);

router.post('/login', handleLogInUser);

router.post('/createServiceRequest', authMiddleware, handleCreateServiceRequest);

router.get('/getServiceList', handleGetServiceList);

router.get('/getRequestsByStatus', authMiddleware, handleGetRequestsByStatus);

router.put('/updateServiceStatus/:id', authMiddleware, handleUpdateServiceStatus);

module.exports = router;
 