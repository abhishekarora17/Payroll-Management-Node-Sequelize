const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const upload  = require('../middleware/upload');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/authMiddleware');
const { route } = require('./auth.routes');

// Get all users
router.get('/', isAdmin, userController.getAllUsers);
// Get a user by ID
router.get('/:id', isAuthenticated, userController.getUserById);
// Update a user by ID
router.put('/updateUser/:id', isAuthenticated, userController.updateUserById);
// Delete a user by ID
router.delete('/:id', isAuthenticated, userController.deleteUserById);
// Update a user role
router.put('/updateRole/:id', isAdmin, userController.updateRole);
// Upload profile picture
router.put('/uploadUserProfile',upload.single('profilePic'), userController.uploadUserProfile);
// Get profile picture
router.get('/getUserProfile/:id', userController.getUserProfile);

module.exports = router;