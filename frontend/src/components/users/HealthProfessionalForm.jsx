import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';
import './users.css';

function HealthProfessionalForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    country: '',
    specialty: ''  // Remplacer "experience" par "specialty"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="health-professional-form">
      <h2>Health Professional Form</h2>
      <div className="input-field">
        <FaUserAlt />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="First Name"
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
          placeholder="Last Name"
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
          placeholder="Password"
          required
        />
      </div>
      <div className="input-field">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
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
          placeholder="Address"
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
          placeholder="Phone Number"
          required
        />
      </div>
      <div className="input-field">
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
      </div>
      <div className="input-field">
        <label>Specialty</label>
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Specialty --</option>
          <option value="Speech Therapist">Speech Therapist</option>
          <option value="Child Psychiatrist">Child Psychiatrist</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HealthProfessionalForm;
