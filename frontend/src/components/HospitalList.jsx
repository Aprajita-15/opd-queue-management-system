// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// //  import ChatBot from './ChatBot';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Search,
// //   Hospital,
// //   TrendingUp,
// //   AlertCircle,
// //   Star,
// //   MapPin,
// //   Phone,
// //   Clock,
// //   Bed
// // } from 'lucide-react';

// // const styles = {
// //   pageContainer: {
// //     minHeight: '100vh',
// //     background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 60%, #f1f5f9 100%)',
// //     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// //     color: '#1e293b',
// //     position: 'relative',
// //     display: 'flex',
// //     flexDirection: 'column'
// //   },
// //   backgroundElements: {
// //     position: 'fixed',
// //     inset: 0,
// //     zIndex: 0,
// //     pointerEvents: 'none'
// //   },
// //   contentWrapper: {
// //     flex: '1 0 auto',
// //     width: '100%',
// //     maxWidth: '1440px',
// //     margin: '0 auto',
// //     padding: '2rem 2rem 6rem',
// //     position: 'relative',
// //     zIndex: 1
// //   },
// //   heroSection: {
// //     padding: '3rem 0 4rem',
// //     textAlign: 'center'
// //   },
// //   title: {
// //     fontSize: '3.5rem',
// //     fontWeight: '800',
// //     background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
// //     WebkitBackgroundClip: 'text',
// //     WebkitTextFillColor: 'transparent',
// //     margin: '0 0 1.5rem 0',
// //     letterSpacing: '-0.03em',
// //     lineHeight: '1.2'
// //   },
// //   subtitle: {
// //     fontSize: '1.35rem',
// //     color: '#64748b',
// //     maxWidth: '860px',
// //     margin: '0 auto 3rem',
// //     lineHeight: '1.7',
// //     fontWeight: '500'
// //   },
// //   searchSection: {
// //     maxWidth: '860px',
// //     margin: '0 auto 4rem'
// //   },
// //   searchContainer: {
// //     position: 'relative',
// //     width: '100%'
// //   },
// //   searchInput: {
// //     width: '100%',
// //     padding: '1.4rem 4rem 1.4rem 2rem',
// //     background: '#ffffff',
// //     border: 'none',
// //     borderRadius: '20px',
// //     fontSize: '1.15rem',
// //     color: '#1e293b',
// //     outline: 'none',
// //     boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
// //     transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
// //   },
// //   searchIcon: {
// //     position: 'absolute',
// //     right: '1.8rem',
// //     top: '50%',
// //     transform: 'translateY(-50%)',
// //     color: '#64748b',
// //     transition: 'all 0.4s ease'
// //   },
// //   statsSection: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
// //     gap: '1.8rem',
// //     marginBottom: '4rem',
// //     padding: '2.5rem',
// //     background: 'rgba(255, 255, 255, 0.95)',
// //     backdropFilter: 'blur(12px)',
// //     borderRadius: '24px',
// //     border: '1px solid rgba(226, 232, 240, 0.7)',
// //     boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
// //   },
// //   statItem: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '1.2rem',
// //     padding: '1.8rem',
// //     borderRadius: '18px',
// //     background: 'rgba(255, 255, 255, 0.6)',
// //     border: '1px solid rgba(226, 232, 240, 0.5)',
// //     transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
// //     cursor: 'default'
// //   },
// //   statIconContainer: {
// //     width: '60px',
// //     height: '60px',
// //     borderRadius: '16px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
// //     color: '#1e40af',
// //     transition: 'all 0.5s ease'
// //   },
// //   statNumber: {
// //     fontSize: '2.5rem',
// //     fontWeight: '800',
// //     background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
// //     WebkitBackgroundClip: 'text',
// //     WebkitTextFillColor: 'transparent',
// //     lineHeight: '1'
// //   },
// //   statLabel: {
// //     fontSize: '1rem',
// //     color: '#64748b',
// //     fontWeight: '600',
// //     textTransform: 'uppercase',
// //     letterSpacing: '0.6px'
// //   },
// //   resultsCount: {
// //     fontSize: '1.1rem',
// //     color: '#475569',
// //     marginBottom: '2rem',
// //     fontWeight: '600',
// //     padding: '1rem 1.5rem',
// //     background: '#f1f5f9',
// //     borderRadius: '16px',
// //     display: 'inline-block',
// //     border: '1px solid #e2e8f0'
// //   },
// //   hospitalsGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
// //     gap: '1.8rem',
// //     marginBottom: '4rem'
// //   },
// //   hospitalCard: {
// //     background: '#ffffff',
// //     borderRadius: '18px',
// //     overflow: 'hidden',
// //     border: '1px solid #e2e8f0',
// //     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
// //     transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
// //     cursor: 'pointer',
// //     display: 'flex',
// //     flexDirection: 'column'
// //   },
// //   cardImageContainer: {
// //     height: '180px',
// //     overflow: 'hidden',
// //     position: 'relative'
// //   },
// //   cardImage: {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //     transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
// //   },
// //   statusBadgeImage: {
// //     position: 'absolute',
// //     top: '0.7rem',
// //     right: '0.7rem',
// //     padding: '0.3rem 0.8rem',
// //     borderRadius: '20px',
// //     fontSize: '0.72rem',
// //     fontWeight: '700',
// //     textTransform: 'uppercase',
// //     letterSpacing: '0.5px',
// //     background: 'rgba(255, 255, 255, 0.96)',
// //     backdropFilter: 'blur(12px)',
// //     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
// //     transition: 'all 0.4s ease'
// //   },
// //   cardContent: {
// //     padding: '0.9rem',
// //     flexGrow: 1,
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'space-between'
// //   },
// //   hospitalName: {
// //     fontSize: '1.2rem',
// //     fontWeight: '700',
// //     marginBottom: '0.3rem',
// //     color: '#0f172a',
// //     transition: 'color 0.4s ease'
// //   },
// //   hospitalLocation: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '0.4rem',
// //     color: '#64748b',
// //     fontSize: '0.9rem',
// //     marginBottom: '0.6rem'
// //   },
// //   detailsGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: '1fr',
// //     gap: '0.5rem',
// //     marginBottom: '0.5rem'
// //   },
// //   detailItem: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     gap: '0.8rem',
// //     padding: '0.5rem',
// //     background: '#f8fafc',
// //     borderRadius: '12px',
// //     border: '1px solid #e2e8f0',
// //     transition: 'all 0.4s ease'
// //   },
// //   detailLeft: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '0.5rem',
// //     flex: 1
// //   },
// //   detailIcon: {
// //     color: '#3b82f6',
// //     flexShrink: 0
// //   },
// //   detailLabel: {
// //     fontSize: '0.7rem',
// //     color: '#94a3b8',
// //     fontWeight: '600',
// //     textTransform: 'uppercase',
// //     letterSpacing: '0.5px'
// //   },
// //   detailValue: {
// //     fontSize: '0.85rem',
// //     fontWeight: '600',
// //     color: '#334155'
// //   },
// //   ratingContainer: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: '0.6rem 0.9rem',
// //     background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
// //     borderRadius: '12px',
// //     border: '1px solid #fde68a',
// //     marginBottom: '0.5rem',
// //     transition: 'all 0.5s ease'
// //   },
// //   ratingValue: {
// //     fontSize: '1.1rem',
// //     fontWeight: '800',
// //     color: '#92400e',
// //     marginLeft: '0.4rem'
// //   },
// //   ratingCount: {
// //     fontSize: '0.8rem',
// //     color: '#92400e',
// //     fontWeight: '600'
// //   },
// //   giveFeedbackButton: {
// //     width: '100%',
// //     padding: '0.75rem',
// //     background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '12px',
// //     fontSize: '0.9rem',
// //     fontWeight: '700',
// //     cursor: 'pointer',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     gap: '0.4rem',
// //     transition: 'all 0.5s ease',
// //     position: 'relative',
// //     overflow: 'hidden'
// //   }
// // };

