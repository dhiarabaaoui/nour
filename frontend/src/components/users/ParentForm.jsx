import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import './users.css';

function ParentForm() {
  const [parentInfo, setParentInfo] = useState({
    parentName: '',
    parentLastName: '',
    parentEmail: '',
    parentPassword: '',
    parentConfirmPassword: '',
    parentAddress: '',
    parentPhoneCountry: '+216',
    parentPhoneNumber: '',
    childName: '',
    childLastName: '',
    childDateOfBirth: '',
    childAge: '',
    behavior: '',
    behaviorDescription: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const birthDate = new Date(e.target.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    setParentInfo((prev) => ({ ...prev, childDateOfBirth: e.target.value, childAge: age }));
  };

  const validate = () => {
    let validationErrors = {};
    if (!parentInfo.parentName) validationErrors.parentName = 'First name is required';
    if (!parentInfo.parentLastName) validationErrors.parentLastName = 'Last name is required';
    if (!parentInfo.parentEmail) validationErrors.parentEmail = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(parentInfo.parentEmail)) validationErrors.parentEmail = 'Email is not valid';
    if (!parentInfo.parentPhoneNumber) validationErrors.parentPhoneNumber = 'Phone number is required';
    if (parentInfo.parentPassword !== parentInfo.parentConfirmPassword) validationErrors.password = 'Passwords do not match';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(parentInfo);
      // Add logic to submit the data
    }
  };

  const navigate = useNavigate();

  return (
    <div className="parent-form-container">
      <form className="parent-form" onSubmit={handleSubmit}>
        <h1>Parent Registration</h1>

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
            <label><FaEnvelope /> Email</label>
            <input type="email" name="parentEmail" value={parentInfo.parentEmail} onChange={handleInputChange} />
            {errors.parentEmail && <span className="error">{errors.parentEmail}</span>}
          </div>

          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <div className="phone-input">
              <select name="parentPhoneCountry" value={parentInfo.parentPhoneCountry} onChange={handleInputChange}>
                <option value="+216">Tunisia (+216)</option>
                <option value="+213">Algeria (+213)</option>
                <option value="+33">France (+33)</option>
                <option value="+1">United States (+1)</option>
                <option value="+44">United Kingdom (+44)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+34">Spain (+34)</option>
              </select>
              <input type="tel" name="parentPhoneNumber" value={parentInfo.parentPhoneNumber} onChange={handleInputChange} />
              {errors.parentPhoneNumber && <span className="error">{errors.parentPhoneNumber}</span>}
            </div>
          </div>
        </div>

        <h2>Child Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label><FaCalendarAlt /> Birthdate</label>
            <input type="date" name="childDateOfBirth" value={parentInfo.childDateOfBirth} onChange={handleDateChange} />
          </div>

          <div className="form-group">
            <label>Behavior</label>
            <div className="radio-group">
              {["Social Challenges", "Repetitive Actions", "Sensory Sensitivity", "Difficulty with Change"].map((option) => (
                <label key={option}>
                  <input type="radio" name="behavior" value={option} checked={parentInfo.behavior === option} onChange={handleInputChange} />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Behavior Description</label>
          <textarea name="behaviorDescription" value={parentInfo.behaviorDescription} onChange={handleInputChange}></textarea>
        </div>

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/')}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default ParentForm;
