// // // components/FeedbackLanding.jsx
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const FeedbackLanding = ({ user, token }) => {
// //   const [hospitals, setHospitals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchHospitals = async () => {
// //       try {
// //         console.log('Fetching hospitals for feedback...');
// //         const res = await axios.get('http://localhost:5000/api/hospitals');
// //         console.log('Hospitals fetched:', res.data.length);
// //         setHospitals(res.data);
// //       } catch (error) {
// //         console.error('Error fetching hospitals:', error);
// //         alert('Failed to load hospitals. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchHospitals();
// //   }, []);

// //   // THIS IS THE FUNCTION THAT MAKES THE BUTTON WORK
// //   const handleProvideFeedback = (hospitalId, hospitalName) => {
// //     console.log('Providing feedback for hospital:', hospitalId, hospitalName);
    
// //     // Check if user is logged in
// //     if (!token) {
// //       alert('Please login to provide feedback');
// //       navigate('/login');
// //       return;
// //     }
    
// //     // Navigate to feedback form with hospital ID
// //     navigate(`/feedback/${hospitalId}`, { 
// //       state: { 
// //         hospitalName: hospitalName,
// //         hospitalId: hospitalId
// //       } 
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={styles.loadingContainer}>
// //         <div style={styles.spinner}></div>
// //         <p>Loading hospitals...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <h1 style={styles.title}>Select a Hospital for Feedback</h1>
// //         <p style={styles.subtitle}>
// //           Choose the hospital where you received care
// //         </p>
// //       </div>

// //       {hospitals.length === 0 ? (
// //         <div style={styles.emptyState}>
// //           <p>No hospitals found. Please add hospitals first.</p>
// //           <button 
// //             onClick={() => navigate('/add-hospital')}
// //             style={styles.addButton}
// //           >
// //             Add Hospital
// //           </button>
// //         </div>
// //       ) : (
// //         <div style={styles.hospitalGrid}>
// //           {hospitals.map((hospital) => (
// //             <div key={hospital._id} style={styles.hospitalCard}>
// //               <div style={styles.hospitalInfo}>
// //                 <h3 style={styles.hospitalName}>{hospital.name}</h3>
// //                 <p style={styles.hospitalLocation}>
// //                   📍 {hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}
// //                 </p>
// //                 <p style={styles.hospitalContact}>
// //                   📞 {hospital.contact || hospital.address?.contact || 'N/A'}
// //                 </p>
                
// //                 {/* PROVIDE FEEDBACK BUTTON */}
// //                 <button
// //                   onClick={() => handleProvideFeedback(hospital._id, hospital.name)}
// //                   style={styles.feedbackButton}
// //                 >
// //                   Provide Feedback
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <div style={styles.footer}>
// //         <button 
// //           onClick={() => navigate('/hospitals')}
// //           style={styles.backButton}
// //         >
// //           ← Back to Hospital List
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     maxWidth: '1200px',
// //     margin: '100px auto 2rem',
// //     padding: '0 2rem',
// //     minHeight: 'calc(100vh - 200px)',
// //   },
// //   header: {
// //     textAlign: 'center',
// //     marginBottom: '3rem',
// //   },
// //   title: {
// //     fontSize: '2.5rem',
// //     fontWeight: '700',
// //     color: '#0f172a',
// //     marginBottom: '1rem',
// //   },
// //   subtitle: {
// //     fontSize: '1.2rem',
// //     color: '#64748b',
// //     maxWidth: '600px',
// //     margin: '0 auto',
// //   },
// //   hospitalGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
// //     gap: '2rem',
// //     marginBottom: '3rem',
// //   },
// //   hospitalCard: {
// //     background: 'white',
// //     borderRadius: '16px',
// //     padding: '1.5rem',
// //     border: '1px solid #e2e8f0',
// //     boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
// //     transition: 'all 0.3s ease',
// //     '&:hover': {
// //       transform: 'translateY(-5px)',
// //       boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
// //     },
// //   },
// //   hospitalInfo: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     height: '100%',
// //   },
// //   hospitalName: {
// //     fontSize: '1.3rem',
// //     fontWeight: '600',
// //     color: '#1e293b',
// //     marginBottom: '0.5rem',
// //   },
// //   hospitalLocation: {
// //     color: '#64748b',
// //     fontSize: '0.95rem',
// //     marginBottom: '0.5rem',
// //   },
// //   hospitalContact: {
// //     color: '#475569',
// //     fontSize: '0.9rem',
// //     marginBottom: '1.5rem',
// //   },
// //   // PROVIDE FEEDBACK BUTTON STYLES
// //   feedbackButton: {
// //     marginTop: 'auto', // Pushes button to bottom
// //     width: '100%',
// //     padding: '0.75rem',
// //     background: '#2563eb',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '8px',
// //     fontSize: '1rem',
// //     fontWeight: '600',
// //     cursor: 'pointer',
// //     transition: 'background 0.2s ease',
// //     '&:hover': {
// //       background: '#1d4ed8',
// //     },
// //   },
// //   footer: {
// //     textAlign: 'center',
// //     paddingTop: '2rem',
// //     borderTop: '1px solid #e2e8f0',
// //   },
// //   backButton: {
// //     padding: '0.75rem 1.5rem',
// //     background: 'transparent',
// //     color: '#64748b',
// //     border: '1px solid #d1d5db',
// //     borderRadius: '8px',
// //     fontSize: '1rem',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease',
// //     '&:hover': {
// //       background: '#f3f4f6',
// //     },
// //   },
// //   emptyState: {
// //     textAlign: 'center',
// //     padding: '3rem',
// //     background: '#f8fafc',
// //     borderRadius: '12px',
// //     border: '1px dashed #cbd5e1',
// //   },
// //   addButton: {
// //     padding: '0.75rem 1.5rem',
// //     background: '#2563eb',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '8px',
// //     fontSize: '1rem',
// //     cursor: 'pointer',
// //     marginTop: '1rem',
// //   },
// //   loadingContainer: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: '50vh',
// //   },
// //   spinner: {
// //     width: '50px',
// //     height: '50px',
// //     border: '4px solid #e2e8f0',
// //     borderTopColor: '#2563eb',
// //     borderRadius: '50%',
// //     animation: 'spin 1s linear infinite',
// //     marginBottom: '1rem',
// //   },
// // };

// // // Add CSS animation
// // if (typeof document !== 'undefined') {
// //   const styleSheet = document.createElement('style');
// //   styleSheet.textContent = `
// //     @keyframes spin {
// //       0% { transform: rotate(0deg); }
// //       100% { transform: rotate(360deg); }
// //     }
// //   `;
// //   document.head.appendChild(styleSheet);
// // }

// // export default FeedbackLanding;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FeedbackLanding = ({ user, token }) => {
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/hospitals');
//         setHospitals(res.data);
//       } catch (error) {
//         console.error('Error fetching hospitals:', error);
//         alert('Failed to load hospitals. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHospitals();
//   }, []);

//   const handleProvideFeedback = (hospitalId, hospitalName) => {
//     if (!token) {
//       alert('Please login to provide feedback');
//       navigate('/login');
//       return;
//     }
    
//     navigate(`/feedback/${hospitalId}`, { 
//       state: { hospitalName }
//     });
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.spinner}></div>
//         <p style={styles.loadingText}>Loading hospitals...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>Select a Hospital for Feedback</h1>
//           <p style={styles.subtitle}>
//             Choose the hospital where you received care
//           </p>
//         </div>

