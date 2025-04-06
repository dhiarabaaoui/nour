const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel'); // Utilisation du modèle Admin

// Fonction pour gérer la connexion de l'administrateur
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'admin existe
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Comparer les mots de passe
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { adminId: admin._id, userType: admin.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retourner le token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginAdmin };
