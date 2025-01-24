const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    // Add additional student-specific fields here
}, {
    tableName: 'students',
    timestamps: false,
});

User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = Student;