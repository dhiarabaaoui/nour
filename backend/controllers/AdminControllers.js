const Admin = require('../models/admin');  // Correct import
const bcrypt = require('bcryptjs');  // For password hashing and comparison
const jwt = require('jsonwebtoken');  // For generating JWT token

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' }); // Email doesn't exist
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' }); // Password mismatch
    }

    // Create JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, 'your_secret_key', { expiresIn: '1h' });

    // Send success response with token
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
