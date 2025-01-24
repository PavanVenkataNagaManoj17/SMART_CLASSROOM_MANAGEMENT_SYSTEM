const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./Student');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'attendance',
    timestamps: false,
});

Student.hasMany(Attendance, { foreignKey: 'studentid' });
Attendance.belongsTo(Student, { foreignKey: 'studentid' });

module.exports = Attendance;