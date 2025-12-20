import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBot from './ChatBot';
import HeroVideo1 from '../assets/hospital.mp4'; // Add your video file

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '6rem 0 4rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b',
    position: 'relative'
  },
  
  header: {
    textAlign: 'right',
    marginBottom: '3rem',
    padding: '0 1rem',
    animation: '$fadeIn 0.8s ease-out',
    width: '100%'
  },
  
  title: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0.75rem 0',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  
  subtitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 2rem 0',
    maxWidth: '800px',
    lineHeight: '1.6',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
    marginLeft: 'auto'
  },
  
  searchSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2.5rem',
    marginTop: '-2rem',
    padding: '0 1rem',
    animation: '$slideUp 0.6s ease-out 0.2s both',
    width: '40%',
    marginRight:'17rem'
  },
  
  searchContainer: {
    width: '100%',
    maxWidth: '1000px',
    position: 'relative'
  },
  
  searchInput: {
    width: '100%',
    padding: '1rem 3rem 1rem 1.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#1e293b',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    outline: 'none',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 12px 40px rgba(37, 99, 235, 0.15), 0 0 0 4px rgba(37, 99, 235, 0.1)',
      transform: 'translateY(-4px) scale(1.02)'
    },
    '&::placeholder': {
      color: '#94a3b8'
    }
  },
  
  searchIcon: {
    position: 'absolute',
    right: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    fontSize: '1.2rem'
  },
  
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    animation: '$slideUp 0.6s ease-out 0.3s both'
  },
  
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.05)',
      boxShadow: '0 15px 30px rgba(37, 99, 235, 0.12)',
      borderRadius: '12px',
      background: '#f8fafc'
    }
  },
  
  statNumber: {
    fontSize: '2.2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    lineHeight: '1',
    filter: 'drop-shadow(0 4px 8px rgba(37, 99, 235, 0.2))'
  },
  
  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  
  hospitalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
    padding: '0 1rem'
  },
  
  hospitalCard: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    height: '420px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
    position: 'relative',
    animation: '$slideUp 0.6s ease-out',
    '&:hover': {
      transform: 'translateY(-12px) scale(1.03)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(37, 99, 235, 0.1)',
      borderColor: '#cbd5e1',
      '& $cardImage': {
        transform: 'scale(1.1)'
      },
      '& $hospitalName': {
        color: '#2563eb'
      }
    }
  },
  
  cardImageContainer: {
    height: '240px',
    overflow: 'hidden',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)'
    }
  },
  
  cardImage: {
    width: '100%',
    height: '170%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  
  cardContent: {
    padding: '1.25rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  
  hospitalName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#0f172a',
    lineHeight: '1.3',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: 'color 0.3s ease'
  },
  
  videoFrame: {
    position: 'relative',
    width: '100vw',
    margin: '0 auto 3rem',
    marginTop: '-100px',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    height: '100vh',
    overflow: 'hidden',
  },
  
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1
  },
  
  videoContent: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '1rem 3rem',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  
  hospitalLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.85rem',
    marginBottom: '1rem',
    minHeight: '1.5rem'
  },
  
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0.6rem',
    background: '#f8fafc',
    borderRadius: '10px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: '1px solid transparent',
    '&:hover': {
      background: '#ffffff',
      transform: 'translateY(-3px)',
      borderColor: '#e2e8f0',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
    }
  },
  
  detailLabel: {
    fontSize: '0.7rem',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  detailValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  
  bedStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '12px',
    border: '1px solid #dbeafe',
    marginTop: 'auto',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 20px rgba(37, 99, 235, 0.15)',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)'
    }
  },
  
  bedCount: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2))'
  },
  
  bedLabel: {
    fontSize: '0.8rem',
    color: '#2563eb',
    fontWeight: '600'
  },
  
  bedCritical: {
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    borderColor: '#fecaca',
    '& $bedCount': {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      WebkitBackgroundClip: 'text'
    },
    '& $bedLabel': {
      color: '#dc2626'
    }
  },
  
  bedWarning: {
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    borderColor: '#fde68a',
    '& $bedCount': {
      background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      WebkitBackgroundClip: 'text'
    },
    '& $bedLabel': {
      color: '#d97706'
    }
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: '#64748b',
    fontSize: '1.1rem',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    maxWidth: '500px',
    margin: '2rem auto',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    animation: '$fadeIn 0.8s ease-out'
  },
  
  emptyStateTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#0f172a'
  },
  
  emptyStateSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '2rem',
    maxWidth: '400px',
    margin: '0 auto 2rem'
  },
  
  loadingContainer: {
    textAlign: 'center',
    padding: '5rem 2rem',
    color: '#64748b',
    fontSize: '1.2rem',
    animation: '$fadeIn 0.8s ease-out'
  },
  
  loadingSpinner: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '4px solid #e2e8f0',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: '$spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)'
  },
  
  statusBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
  },
  
  activeStatus: {
    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    color: '#16a34a',
    border: '1px solid #86efac'
  },
  
  maintenanceStatus: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    color: '#d97706',
    border: '1px solid #fcd34d'
  },
  
  inactiveStatus: {
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    color: '#dc2626',
    border: '1px solid #fca5a5'
  },
  
  chatbotHelper: {
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
    zIndex: 999,
    animation: '$slideUp 0.6s ease-out',
    maxWidth: '300px',
    pointerEvents: 'none',
    opacity: 0.9,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      right: '20px',
      width: '0',
      height: '0',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: '8px solid #1d4ed8'
    }
  },
  
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  
  '@keyframes slideUp': {
    from: { 
      opacity: 0, 
      transform: 'translateY(30px) scale(0.95)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0) scale(1)' 
    }
  },
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 }
  }
};

