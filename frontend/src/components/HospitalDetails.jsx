// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const styles = {
//   pageContainer: {
//     background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//     padding: '6rem 2rem 4rem',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//     color: '#1e293b',
//     minHeight: '100vh'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2.5rem',
//     paddingBottom: '2rem',
//     borderBottom: '1px solid #e2e8f0',
//     flexWrap: 'wrap',
//     gap: '1.5rem'
//   },
//   titleContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem'
//   },
//   title: {
//     fontSize: '2rem',
//     fontWeight: '700',
//     color: '#0f172a',
//     margin: 0,
//     letterSpacing: '-0.025em'
//   },
//   buttonGroup: {
//     display: 'flex',
//     gap: '0.75rem',
//     flexWrap: 'wrap'
//   },
//   actionButton: {
//     background: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     padding: '0.85rem 1.5rem',
//     borderRadius: '8px',
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
//   },
//   deleteButton: {
//     background: '#ffffff',
//     color: '#dc2626',
//     border: '1px solid #fecaca',
//     padding: '0.85rem 1.5rem',
//     borderRadius: '8px',
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)'
//   },
//   content: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '3rem',
//     marginBottom: '3rem',
//     animation: 'fadeIn 0.6s ease-out'
//   },
//   imageSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem'
//   },
//   imageContainer: {
//     position: 'relative',
//     borderRadius: '12px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//     height: '320px'
//   },
//   hospitalImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     objectPosition: 'center',
//     transition: 'transform 0.6s ease'
//   },
//   imageBadge: {
//     position: 'absolute',
//     top: '1rem',
//     right: '1rem',
//     background: '#ffffff',
//     color: '#16a34a',
//     padding: '0.4rem 1rem',
//     borderRadius: '20px',
//     fontSize: '0.8rem',
//     fontWeight: '600',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     border: '1px solid #dcfce7'
//   },
//   infoSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     color: '#2563eb',
//     gap: '1.5rem'
//   },
//   addressCard: {
//     background: '#ffffff',
//     padding: '2rem',
//     borderRadius: '12px',
    
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//     transition: 'all 0.3s ease'
//   },
//   addressTitle: {
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     color: '#2563eb',
//     marginBottom: '1.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem'
//   },
//   addressContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem'
//   },
//   addressLine: {
//     fontSize: '1rem',
//     color: '#475569',
//     display: 'flex',
//     gap: '0.75rem'
//   },
//   addressLabel: {
//     color: '#64748b',
//     fontWeight: '600',
//     minWidth: '70px'
//   },
//   bedCard: {
//     background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
//     padding: '2rem',
//     borderRadius: '12px',
//     border: '1px solid #dbeafe',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
//   },
//   addressCardBlue: {
//   background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
//   padding: '2rem',
//   borderRadius: '12px',
//   border: '1px solid #dbeafe',
//   boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
//   transition: 'all 0.3s ease'
// }
// ,
//   bedInfo: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.5rem'
//   },
//   bedLabel: {
//     fontSize: '1rem',
//     fontWeight: '600',
//     color: '#2563eb',
//     textTransform: 'uppercase',
//     letterSpacing: '1px'
//   },
//   bedCount: {
//     fontSize: '2.8rem',
//     fontWeight: '700',
//     color: '#2563eb'
//   },
//   bedCapacity: {
//     fontSize: '0.9rem',
//     color: '#64748b'
//   },
//   statsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '1rem',
//     marginTop: '0.5rem'
//   },
//   statCard: {
//     background: '#ffffff',
//     padding: '1.25rem',
//     borderRadius: '10px',
//     textAlign: 'center',
//     border: '1px solid #e2e8f0',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
//   },
//   statValue: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#2563eb',
//     marginBottom: '0.25rem'
//   },
//   statLabel: {
//     fontSize: '0.8rem',
//     color: '#64748b',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: '1px'
//   },
//   additionalInfo: {
//     marginTop: '3rem'
//   },
//   sectionTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     marginBottom: '1.5rem',
//     color: '#0f172a',
//     paddingBottom: '0.75rem',
//     borderBottom: '1px solid #e2e8f0'
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//     gap: '1.5rem'
//   },
//   infoItem: {
//     background: '#ffffff',
//     padding: '1.5rem',
//     borderRadius: '10px',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
//   },
//   infoLabel: {
//     fontSize: '0.85rem',
//     color: '#64748b',
//     fontWeight: '600',
//     marginBottom: '0.5rem',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px'
//   },
//   infoValue: {
//     fontSize: '1.2rem',
//     fontWeight: '700',
//     color: '#0f172a',
//     marginBottom: '0.25rem'
//   },
//   infoDescription: {
//     fontSize: '0.8rem',
//     color: '#94a3b8',
//     lineHeight: '1.4'
//   },
//   emptyBedStatus: {
//     background: '#fee2e2',
//     borderColor: '#fecaca'
//   },
//   lowBedStatus: {
//     background: '#fffbeb',
//     borderColor: '#fde68a'
//   },
//   errorMessage: {
//     backgroundColor: '#fee2e2',
//     color: '#dc2626',
//     padding: '1rem',
//     borderRadius: '8px',
//     marginBottom: '1rem',
//     textAlign: 'center',
//     border: '1px solid #fecaca'
//   },
//   loadingOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 9999
//   },
//   loadingSpinner: {
//     width: '50px',
//     height: '50px',
//     border: '4px solid rgba(255, 255, 255, 0.3)',
//     borderRadius: '50%',
//     borderTopColor: '#ffffff',
//     animation: 'spin 1s linear infinite'
//   }
// };

