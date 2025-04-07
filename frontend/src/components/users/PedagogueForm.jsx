import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaUserAlt, FaEnvelope, FaPhoneAlt,
  FaMapMarkedAlt, FaRegCalendarAlt, FaGlobeEurope
} from 'react-icons/fa';
import './PedagogueForm.css';

function PedagogueForm() {
  const [pedagogueInfo, setPedagogueInfo] = useState({
    pedagogueName: '',
    pedagogueLastName: '',
    pedagogueEmail: '',
    pedagoguePassword: '',
    pedagogueConfirmPassword: '',
    pedagogueAddress: '',
    pedagoguePhoneNumber: '',
    pedagogueCountry: '',
    pedagogueCity: '',
    pedagogueExperience: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // ✅ Validation function
  const validate = () => {
    const validationErrors = {};

    if (!pedagogueInfo.pedagogueName) {
      validationErrors.pedagogueName = "Name is required.";
    }
    if (!pedagogueInfo.pedagogueLastName) {
      validationErrors.pedagogueLastName = "Last name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pedagogueInfo.pedagogueEmail) {
      validationErrors.pedagogueEmail = "Email is required.";
    } else if (!emailRegex.test(pedagogueInfo.pedagogueEmail)) {
      validationErrors.pedagogueEmail = "Invalid email format.";
    }

    if (!pedagogueInfo.pedagoguePassword) {
      validationErrors.pedagoguePassword = "Password is required.";
    } else if (pedagogueInfo.pedagoguePassword.length < 6) {
      validationErrors.pedagoguePassword = "Minimum 6 characters required.";
    }

    if (pedagogueInfo.pedagoguePassword !== pedagogueInfo.pedagogueConfirmPassword) {
      validationErrors.pedagogueConfirmPassword = "Passwords do not match.";
    }

    if (!pedagogueInfo.pedagogueCountry || !pedagogueInfo.pedagogueCity) {
      validationErrors.pedagogueCountry = "Country and City are required.";
    }

    const phoneRegex = /^\d{10}$/;
    if (pedagogueInfo.pedagoguePhoneNumber && !phoneRegex.test(pedagogueInfo.pedagoguePhoneNumber)) {
      validationErrors.pedagoguePhoneNumber = "Phone number must be 10 digits.";
    }

    if (!pedagogueInfo.pedagogueExperience) {
      validationErrors.pedagogueExperience = "Experience is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // ✅ Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        await axios.post('http://localhost:5000/api/pedagogues/signup', {
          nom: pedagogueInfo.pedagogueName,
          prenom: pedagogueInfo.pedagogueLastName,
          email: pedagogueInfo.pedagogueEmail,
          password: pedagogueInfo.pedagoguePassword,
          confirmPassword: pedagogueInfo.pedagogueConfirmPassword,
          adresse: `${pedagogueInfo.pedagogueCountry}, ${pedagogueInfo.pedagogueCity}`,
          numeroTel: pedagogueInfo.pedagoguePhoneNumber,
          nombreAnneeExperience: pedagogueInfo.pedagogueExperience
        });

        setSuccess('Account created successfully!');
        setError(null);

        setTimeout(() => navigate('/'), 2000); // 👈 Navigate to home
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
      <h2>Register as Pedagogue</h2>

      <form onSubmit={handleSubmit} className="pedagogue-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Field rendering */}
        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueName"><FaUserAlt className="input-icon" /> Pedagogue Name</label>
          <input
            type="text"
            name="pedagogueName"
            id="pedagogueName"
            placeholder="Enter name"
            value={pedagogueInfo.pedagogueName}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueName: e.target.value })}
          />
          {errors.pedagogueName && <span className="error-message">{errors.pedagogueName}</span>}
        </div>

        {/* Repeat similar structure for each field */}
        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueLastName"><FaUserAlt className="input-icon" /> Pedagogue Last Name</label>
          <input
            type="text"
            name="pedagogueLastName"
            id="pedagogueLastName"
            placeholder="Enter last name"
            value={pedagogueInfo.pedagogueLastName}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueLastName: e.target.value })}
          />
          {errors.pedagogueLastName && <span className="error-message">{errors.pedagogueLastName}</span>}
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueEmail"><FaEnvelope className="input-icon" /> Email</label>
          <input
            type="email"
            name="pedagogueEmail"
            id="pedagogueEmail"
            placeholder="Enter email"
            value={pedagogueInfo.pedagogueEmail}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueEmail: e.target.value })}
          />
          {errors.pedagogueEmail && <span className="error-message">{errors.pedagogueEmail}</span>}
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagoguePassword">Password</label>
          <input
            type="password"
            name="pedagoguePassword"
            id="pedagoguePassword"
            placeholder="Enter password"
            value={pedagogueInfo.pedagoguePassword}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagoguePassword: e.target.value })}
          />
          {errors.pedagoguePassword && <span className="error-message">{errors.pedagoguePassword}</span>}
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueConfirmPassword">Confirm Password</label>
          <input
            type="password"
            name="pedagogueConfirmPassword"
            id="pedagogueConfirmPassword"
            placeholder="Confirm password"
            value={pedagogueInfo.pedagogueConfirmPassword}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueConfirmPassword: e.target.value })}
          />
          {errors.pedagogueConfirmPassword && <span className="error-message">{errors.pedagogueConfirmPassword}</span>}
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagoguePhoneNumber"><FaPhoneAlt className="input-icon" /> Phone Number</label>
          <input
            type="text"
            name="pedagoguePhoneNumber"
            id="pedagoguePhoneNumber"
            placeholder="Enter phone number"
            value={pedagogueInfo.pedagoguePhoneNumber}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagoguePhoneNumber: e.target.value })}
          />
          {errors.pedagoguePhoneNumber && <span className="error-message">{errors.pedagoguePhoneNumber}</span>}
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueCountry"><FaGlobeEurope className="input-icon" /> Country</label>
          <input
            type="text"
            name="pedagogueCountry"
            id="pedagogueCountry"
            placeholder="Enter country"
            value={pedagogueInfo.pedagogueCountry}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueCountry: e.target.value })}
          />
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueCity">City</label>
          <input
            type="text"
            name="pedagogueCity"
            id="pedagogueCity"
            placeholder="Enter city"
            value={pedagogueInfo.pedagogueCity}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueCity: e.target.value })}
          />
        </div>

        <div className="pedagogue-input-field">
          <label htmlFor="pedagogueExperience"><FaRegCalendarAlt className="input-icon" /> Years of Experience</label>
          <input
            type="number"
            name="pedagogueExperience"
            id="pedagogueExperience"
            placeholder="Enter years of experience"
            value={pedagogueInfo.pedagogueExperience}
            onChange={(e) => setPedagogueInfo({ ...pedagogueInfo, pedagogueExperience: e.target.value })}
          />
          {errors.pedagogueExperience && <span className="error-message">{errors.pedagogueExperience}</span>}
        </div>

        {/* Submit and Cancel */}
        <div className="button-group">
          <button type="submit" className="sign-up-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedagogueForm;
