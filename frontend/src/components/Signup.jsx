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
    padding: '1rem'
  },
  
  signupCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem',
    width: '100%',
    maxWidth: '550px',
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
    marginBottom: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path fill=%22%2364748b%22 d=%22M5 7l5 5 5-5H5z%22/></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '16px',
    cursor: 'pointer'
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
    boxSizing: 'border-box'
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
    padding: '0.25rem'
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
    marginTop: '0.5rem'
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
    marginLeft: '0.5rem'
  },
  
  errorMessage: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  
  roleIndicator: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center',
    width: '100%',
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
    animation: 'spin 1s ease-in-out infinite'
  },
  
  formLabel: {
    display: 'block',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },

  hospitalInfo: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    fontSize: '0.85rem',
    color: '#475569'
  },

  infoIcon: {
    display: 'inline-block',
    marginRight: '0.5rem',
    color: '#2563eb'
  }
};

const signupGlobalStyles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .signup-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = signupGlobalStyles;
  document.head.appendChild(styleElement);
}

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
    name: '',
    phone: '',
    hospitalName: '',
    address: '',
    licenseNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.role === 'patient' && !formData.phone) {
      setError('Please fill in phone number for patient registration');
      setLoading(false);
      return;
    }

    if (formData.role === 'hospital') {
      if (!formData.hospitalName) {
        setError('Please enter hospital name');
        setLoading(false);
        return;
      }
      if (!formData.address) {
        setError('Please enter hospital address');
        setLoading(false);
        return;
      }
    }

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        name: formData.name
      };

      if (formData.role === 'patient') {
        signupData.phone = formData.phone;
      } else if (formData.role === 'hospital') {
        signupData.hospitalName = formData.hospitalName;
        signupData.address = formData.address;
        signupData.licenseNumber = formData.licenseNumber;
      }

      const res = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      
      if (res.data.token && res.data.user) {
        onLogin(res.data.token, res.data.user);
        navigate('/landing');
      } else {
        setError('Signup successful but login failed. Please login manually.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getRoleText = () => {
    switch (formData.role) {
      case 'patient': return 'Patient Registration';
      case 'hospital': return 'Hospital Registration';
      default: return 'User Registration';
    }
  };

  const getHospitalInfoText = () => {
    switch (formData.role) {
      case 'patient':
        return 'Patients can book appointments and view queue status.';
      case 'hospital':
        return 'Hospitals can manage doctors, appointment schedules, and patient queues.';
      default:
        return '';
    }
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.signupCard}>
        <div style={styles.logo}>CareHub</div>
        <h2 style={styles.welcomeText}>Create Account</h2>
        <p style={styles.subtitle}>Join our OPD Queue Management System</p>

        <div style={styles.roleIndicator}>
          {getRoleText()}
        </div>

        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        <div style={styles.hospitalInfo}>
          <span style={styles.infoIcon}>ℹ️</span>
          {getHospitalInfoText()}
        </div>

        <form onSubmit={handleSubmit}>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            style={styles.roleSelector}
            disabled={loading}
            className="signup-input"
          >
            <option value="patient">Patient</option>
            <option value="hospital">Hospital</option>
          </select>

          <div style={styles.formGroup}>
            <span style={styles.formLabel}>
              {formData.role === 'hospital' ? 'Contact Person Name *' : 'Full Name *'}
            </span>
            <input
              type="text"
              placeholder={formData.role === 'hospital' ? "Enter contact person name" : "Enter your full name"}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={styles.inputField}
              className="signup-input"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <span style={styles.formLabel}>Email Address *</span>
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
            <span style={styles.formLabel}>Password *</span>
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
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {formData.role === 'patient' && (
            <div style={styles.formGroup}>
              <span style={styles.formLabel}>Phone Number *</span>
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{...styles.inputField, textAlign: 'left'}}
                className="signup-input"
                required
                disabled={loading}
              />
            </div>
          )}

          {formData.role === 'hospital' && (
            <>
              <div style={styles.formGroup}>
                <span style={styles.formLabel}>Hospital Name *</span>
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

              <div style={styles.formGroup}>
                <span style={styles.formLabel}>Hospital Address *</span>
                <input
                  type="text"
                  placeholder="Enter full hospital address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={styles.inputField}
                  className="signup-input"
                  required
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <span style={styles.formLabel}>License Number (Optional)</span>
                <input
                  type="text"
                  placeholder="Enter medical license number if applicable"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                  style={styles.inputField}
                  className="signup-input"
                  disabled={loading}
                />
              </div>
            </>
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
          <Link to="/login" style={styles.loginText}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;