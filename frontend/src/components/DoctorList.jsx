// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";




// const styles = {
//   container: {
//     background: '#ffffff',
//     padding: '2.5rem',
//     borderRadius: '16px',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
//     marginBottom: '2rem'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     gap: '1rem',
//      padding: '1rem 1.5rem',
//   borderRadius: '12px',
//   background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
//   boxShadow: '0 6px 20px rgba(37, 99, 235, 0.1)',
//   transition: 'all 0.3s ease'
//   },
//   title: {
//     fontSize: '1.8rem',
//     fontWeight: '700',
//     color: '#0f172a',
//     margin: 0,
//     letterSpacing: '-0.025em',
//     background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   transition: 'all 0.3s ease'
//   },
//   addButton: {
//     background: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     padding: '0.85rem 1.5rem',
//     borderRadius: '10px',
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
//     width: '100%',
//     background: '#ffffff',
//     color: '#dc2626',
//     border: '1px solid #fecaca',
//     padding: '0.75rem',
//     borderRadius: '10px',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.5rem',
//     marginTop: '1rem',
//     boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)'
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//     gap: '1.5rem',
//     padding: '1rem 0'
//   },
//   card: {
//     background: '#ffffff',
//     borderRadius: '12px',
//     overflow: 'hidden',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//     transition: 'all 0.3s ease',
//     cursor: 'pointer',
//     position: 'relative'
//   },
//   cardImageContainer: {
//     width: '100%',
//     height: '180px',
//     overflow: 'hidden',
//     position: 'relative'
//   },
//   cardImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 0.3s ease'
//   },
//   cardContent: {
//     padding: '1.5rem',
//     position: 'relative'
//   },
//   doctorName: {
//     fontSize: '1.3rem',
//     fontWeight: '700',
//     marginBottom: '0.5rem',
//     color: '#0f172a',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   specialization: {
//     display: 'inline-block',
//     background: '#f0f9ff',
//     color: '#2563eb',
//     padding: '0.4rem 0.8rem',
//     borderRadius: '12px',
//     fontSize: '0.85rem',
//     fontWeight: '600',
//     marginBottom: '1rem',
//     border: '1px solid #dbeafe'
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '1rem',
//     marginBottom: '1.5rem'
//   },
//   infoItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.25rem'
//   },
//   infoLabel: {
//     fontSize: '0.8rem',
//     color: '#64748b',
//     fontWeight: '600'
//   },
//   infoValue: {
//     fontSize: '0.95rem',
//     fontWeight: '700',
//     color: '#0f172a'
//   },
//   queueBadge: {
//     position: 'absolute',
//     top: '1rem',
//     right: '1rem',
//     background: '#ffffff',
//     color: '#dc2626',
//     padding: '0.4rem 0.8rem',
//     borderRadius: '12px',
//     fontSize: '0.85rem',
//     fontWeight: '700',
//     border: '1px solid #fecaca',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
//   },
//   workingHours: {
//     background: '#f0fdf4',
//     color: '#16a34a',
//     padding: '0.75rem',
//     borderRadius: '10px',
//     marginBottom: '1rem',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: '0.9rem',
//     border: '1px solid #dcfce7',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.5rem'
//   },
//   statusIndicator: {
//     display: 'inline-block',
//     padding: '0.25rem 0.75rem',
//     borderRadius: '20px',
//     fontSize: '0.7rem',
//     fontWeight: '600',
//     marginLeft: '0.5rem'
//   },
//   availableStatus: {
//     background: '#f0fdf4',
//     color: '#16a34a',
//     border: '1px solid #dcfce7'
//   },
//   busyStatus: {
//     background: '#fffbeb',
//     color: '#d97706',
//     border: '1px solid #fde68a'
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: '3rem 2rem',
//     color: '#64748b',
//     fontSize: '1rem',
//     background: '#f8fafc',
//     borderRadius: '12px',
//     border: '1px solid #e2e8f0'
//   },
//   errorMessage: {
//     backgroundColor: '#fee2e2',
//     color: '#dc2626',
//     padding: '1rem',
//     borderRadius: '8px',
//     marginBottom: '1rem',
//     textAlign: 'center',
//     border: '1px solid #fecaca'
//   }
// };

// const globalStyles = `


//   .add-doctor-button {
//   transition: all 0.3s ease;
// }

// .add-doctor-button:hover {
//   background: linear-gradient(135deg, #1d4ed8, #2563eb) !important;
//   transform: translateY(-3px) scale(1.03);
//   box-shadow: 0 12px 28px rgba(37, 99, 235, 0.35) !important;
// }

