import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const styles = {
  // Main container with same light theme
  pageContainer: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  // Form container matching the light theme
  formContainer: {
    background: '#ffffff',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    maxWidth: '500px',
    width: '100%',
    border: '1px solid #e2e8f0',
    animation: '$fadeIn 0.5s ease-out'
  },
  
  // Header section
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e2e8f0'
  },
  
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.75rem',
    letterSpacing: '-0.025em'
  },
  
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.5'
  },
  
  // Hospital info badge
  hospitalInfo: {
    background: '#f8fafc',
    padding: '1.25rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  
  hospitalText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: 0
  },
  
  hospitalId: {
    color: '#2563eb',
    fontWeight: '700'
  },
  
  // Form styles
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#475569',
    marginLeft: '0.25rem'
  },
  
  input: {
    padding: '1rem 1.25rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    background: '#ffffff',
    color: '#1e293b',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)'
    },
    '&::placeholder': {
      color: '#94a3b8'
    },
    '&:disabled': {
      background: '#f8fafc',
      cursor: 'not-allowed'
    }
  },
  
  // Button group
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  
  submitButton: {
    flex: 1,
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  
  cancelButton: {
    flex: 1,
    background: '#ffffff',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: '#f8fafc',
      color: '#475569',
      borderColor: '#cbd5e1',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  
  // Loading spinner
  loadingSpinner: {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: '$spin 1s ease-in-out infinite'
  },
  
  // Animations
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' }
  }
};

function AddDept() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshDepartments = location.state?.refreshDepartments;
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!deptName.trim()) {
      alert("Department name is required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/departments`, {
        name: deptName,
        hospitalId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Department added successfully");

      if (refreshDepartments) refreshDepartments();

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Department</h2>
          <p style={styles.subtitle}>
            Create a new department for the hospital network
          </p>
          
          
        </div>

        <form onSubmit={handleAddDepartment} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Department Name
            </label>
            <input
              type="text"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="e.g., Cardiology, Neurology, Pediatrics"
              style={styles.input}
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              style={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !deptName.trim()}
              style={styles.submitButton}
            >
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Adding...
                </>
              ) : (
                'Add Department'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDept;