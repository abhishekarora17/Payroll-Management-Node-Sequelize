const { Attendance, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Get all attendance records 
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.findAll({
            include: [{ model: User, as: 'user' }]
        });
        if (!attendanceRecords) {
            return res.status(404).json({ message: "No attendance records found" });
        }
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance records", error });
    }
}

// Get user attendance record
exports.getUserAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const attendanceRecords = await Attendance.findAll({
            where: { userId: id },
            include: [{ model: User, as: 'user' }]
        });
        if (!attendanceRecords) {
            return res.status(404).json({ message: "No attendance records found for this user" });
        }
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance records", error });
    }
}

// Mark attendance
exports.markAttendance = async (req, res) => {
    const { userId, status, checkIn, checkOut } = req.body;
    try {
        const attendanceRecord = await Attendance.create({
            userId,
            date: moment().format('YYYY-MM-DD'),
            status,
            checkIn,
            checkOut
        });
        res.status(201).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ message: "Error marking attendance", error });
    }
}

// Update attendance record
exports.updateAttendance = async (req , res) => {
    const {id} = req.params;
    const {status, checkIn, checkOut} = req.body;
    try {
        const attendance = await Attendance.findByPk(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found." });
        }
        attendance.status = status;
        attendance.checkIn = checkIn;
        attendance.checkOut = checkOut;
        await attendance.save();
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance record", error });
    }
}

// Delete attendance record for particular date of a user
exports.deleteAttendance = async (req, res) => {
    const { id }  = req.params;
    const { date } = req.body;

    let getAttendance = await Attendance.findOne({
        where: {
            userId: id,
            date: date
        }
    });

    if (!getAttendance) {
        return res.status(404).json({ message: "Attendance record not found." });
    }

    try {
        await getAttendance.destroy();
        res.status(200).json({ message: "Attendance record deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting attendance record", error });
    }
}