// // // Inject hover styles and animations
// // const styleSheet = document.createElement('style');
// // styleSheet.textContent = `
// //   @keyframes floatBg {
// //     0%, 100% { transform: translateY(0) rotate(0deg); }
// //     50% { transform: translateY(-20px) rotate(2deg); }
// //   }
// //   .bg-blob {
// //     position: absolute;
// //     border-radius: 50%;
// //     background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.04));
// //     animation: floatBg 25s infinite ease-in-out;
// //   }
// //   .bg-blob:nth-child(1) {
// //     width: 700px;
// //     height: 700px;
// //     top: -350px;
// //     right: -250px;
// //     animation-delay: 0s;
// //   }
// //   .bg-blob:nth-child(2) {
// //     width: 600px;
// //     height: 600px;
// //     bottom: -300px;
// //     left: -200px;
// //     animation-delay: 12s;
// //   }
// //   .search-input:hover {
// //     transform: translateY(-6px);
// //     box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25);
// //     border: 2px solid #93c5fd;
// //   }
// //   .search-input:focus {
// //     transform: translateY(-8px);
// //     box-shadow: 0 25px 70px rgba(59, 130, 246, 0.3), 0 0 0 5px rgba(59, 130, 246, 0.15);
// //     border: 2px solid #3b82f6;
// //   }
// //   .search-input:focus ~ .search-icon {
// //     color: #3b82f6;
// //     transform: translateY(-50%) scale(1.3);
// //   }
// //   .stat-item:hover {
// //     transform: translateY(-10px) scale(1.03);
// //     box-shadow: 0 30px 60px rgba(59, 130, 246, 0.2);
// //     background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
// //   }
// //   .stat-item:hover .stat-icon-container {
// //     transform: scale(1.15) rotate(8deg);
// //   }
// //   .hospital-card:hover {
// //     transform: translateY(-12px) scale(1.03);
// //     box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.2);
// //   }
// //   .hospital-card:hover .card-image {
// //     transform: scale(1.15);
// //   }
// //   .hospital-card:hover .hospital-name {
// //     color: #2563eb;
// //   }
// //   .hospital-card:hover .detail-item {
// //     transform: translateY(-3px);
// //     background: #ffffff;
// //     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
// //   }
// //   .hospital-card:hover .status-badge-image {
// //     transform: scale(1.1);
// //   }
// //   .rating-container:hover {
// //     transform: translateY(-5px);
// //   }
// //   .give-feedback-btn:hover {
// //     transform: translateY(-5px) scale(1.04);
// //     box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
// //   }
// // `;
// // document.head.appendChild(styleSheet);

// // function HospitalList({ onSelect, token, user }) {
// //   const [hospitals, setHospitals] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchHospitalsWithRatings = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get('http://localhost:5000/api/hospitals');

// //         const hospitalsWithRatings = await Promise.all(
// //           res.data.map(async (hospital) => {
// //             try {
// //               const ratingsRes = await axios.get(
// //                 `http://localhost:5000/api/feedback/hospital/${hospital._id}`
// //               );
// //               return {
// //                 ...hospital,
// //                 averageRating: ratingsRes.data.averageRating || 0,
// //                 ratingCount: ratingsRes.data.ratingCount || 0,
// //               };
// //             } catch (error) {
// //               return { ...hospital, averageRating: 0, ratingCount: 0 };
// //             }
// //           })
// //         );

// //         setHospitals(hospitalsWithRatings);
// //       } catch (err) {
// //         console.error('Error fetching hospitals:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchHospitalsWithRatings();
// //   }, []);

// //   const filteredHospitals = hospitals.filter(hospital => {
// //     if (!searchQuery) return true;
// //     const query = searchQuery.toLowerCase();
// //     return (
// //       hospital.name?.toLowerCase().includes(query) ||
// //       hospital.address?.city?.toLowerCase().includes(query) ||
// //       hospital.address?.state?.toLowerCase().includes(query) ||
// //       hospital.address?.pincode?.toString().includes(query)
// //     );
// //   });

// //   const totalHospitals = hospitals.length;
// //   const totalBeds = hospitals.reduce((sum, h) => sum + (h.bedAvailability || 0), 0);
// //   const averageBeds = totalHospitals > 0 ? Math.round(totalBeds / totalHospitals) : 0;
// //   const lowAvailabilityHospitals = hospitals.filter(h => (h.bedAvailability || 0) > 0 && (h.bedAvailability || 0) <= 10).length;

// //   const getBedStatusText = (count) => count === 0 ? 'No Beds' : count <= 10 ? 'Limited' : 'Available';

// //   const getHospitalImage = (hospital) => {
// //     if (hospital.image) return hospital.image;
// //     const defaults = [
// //       'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
// //       'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
// //       'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
// //       'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
// //     ];
// //     const index = hospital._id ? hospital._id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % defaults.length : 0;
// //     return defaults[index];
// //   };

// //   const renderStars = (rating) => {
// //     const stars = [];
// //     const full = Math.floor(rating);
// //     const hasHalf = rating - full >= 0.5;
// //     for (let i = 0; i < 5; i++) {
// //       if (i < full) stars.push(<Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />);
// //       else if (i === full && hasHalf) stars.push(<Star key={i} size={16} fill="#d1d5db" stroke="#f59e0b" />);
// //       else stars.push(<Star key={i} size={16} fill="none" stroke="#d1d5db" />);
// //     }
// //     return stars;
// //   };

// //   const handleGiveFeedback = (hospitalId, e) => {
// //     e.stopPropagation();
// //     const hospital = hospitals.find(h => h._id === hospitalId);
// //     navigate(`/feedback/${hospitalId}`, { state: { hospitalName: hospital?.name || 'Hospital' } });
// //   };

// //   return (
// //     <div style={styles.pageContainer}>
// //       <div style={styles.backgroundElements}>
// //         <div className="bg-blob" />
// //         <div className="bg-blob" />
// //       </div>
// // <ChatBot />
// //       <div style={styles.contentWrapper}>
// //         <div style={styles.heroSection}>
// //           <h1 style={styles.title}>Hospital Queue Management</h1>
// //           <p style={styles.subtitle}>
// //             Find trusted hospitals with real-time bed availability, verified patient ratings, and detailed insights for better healthcare choices.
// //           </p>
// //           <div style={styles.searchSection}>
// //             <div style={styles.searchContainer}>
// //               <input
// //                 type="text"
// //                 placeholder="Search by hospital name, city, state, or pincode..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="search-input"
// //                 style={styles.searchInput}
// //               />
// //               <div className="search-icon" style={styles.searchIcon}>
// //                 <Search size={28} />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div style={styles.statsSection}>
// //           <div style={styles.statItem}>
// //             <div style={styles.statIconContainer}><Hospital size={28} /></div>
// //             <div><div style={styles.statNumber}>{totalHospitals}</div><div style={styles.statLabel}>Total Hospitals</div></div>
// //           </div>
// //           <div style={styles.statItem}>
// //             <div style={styles.statIconContainer}><Bed size={28} /></div>
// //             <div><div style={styles.statNumber}>{totalBeds}</div><div style={styles.statLabel}>Available Beds</div></div>
// //           </div>
// //           <div style={styles.statItem}>
// //             <div style={styles.statIconContainer}><TrendingUp size={28} /></div>
// //             <div><div style={styles.statNumber}>{averageBeds}</div><div style={styles.statLabel}>Average Beds</div></div>
// //           </div>
// //           <div style={styles.statItem}>
// //             <div style={styles.statIconContainer}><AlertCircle size={28} /></div>
// //             <div><div style={styles.statNumber}>{lowAvailabilityHospitals}</div><div style={styles.statLabel}>Low Availability</div></div>
// //           </div>
// //         </div>

// //         {!loading && filteredHospitals.length > 0 && (
// //           <div style={styles.resultsCount}>
// //             Showing {filteredHospitals.length} of {hospitals.length} hospitals{searchQuery && ` for "${searchQuery}"`}
// //           </div>
// //         )}

// //         {loading ? (
// //           <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
// //             <div style={{ width: '80px', height: '80px', border: '6px solid rgba(226,232,240,0.3)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
// //             <h3 style={{ margin: '0 0 1rem', fontSize: '1.8rem', color: '#0f172a' }}>Loading Hospitals...</h3>
// //           </div>
// //         ) : filteredHospitals.length === 0 ? (
// //           <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
// //             <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#334155' }}>
// //               {searchQuery ? 'No Hospitals Found' : 'No Hospitals Available'}
// //             </h2>
// //             <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
// //               {searchQuery ? 'Try a different search term.' : 'The system currently has no registered hospitals.'}
// //             </p>
// //           </div>
// //         ) : (
// //           <div style={styles.hospitalsGrid}>
// //             {filteredHospitals.map((hospital) => (
// //               <div
// //                 key={hospital._id}
// //                 style={styles.hospitalCard}
// //                 className="hospital-card"
// //                 onClick={() => onSelect && onSelect(hospital)}
// //               >
// //                 <div style={styles.cardImageContainer}>
// //                   <img
// //                     src={getHospitalImage(hospital)}
// //                     alt={hospital.name}
// //                     style={styles.cardImage}
// //                     onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'}
// //                   />
// //                   <div className="status-badge-image" style={styles.statusBadgeImage}>
// //                     {hospital.status || 'Active'}
// //                   </div>
// //                 </div>
// //                 <div style={styles.cardContent}>
// //                   <div>
// //                     <h3 style={styles.hospitalName} className="hospital-name">{hospital.name}</h3>
// //                     <div style={styles.hospitalLocation}>
// //                       <MapPin size={15} />
// //                       <span>{hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}</span>
// //                     </div>
// //                     <div style={styles.detailsGrid}>
// //                       <div style={styles.detailItem}>
// //                         <div style={styles.detailLeft}>
// //                           <Bed size={15} style={styles.detailIcon} />
// //                           <div>
// //                             <div style={styles.detailLabel}>Available Beds</div>
// //                             <div style={styles.detailValue}>{hospital.bedAvailability || 0} ({getBedStatusText(hospital.bedAvailability || 0)})</div>
// //                           </div>
// //                         </div>
// //                         <div style={styles.detailLeft}>
// //                           <Clock size={15} style={styles.detailIcon} />
// //                           <div>
// //                             <div style={styles.detailLabel}>Timings</div>
// //                             <div style={styles.detailValue}>{hospital.timings || '24/7'}</div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div style={styles.detailItem}>
// //                         <div style={styles.detailLeft}>
// //                           <Phone size={15} style={styles.detailIcon} />
// //                           <div>
// //                             <div style={styles.detailLabel}>Contact</div>
// //                             <div style={styles.detailValue}>{hospital.contact || hospital.address?.contact || 'N/A'}</div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div style={styles.ratingContainer} className="rating-container">
// //                       <div style={{ display: 'flex', alignItems: 'center' }}>
// //                         {renderStars(hospital.averageRating || 0)}
// //                         <span style={styles.ratingValue}>{(hospital.averageRating || 0).toFixed(1)}</span>
// //                       </div>
// //                       <span style={styles.ratingCount}>({hospital.ratingCount || 0} reviews)</span>
// //                     </div>
// //                     <button
// //                       onClick={(e) => handleGiveFeedback(hospital._id, e)}
// //                       style={styles.giveFeedbackButton}
// //                       className="give-feedback-btn"
// //                     >
// //                       <Star size={16} />
// //                       {hospital.ratingCount > 0 ? 'Rate & Review' : 'Be the first to rate'}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default HospitalList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChatBot from './ChatBot';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search,
//   Hospital,
//   TrendingUp,
//   AlertCircle,
//   Star,
//   MapPin,
//   Phone,
//   Clock,
//   Bed
// } from 'lucide-react';

