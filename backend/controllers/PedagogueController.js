// controllers/PedagogueController.js

const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a pedagogue (educator)
const registerPedagogue = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      confirmPassword,
      adresse,
      numeroTel,
      nombreAnneeExperience
    } = req.body;

    // Validate required fields
    if (!nom || !prenom || !email || !password || !confirmPassword || !adresse || !numeroTel || !nombreAnneeExperience) {
      return res.status(400).json({ 
        success: false,
        message: 'Tous les champs sont obligatoires.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Format d\'email invalide.' 
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères.' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Les mots de passe ne correspondent pas.' 
      });
    }

    // Validate nombreAnneeExperience
    const experience = Number(nombreAnneeExperience);
    if (isNaN(experience) || experience < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Le nombre d\'années d\'expérience doit être un nombre positif.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Cet email est déjà utilisé.' 
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user with educator role
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      adresse,
      numeroTel,
      userType: 'educator',
      nombreAnneeExperience: experience,
      isActive: true
    });

    await newUser.save();

    return res.status(201).json({ 
      success: true,
      message: 'Pédagogue inscrit avec succès.',
      data: {
        id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        userType: newUser.userType
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription du pédagogue:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erreur serveur. Veuillez réessayer plus tard.' 
    });
  }
};

module.exports = {
  registerPedagogue
};
