const User = require('../models/User');

exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};