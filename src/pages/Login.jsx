import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';
import vhpaLogo from '../assets/vhpa-logo.png';
import balviharLogo from '../assets/balvihar-logo.png';

function Login({ setUserData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    let email = username.trim().toLowerCase();
    if (!email.includes('@')) {
      email = `${email}@balvihar.org`;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (setUserData) {
        setUserData({
          username: user.email,
          role: role,
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Firebase Auth Error:', error.code, error.message);

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMessage('Invalid username or password. Please verify your credentials.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email format.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/api-key-not-valid') {
        setErrorMessage('API key is invalid. Please verify your Google Cloud key restrictions.');
      } else {
        setErrorMessage(`Login failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-card-container">
        {/* Dual Logos */}
        <div className="logos-row">
          <img
            src={vhpaLogo}
            alt="VHPA World Hindu Council of America"
            className="school-logo vhpa-logo"
          />
          <img
            src={balviharLogo}
            alt="Balvihar Educational Program"
            className="school-logo balvihar-logo"
          />
        </div>

        {/* Title */}
        <h1 className="school-title">Balvihar Hindi School of Atlanta</h1>

        {/* Card Box */}
        <div className="form-card">
          <h2 className="card-heading">Sign In to Your Account</h2>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="error-alert">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Username / Email Field */}
            <div className="input-group">
              <label htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                placeholder="e.g. shaurya or shaurya@balvihar.org"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
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
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;