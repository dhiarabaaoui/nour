import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/login/LoginForm';
import UserTypeSelection from './components/Usertype/UserTypeSelection';
import ForgotPassword from './components/Password/ForgotPassword';
import ParentForm from './components/users/ParentForm';
import PedagogueForm from './components/users/PedagogueForm';
import HealthCareForm from './components/users/HealthCareForm';
import AdminDashboard from './components/AdminDashboard';
import UserList from './components/users/UserList';
import UserDashboard from './components/UserDashboard';
import ProfileSection from './components/ProfileSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user-type" element={<UserTypeSelection />} />
        <Route path="/parent-form" element={<ParentForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pédagogue-form" element={<PedagogueForm />} />
        <Route path="/health-professional-form" element={<HealthCareForm />} />
        
        {/* Admin Dashboard with nested routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="users" element={<UserList />} />
        </Route>

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/profileselection" element={<ProfileSection />} />
      </Routes>
    </Router>
  );
}

export default App;
