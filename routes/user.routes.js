const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const isAuthenticated = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Get all users
router.get('/', isAdmin, userController.getAllUsers);
// Get a user by ID
router.get('/:id', isAuthenticated, userController.getUserById);
// Update a user by ID
router.put('/:id', isAuthenticated, userController.updateUserById);
// Delete a user by ID
router.delete('/:id', isAuthenticated, userController.deleteUserById);
// Update a user role
router.put('/updateRole/:id', isAdmin, userController.updateRole);

module.exports = router;