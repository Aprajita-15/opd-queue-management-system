import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import medicalImage from '../assets/login.jpg';

const styles = {
  loginContainer: {
    marginTop: '2rem',
    marginBottom: '4rem',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: '2rem'
  },
  
  loginWrapper: {
    width: '100%',
    maxWidth: '1400px',
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
    minHeight: '600px',
    position: 'relative'
  },
  
  leftSection: {
    flex: '1',
    padding: '3rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '520px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },
  
  rightSection: {
    flex: '1.2',
    backgroundImage: `url(${medicalImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minWidth: '450px',
    position: 'relative',
    margin: '2rem',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.1)'
  },
  
  rightSectionContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '3rem',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
    color: 'white'
  },
  
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(29, 78, 216, 0.3) 100%)'
  },
  
  logo: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: '1rem',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'left'
  },
  
  welcomeText: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '1rem',
    lineHeight: '1.2',
    textAlign: 'left'
  },
  
  subtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    textAlign: 'left',
    maxWidth: '400px'
  },
  
  formContainer: {
    width: '100%',
    maxWidth: '420px'
  },
  
  inputField: {
    width: '100%',
    padding: '1rem 1.5rem',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    color: '#1e293b',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  
  passwordContainer: {
    position: 'relative',
    marginBottom: '1.5rem'
  },
  
  passwordToggle: {
    position: 'absolute',
    right: '1.5rem',
    top: '34%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.5rem',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(226, 232, 240, 0.5)'
  },
  
  loginButton: {
    width: '100%',
    padding: '1.2rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem'
  },
  
  signupLink: {
    textAlign: 'center',
    marginTop: '2.5rem',
    color: '#64748b',
    fontSize: '1rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0'
  },
  
  signupText: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '0.5rem',
    transition: 'color 0.2s ease'
  },
  
  errorMessage: {
    backgroundColor: '#fef2f2',
    border: '2px solid #fecaca',
    color: '#dc2626',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  
  forgotPassword: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  
  forgotLink: {
    color: '#64748b',
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontWeight: '500'
  },
  
  loadingSpinner: {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s ease-in-out infinite'
  },
  
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '2rem 0'
  },
  
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem',
    color: '#475569',
    fontSize: '0.95rem'
  },
  
  featureIcon: {
    marginRight: '0.75rem',
    color: '#2563eb',
    fontSize: '1.2rem'
  },
  
  imageText: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  },
  
  imageSubtext: {
    fontSize: '1rem',
    opacity: 0.9,
    lineHeight: 1.6
  },
  
  separator: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#cbd5e1'
  },
  
  separatorLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0'
  },
  
  separatorText: {
    padding: '0 1rem',
    fontSize: '0.9rem',
    color: '#94a3b8'
  }
};

const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .login-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(37, 99, 235, 0.1) !important;
    transform: translateY(-1px) !important;
  }
  
  .login-button:hover:not(:disabled) {
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.5) !important;
  }
  
  .login-button:active:not(:disabled) {
    transform: translateY(-1px) !important;
  }
  
  .login-button:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%) !important;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
  }
  
  .password-toggle:hover {
    color: #2563eb !important;
    background-color: rgba(37, 99, 235, 0.1) !important;
  }
  
  .signup-link:hover {
    color: #1d4ed8 !important;
    text-decoration: underline !important;
  }
  
  .forgot-link:hover {
    color: #2563eb !important;
    text-decoration: underline !important;
  }
  
  @media (max-width: 1200px) {
    .login-wrapper {
      max-width: 1000px;
    }
  }
  
  @media (max-width: 992px) {
    .right-section-hide {
      display: none !important;
    }
    
    .left-section {
      padding: 3rem 2rem !important;
      max-width: 100% !important;
    }
    
    .form-container {
      max-width: 100% !important;
    }
  }
  
  @media (max-width: 576px) {
    .login-container {
      padding: 1rem !important;
    }
    
    .left-section {
      padding: 2rem 1.5rem !important;
    }
    
    .logo {
      font-size: 2.5rem !important;
    }
    
    .welcome-text {
      font-size: 2rem !important;
    }
  }
`;

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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      onLogin(res.data.token, res.data.user);
      navigate('/landing');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer} className="login-container">
      <div style={styles.loginWrapper} className="login-wrapper">
        {/* Left Section - Login Form */}
        <div style={styles.leftSection} className="left-section">
          <div style={styles.formContainer} className="form-container">
            <div style={styles.logo}>CareHub</div>
            <h2 style={styles.welcomeText}>Welcome Back</h2>
            <p style={styles.subtitle}>
              Sign in to access your account and manage hospital queues efficiently
            </p>

            {error && (
              <div style={styles.errorMessage}>
                <span>⚠️</span>
                <span>{error}</span>
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
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              <button 
                type="submit" 
                style={styles.loginButton}
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span style={styles.loadingSpinner}></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login to your account</span>
                  </>
                )}
              </button>
            </form>

            <div style={styles.signupLink}>
              New to CareHub? 
              <Link to="/signup" style={styles.signupText} className="signup-link">
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Image with Spacing */}
        <div style={styles.rightSection} className="right-section-hide">
          <div style={styles.imageOverlay}></div>
          <div style={styles.rightSectionContent}>
            <h3 style={styles.imageText}>Streamline Your Hospital Operations</h3>
            <p style={styles.imageSubtext}>
              Join thousands of healthcare professionals using CareHub to manage patient flow, 
              reduce wait times, and enhance patient experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;