const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword, role });

        if (role === 'student') {
            await Student.create({ userId: user.id });
        } else if (role === 'teacher') {
            await Teacher.create({ userId: user.id });
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error); // Debugging log
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt:', email); // Debugging log
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found:', email); // Debugging log
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('Stored password hash:', user.password); // Debugging log
        console.log('Provided password:', password); // Debugging log

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match for user:', email); // Debugging log
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error('Login error:', error); // Debugging log
        res.status(500).json({ error: 'Server error' });
    }
};