// const HospitalList = ({ onSelect, token, user }) => {
//   const [hospitals, setHospitals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHospitalsWithRatings = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('http://localhost:5000/api/hospitals');

//         const hospitalsWithRatings = await Promise.all(
//           res.data.map(async (hospital) => {
//             try {
//               const ratingsRes = await axios.get(
//                 `http://localhost:5000/api/feedback/hospital/${hospital._id}`
//               );
//               return {
//                 ...hospital,
//                 averageRating: ratingsRes.data.averageRating || 0,
//                 ratingCount: ratingsRes.data.ratingCount || 0,
//               };
//             } catch (error) {
//               return { ...hospital, averageRating: 0, ratingCount: 0 };
//             }
//           })
//         );

//         setHospitals(hospitalsWithRatings);
//       } catch (err) {
//         console.error('Error fetching hospitals:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHospitalsWithRatings();
//   }, []);

//   const filteredHospitals = hospitals.filter(hospital => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       hospital.name?.toLowerCase().includes(query) ||
//       hospital.address?.city?.toLowerCase().includes(query) ||
//       hospital.address?.state?.toLowerCase().includes(query) ||
//       hospital.address?.pincode?.toString().includes(query)
//     );
//   });

//   const totalHospitals = hospitals.length;
//   const totalBeds = hospitals.reduce((sum, h) => sum + (h.bedAvailability || 0), 0);
//   const averageBeds = totalHospitals > 0 ? Math.round(totalBeds / totalHospitals) : 0;
//   const lowAvailabilityHospitals = hospitals.filter(h => (h.bedAvailability || 0) > 0 && (h.bedAvailability || 0) <= 10).length;

//   const getBedStatusText = (count) => count === 0 ? 'No Beds' : count <= 10 ? 'Limited' : 'Available';

//   const getHospitalImage = (hospital) => {
//     if (hospital.image) return hospital.image;
//     const defaults = [
//       'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
//       'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
//       'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
//       'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
//     ];
//     const index = hospital._id ? hospital._id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % defaults.length : 0;
//     return defaults[index];
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const full = Math.floor(rating);
//     const hasHalf = rating - full >= 0.5;
//     for (let i = 0; i < 5; i++) {
//       if (i < full) stars.push(<Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />);
//       else if (i === full && hasHalf) stars.push(<Star key={i} size={16} fill="#d1d5db" stroke="#f59e0b" />);
//       else stars.push(<Star key={i} size={16} fill="none" stroke="#d1d5db" />);
//     }
//     return stars;
//   };

//   const handleGiveFeedback = (hospitalId, e) => {
//     e.stopPropagation();
//     const hospital = hospitals.find(h => h._id === hospitalId);
//     navigate(`/feedback/${hospitalId}`, { state: { hospitalName: hospital?.name || 'Hospital' } });
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.backgroundElements}>
//         <div className="bg-blob" />
//         <div className="bg-blob" />
//       </div>
//       <ChatBot />
//       <div style={styles.contentWrapper}>
//         <div style={styles.heroSection}>
//           <h1 style={styles.title}>Hospital Queue Management</h1>
//           <p style={styles.subtitle}>
//             Find trusted hospitals with real-time bed availability, verified patient ratings, and detailed insights for better healthcare choices.
//           </p>
//           <div style={styles.searchSection}>
//             <div style={styles.searchContainer}>
//               <input
//                 type="text"
//                 placeholder="Search by hospital name, city, state, or pincode..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//                 style={styles.searchInput}
//               />
//               <div className="search-icon" style={styles.searchIcon}>
//                 <Search size={28} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={styles.statsSection}>
//           <div style={styles.statItem}>
//             <div style={styles.statIconContainer}><Hospital size={28} /></div>
//             <div><div style={styles.statNumber}>{totalHospitals}</div><div style={styles.statLabel}>Total Hospitals</div></div>
//           </div>
//           <div style={styles.statItem}>
//             <div style={styles.statIconContainer}><Bed size={28} /></div>
//             <div><div style={styles.statNumber}>{totalBeds}</div><div style={styles.statLabel}>Available Beds</div></div>
//           </div>
//           <div style={styles.statItem}>
//             <div style={styles.statIconContainer}><TrendingUp size={28} /></div>
//             <div><div style={styles.statNumber}>{averageBeds}</div><div style={styles.statLabel}>Average Beds</div></div>
//           </div>
//           <div style={styles.statItem}>
//             <div style={styles.statIconContainer}><AlertCircle size={28} /></div>
//             <div><div style={styles.statNumber}>{lowAvailabilityHospitals}</div><div style={styles.statLabel}>Low Availability</div></div>
//           </div>
//         </div>

