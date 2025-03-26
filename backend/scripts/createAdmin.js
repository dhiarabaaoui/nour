const bcrypt = require('bcryptjs');
const Admin = require('../models/admin'); // Path to Admin model

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash('admin123456', 10); // Replace with your desired password

    const newAdmin = new Admin({
        email: 'admin@example.com',
        password: hashedPassword,
    });

    await newAdmin.save();
    console.log("Admin created successfully!");
};

createAdmin().catch((err) => {
    console.error(err);
});
