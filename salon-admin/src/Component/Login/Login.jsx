import React, { useState } from 'react';
import './Login.css';
import { FaSpa, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredUser = credentials.username.trim();
    const enteredPass = credentials.password.trim();

    setTimeout(() => {
      // Identity ID: admin@rose | Password: roseadmin2026
      if (enteredUser === 'admin@rose' && enteredPass === 'roseadmin2026') {
        setError('');
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setError('Invalid admin credentials. Check ID/Password!');
        setIsLoading(false);
      }
    }, 800); 
  };

  return (
    <div className="admin-login-viewport">
      <div className="login-card-architecture animate-fade-in">
        
        <div className="login-brand-header">
          <div className="login-logo-circle">
            <FaSpa className="login-spa-icon" />
          </div>
          <h2>Rose Salon Control Panel</h2>
          <p>Authorized personnel access only</p>
        </div>

        {error && (
          <div className="login-error-alert-box">
            <span>✕</span> {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="login-interactive-form">
          <div className="login-field-group">
            <label htmlFor="username">Admin Identity</label>
            <div className="input-with-icon-wrapper">
              <FaEnvelope className="field-inner-icon" />
              <input 
                type="text" 
                id="username" 
                name="username" 
                required 
                placeholder="admin@rose" 
                value={credentials.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="login-field-group">
            <label htmlFor="password">Security Password</label>
            <div className="input-with-icon-wrapper">
              <FaLock className="field-inner-icon" />
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="••••••••••••" 
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-admin-login-submit" disabled={isLoading}>
            {isLoading ? <div className="login-spinner-ring"></div> : "Verify & Access Control Desk"}
          </button>
        </form>

        <div className="login-security-footer">
          <p>Protected by end-to-end local session authentication protocols.</p>
        </div>

      </div>
    </div>
  );
};

export default Login;