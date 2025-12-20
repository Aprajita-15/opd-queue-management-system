import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    animation: '$fadeIn 0.6s ease-out'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.025em'
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.25rem'
  },
  listItem: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(37, 99, 235, 0.1)',
      borderColor: '#cbd5e1',
      '&::before': {
        opacity: 1
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    }
  },
  deptName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.25rem'
  },
  doctorCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.9rem',
    background: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #dbeafe',
    fontWeight: '600',
    marginTop: '0.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
      background: '#e0f2fe'
    }
  },
  countNumber: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#2563eb'
  },
  countLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: '#64748b',
    fontSize: '1rem',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem'
  },
  deptIcon: {
    fontSize: '1.2rem',
    color: '#2563eb',
    fontWeight: '600',
    padding: '0.5rem',
    background: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #dbeafe',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectArrow: {
    fontSize: '1.2rem',
    color: '#64748b',
    opacity: 0.7,
    transition: 'transform 0.3s ease'
  },
  // Department status indicators
  statusIndicator: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginLeft: '0.5rem',
    transition: 'all 0.2s ease'
  },
  activeStatus: {
    background: '#dcfce7',
    color: '#16a34a',
    border: '1px solid #86efac'
  },
  inactiveStatus: {
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5'
  },
  deptDescription: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.4',
    marginTop: '0.25rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: '#64748b',
    fontSize: '1rem',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0'
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    border: '3px solid #e2e8f0',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite',
    marginBottom: '1rem'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

// Department abbreviations for icons (text-based, no emojis)
const DEPT_ABBREVIATIONS = {
  'Cardiology': 'CAR',
  'Neurology': 'NEU',
  'Pediatrics': 'PED',
  'Orthopedics': 'ORT',
  'Dermatology': 'DER',
  'Gynecology': 'GYN',
  'Oncology': 'ONC',
  'Psychiatry': 'PSY',
  'Radiology': 'RAD',
  'Anesthesiology': 'ANE',
  'General Medicine': 'MED',
  'Dentistry': 'DEN',
  'Emergency': 'EMR',
  'Surgery': 'SUR',
  'default': 'DEPT'
};

function DepartmentList({ hospitalId, onSelect }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/departments/hospital/${hospitalId}`)
      .then(res => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [hospitalId]);

  const getDeptAbbreviation = (deptName) => {
    const abbreviationKey = Object.keys(DEPT_ABBREVIATIONS).find(key => 
      deptName.toLowerCase().includes(key.toLowerCase())
    );
    return abbreviationKey ? DEPT_ABBREVIATIONS[abbreviationKey] : DEPT_ABBREVIATIONS.default;
  };

  const getDeptStatus = (dept) => {
    const doctorCount = dept.doctors?.length || 0;
    if (doctorCount === 0) {
      return { text: 'No Doctors', style: styles.inactiveStatus };
    }
    return { text: 'Active', style: styles.activeStatus };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Hospital Departments</h2>
      
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading departments...</p>
        </div>
      ) : departments.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No departments found. Add a new department to get started.</p>
        </div>
      ) : (
        <div style={styles.list}>
          {departments.map(dept => {
            const status = getDeptStatus(dept);
            return (
              <div 
                key={dept._id} 
                style={styles.listItem} 
                onClick={() => onSelect && onSelect(dept)}
              >
                <div style={styles.iconContainer}>
                  <div style={styles.deptIcon}>
                    {getDeptAbbreviation(dept.name)}
                  </div>
                  <span style={styles.selectArrow}>→</span>
                </div>
                
                <div style={styles.deptName}>
                  {dept.name}
                  <span style={{ ...styles.statusIndicator, ...status.style }}>
                    {status.text}
                  </span>
                </div>
                
                <div style={styles.doctorCount}>
                  <div style={styles.countNumber}>
                    {dept.doctors?.length || 0}
                  </div>
                  <div style={styles.countLabel}>
                    Doctors Available
                  </div>
                </div>
                
                {dept.description && (
                  <p style={styles.deptDescription}>
                    {dept.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DepartmentList;