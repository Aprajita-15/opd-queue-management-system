import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const styles = {
  // Main container with light theme
  pageContainer: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '6rem 2rem 4rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b',
    minHeight: '100vh'
  },
  
  // Header section
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
  
  backButton: {
    background: '#ffffff',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '0.7rem 1.25rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: '#f8fafc',
      color: '#475569',
      transform: 'translateX(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderColor: '#cbd5e1'
    }
  },
  
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em'
  },
  
  hospitalId: {
    fontSize: '0.85rem',
    color: '#64748b',
    background: '#f8fafc',
    padding: '0.4rem 0.85rem',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    marginTop: '0.5rem'
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
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
    }
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
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)',
    '&:hover': {
      background: '#fee2e2',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
    }
  },
  
  // Main content layout
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem',
    animation: '$fadeIn 0.6s ease-out'
  },
  
  // Image section
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
    transition: 'transform 0.6s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
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
  
  // Info section
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  
  // Address card
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
  
  // Bed status card
  bedCard: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #dbeafe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)'
    }
  },
  
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
  
  // Stats grid
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
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      borderColor: '#cbd5e1'
    }
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
  
  // Additional info section
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
    borderColor: '#fecaca',
    '& $bedLabel': {
      color: '#dc2626'
    },
    '& $bedCount': {
      color: '#dc2626'
    }
  },

  lowBedStatus: {
    background: '#fffbeb',
    borderColor: '#fde68a',
    '& $bedLabel': {
      color: '#d97706'
    },
    '& $bedCount': {
      color: '#d97706'
    }
  },
  
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
};

function HospitalDetails({ hospital }) {
  const navigate = useNavigate();

  const deleteHospital = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hospital from the network?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hospitals/${hospital._id}`);
      alert("Hospital deleted successfully from the global network");
      navigate("/hospitals");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete hospital. Please try again.");
    }
  };

  const addDept = () => {
    navigate(`/add-department/${hospital._id}`);
  };

  // Calculate additional stats
  const bedAvailability = hospital.bedAvailability || 0;
  const totalCapacity = bedAvailability + 50;
  const occupancyRate = Math.min(100, Math.floor((totalCapacity - bedAvailability) / totalCapacity * 100));
  const departmentCount = hospital.departments?.length || 0;
 // This would come from backend
  const staffCount = Math.floor((bedAvailability || 0) * 2.5);

  const getBedStatusStyle = (bedCount) => {
    if (bedCount === 0) return styles.emptyBedStatus;
    if (bedCount <= 10) return styles.lowBedStatus;
    return {};
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div>
            <h1 style={styles.title}>{hospital.name}</h1>
            
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button onClick={addDept} style={styles.actionButton}>
            Add Department
          </button>
          <button onClick={deleteHospital} style={styles.deleteButton}>
            Delete Hospital
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Image Section */}
        <div style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img 
              src={hospital.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
              alt={hospital.name}
              style={styles.hospitalImage}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div style={styles.imageBadge}>
              {hospital.status === 'active' ? 'Active' : hospital.status || 'Active'}
            </div>
          </div>
          
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>24/7</div>
              <div style={styles.statLabel}>Service Hours</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{occupancyRate}%</div>
              <div style={styles.statLabel}>Bed Occupancy</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>A+</div>
              <div style={styles.statLabel}>Safety Rating</div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div style={styles.infoSection}>
          <div style={styles.addressCard}>
            <div style={styles.addressTitle}>
              Location Information
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
          }}>
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

      {/* Additional Information */}
      <div style={styles.additionalInfo}>
        <div style={styles.sectionTitle}>
          Hospital Overview
        </div>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Department Count</div>
            <div style={styles.infoValue}>{departmentCount}</div>
            <div style={styles.infoDescription}>
              Specialized departments available
            </div>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Medical Staff</div>
            <div style={styles.infoValue}>{staffCount}+</div>
            <div style={styles.infoDescription}>
              Doctors, nurses, and specialists
            </div>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Established</div>
            <div style={styles.infoValue}>2015</div>
            <div style={styles.infoDescription}>
              Years in operation
            </div>
          </div>
          
          <div style={styles.infoItem}>
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
}

export default HospitalDetails;