//         {hospitals.length === 0 ? (
//           <div style={styles.emptyState}>
//             <p style={styles.emptyText}>No hospitals found. Please add hospitals first.</p>
//             <button 
//               onClick={() => navigate('/add-hospital')}
//               style={styles.primaryButton}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#1d4ed8';
//                 e.target.style.transform = 'translateY(-3px)';
//                 e.target.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.4)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#2563eb';
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
//               }}
//             >
//               Add Hospital
//             </button>
//           </div>
//         ) : (
//           <div style={styles.hospitalGrid}>
//             {hospitals.map((hospital) => (
//               <div key={hospital._id} style={styles.hospitalCard}>
//                 <div style={styles.hospitalInfo}>
//                   <h3 style={styles.hospitalName}>{hospital.name}</h3>
//                   <p style={styles.hospitalLocation}>
//                     📍 {hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}
//                   </p>
//                   <p style={styles.hospitalContact}>
//                     📞 {hospital.contact || hospital.address?.contact || 'N/A'}
//                   </p>
                  
//                   <button
//                     onClick={() => handleProvideFeedback(hospital._id, hospital.name)}
//                     style={styles.feedbackButton}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = '#1d4ed8';
//                       e.target.style.transform = 'translateY(-3px)';
//                       e.target.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.4)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = '#2563eb';
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
//                     }}
//                   >
//                     Provide Feedback
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={styles.footer}>
//           <button 
//             onClick={() => navigate('/hospitals')}
//             style={styles.secondaryButton}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#f1f5f9';
//               e.target.style.transform = 'translateY(-2px)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.transform = 'translateY(0)';
//             }}
//           >
//             ← Back to Hospital List
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: 'calc(100vh - 80px)',
//     background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
//     display: 'flex',
//     justifyContent: 'center',
//     padding: '3rem 1rem',
//   },
//   card: {
//     width: '100%',
//     maxWidth: '1200px',
//     backgroundColor: 'white',
//     borderRadius: '20px',
//     boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
//     border: '1px solid #bfdbfe',
//     overflow: 'hidden'
//   },
//   header: {
//     background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
//     color: 'white',
//     padding: '4rem 2rem 3rem',
//     textAlign: 'center'
//   },
//   title: {
//     fontSize: '2.75rem',
//     fontWeight: '700',
//     margin: '0 0 1rem 0'
//   },
//   subtitle: {
//     fontSize: '1.25rem',
//     opacity: 0.95,
//     maxWidth: '600px',
//     margin: '0 auto'
//   },
//   hospitalGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
//     gap: '2rem',
//     padding: '3rem 2rem 2rem'
//   },
//   hospitalCard: {
//     backgroundColor: '#f8fbff',
//     borderRadius: '16px',
//     padding: '2rem',
//     border: '2px solid #bfdbfe',
//     boxShadow: '0 8px 20px rgba(37, 99, 235, 0.08)',
//     transition: 'all 0.3s ease',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   hospitalInfo: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   hospitalName: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#1e40af',
//     marginBottom: '0.75rem'
//   },
//   hospitalLocation: {
//     color: '#475569',
//     fontSize: '1.05rem',
//     marginBottom: '0.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem'
//   },
//   hospitalContact: {
//     color: '#64748b',
//     fontSize: '1rem',
//     marginBottom: '2rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem'
//   },
//   feedbackButton: {
//     marginTop: 'auto',
//     padding: '1rem 1.5rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '14px',
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
//   },
//   footer: {
//     padding: '2rem',
//     textAlign: 'center',
//     borderTop: '1px solid #e2e8f0',
//     backgroundColor: '#f8fbff'
//   },
//   secondaryButton: {
//     padding: '0.85rem 2rem',
//     backgroundColor: 'transparent',
//     color: '#475569',
//     border: '2px solid #e2e8f0',
//     borderRadius: '14px',
//     fontSize: '1.05rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease'
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: '4rem 2rem',
//     backgroundColor: '#f8fbff'
//   },
//   emptyText: {
//     fontSize: '1.3rem',
//     color: '#64748b',
//     marginBottom: '2rem'
//   },
//   primaryButton: {
//     padding: '1rem 2.5rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '14px',
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
//   },
//   loadingContainer: {
//     minHeight: '80vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
//   },
//   spinner: {
//     width: '80px',
//     height: '80px',
//     border: '6px solid #e0e7ff',
//     borderTopColor: '#2563eb',
//     borderRadius: '50%',
//     animation: 'spin 1.2s linear infinite',
//     marginBottom: '2rem'
//   },
//   loadingText: {
//     fontSize: '1.5rem',
//     color: '#1e40af'
//   }
// };

// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = `
//     @keyframes spin {
//       to { transform: rotate(360deg); }
//     }
//   `;
//   document.head.appendChild(style);
// }

// export default FeedbackLanding;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackLanding = ({ user, token }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hospitals');
        setHospitals(res.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        alert('Failed to load hospitals. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleProvideFeedback = (hospitalId, hospitalName) => {
    if (!token) {
      alert('Please login to provide feedback');
      navigate('/login');
      return;
    }
    
    navigate(`/feedback/${hospitalId}`, { 
      state: { hospitalName }
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading hospitals...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Select a Hospital for Feedback</h1>
          <p style={styles.subtitle}>
            Choose the hospital where you received care
          </p>
        </div>

        {hospitals.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No hospitals found. Please add hospitals first.</p>
            <button 
              onClick={() => navigate('/add-hospital')}
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
              }}
            >
              Add Hospital
            </button>
          </div>
        ) : (
          <div style={styles.hospitalGrid}>
            {hospitals.map((hospital) => (
              <div 
                key={hospital._id} 
                style={styles.hospitalCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.08)';
                }}
              >
                <div style={styles.hospitalInfo}>
                  <h3 style={styles.hospitalName}>{hospital.name}</h3>
                  <p style={styles.hospitalLocation}>
                    📍 {hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}
                  </p>
                  <p style={styles.hospitalContact}>
                    📞 {hospital.contact || hospital.address?.contact || 'N/A'}
                  </p>
                  
                  <button
                    onClick={() => handleProvideFeedback(hospital._id, hospital.name)}
                    style={styles.feedbackButton}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1d4ed8';
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2563eb';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
                    }}
                  >
                    Provide Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={styles.footer}>
          <button 
            onClick={() => navigate('/hospitals')}
            style={styles.secondaryButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← Back to Hospital List
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem 1rem',
  },
  card: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
    border: '1px solid #bfdbfe',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '3rem 2rem',  // Reduced padding from 4rem → 2.5rem
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',  // Reduced from 2.75rem
    fontWeight: '700',
    margin: '0 0 0.75rem 0'
  },
  subtitle: {
    fontSize: '1.15rem',  // Slightly reduced
    opacity: 0.95,
    maxWidth: '600px',
    margin: '0 auto'
  },
  hospitalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    padding: '3rem 2rem 2rem'
  },
  hospitalCard: {
    backgroundColor: '#f8fbff',
    borderRadius: '16px',
    padding: '2rem',
    border: '2px solid #bfdbfe',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.08)',
    transition: 'all 0.4s ease',  // Smooth hover transition
    display: 'flex',
    flexDirection: 'column'
  },
  hospitalInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  hospitalName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '0.75rem'
  },
  hospitalLocation: {
    color: ' #475569',
    fontSize: '1.05rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  hospitalContact: {
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  feedbackButton: {
    marginTop: 'auto',
    padding: '1rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  footer: {
    padding: '2rem',
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fbff'
  },
  secondaryButton: {
    padding: '0.85rem 2rem',
    backgroundColor: 'transparent',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '14px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f8fbff'
  },
  emptyText: {
    fontSize: '1.3rem',
    color: '#64748b',
    marginBottom: '2rem'
  },
  primaryButton: {
    padding: '1rem 2.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
  },
  spinner: {
    width: '80px',
    height: '80px',
    border: '6px solid #e0e7ff',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 1.2s linear infinite',
    marginBottom: '2rem'
  },
  loadingText: {
    fontSize: '1.5rem',
    color: '#1e40af'
  }
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default FeedbackLanding;