// /* =========================
//    HEADER HOVER EFFECT
// ========================= */
// .header {
//   transition: all 0.3s ease;
// }

// .header:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 14px 35px rgba(37, 99, 235, 0.15);
// }

// /* =========================
//    OPTIONAL: TITLE SMOOTH EFFECT
// ========================= */
// .header h2 {
//   transition: all 0.3s ease;
// }

// .header:hover h2 {
//   letter-spacing: 0.3px;
// }

// /* =========================
//    DELETE BUTTON (Already Used)
// ========================= */
// .delete-doctor-button:hover {
//   background: #fee2e2 !important;
//   transform: translateY(-2px) !important;
//   box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2) !important;
// }

// .delete-doctor-button:disabled {
//   opacity: 0.5;
//   cursor: not-allowed;
//   transform: none !important;
// }

// /* =========================
//    DOCTOR CARD HOVER
// ========================= */
// .doctor-card:hover {
//   transform: translateY(-6px);
//   box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
//   border-color: #c7d2fe;
// }

// .doctor-card:hover .card-image {
//   transform: scale(1.07);
// }
// `;

// if (typeof document !== 'undefined') {
//   const styleElement = document.createElement('style');
//   styleElement.textContent = globalStyles;
//   document.head.appendChild(styleElement);
// }

// function DoctorList({ departmentId, onSelect, hospital, user }) {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Check if current user is the hospital owner
//   const isHospitalOwner = user && hospital && hospital.createdBy && (
//     (typeof hospital.createdBy === 'object' && hospital.createdBy._id === user.id) ||
//     (typeof hospital.createdBy === 'string' && hospital.createdBy === user.id) ||
//     hospital.createdBy.toString() === user.id
//   );

//   console.log('DoctorList - User:', user);
//   console.log('DoctorList - Hospital:', hospital);
//   console.log('DoctorList - Hospital createdBy:', hospital?.createdBy);
//   console.log('DoctorList - Is Hospital Owner:', isHospitalOwner);

//   const addDoctor = () => {
//     navigate(`/add-doctor/${departmentId}`);
//   };

//   const deleteDoctor = async (doctorId, e) => {
//     e.stopPropagation();
    
//     if (!doctorId) return;
    
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this doctor?\n\nThis will remove them from the department and cancel all their appointments."
//     );
    
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         setError('Please login to delete doctor');
//         navigate('/login');
//         return;
//       }

//       console.log('Deleting doctor:', doctorId);

//       const response = await axios.delete(
//         `http://localhost:5000/api/doctors/${doctorId}`, 
//         {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log('Delete response:', response.data);
      
//       setDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
//       alert('Doctor deleted successfully!');
//     } catch (err) {
//       console.error('Delete doctor error:', err);
//       console.error('Error response:', err.response?.data);
      
//       const errorMsg = err.response?.data?.message || 
//                       err.response?.data?.error || 
//                       'Failed to delete doctor';
      
//       setError(errorMsg);
//       alert(errorMsg);
//     }
//   };

//   useEffect(() => {
//     if (!departmentId) return;
    
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         setError('');
        
//         const res = await axios.get(
//           `http://localhost:5000/api/doctors/department/${departmentId}`
//         );
        
//         const enhancedDoctors = res.data.map(doctor => ({
//           ...doctor,
//           experience: doctor.experience || Math.floor(Math.random() * 23) + 2,
//           queue: doctor.queue || Array(Math.floor(Math.random() * 9)).fill(null),
//           workingHours: doctor.workingHours || {
//             start: "08:00",
//             end: "16:00"
//           },
//           specialization: doctor.specialization || "General Practitioner"
//         }));
        
//         setDoctors(enhancedDoctors);
//       } catch (err) {
//         console.error('Fetch doctors error:', err);
//         setError('Failed to load doctors');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchDoctors();
//   }, [departmentId]);

//   const getDoctorStatus = (doctor) => {
//     const queueCount = doctor.queue?.length || 0;
//     if (queueCount === 0) return { text: 'Available', style: styles.availableStatus };
//     if (queueCount <= 3) return { text: 'Busy', style: styles.busyStatus };
//     return { text: 'Available', style: styles.availableStatus };
//   };

//   const getDoctorImage = (doctor) => {
//     if (doctor.photo) return doctor.photo;
    
//     const defaultImages = [
//       'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//       'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//       'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
//     ];
    
//     const hash = doctor._id ? 
//       doctor._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    
//     return defaultImages[hash % defaultImages.length];
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header} className="header">
//         <h2 style={styles.title}>Medical Doctors</h2>
//         {isHospitalOwner && (
//           <button 
//             onClick={addDoctor} 
//             style={styles.addButton}
//             className="add-doctor-button"
//           >
//             ➕ Add Doctor
//           </button>
//         )}
//       </div>

