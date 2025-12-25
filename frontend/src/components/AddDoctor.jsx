import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
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
  formContainer: {
    background: '#ffffff',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    maxWidth: '500px',
    width: '100%',
    border: '1px solid #e2e8f0',
    animation: 'fadeIn 0.5s ease-out'
  },
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
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  specializationsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  specializationTag: {
    background: '#f8fafc',
    color: '#475569',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e2e8f0'
  },
  activeTag: {
    background: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
  },
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
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
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
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  message: {
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  successMessage: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #dcfce7'
  },
  errorMessage: {
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca'
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s ease-in-out infinite'
  }
};

const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .add-doctor-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
  }
  .submit-doctor-button:hover:not(:disabled) {
    background-color: #1d4ed8 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3) !important;
  }
  .cancel-doctor-button:hover:not(:disabled) {
    background: #f8fafc !important;
    color: #475569 !important;
    border-color: #cbd5e1 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }
  .specialization-tag:hover {
    background: #f1f5f9 !important;
    border-color: #cbd5e1 !important;
    transform: translateY(-1px) !important;
  }
  .submit-doctor-button:disabled,
  .cancel-doctor-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

const SPECIALIZATIONS = [
  "Cardiology", "Neurology", "Pediatrics", "Orthopedics", 
  "Dermatology", "Gynecology", "Oncology", "Psychiatry",
  "Radiology", "Anesthesiology", "General Medicine", "Dentistry",
  "Emergency Medicine", "Surgery", "Ophthalmology", "ENT"
];

function AddDoctor() {
  const { id } = useParams(); // This is the departmentId
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!name.trim()) {
      setError("Doctor name is required");
      return;
    }
    
    if (!specialization.trim()) {
      setError("Specialization is required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to add doctor");
        navigate('/login');
        return;
      }

      const doctorData = {
        name: name.trim(),
        specialization: specialization.trim(),
        departmentId: id,
        photo: photo.trim() || undefined,
        experience: experience ? parseInt(experience) : undefined,
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        workingHours: {
          start: "09:00 AM",
          end: "05:00 PM"
        },
        queue: []
      };

      console.log('Adding doctor:', doctorData);

      const response = await axios.post(
        "http://localhost:5000/api/doctors/add",  // Fixed: Changed from /api/doctors to /api/doctors/add
        doctorData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Doctor added:', response.data);
      setSuccess("Doctor added successfully! Redirecting...");
      
      // Reset form
      setName("");
      setSpecialization("");
      setExperience("");
      setPhoto("");
      
      // Navigate back after delay
      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (err) {
      console.error('Add doctor error:', err);
      console.error('Error response:', err.response?.data);
      
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      "Failed to add doctor. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationClick = (spec) => {
    if (!loading) {
      setSpecialization(spec);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>👨‍⚕️ Add New Doctor</h2>
          <p style={styles.subtitle}>Enter doctor details for the department</p>
        </div>

        {success && (
          <div style={{
            ...styles.message,
            ...styles.successMessage
          }}>
            ✓ {success}
          </div>
        )}

        {error && (
          <div style={{
            ...styles.message,
            ...styles.errorMessage
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Doctor Name *
            </label>
            <input
              type="text"
              placeholder="Enter doctor's full name (e.g., Dr. John Smith)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              className="add-doctor-input"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Photo URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/doctor-photo.jpg"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              style={styles.input}
              className="add-doctor-input"
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Experience (Years)
            </label>
            <input
              type="number"
              placeholder="Years of experience (e.g., 5)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={styles.input}
              className="add-doctor-input"
              disabled={loading}
              min="0"
              max="50"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Specialization *
            </label>
            <input
              type="text"
              placeholder="Enter or select specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              style={styles.input}
              className="add-doctor-input"
              required
              disabled={loading}
            />
            
            <div style={styles.specializationsGrid}>
              {SPECIALIZATIONS.map((spec) => (
                <div
                  key={spec}
                  style={{
                    ...styles.specializationTag,
                    ...(specialization === spec && styles.activeTag)
                  }}
                  className="specialization-tag"
                  onClick={() => handleSpecializationClick(spec)}
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              style={styles.cancelButton}
              className="cancel-doctor-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
              className="submit-doctor-button"
              disabled={loading || !name.trim() || !specialization.trim()}
            >
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Adding Doctor...
                </>
              ) : (
                '➕ Add Doctor'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;