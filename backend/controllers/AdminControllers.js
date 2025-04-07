const Admin = require('../models/admin');  // Correct import
const bcrypt = require('bcryptjs');  // For password hashing and comparison
const jwt = require('jsonwebtoken');  // For generating JWT token

// Admin login or User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher d'abord dans la collection "admins"
    let admin = await Admin.findOne({ email });

    if (!admin) {
      // Si pas trouvé dans admins, chercher dans "users"
      admin = await User.findOne({ email });
      if (!admin) {
        return res.status(404).json({ error: 'Admin or User not found' }); // Aucun utilisateur trouvé
      }
    }

    // Compare le mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' }); // Le mot de passe ne correspond pas
    }

    // Créer le token JWT
    const token = jwt.sign({ id: admin._id, email: admin.email, userType: admin.userType }, 'your_secret_key', { expiresIn: '1h' });

    // Renvoi du token dans la réponse
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};