//       {error && (
//         <div style={styles.errorMessage}>
//           ⚠️ {error}
//         </div>
//       )}

//       {loading ? (
//         <div style={styles.emptyState}>
//           <p>Loading doctors...</p>
//         </div>
//       ) : doctors.length === 0 ? (
//         <div style={styles.emptyState}>
//           <p>No doctors found in this department. {isHospitalOwner ? 'Add the first one!' : ''}</p>
//         </div>
//       ) : (
//         <div style={styles.grid}>
//           {doctors.map((doctor) => {
//             const status = getDoctorStatus(doctor);
//             return (
//               <div 
//                 key={doctor._id} 
//                 style={styles.card} 
//                 className="doctor-card"
//                 onClick={() => onSelect && onSelect(doctor)}
//               >
//                 {doctor.queue?.length > 0 && (
//                   <div style={styles.queueBadge}>
//                     🏥 Queue: {doctor.queue?.length || 0}
//                   </div>
//                 )}
                
//                 <div style={styles.cardImageContainer}>
//                   <img
//                     src={getDoctorImage(doctor)}
//                     alt={doctor.name}
//                     style={styles.cardImage}
//                     className="card-image"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
//                     }}
//                   />
//                 </div>
                
//                 <div style={styles.cardContent}>
//                   <h3 style={styles.doctorName}>
//                     {doctor.name}
//                     <span style={{ ...styles.statusIndicator, ...status.style }}>
//                       {status.text}
//                     </span>
//                   </h3>
//                   <span style={styles.specialization}>
//                     🩺 {doctor.specialization}
//                   </span>
                  
//                   {doctor.workingHours?.start && (
//                     <div style={styles.workingHours}>
//                       🕐 {doctor.workingHours.start} - {doctor.workingHours.end}
//                     </div>
//                   )}
                  
//                   <div style={styles.infoGrid}>
//                     <div style={styles.infoItem}>
//                       <span style={styles.infoLabel}>Experience</span>
//                       <span style={styles.infoValue}>
//                         {doctor.experience} years
//                       </span>
//                     </div>
//                     <div style={styles.infoItem}>
//                       <span style={styles.infoLabel}>Queue</span>
//                       <span style={styles.infoValue}>
//                         {doctor.queue?.length || 0} patients
//                       </span>
//                     </div>
//                   </div>
                  
