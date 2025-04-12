const { SalaryRecord, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Create a salary record 
exports.createSalaryRecord = async (req, res) => {
    const { userId, baseSalary } = req.body;
    try {
        const salaryRecord = await SalaryRecord.create({
            userId,
            baseSalary,
            fromMonth: moment().format('YYYY-MM-DD'),
            toMonth: moment().format('YYYY-MM-DD'),
        });
        res.status(201).json(salaryRecord);
    } catch (error) {
        res.status(500).json({ message: "Error creating salary record", error });
    }
}

// Update a salary Record
exports.updateSalaryRecord = async (req, res) =>  {
    const { id } = req.params;
    const { baseSalary, fromMonth, toMonth} = req.body;
    try {
        const salaryRecord = await SalaryRecord.findByPk(id);
        if (!salaryRecord) {
            return res.status(404).json({ message: "Salary record not found" });
        }
        salaryRecord.toMonth    = toMonth;
        salaryRecord.fromM0onth = fromMonth;
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
        const salaryRecords = await SalaryRecord.findAll();
        if (!salaryRecords) {
            return res.status(404).json({ message: "Salary records not found" });
        }

        res.status(200).json(salaryRecords);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving salary records", error });
    }
}

// Get salary record by userId
exports.getAllSalaryRecord = async (req, res) => {
    const { userId } = req.params;

    try {
        const salaryRecord = await SalaryRecord.findOne({
            where: { userId },
            include: [{ model: User, as: 'user' }]
        });

        if (!salaryRecord) {
            return res.status(404).json({ message: "Salary record not found" });
        }

        res.status(200).json(salaryRecord);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving salary record", error });
    }
}
