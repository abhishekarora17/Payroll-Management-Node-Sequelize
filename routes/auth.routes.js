const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const isAuthenticated = require('../middleware/authMiddleware');

// Register route
router.post('/register', authController.register);
// Login route
router.post('/login', authController.login);
// Logout route
router.post('/logout', authController.logout);
// Refresh token route
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
