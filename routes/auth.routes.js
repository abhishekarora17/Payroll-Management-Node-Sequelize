const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Register route
router.post('/register', authController.register);
// Login route
router.post('/login', authController.login);
// Logout route
router.post('/logout', authMiddleware, authController.logout);
// Refresh token route
router.post('/refresh-token', authMiddleware, authController.refreshToken);

module.exports = router;