//         {!loading && filteredHospitals.length > 0 && (
//           <div style={styles.resultsCount}>
//             Showing {filteredHospitals.length} of {hospitals.length} hospitals{searchQuery && ` for "${searchQuery}"`}
//           </div>
//         )}

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
//             <div style={{ width: '80px', height: '80px', border: '6px solid rgba(226,232,240,0.3)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
//             <h3 style={{ margin: '0 0 1rem', fontSize: '1.8rem', color: '#0f172a' }}>Loading Hospitals...</h3>
//           </div>
//         ) : filteredHospitals.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
//             <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#334155' }}>
//               {searchQuery ? 'No Hospitals Found' : 'No Hospitals Available'}
//             </h2>
//             <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
//               {searchQuery ? 'Try a different search term.' : 'The system currently has no registered hospitals.'}
//             </p>
//           </div>
//         ) : (
//           <div style={styles.hospitalsGrid}>
//             {filteredHospitals.map((hospital) => (
//               <div
//                 key={hospital._id}
//                 style={styles.hospitalCard}
//                 className="hospital-card"
//                 onClick={() => onSelect && onSelect(hospital)}
//               >
//                 <div style={styles.cardImageContainer}>
//                   <img
//                     src={getHospitalImage(hospital)}
//                     alt={hospital.name}
//                     style={styles.cardImage}
//                     onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'}
//                   />
//                   <div className="status-badge-image" style={styles.statusBadgeImage}>
//                     {hospital.status || 'Active'}
//                   </div>
//                 </div>
//                 <div style={styles.cardContent}>
//                   <div>
//                     <h3 style={styles.hospitalName} className="hospital-name">{hospital.name}</h3>
//                     <div style={styles.hospitalLocation}>
//                       <MapPin size={15} />
//                       <span>{hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}</span>
//                     </div>
//                     <div style={styles.detailsGrid}>
//                       <div style={styles.detailItem}>
//                         <div style={styles.detailLeft}>
//                           <Bed size={15} style={styles.detailIcon} />
//                           <div>
//                             <div style={styles.detailLabel}>Available Beds</div>
//                             <div style={styles.detailValue}>{hospital.bedAvailability || 0} ({getBedStatusText(hospital.bedAvailability || 0)})</div>
//                           </div>
//                         </div>
//                         <div style={styles.detailLeft}>
//                           <Clock size={15} style={styles.detailIcon} />
//                           <div>
//                             <div style={styles.detailLabel}>Timings</div>
//                             <div style={styles.detailValue}>{hospital.timings || '24/7'}</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div style={styles.detailItem}>
//                         <div style={styles.detailLeft}>
//                           <Phone size={15} style={styles.detailIcon} />
//                           <div>
//                             <div style={styles.detailLabel}>Contact</div>
//                             <div style={styles.detailValue}>{hospital.contact || hospital.address?.contact || 'N/A'}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <div style={styles.ratingContainer} className="rating-container">
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                         {renderStars(hospital.averageRating || 0)}
//                         <span style={styles.ratingValue}>{(hospital.averageRating || 0).toFixed(1)}</span>
//                       </div>
//                       <span style={styles.ratingCount}>({hospital.ratingCount || 0} reviews)</span>
//                     </div>
//                     <button
//                       onClick={(e) => handleGiveFeedback(hospital._id, e)}
//                       style={styles.giveFeedbackButton}
//                       className="give-feedback-btn"
//                     >
//                       <Star size={16} />
//                       {hospital.ratingCount > 0 ? 'Rate & Review' : 'Be the first to rate'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 60%, #f1f5f9 100%)',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//     color: '#1e293b',
//     position: 'relative',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   backgroundElements: {
//     position: 'fixed',
//     inset: 0,
//     zIndex: 0,
//     pointerEvents: 'none'
//   },
//   contentWrapper: {
//     flex: '1 0 auto',
//     width: '100%',
//     maxWidth: '1440px',
//     margin: '0 auto',
//     padding: '2rem 2rem 6rem',
//     position: 'relative',
//     zIndex: 1
//   },
//   heroSection: {
//     padding: '3rem 0 4rem',
//     textAlign: 'center'
//   },
//   title: {
//     fontSize: '3.5rem',
//     fontWeight: '800',
//     background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     margin: '0 0 1.5rem 0',
//     letterSpacing: '-0.03em',
//     lineHeight: '1.2'
//   },
//   subtitle: {
//     fontSize: '1.35rem',
//     color: '#64748b',
//     maxWidth: '860px',
//     margin: '0 auto 3rem',
//     lineHeight: '1.7',
//     fontWeight: '500'
//   },
//   searchSection: {
//     maxWidth: '860px',
//     margin: '0 auto 4rem'
//   },
//   searchContainer: {
//     position: 'relative',
//     width: '100%'
//   },
//   searchInput: {
//     width: '100%',
//     padding: '1.4rem 4rem 1.4rem 2rem',
//     background: '#ffffff',
//     border: 'none',
//     borderRadius: '20px',
//     fontSize: '1.15rem',
//     color: '#1e293b',
//     outline: 'none',
//     boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
//     transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
//   },
//   searchIcon: {
//     position: 'absolute',
//     right: '1.8rem',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#64748b',
//     transition: 'all 0.4s ease'
//   },
//   statsSection: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
//     gap: '1.8rem',
//     marginBottom: '4rem',
//     padding: '2.5rem',
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(12px)',
//     borderRadius: '24px',
//     border: '1px solid rgba(226, 232, 240, 0.7)',
//     boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
//   },
//   statItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.2rem',
//     padding: '1.8rem',
//     borderRadius: '18px',
//     background: 'rgba(255, 255, 255, 0.6)',
//     border: '1px solid rgba(226, 232, 240, 0.5)',
//     transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
//     cursor: 'default'
//   },
//   statIconContainer: {
//     width: '60px',
//     height: '60px',
//     borderRadius: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
//     color: '#1e40af',
//     transition: 'all 0.5s ease'
//   },
//   statNumber: {
//     fontSize: '2.5rem',
//     fontWeight: '800',
//     background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     lineHeight: '1'
//   },
//   statLabel: {
//     fontSize: '1rem',
//     color: '#64748b',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: '0.6px'
//   },
//   resultsCount: {
//     fontSize: '1.1rem',
//     color: '#475569',
//     marginBottom: '2rem',
//     fontWeight: '600',
//     padding: '1rem 1.5rem',
//     background: '#f1f5f9',
//     borderRadius: '16px',
//     display: 'inline-block',
//     border: '1px solid #e2e8f0'
//   },
//   hospitalsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//     gap: '1.8rem',
//     marginBottom: '4rem'
//   },
//   hospitalCard: {
//     background: '#ffffff',
//     borderRadius: '18px',
//     overflow: 'hidden',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
//     transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
//     cursor: 'pointer',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   cardImageContainer: {
//     height: '180px',
//     overflow: 'hidden',
//     position: 'relative'
//   },
//   cardImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
//   },
//   statusBadgeImage: {
//     position: 'absolute',
//     top: '0.7rem',
//     right: '0.7rem',
//     padding: '0.3rem 0.8rem',
//     borderRadius: '20px',
//     fontSize: '0.72rem',
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//     background: 'rgba(255, 255, 255, 0.96)',
//     backdropFilter: 'blur(12px)',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     transition: 'all 0.4s ease'
//   },
//   cardContent: {
//     padding: '0.9rem',
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between'
//   },
//   hospitalName: {
//     fontSize: '1.2rem',
//     fontWeight: '700',
//     marginBottom: '0.3rem',
//     color: '#0f172a',
//     transition: 'color 0.4s ease'
//   },
//   hospitalLocation: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.4rem',
//     color: '#64748b',
//     fontSize: '0.9rem',
//     marginBottom: '0.6rem'
//   },
//   detailsGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr',
//     gap: '0.5rem',
//     marginBottom: '0.5rem'
//   },
//   detailItem: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: '0.8rem',
//     padding: '0.5rem',
//     background: '#f8fafc',
//     borderRadius: '12px',
//     border: '1px solid #e2e8f0',
//     transition: 'all 0.4s ease'
//   },
//   detailLeft: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     flex: 1
//   },
//   detailIcon: {
//     color: '#3b82f6',
//     flexShrink: 0
//   },
//   detailLabel: {
//     fontSize: '0.7rem',
//     color: '#94a3b8',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px'
//   },
//   detailValue: {
//     fontSize: '0.85rem',
//     fontWeight: '600',
//     color: '#334155'
//   },
//   ratingContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '0.6rem 0.9rem',
//     background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
//     borderRadius: '12px',
//     border: '1px solid #fde68a',
//     marginBottom: '0.5rem',
//     transition: 'all 0.5s ease'
//   },
//   ratingValue: {
//     fontSize: '1.1rem',
//     fontWeight: '800',
//     color: '#92400e',
//     marginLeft: '0.4rem'
//   },
//   ratingCount: {
//     fontSize: '0.8rem',
//     color: '#92400e',
//     fontWeight: '600'
//   },
//   giveFeedbackButton: {
//     width: '100%',
//     padding: '0.75rem',
//     background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '0.9rem',
//     fontWeight: '700',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.4rem',
//     transition: 'all 0.5s ease',
//     position: 'relative',
//     overflow: 'hidden'
//   }
// };

