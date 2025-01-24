const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

exports.markAttendance = async (req, res) => {
    const { student_id, subject, date, status } = req.body;

    try {
        const attendance = await sequelize.query(
            'INSERT INTO attendance (student_id, subject, date, status) VALUES (:student_id, :subject, :date, :status)',
            {
                replacements: { student_id, subject, date, status },
                type: QueryTypes.INSERT
            }
        );
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const attendanceRecords = await sequelize.query(
            'SELECT * FROM attendance',
            { type: QueryTypes.SELECT }
        );
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAttendanceByStudent = async (req, res) => {
    const { studentId } = req.params;
    console.log(`Fetching attendance for student ID: ${studentId}`); // Debugging log

    try {
        const attendanceRecords = await sequelize.query(
            'SELECT * FROM attendance WHERE student_id = :studentId',
            {
                replacements: { studentId },
                type: QueryTypes.SELECT
            }
        );
        console.log(`Attendance records: ${JSON.stringify(attendanceRecords)}`); // Debugging log
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance for student:', error);
        res.status(500).json({ error: 'Server error' });
    }
};