const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Get all users
router.get('/', authMiddleware, userController.getAllUsers);
// Get a user by ID
router.get('/:id', authMiddleware, userController.getUserById);
// Update a user by ID
router.put('/:id', authMiddleware, userController.updateUserById);
// Delete a user by ID
router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;