// // Enhanced hover animations and smooth interactions
// if (typeof document !== 'undefined') {
//   const styleSheet = document.createElement('style');
//   styleSheet.textContent = `
//     @keyframes floatBg {
//       0%, 100% { transform: translateY(0) rotate(0deg); }
//       50% { transform: translateY(-20px) rotate(2deg); }
//     }
//     .bg-blob {
//       position: absolute;
//       border-radius: 50%;
//       background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.05));
//       animation: floatBg 28s infinite ease-in-out;
//       opacity: 0.7;
//     }
//     .bg-blob:nth-child(1) {
//       width: 700px;
//       height: 700px;
//       top: -350px;
//       right: -250px;
//       animation-delay: 0s;
//     }
//     .bg-blob:nth-child(2) {
//       width: 600px;
//       height: 600px;
//       bottom: -300px;
//       left: -200px;
//       animation-delay: 14s;
//     }

//     .search-input:hover {
//       transform: translateY(-8px);
//       box-shadow: 0 25px 70px rgba(59, 130, 246, 0.3);
//     }
//     .search-input:focus {
//       transform: translateY(-10px);
//       box-shadow: 0 30px 80px rgba(59, 130, 246, 0.35), 0 0 0 5px rgba(59, 130, 246, 0.2);
//       border: 2px solid #3b82f6;
//     }
//     .search-input:focus ~ .search-icon {
//       color: #3b82f6;
//       transform: translateY(-50%) scale(1.4);
//     }

//     .stat-item:hover {
//       transform: translateY(-12px) scale(1.04);
//       boxShadow: '0 35px 70px rgba(59, 130, 246, 0.25)';
//     }
//     .stat-item:hover .stat-icon-container {
//       transform: scale(1.2) rotate(12deg);
//       background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
//     }

//     .hospital-card:hover {
//       transform: translateY(-16px) scale(1.04);
//       boxShadow: '0 30px 70px rgba(37, 99, 235, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.3)';
//     }
//     .hospital-card:hover .card-image {
//       transform: scale(1.2);
//     }
//     .hospital-card:hover .hospital-name {
//       color: #2563eb;
//     }
//     .hospital-card:hover .detail-item {
//       transform: translateY(-4px);
//       background: #f0f9ff;
//       boxShadow: 0 10px 25px rgba(59, 130, 246, 0.1);
//     }
//     .hospital-card:hover .status-badge-image {
//       transform: scale(1.15);
//       background: rgba(37, 99, 235, 0.9);
//       color: white;
//     }
//     .rating-container:hover {
//       transform: translateY(-6px) scale(1.02);
//       boxShadow: 0 12px 30px rgba(251, 191, 36, 0.2);
//     }
//     .give-feedback-btn:hover {
//       transform: translateY(-6px) scale(1.05);
//       boxShadow: 0 25px 50px rgba(59, 130, 246, 0.5);
//       background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//     }
//   `;
//   document.head.appendChild(styleSheet);
// }

