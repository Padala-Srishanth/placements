import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      await login(email, password);
      
      // Check if user is admin after login
      if (email === 'admin@placements.com') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
        // You might want to sign out the user here
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Access the content management system</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@placements.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-info">
          <p><strong>Default Admin Credentials:</strong></p>
          <p>Email: admin@placements.com</p>
          <p>Password: admin123</p>

          {error.includes('configuration-not-found') && (
            <div className="setup-instructions">
              <h4>🔧 Setup Required:</h4>
              <ol>
                <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
                <li>Select project: <strong>placements-7138f</strong></li>
                <li>Navigate to <strong>Authentication → Sign-in method</strong></li>
                <li>Enable <strong>Email/Password</strong> authentication</li>
                <li>Go to <strong>Authentication → Users</strong></li>
                <li>Click "Add user" and create the admin user with the credentials above</li>
              </ol>
            </div>
          )}

          <small>Note: Make sure to create this user in Firebase Authentication</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
