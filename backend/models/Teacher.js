const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Teacher = sequelize.define('Teacher', {
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
    // Add additional teacher-specific fields here
}, {
    tableName: 'teachers',
    timestamps: false,
});

User.hasOne(Teacher, { foreignKey: 'userId' });
Teacher.belongsTo(User, { foreignKey: 'userId' });

module.exports = Teacher;