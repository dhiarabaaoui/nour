import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa'; // Example icons
import './UserTypeSelection.css'; 
import ParentForm from '../users/ParentForm'; // Corrigé le chemin
import PedagogueForm from '../users/PedagogueForm'; // Corrigé le chemin
import HealthCareForm from '../users/HealthCareForm'; // Corrigé le chemin

function UserTypeSelection() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect based on user type
    if (userType === 'parent') {
      navigate('/parent-form');
    }
    if (userType === 'educator') {
      navigate('/pédagogue-form'); 
    }
    if (userType === 'health-professional') {
      navigate('/health-professional-form');
    }
  };

  return (
    <div className="user-type-selection-container">
      <div className="form-container">
        <h1>Welcome!</h1>
        <p>Please select your user type:</p>
        <form onSubmit={handleSubmit}>
          <div className="select-field">
            <FaUserAlt />
            <select id="user-type" value={userType} onChange={handleUserTypeChange} required>
              <option value="">-- Select --</option>
              <option value="parent">Parent</option>
              <option value="educator">Educator</option>
              <option value="health-professional">Health Professional</option>
            </select>
         </div>

  <button type="submit" className="submit-button">Submit</button>
  <button type="button" onClick={handleBackToLogin} className="back-button">Back to Login</button>
             
        </form>
      </div>
    </div>
  );
}

export default UserTypeSelection;