// export default HospitalList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBot from './ChatBot';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Hospital,
  TrendingUp,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Clock,
  Bed
} from 'lucide-react';

const HospitalList = ({ onSelect, token, user }) => {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalsWithRatings = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/hospitals');

        const hospitalsWithRatings = await Promise.all(
          res.data.map(async (hospital) => {
            try {
              const ratingsRes = await axios.get(
                `http://localhost:5000/api/feedback/hospital/${hospital._id}`
              );
              return {
                ...hospital,
                averageRating: ratingsRes.data.averageRating || 0,
                ratingCount: ratingsRes.data.ratingCount || 0,
              };
            } catch (error) {
              return { ...hospital, averageRating: 0, ratingCount: 0 };
            }
          })
        );

        setHospitals(hospitalsWithRatings);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalsWithRatings();
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
  const totalBeds = hospitals.reduce((sum, h) => sum + (h.bedAvailability || 0), 0);
  const averageBeds = totalHospitals > 0 ? Math.round(totalBeds / totalHospitals) : 0;
  const lowAvailabilityHospitals = hospitals.filter(h => (h.bedAvailability || 0) > 0 && (h.bedAvailability || 0) <= 10).length;

  const getBedStatusText = (count) => count === 0 ? 'No Beds' : count <= 10 ? 'Limited' : 'Available';

  const getHospitalImage = (hospital) => {
    if (hospital.image) return hospital.image;
    const defaults = [
      'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    ];
    const index = hospital._id ? hospital._id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % defaults.length : 0;
    return defaults[index];
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) stars.push(<Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />);
      else if (i === full && hasHalf) stars.push(<Star key={i} size={16} fill="#d1d5db" stroke="#f59e0b" />);
      else stars.push(<Star key={i} size={16} fill="none" stroke="#d1d5db" />);
    }
    return stars;
  };

  const handleGiveFeedback = (hospitalId, e) => {
    e.stopPropagation();
    const hospital = hospitals.find(h => h._id === hospitalId);
    navigate(`/feedback/${hospitalId}`, { state: { hospitalName: hospital?.name || 'Hospital' } });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundElements}>
        <div className="bg-blob" />
        <div className="bg-blob" />
      </div>
      <ChatBot />
      <div style={styles.contentWrapper}>
        <div style={styles.heroSection}>
          <h1 style={styles.title} className="animated-title">
            Hospital Queue Management
          </h1>
          <p style={styles.subtitle} className="animated-subtitle">
            Find trusted hospitals with real-time bed availability, verified patient ratings, and detailed insights for better healthcare choices.
          </p>
          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by hospital name, city, state, or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={styles.searchInput}
              />
              <div className="search-icon" style={styles.searchIcon}>
                <Search size={28} />
              </div>
            </div>
          </div>
        </div>

        <div style={styles.statsSection}>
          <div style={styles.statItem} className="stat-item">
            <div style={styles.statIconContainer}><Hospital size={28} /></div>
            <div><div style={styles.statNumber}>{totalHospitals}</div><div style={styles.statLabel}>Total Hospitals</div></div>
          </div>
          <div style={styles.statItem} className="stat-item">
            <div style={styles.statIconContainer}><Bed size={28} /></div>
            <div><div style={styles.statNumber}>{totalBeds}</div><div style={styles.statLabel}>Available Beds</div></div>
          </div>
          <div style={styles.statItem} className="stat-item">
            <div style={styles.statIconContainer}><TrendingUp size={28} /></div>
            <div><div style={styles.statNumber}>{averageBeds}</div><div style={styles.statLabel}>Average Beds</div></div>
          </div>
          <div style={styles.statItem} className="stat-item">
            <div style={styles.statIconContainer}><AlertCircle size={28} /></div>
            <div><div style={styles.statNumber}>{lowAvailabilityHospitals}</div><div style={styles.statLabel}>Low Availability</div></div>
          </div>
        </div>

        {!loading && filteredHospitals.length > 0 && (
          <div style={styles.resultsCount}>
            Showing {filteredHospitals.length} of {hospitals.length} hospitals{searchQuery && ` for "${searchQuery}"`}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
            <div style={{ width: '80px', height: '80px', border: '6px solid rgba(226,232,240,0.3)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.8rem', color: '#0f172a' }}>Loading Hospitals...</h3>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#334155' }}>
              {searchQuery ? 'No Hospitals Found' : 'No Hospitals Available'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
              {searchQuery ? 'Try a different search term.' : 'The system currently has no registered hospitals.'}
            </p>
          </div>
        ) : (
          <div style={styles.hospitalsGrid}>
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital._id}
                style={styles.hospitalCard}
                className="hospital-card"
                onClick={() => onSelect && onSelect(hospital)}
              >
                <div style={styles.cardImageContainer}>
                  <img
                    src={getHospitalImage(hospital)}
                    alt={hospital.name}
                    style={styles.cardImage}
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1516549655669-df565bc5d1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'}
                  />
                  <div className="status-badge-image" style={styles.statusBadgeImage}>
                    {hospital.status || 'Active'}
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <div>
                    <h3 style={styles.hospitalName} className="hospital-name">{hospital.name}</h3>
                    <div style={styles.hospitalLocation}>
                      <MapPin size={15} />
                      <span>{hospital.address?.city || 'City'}, {hospital.address?.state || 'State'}</span>
                    </div>
                    <div style={styles.detailsGrid}>
                      <div style={styles.detailItem}>
                        <div style={styles.detailLeft}>
                          <Bed size={15} style={styles.detailIcon} />
                          <div>
                            <div style={styles.detailLabel}>Available Beds</div>
                            <div style={styles.detailValue}>{hospital.bedAvailability || 0} ({getBedStatusText(hospital.bedAvailability || 0)})</div>
                          </div>
                        </div>
                        <div style={styles.detailLeft}>
                          <Clock size={15} style={styles.detailIcon} />
                          <div>
                            <div style={styles.detailLabel}>Timings</div>
                            <div style={styles.detailValue}>{hospital.timings || '24/7'}</div>
                          </div>
                        </div>
                      </div>
                      <div style={styles.detailItem}>
                        <div style={styles.detailLeft}>
                          <Phone size={15} style={styles.detailIcon} />
                          <div>
                            <div style={styles.detailLabel}>Contact</div>
                            <div style={styles.detailValue}>{hospital.contact || hospital.address?.contact || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={styles.ratingContainer} className="rating-container">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {renderStars(hospital.averageRating || 0)}
                        <span style={styles.ratingValue}>{(hospital.averageRating || 0).toFixed(1)}</span>
                      </div>
                      <span style={styles.ratingCount}>({hospital.ratingCount || 0} reviews)</span>
                    </div>
                    <button
                      onClick={(e) => handleGiveFeedback(hospital._id, e)}
                      style={styles.giveFeedbackButton}
                      className="give-feedback-btn"
                    >
                      <Star size={16} />
                      {hospital.ratingCount > 0 ? 'Rate & Review' : 'Be the first to rate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 60%, #f1f5f9 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1e293b',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  backgroundElements: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none'
  },
  contentWrapper: {
    flex: '1 0 auto',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '2rem 2rem 6rem',
    position: 'relative',
    zIndex: 1
  },
  heroSection: {
    padding: '3rem 0 4rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 1.5rem 0',
    letterSpacing: '-0.03em',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: '1.35rem',
    color: '#64748b',
    maxWidth: '860px',
    margin: '0 auto 3rem',
    lineHeight: '1.7',
    fontWeight: '500'
  },
  searchSection: {
    maxWidth: '860px',
    margin: '0 auto 4rem'
  },
  searchContainer: {
    position: 'relative',
    width: '100%'
  },
  searchInput: {
    width: '100%',
    padding: '1.4rem 4rem 1.4rem 2rem',
    background: '#ffffff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1.15rem',
    color: '#1e293b',
    outline: 'none',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  searchIcon: {
    position: 'absolute',
    right: '1.8rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    transition: 'all 0.4s ease'
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.8rem',
    marginBottom: '4rem',
    padding: '2.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(226, 232, 240, 0.7)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.8rem',
    borderRadius: '18px',
    background: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'default'
  },
  statIconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    color: '#1e40af',
    transition: 'all 0.5s ease'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1'
  },
  statLabel: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.6px'
  },
  resultsCount: {
    fontSize: '1.1rem',
    color: '#475569',
    marginBottom: '2rem',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    background: '#f1f5f9',
    borderRadius: '16px',
    display: 'inline-block',
    border: '1px solid #e2e8f0'
  },
  hospitalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.8rem',
    marginBottom: '4rem'
  },
  hospitalCard: {
    background: '#ffffff',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column'
  },
  cardImageContainer: {
    height: '180px',
    overflow: 'hidden',
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },
  statusBadgeImage: {
    position: 'absolute',
    top: '0.7rem',
    right: '0.7rem',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s ease'
  },
  cardContent: {
    padding: '0.9rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  hospitalName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '0.3rem',
    color: '#0f172a',
    transition: 'color 0.4s ease'
  },
  hospitalLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#64748b',
    fontSize: '0.9rem',
    marginBottom: '0.6rem'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.8rem',
    padding: '0.5rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.4s ease'
  },
  detailLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: 1
  },
  detailIcon: {
    color: '#3b82f6',
    flexShrink: 0
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
    color: '#334155'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0.9rem',
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    borderRadius: '12px',
    border: '1px solid #fde68a',
    marginBottom: '0.5rem',
    transition: 'all 0.5s ease'
  },
  ratingValue: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#92400e',
    marginLeft: '0.4rem'
  },
  ratingCount: {
    fontSize: '0.8rem',
    color: '#92400e',
    fontWeight: '600'
  },
  giveFeedbackButton: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    transition: 'all 0.5s ease',
    position: 'relative',
    overflow: 'hidden'
  }
};

