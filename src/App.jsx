import React, { useState } from 'react';
import './App.css';
import balviharLogo from './assets/balvihar-logo.png';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, role });
  };

  return (
    <div className="page-wrapper">
      <div className="login-card-container">
        {/* Balvihar Logo */}
        <div className="logo-container">
          <img 
            src={balviharLogo} 
            alt="Balvihar Educational Program of VHPA" 
            className="school-logo"
          />
        </div>

        {/* Title */}
        <h1 className="school-title">Balvihar Hindi School of Atlanta</h1>

        {/* Login Box */}
        <div className="form-card">
          <h2 className="card-heading">Sign In to Your Account</h2>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#167946"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="input-group">
              <label htmlFor="role">Role</label>
              <div className="select-wrapper">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Volunteer">Volunteer / Admin</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;