//                   {isHospitalOwner && (
//                     <button
//                       onClick={(e) => deleteDoctor(doctor._id, e)}
//                       style={styles.deleteButton}
//                       className="delete-doctor-button"
//                     >
//                       🗑️ Delete Doctor
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DoctorList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ departmentId, onSelect, hospital, user }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isHospitalOwner = user && hospital && hospital.createdBy && (
    (typeof hospital.createdBy === 'object' && hospital.createdBy._id === user.id) ||
    (typeof hospital.createdBy === 'string' && hospital.createdBy === user.id) ||
    hospital.createdBy.toString() === user.id
  );

  const addDoctor = () => {
    navigate(`/add-doctor/${departmentId}`);
  };

  const deleteDoctor = async (doctorId, e) => {
    e.stopPropagation();
    
    if (!doctorId) return;
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?\n\nThis will remove them from the department and cancel all their appointments."
    );
    
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError('Please login to delete doctor');
        navigate('/login');
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/doctors/${doctorId}`, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
      alert('Doctor deleted successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      'Failed to delete doctor';
      
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  useEffect(() => {
    if (!departmentId) return;
    
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError('');
        
        const res = await axios.get(
          `http://localhost:5000/api/doctors/department/${departmentId}`
        );
        
        const enhancedDoctors = res.data.map(doctor => ({
          ...doctor,
          experience: doctor.experience || Math.floor(Math.random() * 23) + 2,
          queue: doctor.queue || Array(Math.floor(Math.random() * 9)).fill(null),
          workingHours: doctor.workingHours || {
            start: "08:00",
            end: "16:00"
          },
          specialization: doctor.specialization || "General Practitioner"
        }));
        
        setDoctors(enhancedDoctors);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, [departmentId]);

  const getDoctorStatus = (doctor) => {
    const queueCount = doctor.queue?.length || 0;
    if (queueCount === 0) return { text: 'Available', style: styles.availableStatus };
    if (queueCount <= 3) return { text: 'Busy', style: styles.busyStatus };
    return { text: 'Available', style: styles.availableStatus };
  };

  const getDoctorImage = (doctor) => {
    if (doctor.photo) return doctor.photo;
    
    const defaultImages = [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    
    const hash = doctor._id ? 
      doctor._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    
    return defaultImages[hash % defaultImages.length];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header} className="header">
        <h2 style={styles.title}>Medical Doctors</h2>
        {isHospitalOwner && (
          <button 
            onClick={addDoctor} 
            style={styles.addButton}
            className="add-doctor-button"
          >
            ➕ Add Doctor
          </button>
        )}
      </div>

      {error && (
        <div style={styles.errorMessage}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={styles.emptyState}>
          <p>Loading doctors...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No doctors found in this department. {isHospitalOwner ? 'Add the first one!' : ''}</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {doctors.map((doctor) => {
            const status = getDoctorStatus(doctor);
            return (
              <div 
                key={doctor._id} 
                style={styles.card} 
                className="doctor-card"
                onClick={() => onSelect && onSelect(doctor)}
              >
                {doctor.queue?.length > 0 && (
                  <div style={styles.queueBadge}>
                    🏥 Queue: {doctor.queue?.length || 0}
                  </div>
                )}
                
                <div style={styles.cardImageContainer}>
                  <img
                    src={getDoctorImage(doctor)}
                    alt={doctor.name}
                    style={styles.cardImage}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>
                
                <div style={styles.cardContent}>
                  <h3 style={styles.doctorName}>
                    {doctor.name}
                    <span style={{ ...styles.statusIndicator, ...status.style }}>
                      {status.text}
                    </span>
                  </h3>
                  <span style={styles.specialization}>
                    🩺 {doctor.specialization}
                  </span>
                  
                  {doctor.workingHours?.start && (
                    <div style={styles.workingHours}>
                      🕐 {doctor.workingHours.start} - {doctor.workingHours.end}
                    </div>
                  )}
                  
                  <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Experience</span>
                      <span style={styles.infoValue}>
                        {doctor.experience} years
                      </span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Queue</span>
                      <span style={styles.infoValue}>
                        {doctor.queue?.length || 0} patients
                      </span>
                    </div>
                  </div>
                  
                  {isHospitalOwner && (
                    <button
                      onClick={(e) => deleteDoctor(doctor._id, e)}
                      style={styles.deleteButton}
                      className="delete-doctor-button"
                    >
                      🗑️ Delete Doctor
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.1)',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em',
    background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'all 0.3s ease'
  },
  addButton: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.85rem 1.5rem',
    borderRadius: '10px',
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
    width: '100%',
    background: '#ffffff',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '0.75rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0'
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative'
  },
  cardImageContainer: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  cardContent: {
    padding: '1.5rem',
    position: 'relative'
  },
  doctorName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  specialization: {
    display: 'inline-block',
    background: '#f0f9ff',
    color: '#2563eb',
    padding: '0.4rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1rem',
    border: '1px solid #dbeafe'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  infoLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    fontWeight: '600'
  },
  infoValue: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  queueBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#ffffff',
    color: '#dc2626',
    padding: '0.4rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '700',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  workingHours: {
    background: '#f0fdf4',
    color: '#16a34a',
    padding: '0.75rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '0.9rem',
    border: '1px solid #dcfce7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  statusIndicator: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '600',
    marginLeft: '0.5rem'
  },
  availableStatus: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #dcfce7'
  },
  busyStatus: {
    background: '#fffbeb',
    color: '#d97706',
    border: '1px solid #fde68a'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: '#64748b',
    fontSize: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid #fecaca'
  }
};

const globalStyles = `
  /* Add Doctor Button - Premium Hover */
  .add-doctor-button {
    transition: all 0.3s ease;
  }

  .add-doctor-button:hover {
    background: linear-gradient(135deg, #1d4ed8, #2563eb) !important;
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 15px 35px rgba(37, 99, 235, 0.4) !important;
  }

  /* Header Hover Lift */
  .header {
    transition: all 0.4s ease;
  }

  .header:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.15);
  }

  /* Doctor Card - Attractive Hover */
  .doctor-card {
    transition: all 0.4s ease;
  }

  .doctor-card:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 25px 50px rgba(37, 99, 235, 0.2);
    border-color: #93c5fd;
  }

  .doctor-card:hover .card-image {
    transform: scale(1.12);
  }

  .doctor-card:hover .doctor-name {
    color: #2563eb;
  }

  .doctor-card:hover .specialization {
    background: #dbeafe;
    transform: scale(1.05);
  }

  /* Delete Button Hover */
  .delete-doctor-button:hover {
    background: #fee2e2 !important;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(220, 38, 38, 0.25) !important;
  }

  .delete-doctor-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Queue Badge Pulse for attention */
  .queue-badge {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

export default DoctorList;