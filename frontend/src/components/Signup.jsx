import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
  signupContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: '2rem'
  },
  signupCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    animation: 'slideUp 0.6s ease-out'
  },
  logo: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em'
  },
  welcomeText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: '0.25rem'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '0.95rem',
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  roleSelector: {
    width: '100%',
    padding: '0.9rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: '#1e293b',
    fontSize: '1rem',
    marginBottom: '1.25rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path fill=%22%2364748b%22 d=%22M5 7l5 5 5-5H5z%22/></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '16px',
    cursor: 'pointer',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    }
  },
  roleOption: {
    backgroundColor: '#ffffff',
    color: '#1e293b'
  },
  inputField: {
    width: '100%',
    padding: '0.9rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: '#1e293b',
    fontSize: '1rem',
    marginBottom: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    }
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  formGroup: {
    flex: 1
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '1rem'
  },
  passwordToggle: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '0.25rem',
    '&:hover': {
      color: '#2563eb'
    }
  },
  signupButton: {
    width: '100%',
    padding: '0.9rem',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '0.5rem',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-1px)'
    },
    '&:disabled': {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#64748b',
    fontSize: '0.9rem'
  },
  loginText: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '0.5rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  successMessage: {
    backgroundColor: '#dcfce7',
    border: '1px solid #bbf7d0',
    color: '#16a34a',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  roleIndicator: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
    textAlign: 'center',
    width: '100%'
  },
  patientIndicator: {
    background: '#f0f9ff',
    color: '#2563eb',
    border: '1px solid #dbeafe'
  },
  doctorIndicator: {
    background: '#f0f9ff',
    color: '#2563eb',
    border: '1px solid #dbeafe'
  },
  hospitalIndicator: {
    background: '#f0f9ff',
    color: '#2563eb',
    border: '1px solid #dbeafe'
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: '$spin 1s ease-in-out infinite'
  },
  formLabel: {
    display: 'block',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  // Animations
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
};

// Global CSS for hover effects
const globalStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
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
  
  .signup-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
  }
  
  .signup-button:hover:not(:disabled) {
    background-color: #1d4ed8 !important;
    transform: translateY(-1px) !important;
  }
  
  .login-link:hover {
    color: #1d4ed8 !important;
    text-decoration: underline !important;
  }
  
  .password-toggle:hover {
    color: #2563eb !important;
  }
  
  .role-selector:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
  }
`;

// Add global styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
    name: '',
    age: '',
    phone: '',
    specialization: ''
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
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Password strength validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Role-specific validation
    if (formData.role === 'patient') {
      if (!formData.age || !formData.phone) {
        setError('Please fill in age and phone number for patient registration');
        setLoading(false);
        return;
      }
    }

    if (formData.role === 'doctor' && !formData.specialization) {
      setError('Please enter your specialization');
      setLoading(false);
      return;
    }

    try {
      // Create the data to send based on role
      const signupData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        name: formData.name
      };

      // Add role-specific fields
      if (formData.role === 'patient') {
        signupData.age = formData.age;
        signupData.phone = formData.phone;
      } else if (formData.role === 'doctor') {
        signupData.specialization = formData.specialization;
      }

      const res = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      onLogin(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIndicatorStyle = () => {
    switch (formData.role) {
      case 'patient':
        return { ...styles.roleIndicator, ...styles.patientIndicator };
      case 'doctor':
        return { ...styles.roleIndicator, ...styles.doctorIndicator };
      case 'hospital':
        return { ...styles.roleIndicator, ...styles.hospitalIndicator };
      default:
        return styles.roleIndicator;
    }
  };

  const getRoleText = () => {
    switch (formData.role) {
      case 'patient':
        return 'Patient Registration';
      case 'doctor':
        return 'Doctor Registration';
      case 'hospital':
        return 'Hospital Registration';
      default:
        return 'User Registration';
    }
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.signupCard}>
        <div style={styles.logo}>CareHub</div>
        <h2 style={styles.welcomeText}>Create Account</h2>
        <p style={styles.subtitle}>Join our OPD Queue Management System</p>

        <div style={getRoleIndicatorStyle()}>
          {getRoleText()}
        </div>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            style={styles.roleSelector}
            className="role-selector"
            disabled={loading}
          >
            <option value="patient" style={styles.roleOption}>Patient</option>
            <option value="doctor" style={styles.roleOption}>Doctor</option>
            <option value="hospital" style={styles.roleOption}>Hospital</option>
          </select>

          <div style={styles.formGroup}>
            <span style={styles.formLabel}>Full Name</span>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={styles.inputField}
              className="signup-input"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <span style={styles.formLabel}>Email Address</span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.inputField}
              className="signup-input"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.passwordContainer}>
            <span style={styles.formLabel}>Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password (min. 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.inputField}
              className="signup-input"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {formData.role === 'patient' && (
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <span style={styles.formLabel}>Age</span>
                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  style={styles.inputField}
                  className="signup-input"
                  required
                  disabled={loading}
                  min="1"
                  max="120"
                />
              </div>
              <div style={styles.formGroup}>
                <span style={styles.formLabel}>Phone Number</span>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={styles.inputField}
                  className="signup-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {formData.role === 'doctor' && (
            <div style={styles.formGroup}>
              <span style={styles.formLabel}>Specialization</span>
              <input
                type="text"
                placeholder="Enter your specialization (e.g., Cardiologist, Dentist)"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                style={styles.inputField}
                className="signup-input"
                required
                disabled={loading}
              />
            </div>
          )}

          {formData.role === 'hospital' && (
            <div style={styles.formGroup}>
              <span style={styles.formLabel}>Hospital Name</span>
              <input
                type="text"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                style={styles.inputField}
                className="signup-input"
                required
                disabled={loading}
              />
            </div>
          )}

          <button 
            type="submit" 
            style={styles.signupButton}
            className="signup-button"
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={styles.loadingSpinner}></span>
                Creating Account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account? 
          <Link to="/login" style={styles.loginText} className="login-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;