// const globalStyles = `
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
//   .action-button:hover {
//     background-color: #1d4ed8 !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3) !important;
//   }
//   .delete-button:hover {
//     background: #fee2e2 !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2) !important;
//   }
//   .delete-button:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none !important;
//   }
// /* ===== GLOBAL PREMIUM BLUE HOVER EFFECT ===== */

// .ui-hover {
//   transition:
//     padding 0.35s ease,
//     border-color 0.3s ease,
//     box-shadow 0.35s ease,
//     transform 0.35s ease,
//     background 0.35s ease,
//     color 0.35s ease;
// }

// .ui-hover:hover {
//   background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
//   border-color: #2563eb !important;

//   /* Width + lift effect */
//   // padding: calc(1em + 0.35rem);
//   transform: translateY(-8px) scaleX(1.06) scaleY(1.04);

//   /* Blue premium shadow */
//   box-shadow:
//     inset 0 0 30px rgba(255, 255, 255, 0.18),
//     0 0 0 6px rgba(37, 99, 235, 0.45),
//     0 22px 55px rgba(37, 99, 235, 0.55);
// }

// /* Text color fix on hover */
// .ui-hover:hover * {
//   color: #ffffff !important;
// }











// `;

// if (typeof document !== 'undefined') {
//   const styleElement = document.createElement('style');
//   styleElement.textContent = globalStyles;
//   document.head.appendChild(styleElement);
// }

// function HospitalDetails({ hospital, user }) {
//   const navigate = useNavigate();
//   const [deleting, setDeleting] = useState(false);
//   const [error, setError] = useState('');

//   // Check if user is the owner - handle both populated and non-populated createdBy
//   const isOwner = user && hospital.createdBy && (
//     (typeof hospital.createdBy === 'object' && hospital.createdBy._id === user.id) ||
//     (typeof hospital.createdBy === 'string' && hospital.createdBy === user.id) ||
//     hospital.createdBy.toString() === user.id
//   );

//   console.log('User:', user);
//   console.log('Hospital createdBy:', hospital.createdBy);
//   console.log('Is Owner:', isOwner);

//   const deleteHospital = async () => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete "${hospital.name}"?\n\nThis action cannot be undone and will remove the hospital from the network.`
//     );
    
//     if (!confirmDelete) return;

//     setDeleting(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('Please login to delete hospital');
//         setDeleting(false);
//         navigate('/login');
//         return;
//       }

//       console.log('Deleting hospital:', hospital._id);
//       console.log('Using token:', token.substring(0, 20) + '...');

//       const response = await axios.delete(
//         `http://localhost:5000/api/hospitals/${hospital._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log('Delete response:', response.data);
      
//       alert('Hospital deleted successfully!');
//       navigate('/landing');
//     } catch (err) {
//       console.error('Delete error:', err);
//       console.error('Error response:', err.response?.data);
      
//       const errorMsg = err.response?.data?.message || 
//                       err.response?.data?.error || 
//                       'Failed to delete hospital. Please try again.';
      
//       setError(errorMsg);
//       alert(errorMsg);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const addDept = () => {
//     navigate(`/add-department/${hospital._id}`);
//   };

