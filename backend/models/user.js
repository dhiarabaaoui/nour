const mongoose = require('mongoose');

// Enum pour les types d'utilisateurs
const userTypes = ['parent', 'educator', 'healthcareprofessional'];

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: true },
  numeroTel: { type: Number, required: true },
  userType: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true }, // Champ ajouté pour gérer l'activation

  // Champs conditionnels pour les utilisateurs spécifiques
  relationAvecEnfant: {
    type: String,
    enum: ['père', 'mère'],
    required: function() { return this.userType === 'parent'; }
  },
  nomPrenomEnf: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },
  dateNaissanceEnf: {
    type: Date,
    required: function() { return this.userType === 'parent'; }
  },
  niveau: {
    type: Number,
    required: function() { return this.userType === 'parent'; }
  },
  comportement: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },
  nomEcole: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },
  medicaments: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },
  behavior: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },
  behaviordescription: {
    type: String,
    required: function() { return this.userType === 'parent'; }
  },

  nombreAnneeExperience: {
    type: Number,
    required: function() { return this.userType === 'educator'; }
  },
  specialite: {
    type: String,
    enum: ['pédopsychiatre', 'orthophoniste'],
    required: function() { return this.userType === 'healthcareprofessional'; }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
