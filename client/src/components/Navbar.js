import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>🎓 Placements Portal</h2>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/placements" className="navbar-item">Placements</Link>
          <Link to="/higher-education" className="navbar-item">Higher Education</Link>
          
          {isAdmin ? (
            <div className="admin-menu">
              <Link to="/admin/dashboard" className="navbar-item admin-link">
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="navbar-item logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="navbar-item admin-link">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