// Add minimal global styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes cardAppear {
      from { 
        opacity: 0; 
        transform: translateY(20px) scale(0.98); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }
    
    .hospital-card {
      animation: cardAppear 0.5s ease-out forwards;
    }
    
    .card-image-zoom {
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .hospital-card:hover .card-image-zoom {
      transform: scale(1.08);
    }
  `;
  document.head.appendChild(styleElement);
}

function HospitalList({ onSelect }) {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showChatbotHelper, setShowChatbotHelper] = useState(true);
  
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/hospitals');
        setHospitals(res.data);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHospitals();
    
    const timer = setTimeout(() => {
      setShowChatbotHelper(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      hospital.name?.toLowerCase().includes(query) ||
      hospital.address?.city?.toLowerCase().includes(query) ||
      hospital.address?.state?.toLowerCase().includes(query) ||
      hospital.address?.pincode?.toString().includes(query)
    );
  });

  const totalHospitals = hospitals.length;
  const totalBeds = hospitals.reduce((sum, hospital) => sum + (hospital.bedAvailability || 0), 0);
  const averageBeds = totalHospitals > 0 ? Math.round(totalBeds / totalHospitals) : 0;
  const lowAvailabilityHospitals = hospitals.filter(h => {
    const beds = h.bedAvailability || 0;
    return beds > 0 && beds <= 10;
  }).length;

  const getBedStatusStyle = (bedCount) => {
    if (bedCount === 0) return styles.bedCritical;
    if (bedCount <= 10) return styles.bedWarning;
    return {};
  };

  const getBedStatusText = (bedCount) => {
    if (bedCount === 0) return 'No Beds';
    if (bedCount <= 10) return 'Limited';
    return 'Available';
  };

  const getStatusBadgeStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return { ...styles.statusBadge, ...styles.activeStatus };
      case 'maintenance':
        return { ...styles.statusBadge, ...styles.maintenanceStatus };
      case 'inactive':
        return { ...styles.statusBadge, ...styles.inactiveStatus };
      default:
        return { ...styles.statusBadge, ...styles.activeStatus };
    }
  };

  const getHospitalImage = (hospital) => {
    if (hospital.image) return hospital.image;
    
    const defaultImages = [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    const hash = hospital._id ? 
      hospital._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
      Math.floor(Math.random() * defaultImages.length);
    
    return defaultImages[hash % defaultImages.length];
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.videoFrame}>
        <video autoPlay loop muted style={styles.videoBackground}>
          <source src={HeroVideo1} type="video/mp4" />
        </video>

        <div style={styles.videoContent}>
          <div style={styles.header}>
            <h1 style={{
              ...styles.title,
              background: 'linear-gradient(90deg, #81adfeff, #59c6d9ff, #276dd7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', 
              fontSize: "67px", 
              textAlign: 'right',
              marginLeft: 'auto'
            }}>
              Hospital Queue Management
            </h1>
            <p style={styles.subtitle}>
              Our platform connects you with trusted hospitals, verified medical facilities,
              and real-time bed availability. Whether you're seeking emergency care,
              specialized treatment, or simply comparing services, we ensure transparency,
              accessibility, and ease. Discover healthcare options near you with detailed
              insights, reviews, and facility-wide statistics—empowering you to make
              informed decisions for yourself and your loved ones.
            </p>
          </div>

          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search hospitals by name, city, state, or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <span style={styles.searchIcon}>🔍</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsSection}>
        <div style={styles.statItem} className="stat-item">
          <div style={styles.statNumber}>{totalHospitals}</div>
          <div style={styles.statLabel}>Total Hospitals</div>
        </div>
        <div style={styles.statItem} className="stat-item">
          <div style={styles.statNumber}>{totalBeds}</div>
          <div style={styles.statLabel}>Available Beds</div>
        </div>
        <div style={styles.statItem} className="stat-item">
          <div style={styles.statNumber}>{averageBeds}</div>
          <div style={styles.statLabel}>Avg Beds/Hospital</div>
        </div>
        <div style={styles.statItem} className="stat-item">
          <div style={styles.statNumber}>{lowAvailabilityHospitals}</div>
          <div style={styles.statLabel}>Low Availability</div>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Loading Hospitals...</h3>
          <p>Please wait while we fetch the latest hospital data</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div style={styles.emptyState}>
          <h2 style={styles.emptyStateTitle}>
            {searchQuery ? 'No Matching Hospitals' : 'No Hospitals Found'}
          </h2>
          <p style={styles.emptyStateSubtitle}>
            {searchQuery 
              ? "No hospitals match your search criteria. Try a different search term."
              : "Get started by adding your first hospital to the network."}
          </p>
        </div>
      ) : (
        <div style={styles.hospitalsGrid}>
          {filteredHospitals.map((hospital, index) => (
            <div 
              key={hospital._id || index} 
              style={{
                ...styles.hospitalCard,
                animationDelay: `${index * 0.1}s`
              }}
              className="hospital-card"
              onClick={() => onSelect && onSelect(hospital)}
            >
              <div style={styles.cardImageContainer}>
                <img 
                  src={getHospitalImage(hospital)} 
                  alt={hospital.name}
                  style={styles.cardImage}
                  className="card-image-zoom"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              
              <div style={styles.cardContent}>
                <div>
                  <h3 style={styles.hospitalName}>{hospital.name}</h3>
                  
                  <div style={styles.hospitalLocation}>
                    <span>📍</span>
                    <span>{hospital.address?.city || hospital.location || 'City'}, {hospital.address?.state || 'State'}</span>
                  </div>
                  
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Contact</span>
                      <span style={styles.detailValue}>{hospital.contact || hospital.address?.contact || 'N/A'}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Status</span>
                      <div style={getStatusBadgeStyle(hospital.status)}>
                        {hospital.status || 'Active'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  ...styles.bedStatus,
                  ...getBedStatusStyle(hospital.bedAvailability || 0)
                }}>
                  <div style={styles.bedCount}>{hospital.bedAvailability || hospital.doctors || 0}</div>
                  <div style={styles.bedLabel}>
                    {getBedStatusText(hospital.bedAvailability || 0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showChatbotHelper && (
        <div style={styles.chatbotHelper}>
          💬 Ask our AI Assistant about hospitals, doctors, queues, and appointments!
        </div>
      )}

      <ChatBot />
    </div>
  );
}

export default HospitalList;