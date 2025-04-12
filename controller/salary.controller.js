const { Attendance, User, Salary, SalaryRecord } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Pay Salary 
exports.paySalary = async (req, res) => {
    const { userId, month, bonus, deductions } = req.body;

    const { baseSalary } = await SalaryRecord.findOne({
        where: { userId },
        order: [['createdAt', 'DESC']]
    });
    if (!baseSalary) {
        return res.status(404).json({ message: "Base salary not found" });
    }
    const existingSalary = await Salary.findOne({
        where: { userId, month },
    });
    if (existingSalary) {
        return res.status(400).json({ message: "Salary already paid for this month" });
    }
    try {
        const salary = await Salary.create({
            userId,
            month,
            baseSalary,
            bonus,
            deductions,
            netSalary: baseSalary + (bonus || 0) - (deductions || 0),
            paymentDate: moment().format('YYYY-MM-DD'),
            status: 'paid'
        });
        res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({ message: "Error paying salary", error });
    }
}