const mongoose = require('mongoose');

// Enum for user types
const userTypes = ['parent', 'educator', 'healthcareprofessional'];

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: true },
  numeroTel: { type: Number, required: true },
  userType: { type: String, enum: userTypes, required: true },

  // Conditional fields for specific users
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
