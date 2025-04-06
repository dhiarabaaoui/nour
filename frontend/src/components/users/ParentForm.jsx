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
    behavior: '',
    behaviorDescription: '',
    childSchool: '',
    medications: '',
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
    if (!parentInfo.parentName) validationErrors.parentName = 'First name is required';
    if (!parentInfo.parentLastName) validationErrors.parentLastName = 'Last name is required';
    if (!parentInfo.parentEmail) validationErrors.parentEmail = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(parentInfo.parentEmail)) validationErrors.parentEmail = 'Email is not valid';
    if (!parentInfo.parentPhoneNumber) validationErrors.parentPhoneNumber = 'Phone number is required';
    if (parentInfo.parentPassword !== parentInfo.parentConfirmPassword) validationErrors.password = 'Passwords do not match';
    if (!parentInfo.childName) validationErrors.childName = 'Child name is required';
    if (!parentInfo.childLastName) validationErrors.childLastName = 'Child last name is required';
    if (!parentInfo.childDateOfBirth) validationErrors.childDateOfBirth = 'Child date of birth is required';
    if (!parentInfo.behavior) validationErrors.behavior = 'Behavior is required';
    if (!parentInfo.behaviorDescription) validationErrors.behaviorDescription = 'Behavior description is required';

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
          userType: 'parent', // Ajout explicite de userType 'parent'
          relationAvecEnfant: 'père', // Si nécessaire, vous pouvez mettre un champ dynamique ici
          nomPrenomEnf: `${parentInfo.childName} ${parentInfo.childLastName}`,
          dateNaissanceEnf: parentInfo.childDateOfBirth,
          comportement: parentInfo.behavior,
          medicaments: parentInfo.medications,
        });

        // Si l'inscription est réussie, rediriger l'utilisateur
        console.log(response.data);
        navigate('/success');  // Remplacer par la page de succès ou dashboard
      } catch (error) {
        console.error('Error during signup:', error);
        setErrors({ server: 'An error occurred during signup. Please try again.' });
      } finally {
        setIsSubmitting(false); // Réinitialisation de l'état de soumission
      }
    }
  };

  return (
    <div className="parent-form-container">
     <h1 className="main-title">Sign Up As A Parent </h1>
      <form className="parent-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="profile-icon"></div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaUser /> First Name</label>
            <input type="text" name="parentName" value={parentInfo.parentName} onChange={handleInputChange} />
            {errors.parentName && <span className="error">{errors.parentName}</span>}
          </div>

          <div className="form-group">
            <label><FaUser /> Last Name</label>
            <input type="text" name="parentLastName" value={parentInfo.parentLastName} onChange={handleInputChange} />
            {errors.parentLastName && <span className="error">{errors.parentLastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="parentCountry" value={parentInfo.parentCountry} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>City</label>
            <input type="text" name="parentCity" value={parentInfo.parentCity} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" name="parentEmail" value={parentInfo.parentEmail} onChange={handleInputChange} />
            {errors.parentEmail && <span className="error">{errors.parentEmail}</span>}
          </div>

          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <input type="tel" name="parentPhoneNumber" value={parentInfo.parentPhoneNumber} onChange={handleInputChange} />
            {errors.parentPhoneNumber && <span className="error">{errors.parentPhoneNumber}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaLock /> Password</label>
            <input type="password" name="parentPassword" value={parentInfo.parentPassword} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="parentConfirmPassword" value={parentInfo.parentConfirmPassword} onChange={handleInputChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>

        <h3>Child Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="childName" value={parentInfo.childName} onChange={handleInputChange} />
            {errors.childName && <span className="error">{errors.childName}</span>}
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input type="text" name="childLastName" value={parentInfo.childLastName} onChange={handleInputChange} />
            {errors.childLastName && <span className="error">{errors.childLastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label><FaCalendarAlt /> Birthdate</label>
          <input type="date" name="childDateOfBirth" value={parentInfo.childDateOfBirth} onChange={handleInputChange} />
        </div>

        <h3>Child Behavior</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Behavior</label>
            <input type="text" name="behavior" value={parentInfo.behavior} onChange={handleInputChange} />
            {errors.behavior && <span className="error">{errors.behavior}</span>}
          </div>

          <div className="form-group">
            <label>Behavior Description</label>
            <textarea name="behaviorDescription" value={parentInfo.behaviorDescription} onChange={handleInputChange} />
            {errors.behaviorDescription && <span className="error">{errors.behaviorDescription}</span>}
          </div>
        </div>

    
        <div className="form-row">
          <div className="form-group">
            <label>School Name</label>
            <input type="text" name="childSchool" value={parentInfo.childSchool} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>medications</label>
            <textarea name="medications" value={parentInfo.medications} onChange={handleInputChange} />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" disabled={isSubmitting}>Sign Up</button>
          <button type="button"className="cancel-btn" onClick={() =>navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ParentForm;
