const express = require('express');
const router = express.Router();
const { registerHealthCare } = require('../controllers/HealthCareController');

// Route d'inscription des professionnels de santé
router.post('/register', registerHealthCare);

module.exports = router; 