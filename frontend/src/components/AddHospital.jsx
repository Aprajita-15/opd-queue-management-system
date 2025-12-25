// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '2rem',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//     color: '#1e293b'
//   },
//   formCard: {
//     background: '#ffffff',
//     padding: '2.5rem',
//     borderRadius: '12px',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
//     maxWidth: '600px',
//     width: '100%',
//     animation: 'slideUp 0.6s ease-out'
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '2rem'
//   },
//   title: {
//     fontSize: '2rem',
//     fontWeight: '700',
//     color: '#0f172a',
//     marginBottom: '0.5rem',
//     letterSpacing: '-0.025em'
//   },
//   subtitle: {
//     color: '#64748b',
//     fontSize: '1rem',
//     lineHeight: '1.5'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.25rem'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.5rem'
//   },
//   label: {
//     fontSize: '0.85rem',
//     fontWeight: '600',
//     color: '#475569',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px'
//   },
//   input: {
//     padding: '0.85rem 1.25rem',
//     background: '#ffffff',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0',
//     fontSize: '1rem',
//     color: '#1e293b',
//     transition: 'all 0.2s ease',
//     outline: 'none',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
//   },
//   errorMessage: {
//     backgroundColor: '#fee2e2',
//     color: '#dc2626',
//     padding: '1rem',
//     borderRadius: '8px',
//     fontSize: '0.9rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.75rem',
//     marginBottom: '1rem',
//     border: '1px solid #fecaca'
//   },
//   successMessage: {
//     backgroundColor: '#dcfce7',
//     color: '#16a34a',
//     padding: '1rem',
//     borderRadius: '8px',
//     fontSize: '0.9rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.75rem',
//     marginBottom: '1rem',
//     border: '1px solid #bbf7d0'
//   },
//   buttonGroup: {
//     display: 'flex',
//     gap: '1rem',
//     marginTop: '1rem'
//   },
//   submitButton: {
//     flex: 1,
//     background: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     padding: '1rem',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.75rem',
//     boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
//   },
//   cancelButton: {
//     flex: 1,
//     background: '#ffffff',
//     color: '#64748b',
//     border: '1px solid #e2e8f0',
//     padding: '1rem',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
//   },
//   row: {
//     display: 'flex',
//     gap: '1rem'
//   },
//   loadingSpinner: {
//     display: 'inline-block',
//     width: '20px',
//     height: '20px',
//     border: '2px solid rgba(255, 255, 255, 0.3)',
//     borderRadius: '50%',
//     borderTopColor: '#ffffff',
//     animation: 'spin 1s linear infinite'
//   },
//   requiredAsterisk: {
//     color: '#dc2626'
//   }
// };

// // Global styles
// const globalStyles = `
//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
//   .add-hospital-input:focus {
//     border-color: #2563eb !important;
//     box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
//     transform: translateY(-1px);
//   }
//   .submit-button:hover:not(:disabled) {
//     background-color: #1d4ed8 !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3) !important;
//   }
//   .cancel-button:hover:not(:disabled) {
//     background: #f8fafc !important;
//     color: #475569 !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
//     border-color: #cbd5e1 !important;
//   }
// `;

// if (typeof document !== 'undefined') {
//   const styleElement = document.createElement('style');
//   styleElement.textContent = globalStyles;
//   document.head.appendChild(styleElement);
// }

// export default function AddHospital() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [bedAvailability, setBedAvailability] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if (!name || !city || !state || !pincode || !bedAvailability) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         name,
//         image: image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//         address: {
//           city,
//           state,
//           pincode,
//         },
//         bedAvailability: parseInt(bedAvailability),
//         type: "General",
//         status: "active"
//       };

//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("Please login first");
//         setLoading(false);
//         navigate("/login");
//         return;
//       }

//       // Use the newHospital endpoint
//       const response = await axios.post("http://localhost:5000/api/hospitals/new", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       console.log("Hospital created:", response.data);
//       setSuccess("Hospital added successfully!");
//       setLoading(false);
      
//       // Reset form
//       setName("");
//       setImage("");
//       setCity("");
//       setState("");
//       setPincode("");
//       setBedAvailability("");
      
//       setTimeout(() => {
//         navigate("/landing");
//       }, 1500);

//     } catch (err) {
//       console.error("Error adding hospital:", err);
//       const errorMessage = err.response?.data?.message || err.response?.data?.error || "Error adding hospital. Please try again.";
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formCard}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Add New Hospital</h2>
//           <p style={styles.subtitle}>Fill in the details below to register a new healthcare facility</p>
//         </div>

//         {error && (
//           <div style={styles.errorMessage}>
//             ⚠️ {error}
//           </div>
//         )}
        
//         {success && (
//           <div style={styles.successMessage}>
//             ✓ {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Hospital Name <span style={styles.requiredAsterisk}>*</span>
//             </label>
//             <input
//               type="text"
//               value={name}
//               placeholder="Enter hospital name"
//               onChange={(e) => setName(e.target.value)}
//               style={styles.input}
//               className="add-hospital-input"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Image URL (Optional)</label>
//             <input
//               type="text"
//               value={image}
//               placeholder="https://example.com/hospital-image.jpg"
//               onChange={(e) => setImage(e.target.value)}
//               style={styles.input}
//               className="add-hospital-input"
//               disabled={loading}
//             />
//           </div>

