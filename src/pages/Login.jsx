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
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Unified directory matching exact login emails to assigned IDs and roles
  const userDirectory = {
    // Admin
    'admin@balvihar.org': { id: 'BV-ADM-01', role: 'Admin' },

    // Teachers
    'smita@balvihar.org': { id: 'BV-TCH-01', role: 'Teacher' },
    'jayant@balvihar.org': { id: 'BV-TCH-02', role: 'Teacher' },
    'manju@balvihar.org': { id: 'BV-TCH-03', role: 'Teacher' },

    // Teaching Assistants / Volunteers
    'volunteer@balvihar.org': { id: 'BV-TA-01', role: 'Teaching Assistant' },
    'ta@balvihar.org': { id: 'BV-TA-02', role: 'Teaching Assistant' },

    // Class 201 Students (exact login emails)
    'ashpal.s@balvihar.org': { id: 'BV201-01', role: 'Student' },
    'krishna.s@balvihar.org': { id: 'BV201-02', role: 'Student' },
    'vani.g@balvihar.org': { id: 'BV201-03', role: 'Student' },
    'prathmesh.a@balvihar.org': { id: 'BV201-04', role: 'Student' },
    'aarnik.r@balvihar.org': { id: 'BV201-05', role: 'Student' },
    'anaisha.k@balvihar.org': { id: 'BV201-06', role: 'Student' },
    'avani.b@balvihar.org': { id: 'BV201-07', role: 'Student' },
    'shaurya.b@balvihar.org': { id: 'BV201-08', role: 'Student' },
    'anaya.t@balvihar.org': { id: 'BV201-09', role: 'Student' },
  };

  const getUserProfile = (email) => {
    const cleanEmail = email.trim().toLowerCase();

    if (userDirectory[cleanEmail]) {
      return userDirectory[cleanEmail];
    }

    // Fallback assignment if a new email is added in Firebase Auth
    if (cleanEmail.startsWith('admin')) {
      return { id: 'BV-ADM-99', role: 'Admin' };
    } else if (cleanEmail.startsWith('teacher') || cleanEmail.startsWith('instructor')) {
      return { id: 'BV-TCH-99', role: 'Teacher' };
    } else if (cleanEmail.startsWith('ta') || cleanEmail.startsWith('volunteer')) {
      return { id: 'BV-TA-99', role: 'Teaching Assistant' };
    } else if (cleanEmail.startsWith('parent')) {
      return { id: 'BV-PAR-01', role: 'Parent' };
    }

    return { id: 'BV-STU-00', role: 'Student' };
  };

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
      const profile = getUserProfile(user.email);

      if (setUserData) {
        setUserData({
          username: user.email,
          userId: profile.id,
          role: profile.role,
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
        setErrorMessage('API key is invalid. Please verify your Firebase/Google Cloud key restrictions.');
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

        <h1 className="school-title">Balvihar Hindi School of Atlanta</h1>

        <div className="form-card">
          <h2 className="card-heading">Sign In to Your Account</h2>

          {errorMessage && (
            <div className="error-alert">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                required
              />
            </div>

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