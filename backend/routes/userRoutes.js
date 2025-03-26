const express = require('express');
const { signUp, loginUser } = require('../controllers/userController');  // Correct import
const router = express.Router();

// Sign Up route
router.post('/signup', signUp);

// Login route
router.post('/login', loginUser);

module.exports = router;
