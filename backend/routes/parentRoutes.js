const express = require('express');
const router = express.Router();
const { signupParent } = require('../controllers/parentController'); // Importation du contrôleur parent
const authMiddleware = require('../middleware/authMiddleware');
// Route d'inscription du parent
router.post('/signup', signupParent);

module.exports = router;
