// // components/Profile.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = ({ user, onUpdateProfile }) => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     displayName: '',
//     phoneNumber: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         displayName: user.displayName || extractNameFromEmail(user.email) || '',
//         phoneNumber: user.phoneNumber || ''
//       });
//     }
//   }, [user]);

//   // Function to extract name from email (same as in App.jsx)
//   const extractNameFromEmail = (email) => {
//     if (!email) return "";
    
//     const username = email.split('@')[0];
//     let name = username.replace(/[0-9._-]+/g, ' ');
    
//     name = name
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .filter(word => word.length > 0)
//       .join(' ');
    
//     return name;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       // Validate form data
//       if (!formData.displayName.trim()) {
//         throw new Error('Display name is required');
//       }

//       // Update profile
//       await onUpdateProfile({
//         displayName: formData.displayName.trim(),
//         phoneNumber: formData.phoneNumber.trim()
//       });

//       setMessage({ 
//         type: 'success', 
//         text: 'Profile updated successfully!' 
//       });
//       setIsEditing(false);
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setMessage({ type: '', text: '' });
//       }, 3000);
//     } catch (error) {
//       setMessage({ 
//         type: 'error', 
//         text: error.message || 'Failed to update profile' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset form to original user data
//     setFormData({
//       displayName: user.displayName || extractNameFromEmail(user.email) || '',
//       phoneNumber: user.phoneNumber || ''
//     });
//     setIsEditing(false);
//     setMessage({ type: '', text: '' });
//   };

//   if (!user) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Profile Not Found</h2>
//           <p>Please log in to view your profile.</p>
//           <button 
//             onClick={() => navigate('/login')}
//             style={styles.primaryButton}
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <div style={styles.avatarLarge}>
//             {formData.displayName.charAt(0).toUpperCase() || 
//              extractNameFromEmail(user.email).charAt(0).toUpperCase()}
//           </div>
//           <div style={styles.headerInfo}>
//             <h1 style={styles.title}>My Profile</h1>
//             <p style={styles.subtitle}>Manage your personal information</p>
//           </div>
//           {!isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               style={styles.editButton}
//             >
//               ✏️ Edit Profile
//             </button>
//           )}
//         </div>

//         {message.text && (
//           <div style={{
//             ...styles.message,
//             backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
//             color: message.type === 'success' ? '#065f46' : '#991b1b'
//           }}>
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} style={styles.form}>
//           {/* Email Field (Non-editable) */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               type="email"
//               value={user.email || ''}
//               style={styles.input}
//               disabled
//               aria-label="Email address (read-only)"
//             />
//             <p style={styles.helperText}>Email cannot be changed</p>
//           </div>

//           {/* Display Name Field */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Display Name
//               <span style={styles.required}> *</span>
//             </label>
//             <input
//               type="text"
//               name="displayName"
//               value={formData.displayName}
//               onChange={handleInputChange}
//               style={styles.input}
//               disabled={!isEditing}
//               required
//               aria-label="Display name"
//               aria-required="true"
//             />
//             <p style={styles.helperText}>
//               This name will be displayed throughout the application
//             </p>
//           </div>

//           {/* Phone Number Field */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Phone Number</label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               style={styles.input}
//               disabled={!isEditing}
//               placeholder="Enter your phone number"
//               aria-label="Phone number"
//             />
//             <p style={styles.helperText}>Optional - for important notifications</p>
//           </div>

//           {/* Form Actions */}
//           {isEditing && (
//             <div style={styles.formActions}>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 style={styles.cancelButton}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 style={styles.submitButton}
//                 disabled={loading || !formData.displayName.trim()}
//               >
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// // Styles for Profile component
// const styles = {
//   container: {
//     minHeight: 'calc(100vh - 80px)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     padding: '2rem',
//     backgroundColor: '#f8fafc',
//   },
//   card: {
//     width: '100%',
//     maxWidth: '600px',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//     padding: '2rem',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     gap: '1rem',
//   },
//   avatarLarge: {
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '2rem',
//     fontWeight: '600',
//     flexShrink: 0,
//   },
//   headerInfo: {
//     flex: 1,
//   },
//   title: {
//     fontSize: '1.875rem',
//     fontWeight: '700',
//     color: '#1f2937',
//     margin: 0,
//   },
//   subtitle: {
//     color: '#6b7280',
//     margin: '0.25rem 0 0 0',
//   },
//   editButton: {
//     padding: '0.5rem 1rem',
//     backgroundColor: 'transparent',
//     color: '#2563eb',
//     border: '1px solid #2563eb',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '0.875rem',
//     fontWeight: '500',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'all 0.2s ease',
//   },
//   message: {
//     padding: '0.75rem 1rem',
//     borderRadius: '6px',
//     marginBottom: '1.5rem',
//     fontSize: '0.875rem',
//   },
//   form: {
//     marginBottom: '2rem',
//   },
//   formGroup: {
//     marginBottom: '1.5rem',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     fontWeight: '500',
//     color: '#374151',
//     fontSize: '0.875rem',
//   },
//   required: {
//     color: '#dc2626',
//   },
//   input: {
//     width: '100%',
//     padding: '0.75rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fff',
//   },
//   helperText: {
//     marginTop: '0.25rem',
//     fontSize: '0.75rem',
//     color: '#6b7280',
//   },
//   formActions: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '1rem',
//     marginTop: '2rem',
//   },
//   cancelButton: {
//     padding: '0.75rem 1.5rem',
//     backgroundColor: 'transparent',
//     color: '#4b5563',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//   },
//   submitButton: {
//     padding: '0.75rem 1.5rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//   },
//   primaryButton: {
//     padding: '0.75rem 1.5rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontWeight: '500',
//     marginTop: '1rem',
//   },
//   section: {
//     marginTop: '2rem',
//     paddingTop: '2rem',
//     borderTop: '1px solid #e5e7eb',
//   },
//   sectionTitle: {
//     fontSize: '1.25rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: '1rem',
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '1rem',
//   },
//   infoItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.25rem',
//   },
//   infoLabel: {
//     fontSize: '0.875rem',
//     color: '#6b7280',
//   },
//   infoValue: {
//     fontSize: '0.875rem',
//     color: '#1f2937',
//     fontWeight: '500',
//     wordBreak: 'break-all',
//   },
// };