// Enhanced animations for title and subtitle
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes floatBg {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    .bg-blob {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.05));
      animation: floatBg 28s infinite ease-in-out;
      opacity: 0.7;
    }
    .bg-blob:nth-child(1) {
      width: 700px;
      height: 700px;
      top: -350px;
      right: -250px;
      animation-delay: 0s;
    }
    .bg-blob:nth-child(2) {
      width: 600px;
      height: 600px;
      bottom: -300px;
      left: -200px;
      animation-delay: 14s;
    }

    .animated-title {
      opacity: 0;
      animation: fadeInUp 1.2s ease-out forwards;
      animation-delay: 0.3s;
    }

    .animated-subtitle {
      opacity: 0;
      animation: fadeInUp 1.4s ease-out forwards;
      animation-delay: 0.6s;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .search-input:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 70px rgba(59, 130, 246, 0.3);
    }
    .search-input:focus {
      transform: translateY(-10px);
      box-shadow: 0 30px 80px rgba(59, 130, 246, 0.35), 0 0 0 5px rgba(59, 130, 246, 0.2);
      border: 2px solid #3b82f6;
    }
    .search-input:focus ~ .search-icon {
      color: #3b82f6;
      transform: translateY(-50%) scale(1.4);
    }

    .stat-item:hover {
      transform: translateY(-12px) scale(1.04);
      box-shadow: 0 35px 70px rgba(59, 130, 246, 0.25);
    }
    .stat-item:hover .stat-icon-container {
      transform: scale(1.2) rotate(12deg);
      background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
    }

    .hospital-card:hover {
      transform: translateY(-16px) scale(1.04);
      box-shadow: 0 30px 70px rgba(37, 99, 235, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.3);
    }
    .hospital-card:hover .card-image {
      transform: scale(1.2);
    }
    .hospital-card:hover .hospital-name {
      color: #2563eb;
    }
    .hospital-card:hover .detail-item {
      transform: translateY(-4px);
      background: #f0f9ff;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.1);
    }
    .hospital-card:hover .status-badge-image {
      transform: scale(1.15);
      background: rgba(37, 99, 235, 0.9);
      color: white;
    }
    .rating-container:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 30px rgba(251, 191, 36, 0.2);
    }
    .give-feedback-btn:hover {
      transform: translateY(-6px) scale(1.05);
      box-shadow: 0 25px 50px rgba(59, 130, 246, 0.5);
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default HospitalList;