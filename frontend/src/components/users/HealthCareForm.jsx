import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaUserAlt, FaEnvelope, FaPhoneAlt,
  FaMapMarkedAlt, FaStethoscope
} from 'react-icons/fa';
import './HealthCareForm.css';

function HealthCareForm() {
  const [healthcareInfo, setHealthcareInfo] = useState({
    healthcareName: '',
    healthcareLastName: '',
    healthcareEmail: '',
    healthcarePassword: '',
    healthcareConfirmPassword: '',
    healthcareAddress: '',
    healthcarePhoneNumber: '',
    healthcareCountry: '',
    healthcareCity: '',
    healthcareSpeciality: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthcareInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!healthcareInfo.healthcareName) {
      validationErrors.healthcareName = "Name is required.";
    }
    if (!healthcareInfo.healthcareLastName) {
      validationErrors.healthcareLastName = "Last name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!healthcareInfo.healthcareEmail) {
      validationErrors.healthcareEmail = "Email is required.";
    } else if (!emailRegex.test(healthcareInfo.healthcareEmail)) {
      validationErrors.healthcareEmail = "Email is not valid.";
    }

    if (!healthcareInfo.healthcarePassword) {
      validationErrors.healthcarePassword = "Password is required.";
    } else if (healthcareInfo.healthcarePassword.length < 6) {
      validationErrors.healthcarePassword = "Minimum 6 characters.";
    }

    if (healthcareInfo.healthcarePassword !== healthcareInfo.healthcareConfirmPassword) {
      validationErrors.healthcareConfirmPassword = "Passwords do not match.";
    }

    if (!healthcareInfo.healthcareCountry || !healthcareInfo.healthcareCity) {
      validationErrors.healthcareCountry = "Country and City are required.";
    }

    const phoneRegex = /^\d{10}$/;
    if (healthcareInfo.healthcarePhoneNumber && !phoneRegex.test(healthcareInfo.healthcarePhoneNumber)) {
      validationErrors.healthcarePhoneNumber = "10-digit phone number required.";
    }

    if (!healthcareInfo.healthcareSpeciality) {
      validationErrors.healthcareSpeciality = "Speciality is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        await axios.post('http://localhost:5000/api/healthcare/register', {
          nom: healthcareInfo.healthcareName,
          prenom: healthcareInfo.healthcareLastName,
          email: healthcareInfo.healthcareEmail,
          password: healthcareInfo.healthcarePassword,
          confirmPassword: healthcareInfo.healthcareConfirmPassword,
          adresse: `${healthcareInfo.healthcareCountry}, ${healthcareInfo.healthcareCity}`,
          numeroTel: healthcareInfo.healthcarePhoneNumber,
          specialite: healthcareInfo.healthcareSpeciality
        });

        setSuccess('Account created successfully!');
        setError(null);
        setTimeout(() => navigate('/'), 2000);

      } catch (err) {
        console.error('Error:', err);
        setError(err.response?.data?.message || 'Error creating account. Please try again.');
        setSuccess(null);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register as Healthcare Professional</h2>

      <form onSubmit={handleSubmit} className="healthcare-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="healthcare-input-field">
          <label htmlFor="healthcareName">Name</label>
          <FaUserAlt className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="text"
              name="healthcareName"
              id="healthcareName"
              placeholder="Enter name"
              value={healthcareInfo.healthcareName}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcareName && <span className="error-message">{errors.healthcareName}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareLastName">Last Name</label>
          <FaUserAlt className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="text"
              name="healthcareLastName"
              id="healthcareLastName"
              placeholder="Enter last name"
              value={healthcareInfo.healthcareLastName}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcareLastName && <span className="error-message">{errors.healthcareLastName}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareEmail">Email</label>
          <FaEnvelope className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="email"
              name="healthcareEmail"
              id="healthcareEmail"
              placeholder="Enter email"
              value={healthcareInfo.healthcareEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcareEmail && <span className="error-message">{errors.healthcareEmail}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcarePassword">Password</label>
          <div className="input-icon-wrapper">
            <input
              type="password"
              name="healthcarePassword"
              id="healthcarePassword"
              placeholder="Enter password"
              value={healthcareInfo.healthcarePassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcarePassword && <span className="error-message">{errors.healthcarePassword}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareConfirmPassword">Confirm Password</label>
          <div className="input-icon-wrapper">
            <input
              type="password"
              name="healthcareConfirmPassword"
              id="healthcareConfirmPassword"
              placeholder="Confirm password"
              value={healthcareInfo.healthcareConfirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcareConfirmPassword && <span className="error-message">{errors.healthcareConfirmPassword}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcarePhoneNumber">Phone Number</label>
          <FaPhoneAlt className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="tel"
              name="healthcarePhoneNumber"
              id="healthcarePhoneNumber"
              placeholder="Enter phone number"
              value={healthcareInfo.healthcarePhoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcarePhoneNumber && <span className="error-message">{errors.healthcarePhoneNumber}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareCountry">Country</label>
          <FaMapMarkedAlt className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="text"
              name="healthcareCountry"
              id="healthcareCountry"
              placeholder="Enter country"
              value={healthcareInfo.healthcareCountry}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.healthcareCountry && <span className="error-message">{errors.healthcareCountry}</span>}
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareCity">City</label>
          <FaMapMarkedAlt className="input-icon" />
          <div className="input-icon-wrapper">
            <input
              type="text"
              name="healthcareCity"
              id="healthcareCity"
              placeholder="Enter city"
              value={healthcareInfo.healthcareCity}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="healthcare-input-field">
          <label htmlFor="healthcareSpeciality">Speciality</label>
          <FaStethoscope className="input-icon" />
          <div className="input-icon-wrapper">
            <select
              name="healthcareSpeciality"
              id="healthcareSpeciality"
              value={healthcareInfo.healthcareSpeciality}
              onChange={handleInputChange}
              required
            >
              <option value="">Select speciality</option>
              <option value="pédopsychiatre">Pédopsychiatre</option>
              <option value="orthophoniste">Orthophoniste</option>
            </select>
          </div>
          {errors.healthcareSpeciality && <span className="error-message">{errors.healthcareSpeciality}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default HealthCareForm; 