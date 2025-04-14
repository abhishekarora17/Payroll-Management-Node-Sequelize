const { SalaryRecord, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Create a salary record 
exports.createSalaryRecord = async (req, res) => {
    const { userId, baseSalary } = req.body;
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the salary record already exists
        const existingSalaryRecord = await SalaryRecord.findOne({ where: { userId } });
        if (existingSalaryRecord) {
            return res.status(400).json({ message: "Salary record already exists for this user" });
        }
        // Create a new salary record
        const salaryRecord = await SalaryRecord.create({
            userId,
            baseSalary
        });
        res.status(201).json(salaryRecord);
    } catch (error) {
        res.status(500).json({ message: "Error creating salary record", error });
    }
}

// Update a salary Record
exports.updateSalaryRecord = async (req, res) =>  {
    const { userId } = req.params;
    const { baseSalary } = req.body;
    try {
        const salaryRecord = await SalaryRecord.findOne(userId);
        if (!salaryRecord) {
            return res.status(404).json({ message: "Salary record not found" });
        }

        salaryRecord.baseSalary = baseSalary;
        await salaryRecord.save();
        res.status(200).json(salaryRecord);
    } catch (error) {
        res.status(500).json({ message: "Error updating salary record", error });
    }
}

// Get all salary records
exports.getAllSalaryRecords = async (req, res) => {
    try {
        const salaryRecords = await User.findAll({
            include: [{ model: SalaryRecord, as: 'salary' }]
        });
        if (!salaryRecords) {
            return res.status(404).json({ message: "Salary records not found" });
        }

        res.status(200).json(salaryRecords);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving salary records", error });
    }
}

// Get salary record by userId
exports.getSalaryRecord = async (req, res) => {
    const { userId } = req.params;

    try {
        const salaryRecord = await User.findOne({
            where: { id: userId },
            include: [{ model: SalaryRecord, as: 'salary' }]
        });

        if (!salaryRecord) {
            return res.status(404).json({ message: "Salary record not found" });
        }

        res.status(200).json(salaryRecord);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving salary record", error });
    }
}
