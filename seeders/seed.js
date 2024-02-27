
const db = require('../models/model');
const bcrypt = require('bcrypt');

// Function to seed the database with initial data
async function seed() {
    try {
        const hashedPassword1 = await bcrypt.hash('password', 10);
        const hashedPassword2 = await bcrypt.hash('password', 10);
        // Add your seeding logic here
        await db.Users.bulkCreate([
            { name: 'Admin', email: 'admin@gmail.com', contact: '1234567890', role: 'admin', password: hashedPassword1 },
            { name: 'user', email: 'user@gmail.com', contact: '2345678901', role: 'user', password: hashedPassword2 },
        ]);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Call the seed function
seed();
