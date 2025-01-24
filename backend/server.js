const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const sequelize = require('./config/db');
const User = require('./models/User');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Attendance = require('./models/Attendance');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});