import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import medicalImage from '../assets/login.jpg';

const styles = {
  loginContainer: {
    marginTop:'2rem',
    marginBottom:'4rem',
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage: `url(${medicalImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%)',
      zIndex: 1
    }
  },
  
  loginWrapper: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  
  leftSection: {
    width: '100%',
    maxWidth: '480px',
    padding: '2.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    animation: '$slideUp 0.8s ease-out',
    marginLeft: '2rem'
  },
  
  logo: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: '0.75rem',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center'
  },
  
  welcomeText: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.75rem',
    lineHeight: '1.2',
    textAlign: 'center'
  },
  
  subtitle: {
    color: '#64748b',
    fontSize: '1.05rem',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    textAlign: 'center'
  },
  
  formContainer: {
    width: '100%'
  },
  
  inputField: {
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    borderRadius: '12px',
    color: '#1e293b',
    fontSize: '1rem',
    marginBottom: '1.25rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15), 0 6px 20px rgba(37, 99, 235, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 1)'
    }
  },
  
  passwordContainer: {
    position: 'relative',
    marginBottom: '1.25rem'
  },
  
  passwordToggle: {
    position: 'absolute',
    right: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.25rem',
    transition: 'color 0.2s ease',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      color: '#2563eb'
    }
  },
  
  loginButton: {
    width: '100%',
    padding: '1.1rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.5)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&:disabled': {
      background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  
  signupLink: {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#64748b',
    fontSize: '0.95rem'
  },
  
  signupText: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '0.5rem',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#1d4ed8',
      textDecoration: 'underline'
    }
  },
  
  errorMessage: {
    backgroundColor: 'rgba(254, 226, 226, 0.9)',
    border: '1px solid rgba(254, 202, 202, 0.8)',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  },
  
  successMessage: {
    backgroundColor: 'rgba(220, 252, 231, 0.9)',
    border: '1px solid rgba(187, 247, 208, 0.8)',
    color: '#16a34a',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  },
  
  forgotPassword: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  
  forgotLink: {
    color: '#64748b',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#2563eb',
      textDecoration: 'underline'
    }
  },
  
  loadingSpinner: {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: '$spin 1s ease-in-out infinite'
  },
  
  // Animations
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(40px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  
  '@keyframes fadeIn': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
};

// Add global styles
const globalStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .login-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15), 0 6px 20px rgba(37, 99, 235, 0.1) !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }
  
  .login-button:hover:not(:disabled) {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5) !important;
  }
  
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  #root {
    height: 100%;
  }
`;

// Add global styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      onLogin(res.data.token);
      navigate('/landing');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      ...styles.loginContainer,
      backgroundImage: `url(${medicalImage})`,
    }}>
      <div style={styles.loginWrapper}>
        {/* Left Section - Login Card */}
        <div style={styles.leftSection}>
          <div style={styles.formContainer}>
            <div style={styles.logo}>CareHub</div>
            <h2 style={styles.welcomeText}>Welcome Back</h2>
            <p style={styles.subtitle}>
              Sign in to access the Hospital Queue Management System
            </p>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={styles.inputField}
                className="login-input"
                required
                disabled={loading}
              />

              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={styles.inputField}
                  className="login-input"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <button 
                type="submit" 
                style={styles.loginButton}
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={styles.loadingSpinner}></span>
                    Signing in...
                  </span>
                ) : 'Login'}
              </button>
            </form>

            <div style={styles.forgotPassword}>
              <a href="/forgot-password" style={styles.forgotLink}>
                Forgot your password?
              </a>
            </div>

            <div style={styles.signupLink}>
              Don't have an account? 
              <Link to="/signup" style={styles.signupText} className="signup-link">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;