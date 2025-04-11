const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');
const isAuthenticated = require('../middleware/authMiddleware');

// Get All attendance route
router.get('/getAllAttendance', isAuthenticated, attendanceController.getAllAttendance);
// Get user attendance route
router.get('/getUserAttendance/:id', isAuthenticated, attendanceController.getUserAttendance);
// Mark attendance route
router.post('/markAttendance', isAuthenticated, attendanceController.markAttendance);
// Update attendance route
router.put('/updateAttendance/:id', isAuthenticated, attendanceController.updateAttendance);
// Delete attendance route
router.delete('/deleteAttendance/:id', isAuthenticated, attendanceController.deleteAttendance);


module.exports = router;
