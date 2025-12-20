import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b'
  },
  formCard: {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
    maxWidth: '600px',
    width: '100%',
    animation: '$slideUp 0.6s ease-out'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    padding: '0.85rem 1.25rem',
    background: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    color: '#1e293b',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
      transform: 'translateY(-1px)'
    },
    '&::placeholder': {
      color: '#94a3b8'
    },
    '&:disabled': {
      background: '#f8fafc',
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #fecaca'
  },
  successMessage: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #bbf7d0'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  submitButton: {
    flex: 1,
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
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
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }
  },
  cancelButton: {
    flex: 1,
    background: '#ffffff',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: '#f8fafc',
      color: '#475569',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderColor: '#cbd5e1'
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  },
  row: {
    display: 'flex',
    gap: '1rem',
    '& > div': {
      flex: 1
    }
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: '$spin 1s linear infinite'
  },
  requiredAsterisk: {
    color: '#dc2626'
  },
  // Animation keyframes
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
};

export default function AddHospital() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [bedAvailability, setBedAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!name || !city || !state || !pincode || !bedAvailability) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name,
        image: image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        address: {
          city,
          state,
          pincode,
        },
        bedAvailability,
        type: "General",
        status: "active"
      };

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/hospitals/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Hospital added successfully!");
      setLoading(false);
      
      // Reset form
      setName("");
      setImage("");
      setCity("");
      setState("");
      setPincode("");
      setBedAvailability("");
      
      setTimeout(() => {
        navigate("/hospitals");
      }, 1500);

    } catch (err) {
      console.log(err);
      setError("Error adding hospital. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Hospital</h2>
          <p style={styles.subtitle}>Fill in the details below to register a new healthcare facility</p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={styles.successMessage}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Hospital Name <span style={styles.requiredAsterisk}>*</span>
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter hospital name"
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL (Optional)</label>
            <input
              type="text"
              value={image}
              placeholder="https://example.com/hospital-image.jpg"
              onChange={(e) => setImage(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                City <span style={styles.requiredAsterisk}>*</span>
              </label>
              <input
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                State <span style={styles.requiredAsterisk}>*</span>
              </label>
              <input
                type="text"
                value={state}
                placeholder="Enter state"
                onChange={(e) => setState(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Pincode <span style={styles.requiredAsterisk}>*</span>
              </label>
              <input
                type="number"
                value={pincode}
                placeholder="Enter pincode"
                onChange={(e) => setPincode(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                min="100000"
                max="999999"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Beds Available <span style={styles.requiredAsterisk}>*</span>
              </label>
              <input
                type="number"
                value={bedAvailability}
                placeholder="Enter bed count"
                onChange={(e) => setBedAvailability(e.target.value)}
                style={styles.input}
                required
                disabled={loading}
                min="0"
              />
            </div>
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
              disabled={loading}
              style={styles.submitButton}
            >
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Adding Hospital...
                </>
              ) : (
                'Add Hospital'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}