import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import './ParentForm.css';

function ParentForm() {
  const [parentInfo, setParentInfo] = useState({
    parentName: '',
    parentLastName: '',
    parentEmail: '',
    parentPassword: '',
    parentConfirmPassword: '',
    parentCountry: '',
    parentCity: '',
    parentPhoneNumber: '',
    childName: '',
    childLastName: '',
    childDateOfBirth: '',
    childLevel: '', // Correspond au niveau de l'enfant
    behavior: '',
    childSchool: '',
    medications: '',
    relationAvecEnfant: '', // Relation avec l'enfant
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour gérer l'état de soumission
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let validationErrors = {};

    // Validation des champs parents
    if (!parentInfo.parentName) validationErrors.parentName = 'First name is required';
    if (!parentInfo.parentLastName) validationErrors.parentLastName = 'Last name is required';
    if (!parentInfo.parentEmail) validationErrors.parentEmail = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(parentInfo.parentEmail))
      validationErrors.parentEmail = 'Email is not valid';
    if (!parentInfo.parentPhoneNumber)
      validationErrors.parentPhoneNumber = 'Phone number is required';
    if (!parentInfo.parentCountry)
      validationErrors.parentCountry = 'Country is required';
    if (!parentInfo.parentCity) validationErrors.parentCity = 'City is required';
    if (parentInfo.parentPassword !== parentInfo.parentConfirmPassword)
      validationErrors.password = 'Passwords do not match';

    // Validation des champs enfant
    if (!parentInfo.childName) validationErrors.childName = 'Child name is required';
    if (!parentInfo.childLastName)
      validationErrors.childLastName = 'Child last name is required';
    if (!parentInfo.childDateOfBirth)
      validationErrors.childDateOfBirth = 'Child date of birth is required';
    if (!parentInfo.childLevel)
      validationErrors.childLevel = 'Child level is required';
    if (!parentInfo.relationAvecEnfant)
      validationErrors.relationAvecEnfant = 'Relationship is required';
    if (!parentInfo.behavior) validationErrors.behavior = 'Behavior is required';

    // Validation pour la description du comportement (seulement si "Other" est sélectionné)
    if (parentInfo.behavior === 'Other' && !parentInfo.behaviorDescription) {
      validationErrors.behaviorDescription = 'Please describe the behavior';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Envoi des données au backend via axios
        const response = await axios.post('http://localhost:5000/api/auth/parent/signup', {
          nom: parentInfo.parentName,
          prenom: parentInfo.parentLastName,
          email: parentInfo.parentEmail,
          password: parentInfo.parentPassword,
          adresse: `${parentInfo.parentCountry}, ${parentInfo.parentCity}`,
          numeroTel: parentInfo.parentPhoneNumber,
          relationAvecEnfant: parentInfo.relationAvecEnfant, // Relation avec l'enfant
          nomPrenomEnf: `${parentInfo.childName} ${parentInfo.childLastName}`, // Nom complet de l'enfant
          dateNaissanceEnf: parentInfo.childDateOfBirth, // Date de naissance de l'enfant
          niveau: parentInfo.childLevel, // Niveau de l'enfant
          behavior: parentInfo.behavior === 'Other' ? `${parentInfo.behavior}: ${parentInfo.behaviorDescription}` : parentInfo.behavior, // Combiner comportement et description
          nomEcole: parentInfo.childSchool, // Nom de l'école
          medicaments: parentInfo.medications, // Médicaments de l'enfant
        });
 
        console.log(response.data);
        navigate('/success'); // Redirection après inscription réussie
      } catch (error) {
        console.error('Error during signup:', error);
        setErrors({ server: 'An error occurred during signup. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="parent-form-container">
      <h1 className="main-title">Sign Up As A Parent</h1>
      <form className="parent-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="profile-icon"></div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaUser /> First Name
            </label>
            <input
              type="text"
              name="parentName"
              value={parentInfo.parentName}
              onChange={handleInputChange}
            />
            {errors.parentName && <span className="error">{errors.parentName}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaUser /> Last Name
            </label>
            <input
              type="text"
              name="parentLastName"
              value={parentInfo.parentLastName}
              onChange={handleInputChange}
            />
            {errors.parentLastName && <span className="error">{errors.parentLastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="parentCountry"
              value={parentInfo.parentCountry}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="parentCity"
              value={parentInfo.parentCity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {errors.parentCountry && <span className="error">{errors.parentCountry}</span>}
        {errors.parentCity && <span className="error">{errors.parentCity}</span>}

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              name="parentEmail"
              value={parentInfo.parentEmail}
              onChange={handleInputChange}
            />
            {errors.parentEmail && <span className="error">{errors.parentEmail}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaPhone /> Phone
            </label>
            <input
              type="tel"
              name="parentPhoneNumber"
              value={parentInfo.parentPhoneNumber}
              onChange={handleInputChange}
            />
            {errors.parentPhoneNumber && (
              <span className="error">{errors.parentPhoneNumber}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaLock /> Password
            </label>
            <input
              type="password"
              name="parentPassword"
              value={parentInfo.parentPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="parentConfirmPassword"
              value={parentInfo.parentConfirmPassword}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>

        <h3>Child Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="childName"
              value={parentInfo.childName}
              onChange={handleInputChange}
            />
            {errors.childName && <span className="error">{errors.childName}</span>}
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="childLastName"
              value={parentInfo.childLastName}
              onChange={handleInputChange}
            />
            {errors.childLastName && <span className="error">{errors.childLastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>
            <FaCalendarAlt /> Birthdate
          </label>
          <input
            type="date"
            name="childDateOfBirth"
            value={parentInfo.childDateOfBirth}
            onChange={handleInputChange}
          />
          {errors.childDateOfBirth && <span className="error">{errors.childDateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label>Child Level</label>
          <select name="childLevel" value={parentInfo.childLevel} onChange={handleInputChange}>
            <option value="">-- Select Level --</option>
            <option value="1">Level 1 - Very Easy</option>
            <option value="2">Level 2 - Easy</option>
            <option value="3">Level 3 - Medium</option>
            <option value="4">Level 4 - Hard</option>
            <option value="5">Level 5 - Very Hard</option>
          </select>
          {errors.childLevel && <span className="error">{errors.childLevel}</span>}
        </div>
        <div className="form-group">
          <label>Relationship with Child</label>
          <select
            name="relationAvecEnfant"
            value={parentInfo.relationAvecEnfant}
            onChange={handleInputChange}
          >
            <option value="">-- Select Relation --</option>
            <option value="Mère">Mère</option>
            <option value="Père">Père</option>
          </select>
          {errors.relationAvecEnfant && <span className="error">{errors.relationAvecEnfant}</span>}
        </div>

        <h3>Child Behavior</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Behavior</label>
            <select name="behavior" value={parentInfo.behavior} onChange={handleInputChange}>
              <option value="">-- Select Behavior --</option>
              <option value="Calm">Calm</option>
              <option value="Aggressive">Aggressive</option>
              <option value="Hyperactive">Hyperactive</option>
              <option value="Shy">Shy</option>
              <option value="Anxious">Anxious</option>
              <option value="Sociable">Sociable</option>
              <option value="Other">Other</option>
            </select>
            {errors.behavior && <span className="error">{errors.behavior}</span>}
          </div>

          {parentInfo.behavior === 'Other' && (
            <div className="form-group">
              <label>Behavior Description</label>
              <textarea
                name="behaviorDescription"
                value={parentInfo.behaviorDescription}
                onChange={handleInputChange}
              />
              {errors.behaviorDescription && (
                <span className="error">{errors.behaviorDescription}</span>
              )}
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>School Name</label>
            <input
              type="text"
              name="childSchool"
              value={parentInfo.childSchool}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Medications</label>
            <textarea
              name="medications"
              value={parentInfo.medications}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ParentForm;
