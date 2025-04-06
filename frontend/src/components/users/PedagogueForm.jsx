import React, { useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkedAlt, FaRegCalendarAlt } from 'react-icons/fa';
import './users.css';  // Assurez-vous d'ajouter votre fichier CSS

function PedagogueForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    country: '',
    experience: ''
  });

  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const [success, setSuccess] = useState(null);  // Pour gérer le succès de l'inscription

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      setSuccess(null);
      return;
    }

    // Réinitialiser les erreurs précédentes
    setError(null);

    const userData = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      country: formData.country,
      experience: formData.experience
    };

    try {
      // Envoi des données à l'API backend pour créer l'utilisateur
      const response = await axios.post('http://localhost:5000/api/users/create', userData);
      console.log(response.data);

      // Si la réponse est positive, afficher un message de succès
      setSuccess('Compte créé avec succès!');
      setError(null);  // Réinitialiser l'erreur si tout se passe bien
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      setError('Erreur lors de la création du compte, veuillez réessayer.');
      setSuccess(null);  // Si une erreur survient, réinitialiser le message de succès
    }
  };

  return (
    <div className="form-container">
      <h2>Formulaire Pédagogue</h2>
      <form onSubmit={handleSubmit} className="pedagogue-form">
        {/* Affichage des messages d'erreur et de succès */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="input-field">
          <FaUserAlt />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
        </div>
        <div className="input-field">
          <FaUserAlt />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </div>
        <div className="input-field">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>
        <div className="input-field">
          <FaMapMarkedAlt />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Adresse"
            required
          />
        </div>
        <div className="input-field">
          <FaPhoneAlt />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Pays"
            required
          />
        </div>
        <div className="input-field">
          <FaRegCalendarAlt />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Années d'expérience"
            required
          />
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}

export default PedagogueForm;
