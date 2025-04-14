const express = require('express');
const router = express.Router();
const salaryRecordController = require('../controller/salaryRecord.controller');
const isAuthenticated = require('../middleware/authMiddleware');

// Create salary record route
router.post('/createSalaryRecord', isAuthenticated, salaryRecordController.createSalaryRecord);
// Update salary record route
router.put('/updateSalaryRecord/:id', isAuthenticated, salaryRecordController.updateSalaryRecord);
// Get all salary records route
router.get('/getAllSalaryRecords', isAuthenticated, salaryRecordController.getAllSalaryRecords);
// Get salary record by userId route
router.get('/getSalaryRecord/:userId', isAuthenticated, salaryRecordController.getSalaryRecord);

module.exports = router;