// export default Profile;

// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || extractNameFromEmail(user.email) || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const extractNameFromEmail = (email) => {
    if (!email) return "";
    
    const username = email.split('@')[0];
    let name = username.replace(/[0-9._-]+/g, ' ');
    
    name = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .filter(word => word.length > 0)
      .join(' ');
    
    return name;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!formData.displayName.trim()) {
        throw new Error('Display name is required');
      }

      await onUpdateProfile({
        displayName: formData.displayName.trim(),
        phoneNumber: formData.phoneNumber.trim()
      });

      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      setIsEditing(false);
      
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user.displayName || extractNameFromEmail(user.email) || '',
      phoneNumber: user.phoneNumber || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Profile Not Found</h2>
          <p style={styles.text}>Please log in to view your profile.</p>
          <button 
            onClick={() => navigate('/login')}
            style={styles.primaryButton}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const initialLetter = formData.displayName 
    ? formData.displayName.charAt(0).toUpperCase()
    : extractNameFromEmail(user.email).charAt(0).toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatarLarge}>
            {initialLetter}
          </div>
          <div style={styles.headerInfo}>
            <h1 style={styles.title}>My Profile</h1>
            <p style={styles.subtitle}>Manage your personal information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={styles.editButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {message.text && (
          <div style={{
            ...styles.message,
            backgroundColor: message.type === 'success' ? '#dbeafe' : '#fee2e2',
            borderLeft: `4px solid ${message.type === 'success' ? '#2563eb' : '#dc2626'}`
          }}>
            <span style={{ fontWeight: '600' }}>{message.type === 'success' ? '✓' : '⚠'}</span> {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={user.email || ''}
              style={{ ...styles.input, ...styles.disabledInput }}
              disabled
              aria-label="Email address (read-only)"
            />
            <p style={styles.helperText}>Your email cannot be changed</p>
          </div>

          {/* Display Name Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Display Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(isEditing ? styles.editableInput : styles.disabledInput),
                borderColor: isEditing && !formData.displayName.trim() ? '#dc2626' : '#3b82f6'
              }}
              disabled={!isEditing}
              required
              placeholder="Enter your display name"
            />
            <p style={styles.helperText}>This name appears across the platform</p>
          </div>

          {/* Phone Number Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(isEditing ? styles.editableInput : styles.disabledInput)
              }}
              disabled={!isEditing}
              placeholder="+1 (555) 000-0000"
            />
            <p style={styles.helperText}>Optional – used for notifications & recovery</p>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div style={styles.formActions}>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
                disabled={loading}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  opacity: loading || !formData.displayName.trim() ? 0.7 : 1,
                  cursor: loading || !formData.displayName.trim() ? 'not-allowed' : 'pointer'
                }}
                disabled={loading || !formData.displayName.trim()}
                onMouseEnter={(e) => {
                  if (!loading && formData.displayName.trim()) {
                    e.target.style.backgroundColor = '#1d4ed8';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Enhanced Blue-Themed Styles with Animations
const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem 1rem',
    backgroundColor: '#eff6ff', // Light blue tint background
  },
  card: {
    width: '100%',
    maxWidth: '640px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '2.5rem',
    border: '1px solid #dbeafe',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  avatarLarge: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    fontWeight: '700',
    flexShrink: 0,
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
  },
  headerInfo: {
    flex: 1,
    minWidth: '200px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e40af',
    margin: 0,
  },
  subtitle: {
    color: '#64748b',
    margin: '0.5rem 0 0 0',
    fontSize: '1rem',
  },
  editButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
  },
  message: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#1e40af',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  form: {
    marginTop: '1rem',
  },
  formGroup: {
    marginBottom: '1.75rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.65rem',
    fontWeight: '600',
    color: '#1e40af',
    fontSize: '0.95rem',
  },
  required: {
    color: '#dc2626',
    marginLeft: '0.25rem',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1.2rem',
    border: '2px solid #bfdbfe',
    borderRadius: '12px',
    fontSize: '1.05rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  editableInput: {
    borderColor: '#3b82f6',
    backgroundColor: '#f8fbff',
  },
  disabledInput: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    cursor: 'not-allowed',
  },
  helperText: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#64748b',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2.5rem',
    flexWrap: 'wrap',
  },
  cancelButton: {
    padding: '0.85rem 1.8rem',
    backgroundColor: 'transparent',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    padding: '0.85rem 2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
  },
  primaryButton: {
    padding: '0.85rem 2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
  },
  text: {
    color: '#64748b',
    fontSize: '1.1rem',
    margin: '1rem 0',
  },
};

export default Profile;