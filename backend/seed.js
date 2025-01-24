const bcrypt = require('bcryptjs');
const User = require('./models/User');
const sequelize = require('./config/db');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will drop the existing tables and create new ones

    const hashedPassword = await bcrypt.hash('12345', 12);

    await User.bulkCreate([
        { email: 'teacher@gmail.com', password: hashedPassword, role: 'teacher' },
        { email: 'pavan@gmail.com', password: hashedPassword, role: 'student' },
    ]);

    console.log('Database seeded!');
    process.exit();
};

seedDatabase();