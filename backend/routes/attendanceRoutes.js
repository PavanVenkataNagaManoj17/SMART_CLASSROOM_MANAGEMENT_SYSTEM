const express = require('express');
const { markAttendance, getAttendance, getAttendanceByStudent } = require('../controllers/attendanceController');

const router = express.Router();

router.post('/mark', markAttendance);
router.get('/', getAttendance);
router.get('/student/:studentId', getAttendanceByStudent); // New route to get attendance by student

module.exports = router;