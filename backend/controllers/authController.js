const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

exports.signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            role
        });

        if (role === 'student') {
            await Student.create({ userId: user.id });
        } else if (role === 'teacher') {
            await Teacher.create({ userId: user.id });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            'your_jwt_secret',  // Replace with process.env.JWT_SECRET in production
            { expiresIn: '1h' }
        );

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                userId: user.id,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user.id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};