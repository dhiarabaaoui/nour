// // userRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');  // Modèle User
// const router = express.Router();

// // Login Route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
  
//       // Generate JWT token with userType (added here)
//       const token = jwt.sign(
//         { id: user._id, userType: user.userType }, // Include userType in token payload
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.json({ token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  

// module.exports = router;
