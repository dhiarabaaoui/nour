const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },  // Prénom du parent
  prenom: { type: String, required: true },  // Nom du parent
  email: { type: String, required: true, unique: true },  // Email du parent
  password: { type: String, required: true },  // Mot de passe
  adresse: { type: String, required: true },  // Adresse du parent
  numeroTel: { type: String, required: true },  // Numéro de téléphone
  userType: { type: String, enum: ['parent', 'educator', 'healthcareprofessional'], default: 'parent' },  // Le type d'utilisateur, ici un parent
  isActive: { type: Boolean, default: true },  // Activer ou désactiver le compte
  
  // Champs spécifiques aux parents
  relationAvecEnfant: { 
    type: String, 
    enum: ['Père', 'Mère'], 
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
  medicaments: { 
    type: String, 
    required: function() { return this.userType === 'parent'; } 
  },
  behavior: { 
    type: String, 
    required: function() { return this.userType === 'parent'; } 
  },
  nomEcole: { 
    type: String, 
    required: function() { return this.userType === 'parent'; }
  },
  niveau: { 
    type: String, 
    required: function() { return this.userType === 'parent'; }
  },

  // Champs pour les éducateurs
  nombreAnneeExperience: { 
    type: Number,
    min: [0, 'Le nombre d\'années d\'expérience doit être positif'],
    required: function() { return this.userType === 'educator'; }
  },
  specialite: { 
    type: String, 
    enum: ['pédopsychiatre', 'orthophoniste'],
    required: function() { return this.userType === 'healthcareprofessional'; }
  }
});

// Créer le modèle basé sur le schéma

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