//           <div style={styles.row}>
//             <div style={{...styles.formGroup, flex: 1}}>
//               <label style={styles.label}>
//                 City <span style={styles.requiredAsterisk}>*</span>
//               </label>
//               <input
//                 type="text"
//                 value={city}
//                 placeholder="Enter city"
//                 onChange={(e) => setCity(e.target.value)}
//                 style={styles.input}
//                 className="add-hospital-input"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div style={{...styles.formGroup, flex: 1}}>
//               <label style={styles.label}>
//                 State <span style={styles.requiredAsterisk}>*</span>
//               </label>
//               <input
//                 type="text"
//                 value={state}
//                 placeholder="Enter state"
//                 onChange={(e) => setState(e.target.value)}
//                 style={styles.input}
//                 className="add-hospital-input"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div style={styles.row}>
//             <div style={{...styles.formGroup, flex: 1}}>
//               <label style={styles.label}>
//                 Pincode <span style={styles.requiredAsterisk}>*</span>
//               </label>
//               <input
//                 type="text"
//                 value={pincode}
//                 placeholder="Enter pincode"
//                 onChange={(e) => setPincode(e.target.value)}
//                 style={styles.input}
//                 className="add-hospital-input"
//                 required
//                 disabled={loading}
//                 pattern="[0-9]{6}"
//                 maxLength="6"
//               />
//             </div>

//             <div style={{...styles.formGroup, flex: 1}}>
//               <label style={styles.label}>
//                 Beds Available <span style={styles.requiredAsterisk}>*</span>
//               </label>
//               <input
//                 type="number"
//                 value={bedAvailability}
//                 placeholder="Enter bed count"
//                 onChange={(e) => setBedAvailability(e.target.value)}
//                 style={styles.input}
//                 className="add-hospital-input"
//                 required
//                 disabled={loading}
//                 min="0"
//               />
//             </div>
//           </div>

//           <div style={styles.buttonGroup}>
//             <button 
//               type="button" 
//               onClick={() => navigate(-1)}
//               style={styles.cancelButton}
//               className="cancel-button"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               disabled={loading}
//               style={styles.submitButton}
//               className="submit-button"
//             >
//               {loading ? (
//                 <>
//                   <span style={styles.loadingSpinner}></span>
//                   Adding Hospital...
//                 </>
//               ) : (
//                 'Add Hospital'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHospital = () => {
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
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name,
        image: image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        address: { city, state, pincode },
        bedAvailability: parseInt(bedAvailability),
        type: "General",
        status: "active"
      };

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:5000/api/hospitals/new", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
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

      setTimeout(() => navigate("/landing"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add hospital. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Hospital</h2>
          <p style={styles.subtitle}>
            Register a new healthcare facility to make it available for patients
          </p>
        </div>

        {error && (
          <div style={styles.alertError}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div style={styles.alertSuccess}>
            <span style={{ fontSize: '1.2rem' }}>✓</span> {success}
          </div>
        )}

        {/* === IMAGE PREVIEW REMOVED === */}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Hospital Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Hospital Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Apollo Hospital"
              style={styles.input}
              disabled={loading}
              required
            />
          </div>

          {/* Image URL */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL <span style={styles.optional}>(Optional)</span></label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/hospital.jpg"
              style={styles.input}
              disabled={loading}
            />
            <p style={styles.helperText}>Leave blank for default hospital image</p>
          </div>

          {/* City & State Row */}
          <div style={styles.row}>
            <div style={styles.formGroupFull}>
              <label style={styles.label}>
                City <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Mumbai"
                style={styles.input}
                disabled={loading}
                required
              />
            </div>
            <div style={styles.formGroupFull}>
              <label style={styles.label}>
                State <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g., Maharashtra"
                style={styles.input}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Pincode & Beds Row */}
          <div style={styles.row}>
            <div style={styles.formGroupFull}>
              <label style={styles.label}>
                Pincode <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="e.g., 400001"
                style={styles.input}
                disabled={loading}
                required
                maxLength="6"
              />
            </div>
            <div style={styles.formGroupFull}>
              <label style={styles.label}>
                Available Beds <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                value={bedAvailability}
                onChange={(e) => setBedAvailability(e.target.value)}
                placeholder="e.g., 150"
                style={styles.input}
                disabled={loading}
                min="0"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={styles.cancelButton}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#1d4ed8';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
              }}
            >
              {loading ? (
                <>
                  <div style={styles.spinner}></div>
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
};

// Styles remain unchanged (only removed preview-related ones)
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    fontFamily: "'Inter', sans-serif"
  },
  card: {
    background: '#ffffff',
    padding: '3rem',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15), 0 10px 20px rgba(0, 0, 0, 0.08)',
    maxWidth: '700px',
    width: '100%',
    border: '1px solid #bfdbfe'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 0.75rem 0'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  form: {
    marginTop: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.75rem'
  },
  formGroupFull: {
    flex: 1,
    minWidth: '200px',
    marginBottom: '1.75rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.75rem',
    fontWeight: '600',
    color: '#1e40af',
    fontSize: '0.95rem'
  },
  required: {
    color: '#dc2626',
    marginLeft: '4px'
  },
  optional: {
    color: '#64748b',
    fontWeight: '500',
    fontSize: '0.85rem'
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '14px',
    fontSize: '1.05rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  helperText: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#64748b'
  },
  row: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  alertError: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '1.2rem',
    borderRadius: '14px',
    borderLeft: '5px solid #dc2626',
    marginBottom: '2rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.1)'
  },
  alertSuccess: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '1.2rem',
    borderRadius: '14px',
    borderLeft: '5px solid #2563eb',
    marginBottom: '2rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)'
  },
  actions: {
    display: 'flex',
    gap: '1.25rem',
    marginTop: '3rem',
    flexWrap: 'wrap'
  },
  cancelButton: {
    flex: 1,
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '14px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
  },
  submitButton: {
    flex: 1,
    padding: '1rem 2rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Spinner animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    input:focus {
      outline: none !important;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
}

export default AddHospital;