const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Parent = require('../models/parentModel');
const Pedagogue = require('../models/pedagogueModel');
const HealthCare = require('../models/healthCareModel');

// Fonction pour gérer l'inscription de l'administrateur
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'admin existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Créer un nouvel admin
    const admin = new Admin({
      email,
      password,
      userType: 'admin'
    });

    // Sauvegarder l'admin
    await admin.save();

    // Créer un token JWT
    const token = jwt.sign(
      { userId: admin._id, userType: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retourner le token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

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
      { userId: admin._id, userType: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retourner le token
    res.json({ token, userType: 'admin' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fonction pour gérer la connexion des utilisateurs
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Chercher l'utilisateur dans tous les modèles
    let user = await Parent.findOne({ email });
    let userType = 'parent';

    if (!user) {
      user = await Pedagogue.findOne({ email });
      userType = 'pedagogue';
    }

    if (!user) {
      user = await HealthCare.findOne({ email });
      userType = 'healthcare';
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Comparer les mots de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retourner le token et le type d'utilisateur
    res.json({ token, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerAdmin, loginAdmin, loginUser };
