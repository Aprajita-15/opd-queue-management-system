import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  pageContainer: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem',
    borderRadius: '16px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    minHeight: '100vh',
    animation: '$fadeIn 0.6s ease-out'
  },

  doctorHeader: {
    background: '#ffffff',
    color: '#1e293b',
    padding: '3rem 2rem',
    borderRadius: '16px',
    marginBottom: '2rem',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    overflow: 'hidden'
  },
  
  doctorProfile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  
  doctorImageContainer: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '4px solid #2563eb',
    padding: '4px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    position: 'relative',
    animation: '$float 6s ease-in-out infinite, $fadeInUp 0.8s ease-out 0.2s both',
    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.25)',
    overflow: 'hidden'
  },
  
  doctorImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease'
  },
  
  doctorInfo: {
    textAlign: 'center',
    animation: '$fadeInUp 0.8s ease-out 0.4s both'
  },
  
  doctorName: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#0f172a',
    position: 'relative'
  },
  
  specialization: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#2563eb',
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    display: 'inline-block',
    background: '#f0f9ff',
    border: '1px solid #dbeafe',
    marginBottom: '1rem'
  },
  
  doctorContact: {
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
    position: 'relative',
    animation: '$fadeInUp 0.8s ease-out 0.6s both'
  },
  
  statCard: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      borderColor: '#cbd5e1'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #2563eb, #3b82f6)'
    }
  },
  
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  
  statLabel: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '600'
  },
  
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    marginTop: '2rem'
  },
  
  queueSection: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    animation: '$slideInLeft 0.8s ease-out'
  },
  
  formSection: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    animation: '$slideInRight 0.8s ease-out'
  },
  
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#0f172a',
    paddingBottom: '1rem',
    borderBottom: '2px solid #2563eb',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    '&::before': {
      content: '"📋"',
      fontSize: '1.5rem'
    }
  },
  
  queueList: {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '1rem'
  },
  
  queueItem: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid #2563eb',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    animation: '$fadeInItem 0.5s ease-out',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateX(5px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      borderColor: '#cbd5e1',
      '&::before': {
        width: '100%'
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '0%',
      height: '100%',
      background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.05), transparent)',
      transition: 'width 0.3s ease',
      zIndex: 0
    }
  },
  
  queuePosition: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    minWidth: '50px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    background: '#f0f9ff',
    borderRadius: '8px',
    padding: '0.5rem',
    border: '1px solid #dbeafe'
  },
  
  patientInfo: {
    flex: 1,
    margin: '0 1.5rem',
    position: 'relative',
    zIndex: 1
  },
  
  patientName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  
  patientDetails: {
    fontSize: '0.9rem',
    color: '#64748b',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem'
  },
  
  waitTime: {
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    color: '#dc2626',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '0.9rem',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    zIndex: 1,
    animation: '$pulse 2s infinite'
  },
  
  leaveButton: {
    background: '#ffffff',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      background: '#fee2e2',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
    }
  },
  
  joinForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    animation: '$fadeInUp 0.5s ease-out'
  },
  
  formLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#475569',
    marginLeft: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  
  formInput: {
    padding: '1rem 1.2rem',
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
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)',
      transform: 'translateY(-2px)'
    },
    '&::placeholder': {
      color: '#94a3b8'
    }
  },
  
  textarea: {
    padding: '1rem 1.2rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'all 0.2s ease',
    outline: 'none',
    background: '#ffffff',
    color: '#1e293b',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)',
      transform: 'translateY(-2px)'
    }
  },
  
  joinButton: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
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
    marginTop: '1rem',
    position: 'relative',
    overflow: 'hidden',
    animation: '$fadeInUp 0.5s ease-out 0.8s both',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
      '&::before': {
        transform: 'translateX(100%)'
      }
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'transform 0.6s ease'
    }
  },
  
  emptyQueue: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: '#64748b',
    fontSize: '1.1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    animation: '$fadeIn 0.5s ease-out'
  },
  
  emptyQueueIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: '0.5'
  },
  
  symptomsText: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#475569',
    background: '#f8fafc',
    padding: '0.75rem',
    borderRadius: '8px',
    borderLeft: '3px solid #2563eb'
  },
  
  '@keyframes fadeIn': {
    from: { 
      opacity: 0, 
      transform: 'translateY(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    }
  },
  
  '@keyframes fadeInUp': {
    from: { 
      opacity: 0, 
      transform: 'translateY(30px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    }
  },
  
  '@keyframes slideInLeft': {
    from: { 
      opacity: 0, 
      transform: 'translateX(-50px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    }
  },
  
  '@keyframes slideInRight': {
    from: { 
      opacity: 0, 
      transform: 'translateX(50px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    }
  },
  
  '@keyframes float': {
    '0%, 100%': { 
      transform: 'translateY(0)' 
    },
    '50%': { 
      transform: 'translateY(-10px)' 
    }
  },
  
  '@keyframes pulse': {
    '0%, 100%': { 
      opacity: 1 
    },
    '50%': { 
      opacity: 0.7 
    }
  },
  
  '@keyframes fadeInItem': {
    from: { 
      opacity: 0, 
      transform: 'scale(0.95)' 
    },
    to: { 
      opacity: 1, 
      transform: 'scale(1)' 
    }
  }
};

function DoctorQueue({ doctor, token }) {
  const [queue, setQueue] = useState([]);
  const [patientData, setPatientData] = useState({ 
    name: '', 
    age: '', 
    phone: '', 
    symptoms: '' 
  });

  // Default images for fallback (same as seed.js)
  const defaultDoctorImages = [
    'https://c8.alamy.com/comp/2HBAKGP/portrait-of-young-indian-male-doctor-writing-prescription-on-paper-while-sitting-at-desk-outdoor-village-hospital-looking-at-camera-rural-healthcare-2HBAKGP.jpg',
    'https://www.shutterstock.com/image-photo/happy-female-doctor-stethoscope-on-600nw-2527451925.jpg',
    'https://media.istockphoto.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=',
    'https://www.shutterstock.com/image-photo/medicine-healthcare-profession-concept-smiling-260nw-2155207903.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8ZHQEXFF5oSIzXifb0rWe70DxdMyW4nWvA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWiVCFu8-lyAiFwVPARLZJu0SbgcX3uyt9UA&s',
    'https://img.freepik.com/free-psd/doctor-preparing-routine-medical-check_23-2150493265.jpg?semt=ais_hybrid&w=740&q=80',
    'https://st2.depositphotos.com/1499355/12350/i/450/depositphotos_123508612-stock-photo-female-doctor-wearing-wearing-uniform.jpg',
    'https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=',
    'https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D'
  ];

  // Get doctor's actual photo from database (from seed.js it's stored in 'photo' field)
  const getDoctorImage = () => {
    // First check for doctor.photo (from seed.js)
    if (doctor?.photo) return doctor.photo;
    
    // Then check for doctor.image (if using different naming convention)
    if (doctor?.image) return doctor.image;
    
    // Fallback: Use doctor's name to get a consistent default image
    const nameHash = doctor?.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    const index = nameHash % defaultDoctorImages.length;
    return defaultDoctorImages[index];
  };

  const fetchQueue = () => {
    if (!doctor || !doctor._id) return;

    axios.get(`http://localhost:5000/api/queue/doctor/${doctor._id}`)
      .then(res => setQueue(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (doctor && doctor._id) {
      fetchQueue();
    }
  }, [doctor]);

  const handleJoinQueue = async (e) => {
    e.preventDefault();
    try {
      const patientRes = await axios.post('http://localhost:5000/api/patients', patientData);
      await axios.post('http://localhost:5000/api/queue', {
        doctorId: doctor._id,
        patientId: patientRes.data._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueue();
      setPatientData({ name: '', age: '', phone: '', symptoms: '' });
      alert('Successfully joined the queue!');
    } catch (err) {
      alert('Error joining queue');
      console.error(err);
    }
  };

  const handleLeaveQueue = async (queueId) => {
    try {
      await axios.delete(`http://localhost:5000/api/queue/${queueId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueue();
    } catch (err) {
      alert('Error leaving queue');
      console.error(err);
    }
  };

  const calculateWaitTime = (position) => {
    const timePerPatient = 15;
    return position * timePerPatient;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.doctorHeader}>
        <div style={styles.doctorProfile}>
          <div style={styles.doctorImageContainer}>
            <img 
              src={getDoctorImage()} 
              alt={`Dr. ${doctor?.name}`}
              style={styles.doctorImage}
              onError={(e) => {
                // If doctor's photo fails to load, use a default based on doctor's name
                const nameHash = doctor?.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
                const index = nameHash % defaultDoctorImages.length;
                e.target.src = defaultDoctorImages[index];
              }}
            />
          </div>
          
          <div style={styles.doctorInfo}>
            <h1 style={styles.doctorName}>
              Dr. {doctor?.name}
            </h1>
            <div style={styles.specialization}>
              {doctor?.specialization}
            </div>
            <div style={styles.doctorContact}>
              <span>Experience: {doctor?.experience || '10+'} years</span>
            </div>
            <div style={styles.doctorContact}>
              <span>Department: {doctor?.department || 'General Medicine'}</span>
            </div>
          </div>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {queue.length}
            </div>
            <div style={styles.statLabel}>Patients in Queue</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {queue.length * 15}
              <span style={{ fontSize: '1rem', color: '#64748b' }}>min</span>
            </div>
            <div style={styles.statLabel}>Estimated Wait Time</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {doctor?.consultationFee || '$50'}
            </div>
            <div style={styles.statLabel}>Consultation Fee</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {doctor?.workingHours?.start || '9:00'} - {doctor?.workingHours?.end || '17:00'}
            </div>
            <div style={styles.statLabel}>Working Hours</div>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        {/* Today's Queue Section */}
        <div style={styles.queueSection}>
          <h2 style={styles.sectionTitle}>
            Today's Queue ({queue.length})
          </h2>
          
          {queue.length === 0 ? (
            <div style={styles.emptyQueue}>
              <div style={styles.emptyQueueIcon}>🎉</div>
              <p>No patients in queue. Be the first to join!</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#94a3b8' }}>
                Consultation available now
              </p>
            </div>
          ) : (
            <div style={styles.queueList}>
              {queue.map((item, idx) => (
                <div key={item._id} style={styles.queueItem}>
                  <div style={styles.queuePosition}>#{idx + 1}</div>
                  
                  <div style={styles.patientInfo}>
                    <div style={styles.patientName}>
                      {item.patientId?.name || 'Unknown Patient'}
                    </div>
                    <div style={styles.patientDetails}>
                      <span>Age: {item.patientId?.age || 'N/A'}</span>
                      <span>Phone: {item.patientId?.phone || 'N/A'}</span>
                    </div>
                    <div style={styles.symptomsText}>
                      <strong>Symptoms:</strong> {item.patientId?.symptoms || 'Not specified'}
                    </div>
                  </div>
                  
                  <div style={styles.waitTime}>
                     ~{calculateWaitTime(idx + 1)} min
                  </div>
                  
                  <button 
                    onClick={() => handleLeaveQueue(item._id)}
                    style={styles.leaveButton}
                  >
                    Leave
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Join Queue Form */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>
            Join Queue
          </h2>
          
          <form onSubmit={handleJoinQueue} style={styles.joinForm}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={patientData.name}
                onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                style={styles.formInput}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.formLabel}>
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Your age"
                  value={patientData.age}
                  onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                  style={styles.formInput}
                  required
                  min="1"
                  max="120"
                />
              </div>
              
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.formLabel}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Contact number"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                  style={styles.formInput}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                 Symptoms Description
              </label>
              <textarea
                placeholder="Describe your symptoms in detail"
                value={patientData.symptoms}
                onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Selected Doctor
              </label>
              <input
                type="text"
                value={`Dr. ${doctor?.name} - ${doctor?.specialization}`}
                style={styles.formInput}
                disabled
                readOnly
              />
            </div>

            <button type="submit" style={styles.joinButton}>
              Join Today's Queue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorQueue;