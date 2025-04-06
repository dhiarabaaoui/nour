const express = require('express');
const { loginAdmin } = require('../controllers/authController');
const router = express.Router();

// Route pour la connexion de l'administrateur
router.post('/login', loginAdmin);

module.exports = router;
