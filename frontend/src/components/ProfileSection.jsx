// src/components/ProfileSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfileSection = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      axios.get(`http://localhost:5000/api/${decoded.userType}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUserData(res.data));
    }
  }, [token]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const decoded = jwtDecode(token);
    await axios.put(`http://localhost:5000/api/${decoded.userType}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditMode(false);
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      {Object.keys(userData).length > 0 && (
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={userData.name || ''} onChange={handleChange} disabled={!editMode} />
          <br />
          <label>Email: </label>
          <input type="email" name="email" value={userData.email || ''} disabled />
          <br />
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {editMode && <button onClick={handleSave}>Save</button>}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
