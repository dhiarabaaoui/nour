const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, loginUser } = require('../controllers/authController');

// Route pour l'inscription admin
router.post('/admin/register', registerAdmin);

// Route pour la connexion admin
router.post('/admin/login', loginAdmin);

// Route pour la connexion utilisateur
router.post('/login', loginUser);

module.exports = router;
