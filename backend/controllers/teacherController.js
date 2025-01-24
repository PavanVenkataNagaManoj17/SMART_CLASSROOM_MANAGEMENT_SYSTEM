const User = require('../models/User');

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};