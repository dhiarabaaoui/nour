import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './UserDashboard.css';
import ProfileSection from './ProfileSection';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    } else {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Espace Utilisateur</h2>
        <nav>
          <ul className="nav-list">
            <li><a href="#">Mon Profil</a></li>
            <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          {user && <h1>Bienvenue, {user.name} 👋</h1>}
        </div>

        <section className="profile-section">
          <ProfileSection />
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