//   const bedAvailability = hospital.bedAvailability || 0;
//   const totalCapacity = bedAvailability + 50;
//   const occupancyRate = Math.min(100, Math.floor((totalCapacity - bedAvailability) / totalCapacity * 100));
//   const departmentCount = hospital.departments?.length || 0;
//   const staffCount = Math.floor((bedAvailability || 0) * 2.5);

//   const getBedStatusStyle = (bedCount) => {
//     if (bedCount === 0) return styles.emptyBedStatus;
//     if (bedCount <= 10) return styles.lowBedStatus;
//     return {};
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {deleting && (
//         <div style={styles.loadingOverlay}>
//           <div style={styles.loadingSpinner}></div>
//         </div>
//       )}

//       <div style={styles.header}>
//         <div style={styles.titleContainer}>
//           <div>
//             <h1 style={styles.title}>{hospital.name}</h1>
//           </div>
//         </div>
        
//         {isOwner && (
//           <div style={styles.buttonGroup}>
//             <button 
//               onClick={addDept} 
//               style={styles.actionButton}
//               className="action-button"
//               disabled={deleting}
//             >
//               ➕ Add Department
//             </button>
//             <button 
//               onClick={deleteHospital} 
//               style={styles.deleteButton}
//               className="delete-button"
//               disabled={deleting}
//             >
//               {deleting ? '🔄 Deleting...' : '🗑️ Delete Hospital'}
//             </button>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div style={styles.errorMessage}>
//           ⚠️ {error}
//         </div>
//       )}

//       <div style={styles.content}>
//         <div style={styles.imageSection}>
//           <div style={styles.imageContainer} className="ui-hover">
//             <img
//               src={hospital.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
//               alt={hospital.name}
//               style={styles.hospitalImage}
//               onError={(e) => {
//                 e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
//               }}
//             />
//             <div style={styles.imageBadge}>
//               {hospital.status === 'active' ? '✓ Active' : hospital.status || 'Active'}
//             </div>
//           </div>

//           <div style={styles.statsGrid} className="stats-grid-hover">
//             <div style={styles.statCard} className="stat-card ui-hover">
//               <div style={styles.statValue} >24/7</div>
//               <div style={styles.statLabel}>Service Hours</div>
//             </div>
//             <div style={styles.statCard} className="stat-card ui-hover">
//               <div style={styles.statValue}>{occupancyRate}%</div>
//               <div style={styles.statLabel}>Bed Occupancy</div>
//             </div>
//             <div style={styles.statCard} className="stat-card ui-hover">
//               <div style={styles.statValue}>A+</div>
//               <div style={styles.statLabel}>Safety Rating</div>
//             </div>
//           </div>
//         </div>

//         <div style={styles.infoSection}>
//           <div style={{...styles.addressCard, ...styles.addressCardBlue}}className="ui-hover">
//             <div style={styles.addressTitle}>
//               📍 Location Information
//             </div>
//             <div style={styles.addressContent}>
//               <div style={styles.addressLine}>
//                 <span style={styles.addressLabel}>City:</span>
//                 <span>{hospital.address?.city || 'Not specified'}</span>
//               </div>
//               <div style={styles.addressLine}>
//                 <span style={styles.addressLabel}>State:</span>
//                 <span>{hospital.address?.state || 'Not specified'}</span>
//               </div>
//               <div style={styles.addressLine}>
//                 <span style={styles.addressLabel}>Pincode:</span>
//                 <span>{hospital.address?.pincode || 'Not specified'}</span>
//               </div>
//               <div style={styles.addressLine}>
//                 <span style={styles.addressLabel}>Type:</span>
//                 <span>{hospital.type || 'General Hospital'}</span>
//               </div>
//             </div>
//           </div>

//           <div style={{
//             ...styles.bedCard,
//             ...getBedStatusStyle(bedAvailability)
//           }}  className="ui-hover">
//             <div style={styles.bedInfo}>
//               <div style={styles.bedLabel}>Available Beds</div>
//               <div style={styles.bedCount}>{bedAvailability}</div>
//               <div style={styles.bedCapacity}>
//                 Total Capacity: {totalCapacity}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={styles.additionalInfo}>
//         <div style={styles.sectionTitle}>
//           Hospital Overview
//         </div>
//         <div style={styles.infoGrid}>
//           <div style={styles.infoItem} className="ui-hover">
//             <div style={styles.infoLabel}>Department Count</div>
//             <div style={styles.infoValue}>{departmentCount}</div>
//             <div style={styles.infoDescription}>
//               Specialized departments available
//             </div>
//           </div>

//           <div style={styles.infoItem} className="ui-hover">
//             <div style={styles.infoLabel}>Medical Staff</div>
//             <div style={styles.infoValue}>{staffCount}+</div>
//             <div style={styles.infoDescription}>
//               Doctors, nurses, and specialists
//             </div>
//           </div>

//           <div style={styles.infoItem} className="ui-hover">
//             <div style={styles.infoLabel}>Established</div>
//             <div style={styles.infoValue}>2015</div>
//             <div style={styles.infoDescription}>
//               Years in operation
//             </div>
//           </div>

//           <div style={styles.infoItem} className="ui-hover">
//             <div style={styles.infoLabel}>Accreditations</div>
//             <div style={styles.infoValue}>JCI, ISO</div>
//             <div style={styles.infoDescription}>
//               International certifications
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HospitalDetails;

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const HospitalDetails = ({ hospital, user }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const isOwner = user && hospital.createdBy && (
    (typeof hospital.createdBy === 'object' && hospital.createdBy._id === user.id) ||
    (typeof hospital.createdBy === 'string' && hospital.createdBy === user.id) ||
    hospital.createdBy.toString() === user.id
  );

  const deleteHospital = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${hospital.name}"?\n\nThis action cannot be undone and will remove the hospital from the network.`
    );
    
    if (!confirmDelete) return;

    setDeleting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to delete hospital');
        setDeleting(false);
        navigate('/login');
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/hospitals/${hospital._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Hospital deleted successfully!');
      navigate('/landing');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      'Failed to delete hospital. Please try again.';
      
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setDeleting(false);
    }
  };

  const addDept = () => {
    navigate(`/add-department/${hospital._id}`);
  };

  const bedAvailability = hospital.bedAvailability || 0;
  const totalCapacity = bedAvailability + 50;
  const occupancyRate = Math.min(100, Math.floor((totalCapacity - bedAvailability) / totalCapacity * 100));
  const departmentCount = hospital.departments?.length || 0;
  const staffCount = Math.floor((bedAvailability || 0) * 2.5);

  const getBedStatusStyle = (bedCount) => {
    if (bedCount === 0) return styles.emptyBedStatus;
    if (bedCount <= 10) return styles.lowBedStatus;
    return {};
  };

  return (
    <div style={styles.pageContainer}>
      {deleting && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingSpinner}></div>
        </div>
      )}

      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>{hospital.name}</h1>
        </div>
        
        {isOwner && (
          <div style={styles.buttonGroup}>
            <button 
              onClick={addDept} 
              style={styles.actionButton}
              className="action-button"
              disabled={deleting}
            >
              ➕ Add Department
            </button>
            <button 
              onClick={deleteHospital} 
              style={styles.deleteButton}
              className="delete-button"
              disabled={deleting}
            >
              {deleting ? '🔄 Deleting...' : '🗑️ Delete Hospital'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div style={styles.errorMessage}>
          ⚠️ {error}
        </div>
      )}

      <div style={styles.content}>
        <div style={styles.imageSection}>
          <div style={styles.imageContainer} className="ui-hover">
            <img
              src={hospital.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={hospital.name}
              style={styles.hospitalImage}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div style={styles.imageBadge}>
              {hospital.status === 'active' ? '✓ Active' : hospital.status || 'Active'}
            </div>
          </div>

          <div style={styles.statsGrid} className="stats-grid-hover">
            <div style={styles.statCard} className="stat-card ui-hover">
              <div style={styles.statValue}>24/7</div>
              <div style={styles.statLabel}>Service Hours</div>
            </div>
            <div style={styles.statCard} className="stat-card ui-hover">
              <div style={styles.statValue}>{occupancyRate}%</div>
              <div style={styles.statLabel}>Bed Occupancy</div>
            </div>
            <div style={styles.statCard} className="stat-card ui-hover">
              <div style={styles.statValue}>A+</div>
              <div style={styles.statLabel}>Safety Rating</div>
            </div>
          </div>
        </div>

        <div style={styles.infoSection}>
          <div style={{...styles.addressCard, ...styles.addressCardBlue}} className="ui-hover">
            <div style={styles.addressTitle}>
              📍 Location Information
            </div>
            <div style={styles.addressContent}>
              <div style={styles.addressLine}>
                <span style={styles.addressLabel}>City:</span>
                <span>{hospital.address?.city || 'Not specified'}</span>
              </div>
              <div style={styles.addressLine}>
                <span style={styles.addressLabel}>State:</span>
                <span>{hospital.address?.state || 'Not specified'}</span>
              </div>
              <div style={styles.addressLine}>
                <span style={styles.addressLabel}>Pincode:</span>
                <span>{hospital.address?.pincode || 'Not specified'}</span>
              </div>
              <div style={styles.addressLine}>
                <span style={styles.addressLabel}>Type:</span>
                <span>{hospital.type || 'General Hospital'}</span>
              </div>
            </div>
          </div>

          <div style={{
            ...styles.bedCard,
            ...getBedStatusStyle(bedAvailability)
          }} className="ui-hover">
            <div style={styles.bedInfo}>
              <div style={styles.bedLabel}>Available Beds</div>
              <div style={styles.bedCount}>{bedAvailability}</div>
              <div style={styles.bedCapacity}>
                Total Capacity: {totalCapacity}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.additionalInfo}>
        <div style={styles.sectionTitle}>
          Hospital Overview
        </div>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem} className="ui-hover">
            <div style={styles.infoLabel}>Department Count</div>
            <div style={styles.infoValue}>{departmentCount}</div>
            <div style={styles.infoDescription}>
              Specialized departments available
            </div>
          </div>

          <div style={styles.infoItem} className="ui-hover">
            <div style={styles.infoLabel}>Medical Staff</div>
            <div style={styles.infoValue}>{staffCount}+</div>
            <div style={styles.infoDescription}>
              Doctors, nurses, and specialists
            </div>
          </div>

          <div style={styles.infoItem} className="ui-hover">
            <div style={styles.infoLabel}>Established</div>
            <div style={styles.infoValue}>2015</div>
            <div style={styles.infoDescription}>
              Years in operation
            </div>
          </div>

          <div style={styles.infoItem} className="ui-hover">
            <div style={styles.infoLabel}>Accreditations</div>
            <div style={styles.infoValue}>JCI, ISO</div>
            <div style={styles.infoDescription}>
              International certifications
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    padding: '6rem 2rem 4rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #e2e8f0',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  actionButton: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.85rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
  },
  deleteButton: {
    background: '#ffffff',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '0.85rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem',
    animation: 'fadeIn 0.6s ease-out'
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    height: '320px'
  },
  hospitalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.6s ease'
  },
  imageBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#ffffff',
    color: '#16a34a',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #dcfce7'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    color: '#2563eb',
    gap: '1.5rem'
  },
  addressCard: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  },
  addressTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  addressContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  addressLine: {
    fontSize: '1rem',
    color: '#475569',
    display: 'flex',
    gap: '0.75rem'
  },
  addressLabel: {
    color: '#64748b',
    fontWeight: '600',
    minWidth: '70px'
  },
  bedCard: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #dbeafe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
  },
  addressCardBlue: {
  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #dbeafe',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
  transition: 'all 0.3s ease'
}
,
  bedInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  bedLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  bedCount: {
    fontSize: '2.8rem',
    fontWeight: '700',
    color: '#2563eb'
  },
  bedCapacity: {
    fontSize: '0.9rem',
    color: '#64748b'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  statCard: {
    background: '#ffffff',
    padding: '1.25rem',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '0.25rem'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  additionalInfo: {
    marginTop: '3rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#0f172a',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e2e8f0'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem'
  },
  infoItem: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  infoValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.25rem'
  },
  infoDescription: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    lineHeight: '1.4'
  },
  emptyBedStatus: {
    background: '#fee2e2',
    borderColor: '#fecaca'
  },
  lowBedStatus: {
    background: '#fffbeb',
    borderColor: '#fde68a'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid #fecaca'
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s linear infinite'
  }
};

const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Zoom in effect on hospital image */
  .ui-hover:hover .hospitalImage {
    transform: scale(1.12);
  }

  /* Blue background with white text on hover for all cards */
  .ui-hover:hover {
    background: #2563eb !important;
    color: white !important;
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.4);
  }

  .ui-hover:hover * {
    color: white !important;
  }

  .ui-hover:hover .addressLabel,
  .ui-hover:hover .bedLabel,
  .ui-hover:hover .statLabel,
  .ui-hover:hover .infoLabel {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .ui-hover:hover .bedCount {
    color: white !important;
  }

  .action-button:hover {
    background-color: #1d4ed8 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3) !important;
  }
  .delete-button:hover {
    background: #fee2e2 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2) !important;
  }
  .delete-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

export default HospitalDetails;