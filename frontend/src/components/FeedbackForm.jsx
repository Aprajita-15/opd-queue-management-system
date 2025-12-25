// // components/FeedbackForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';

// const FeedbackForm = ({ user, token }) => {
//   const { hospitalId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get hospital name from navigation state
//   const hospitalName = location.state?.hospitalName || 'Selected Hospital';
  
//   console.log('🔍 FeedbackForm loaded:', {
//     hospitalId,
//     hospitalName,
//     userId: user?._id,
//     userName: user?.name
//   });
  
//   const [formData, setFormData] = useState({
//     hospitalId: hospitalId,
//     hospitalName: hospitalName,
//     userId: user?._id || '',
//     userName: user?.name || user?.username || '',
//     userEmail: user?.email || '',
//     rating: 0,
//     waitTimeRating: 0,
//     staffRating: 0,
//     facilitiesRating: 0,
//     comments: '',
//     visitDate: new Date().toISOString().split('T')[0], // Today's date as default
//     visitType: 'OPD',
//     recommend: null
//   });

//   const [hospitalDetails, setHospitalDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [hoverWaitTime, setHoverWaitTime] = useState(0);
//   const [hoverStaff, setHoverStaff] = useState(0);
//   const [hoverFacilities, setHoverFacilities] = useState(0);

//   useEffect(() => {
//     const fetchHospitalDetails = async () => {
//       if (!hospitalId) {
//         console.error('No hospital ID provided');
//         setLoading(false);
//         return;
//       }
      
//       try {
//         console.log(`Fetching details for hospital: ${hospitalId}`);
//         const res = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
//         setHospitalDetails(res.data);
//         setFormData(prev => ({
//           ...prev,
//           hospitalName: res.data.name
//         }));
//         console.log('Hospital details fetched:', res.data.name);
//       } catch (error) {
//         console.error('Error fetching hospital details:', error);
//         // Continue without hospital details - use the name from navigation state
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHospitalDetails();
//   }, [hospitalId]);

//   const handleRatingChange = (category, value) => {
//     console.log(`Rating ${category} changed to: ${value}`);
//     setFormData(prev => ({
//       ...prev,
//       [category]: value
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Input ${name} changed to: ${value}`);
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log('📤 Submitting feedback...', formData);
  
//   if (!token) {
//     alert('Please login to submit feedback');
//     navigate('/login');
//     return;
//   }

//   if (formData.rating === 0) {
//     alert('Please provide an overall rating');
//     return;
//   }

//   setSubmitting(true);
//   try {
//     // Prepare data for MongoDB
//     const feedbackData = {
//       hospitalId: hospitalId,
//       hospitalName: hospitalDetails?.name || hospitalName,
//       userId: user?._id || `user-${Date.now()}`,
//       userName: user?.name || user?.username || 'Anonymous',
//       userEmail: user?.email || '',
//       rating: formData.rating,
//       waitTimeRating: formData.waitTimeRating || 0,
//       staffRating: formData.staffRating || 0,
//       facilitiesRating: formData.facilitiesRating || 0,
//       comments: formData.comments,
//       visitDate: formData.visitDate,
//       visitType: formData.visitType,
//       recommend: formData.recommend
//     };

//     console.log('Sending to MongoDB:', feedbackData);
    
//     // Send to backend
//     const response = await axios.post(
//       'http://localhost:5000/api/feedback/submit',
//       feedbackData
//     );
    
//     console.log('✅ MongoDB Response:', response.data);
    
//     if (response.data.success) {
//       alert('✅ Thank you! Your feedback has been saved.');
//       navigate('/hospitals');
//     } else {
//       alert(`Error: ${response.data.message}`);
//     }
    
//   } catch (error) {
//     console.error('❌ Error saving to MongoDB:', error);
    
//     if (error.response?.status === 500) {
//       alert('⚠️ Database error. Please check if MongoDB is running.');
//       console.log('MongoDB might not be running. Start it with: mongod');
//     } else if (error.code === 'ERR_NETWORK') {
//       alert('⚠️ Cannot connect to server. Please check if backend is running on port 5000.');
//     } else {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
    
//   } finally {
//     setSubmitting(false);
//   }
// };

//   const RatingStars = ({ category, currentRating, hoverRating, setHover }) => {
//     const labels = {
//       rating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
//       waitTimeRating: ['Very Long', 'Long', 'Average', 'Short', 'Very Short'],
//       staffRating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
//       facilitiesRating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
//     };

//     return (
//       <div style={styles.ratingContainer}>
//         <div style={styles.starsContainer}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               style={styles.starButton}
//               onMouseEnter={() => setHover(star)}
//               onMouseLeave={() => setHover(0)}
//               onClick={() => handleRatingChange(category, star)}
//               aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
//             >
//               <span style={{
//                 ...styles.star,
//                 color: star <= (hoverRating || currentRating) ? '#f59e0b' : '#e5e7eb',
//                 fontSize: '2.2rem'
//               }}>
//                 ★
//               </span>
//             </button>
//           ))}
//         </div>
//         <div style={styles.ratingLabel}>
//           {currentRating > 0 ? labels[category][currentRating - 1] : 'Click to rate'}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.loadingSpinner}></div>
//         <h3>Loading hospital details...</h3>
//         <p>Please wait while we fetch information about the hospital</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <button 
//           style={styles.backButton}
//           onClick={() => navigate(-1)}
//           aria-label="Go back"
//         >
//           ← Back
//         </button>
//         <h1 style={styles.title}>Share Your Experience</h1>
//         <p style={styles.subtitle}>
//           Rate your experience at <strong style={{color: '#2563eb'}}>
//             {hospitalDetails?.name || hospitalName}
//           </strong>
//         </p>
//         <p style={styles.userInfo}>
//           Reviewing as: <strong>{user?.name || user?.email || 'User'}</strong>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Overall Rating - REQUIRED */}
//         <div style={styles.section}>
//           <h3 style={styles.sectionTitle}>
//             Overall Rating <span style={styles.required}>*</span>
//           </h3>
//           <p style={styles.sectionDescription}>
//             How would you rate your overall experience?
//           </p>
//           <RatingStars
//             category="rating"
//             currentRating={formData.rating}
//             hoverRating={hoverRating}
//             setHover={setHoverRating}
//           />
//         </div>

//         {/* Category Ratings */}
//         <div style={styles.section}>
//           <h3 style={styles.sectionTitle}>Rate Specific Aspects</h3>
//           <p style={styles.sectionDescription}>
//             Rate individual aspects of your hospital visit (optional)
//           </p>
          
//           <div style={styles.categoryRating}>
//             <div style={styles.categoryHeader}>
//               <span style={styles.categoryLabel}>⏱️ Wait Time</span>
//               <span style={styles.categoryHint}>
//                 {formData.waitTimeRating > 0 ? 
//                   ['Very Long', 'Long', 'Average', 'Short', 'Very Short'][formData.waitTimeRating - 1] : 
//                   'How long did you wait?'}
//               </span>
//             </div>
//             <RatingStars
//               category="waitTimeRating"
//               currentRating={formData.waitTimeRating}
//               hoverRating={hoverWaitTime}
//               setHover={setHoverWaitTime}
//             />
//           </div>

//           <div style={styles.categoryRating}>
//             <div style={styles.categoryHeader}>
//               <span style={styles.categoryLabel}>👨‍⚕️ Staff Behavior</span>
//               <span style={styles.categoryHint}>
//                 {formData.staffRating > 0 ? 
//                   ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.staffRating - 1] : 
//                   'How was the staff?'}
//               </span>
//             </div>
//             <RatingStars
//               category="staffRating"
//               currentRating={formData.staffRating}
//               hoverRating={hoverStaff}
//               setHover={setHoverStaff}
//             />
//           </div>

//           <div style={styles.categoryRating}>
//             <div style={styles.categoryHeader}>
//               <span style={styles.categoryLabel}>🏥 Facilities & Cleanliness</span>
//               <span style={styles.categoryHint}>
//                 {formData.facilitiesRating > 0 ? 
//                   ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.facilitiesRating - 1] : 
//                   'How were the facilities?'}
//               </span>
//             </div>
//             <RatingStars
//               category="facilitiesRating"
//               currentRating={formData.facilitiesRating}
//               hoverRating={hoverFacilities}
//               setHover={setHoverFacilities}
//             />
//           </div>
//         </div>

//         {/* Visit Details */}
//         <div style={styles.section}>
//           <h3 style={styles.sectionTitle}>Visit Details</h3>
          
//           <div style={styles.formRow}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 Visit Date <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="date"
//                 name="visitDate"
//                 value={formData.visitDate}
//                 onChange={handleInputChange}
//                 required
//                 style={styles.input}
//                 max={new Date().toISOString().split('T')[0]}
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 Visit Type <span style={styles.required}>*</span>
//               </label>
//               <select
//                 name="visitType"
//                 value={formData.visitType}
//                 onChange={handleInputChange}
//                 required
//                 style={styles.select}
//               >
//                 <option value="OPD">OPD (Outpatient)</option>
//                 <option value="Emergency">Emergency</option>
//                 <option value="IPD">IPD (Admission)</option>
//                 <option value="Follow-up">Follow-up Visit</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Recommendation */}
//         <div style={styles.section}>
//           <h3 style={styles.sectionTitle}>Would you recommend this hospital?</h3>
//           <div style={styles.recommendContainer}>
//             <button
//               type="button"
//               style={{
//                 ...styles.recommendButton,
//                 ...(formData.recommend === true ? styles.recommendYes : {})
//               }}
//               onClick={() => {
//                 console.log('Recommend: Yes');
//                 setFormData(prev => ({ ...prev, recommend: true }));
//               }}
//               aria-label="Recommend: Yes"
//             >
//               <span style={styles.recommendIcon}>👍</span> Yes
//             </button>
//             <button
//               type="button"
//               style={{
//                 ...styles.recommendButton,
//                 ...(formData.recommend === false ? styles.recommendNo : {})
//               }}
//               onClick={() => {
//                 console.log('Recommend: No');
//                 setFormData(prev => ({ ...prev, recommend: false }));
//               }}
//               aria-label="Recommend: No"
//             >
//               <span style={styles.recommendIcon}>👎</span> No
//             </button>
//             <button
//               type="button"
//               style={{
//                 ...styles.recommendButton,
//                 ...(formData.recommend === null ? styles.recommendNeutral : {})
//               }}
//               onClick={() => {
//                 console.log('Recommend: Not Sure');
//                 setFormData(prev => ({ ...prev, recommend: null }));
//               }}
//               aria-label="Recommend: Not Sure"
//             >
//               <span style={styles.recommendIcon}>🤷</span> Not Sure
//             </button>
//           </div>
//           <p style={styles.recommendHint}>
//             {formData.recommend === true && "Great! Others will appreciate your recommendation."}
//             {formData.recommend === false && "Thank you for your honest feedback."}
//             {formData.recommend === null && "Your feedback is still valuable!"}
//           </p>
//         </div>

//         {/* Comments */}
//         <div style={styles.section}>
//           <h3 style={styles.sectionTitle}>Share Your Experience</h3>
//           <p style={styles.sectionDescription}>
//             Tell us about your visit. What went well? What could be improved?
//           </p>
//           <textarea
//             name="comments"
//             value={formData.comments}
//             onChange={handleInputChange}
//             placeholder="Share details about your experience... For example: 'The doctors were very attentive, but the waiting time was longer than expected.'"
//             rows="6"
//             style={styles.textarea}
//             maxLength="1000"
//           />
//           <div style={styles.charCount}>
//             <span style={formData.comments.length >= 1000 ? {color: '#dc2626'} : {}}>
//               {formData.comments.length}/1000 characters
//             </span>
//             {formData.comments.length >= 800 && (
//               <span style={{color: '#d97706', marginLeft: '1rem'}}>
//                 {formData.comments.length >= 950 ? '⚠️ Almost full!' : '✓ Good length'}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div style={styles.submitContainer}>
//           <button
//             type="submit"
//             disabled={submitting || formData.rating === 0}
//             style={{
//               ...styles.submitButton,
//               ...(submitting ? styles.submittingButton : {}),
//               ...(formData.rating === 0 ? styles.disabledButton : {})
//             }}
//           >
//             {submitting ? (
//               <>
//                 <span style={styles.submitSpinner}></span> Submitting...
//               </>
//             ) : (
//               'Submit Feedback'
//             )}
//           </button>
          
//           {formData.rating === 0 && (
//             <p style={styles.validationError}>
//               ⚠️ Please provide an overall rating before submitting
//             </p>
//           )}
          
//           <p style={styles.privacyNote}>
//             Your feedback is anonymous and will be used to improve hospital services.
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '6rem auto 2rem',
//     padding: '0 1rem',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '3rem',
//     position: 'relative'
//   },
//   backButton: {
//     position: 'absolute',
//     left: '0',
//     top: '0',
//     background: 'none',
//     border: '1px solid #e5e7eb',
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     color: '#6b7280',
//     fontSize: '1rem',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       background: '#f3f4f6',
//       borderColor: '#d1d5db'
//     }
//   },
//   title: {
//     fontSize: '2.5rem',
//     fontWeight: '800',
//     color: '#0f172a',
//     marginBottom: '0.5rem',
//     background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent'
//   },
//   subtitle: {
//     fontSize: '1.2rem',
//     color: '#64748b',
//     marginBottom: '0.5rem'
//   },
//   userInfo: {
//     fontSize: '0.9rem',
//     color: '#94a3b8',
//     fontStyle: 'italic'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '2rem'
//   },
//   section: {
//     padding: '2rem',
//     background: 'white',
//     borderRadius: '16px',
//     border: '1px solid #e2e8f0',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       boxShadow: '0 6px 25px rgba(0,0,0,0.08)'
//     }
//   },
//   sectionTitle: {
//     fontSize: '1.3rem',
//     fontWeight: '700',
//     color: '#1e293b',
//     marginBottom: '0.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.25rem'
//   },
//   sectionDescription: {
//     fontSize: '0.95rem',
//     color: '#64748b',
//     marginBottom: '1.5rem',
//     lineHeight: '1.5'
//   },
//   required: {
//     color: '#dc2626',
//     fontSize: '1.2rem'
//   },
//   ratingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '0.75rem'
//   },
//   starsContainer: {
//     display: 'flex',
//     gap: '0.5rem'
//   },
//   starButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '0.5rem',
//     borderRadius: '50%',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       background: '#f8fafc',
//       transform: 'scale(1.1)'
//     }
//   },
//   star: {
//     fontSize: '2.2rem',
//     transition: 'color 0.2s ease',
//     display: 'inline-block'
//   },
//   ratingLabel: {
//     fontSize: '1rem',
//     color: '#475569',
//     fontWeight: '600',
//     minHeight: '1.5rem'
//   },
//   categoryRating: {
//     marginBottom: '2rem',
//     '&:last-child': {
//       marginBottom: 0
//     }
//   },
//   categoryHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '0.75rem'
//   },
//   categoryLabel: {
//     fontSize: '1rem',
//     fontWeight: '600',
//     color: '#374151'
//   },
//   categoryHint: {
//     fontSize: '0.85rem',
//     color: '#9ca3af',
//     fontStyle: 'italic'
//   },
//   formRow: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '1.5rem',
//     '@media (max-width: 640px)': {
//       gridTemplateColumns: '1fr'
//     }
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   label: {
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     color: '#475569',
//     marginBottom: '0.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.25rem'
//   },
//   input: {
//     padding: '0.875rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '10px',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease',
//     outline: 'none',
//     '&:focus': {
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
//     }
//   },
//   select: {
//     padding: '0.875rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '10px',
//     fontSize: '1rem',
//     background: 'white',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     outline: 'none',
//     '&:focus': {
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
//     }
//   },
//   recommendContainer: {
//     display: 'flex',
//     gap: '1rem',
//     justifyContent: 'center',
//     marginBottom: '1rem',
//     flexWrap: 'wrap'
//   },
//   recommendButton: {
//     padding: '1rem 1.5rem',
//     border: '2px solid #e5e7eb',
//     borderRadius: '12px',
//     background: 'white',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: '600',
//     transition: 'all 0.2s ease',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     minWidth: '120px',
//     justifyContent: 'center',
//     '&:hover': {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//     }
//   },
//   recommendIcon: {
//     fontSize: '1.2rem'
//   },
//   recommendYes: {
//     background: '#dcfce7',
//     borderColor: '#86efac',
//     color: '#16a34a'
//   },
//   recommendNo: {
//     background: '#fee2e2',
//     borderColor: '#fca5a5',
//     color: '#dc2626'
//   },
//   recommendNeutral: {
//     background: '#fef3c7',
//     borderColor: '#fde68a',
//     color: '#d97706'
//   },
//   recommendHint: {
//     textAlign: 'center',
//     fontSize: '0.9rem',
//     color: '#6b7280',
//     fontStyle: 'italic',
//     marginTop: '0.5rem'
//   },
//   textarea: {
//     width: '100%',
//     padding: '1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '10px',
//     fontSize: '1rem',
//     fontFamily: 'inherit',
//     resize: 'vertical',
//     minHeight: '150px',
//     lineHeight: '1.5',
//     transition: 'all 0.2s ease',
//     outline: 'none',
//     '&:focus': {
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
//     },
//     '&::placeholder': {
//       color: '#9ca3af'
//     }
//   },
//   charCount: {
//     textAlign: 'right',
//     fontSize: '0.85rem',
//     color: '#6b7280',
//     marginTop: '0.5rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   submitContainer: {
//     textAlign: 'center',
//     marginTop: '1rem',
//     marginBottom: '3rem'
//   },
//   submitButton: {
//     padding: '1rem 3rem',
//     background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '1.1rem',
//     fontWeight: '700',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     minWidth: '250px',
//     boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.75rem',
//     '&:hover:not(:disabled)': {
//       transform: 'translateY(-3px)',
//       boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)',
//       background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
//     },
//     '&:active:not(:disabled)': {
//       transform: 'translateY(-1px)'
//     }
//   },
//   submittingButton: {
//     background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
//     boxShadow: '0 4px 20px rgba(75, 85, 99, 0.3)'
//   },
//   disabledButton: {
//     background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
//     cursor: 'not-allowed',
//     boxShadow: 'none',
//     '&:hover': {
//       transform: 'none',
//       boxShadow: 'none'
//     }
//   },
//   submitSpinner: {
//     width: '18px',
//     height: '18px',
//     border: '2px solid rgba(255,255,255,0.3)',
//     borderTopColor: 'white',
//     borderRadius: '50%',
//     animation: 'spin 0.8s linear infinite',
//     display: 'inline-block'
//   },
//   validationError: {
//     color: '#dc2626',
//     fontSize: '0.9rem',
//     marginTop: '0.75rem',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.5rem'
//   },
//   privacyNote: {
//     fontSize: '0.85rem',
//     color: '#6b7280',
//     marginTop: '1.5rem',
//     fontStyle: 'italic'
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '70vh',
//     textAlign: 'center'
//   },
//   loadingSpinner: {
//     width: '60px',
//     height: '60px',
//     border: '4px solid #e2e8f0',
//     borderTopColor: '#2563eb',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//     marginBottom: '1.5rem'
//   }
// };

// // Add CSS animations globally
// if (typeof document !== 'undefined') {
//   const styleSheet = document.createElement('style');
//   styleSheet.textContent = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
    
//     @media (max-width: 640px) {
//       .form-row-responsive {
//         grid-template-columns: 1fr !important;
//       }
//     }
//   `;
//   document.head.appendChild(styleSheet);
// }

// export default FeedbackForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const FeedbackForm = ({ user, token }) => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const hospitalName = location.state?.hospitalName || 'Selected Hospital';
  
  const [formData, setFormData] = useState({
    hospitalId: hospitalId,
    hospitalName: hospitalName,
    userId: user?._id || '',
    userName: user?.name || user?.username || '',
    userEmail: user?.email || '',
    rating: 0,
    waitTimeRating: 0,
    staffRating: 0,
    facilitiesRating: 0,
    comments: '',
    visitDate: new Date().toISOString().split('T')[0],
    visitType: 'OPD',
    recommend: null
  });

  const [hospitalDetails, setHospitalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [hoverWaitTime, setHoverWaitTime] = useState(0);
  const [hoverStaff, setHoverStaff] = useState(0);
  const [hoverFacilities, setHoverFacilities] = useState(0);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      if (!hospitalId) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
        setHospitalDetails(res.data);
        setFormData(prev => ({
          ...prev,
          hospitalName: res.data.name
        }));
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [hospitalId]);

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: value
    }));
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
    
    if (!token) {
      alert('Please login to submit feedback');
      navigate('/login');
      return;
    }

    if (formData.rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setSubmitting(true);
    try {
      const feedbackData = {
        hospitalId: hospitalId,
        hospitalName: hospitalDetails?.name || hospitalName,
        userId: user?._id || `user-${Date.now()}`,
        userName: user?.name || user?.username || 'Anonymous',
        userEmail: user?.email || '',
        rating: formData.rating,
        waitTimeRating: formData.waitTimeRating || 0,
        staffRating: formData.staffRating || 0,
        facilitiesRating: formData.facilitiesRating || 0,
        comments: formData.comments,
        visitDate: formData.visitDate,
        visitType: formData.visitType,
        recommend: formData.recommend
      };
      
      const response = await axios.post(
        'http://localhost:5000/api/feedback/submit',
        feedbackData
      );
      
      if (response.data.success) {
        alert('✅ Thank you! Your feedback has been saved.');
        navigate('/hospitals');
      } else {
        alert(`Error: ${response.data.message}`);
      }
      
    } catch (error) {
      console.error('❌ Error saving to MongoDB:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const RatingStars = ({ category, currentRating, hoverRating, setHover }) => {
    const labels = {
      rating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      waitTimeRating: ['Very Long', 'Long', 'Average', 'Short', 'Very Short'],
      staffRating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      facilitiesRating: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    };

    return (
      <div style={styles.ratingContainer}>
        <div style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              style={styles.starButton}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRatingChange(category, star)}
              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            >
              <span style={{
                ...styles.star,
                color: star <= (hoverRating || currentRating) ? '#f59e0b' : '#e5e7eb',
                fontSize: '2.4rem',
                transition: 'all 0.2s ease'
              }}>
                ★
              </span>
            </button>
          ))}
        </div>
        <div style={styles.ratingLabel}>
          {currentRating > 0 ? labels[category][currentRating - 1] : 'Click to rate'}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <h3>Loading hospital details...</h3>
        <p>Please wait while we fetch information about the hospital</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button 
            style={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← Back
          </button>
          <h1 style={styles.title}>Share Your Experience</h1>
          <p style={styles.subtitle}>
            Rate your experience at <strong style={{color: '#fcfdffff'}}>
              {hospitalDetails?.name || hospitalName}
            </strong>
          </p>
          <p style={styles.userInfo}>
            Reviewing as: <strong>{user?.name || user?.email || 'User'}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Overall Rating */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              Overall Rating <span style={styles.required}>*</span>
            </h3>
            <p style={styles.sectionDescription}>
              How would you rate your overall experience?
            </p>
            <RatingStars
              category="rating"
              currentRating={formData.rating}
              hoverRating={hoverRating}
              setHover={setHoverRating}
            />
          </div>

          {/* Category Ratings */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Rate Specific Aspects</h3>
            <p style={styles.sectionDescription}>
              Rate individual aspects of your hospital visit (optional)
            </p>
            
            <div style={styles.categoryRating}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryLabel}>⏱️ Wait Time</span>
              </div>
              <RatingStars
                category="waitTimeRating"
                currentRating={formData.waitTimeRating}
                hoverRating={hoverWaitTime}
                setHover={setHoverWaitTime}
              />
            </div>

            <div style={styles.categoryRating}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryLabel}>👨‍⚕️ Staff Behavior</span>
              </div>
              <RatingStars
                category="staffRating"
                currentRating={formData.staffRating}
                hoverRating={hoverStaff}
                setHover={setHoverStaff}
              />
            </div>

            <div style={styles.categoryRating}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryLabel}>🏥 Facilities & Cleanliness</span>
              </div>
              <RatingStars
                category="facilitiesRating"
                currentRating={formData.facilitiesRating}
                hoverRating={hoverFacilities}
                setHover={setHoverFacilities}
              />
            </div>
          </div>

          {/* Visit Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Visit Details</h3>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Visit Date <span style={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Visit Type <span style={styles.required}>*</span>
                </label>
                <select
                  name="visitType"
                  value={formData.visitType}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                >
                  <option value="OPD">OPD (Outpatient)</option>
                  <option value="Emergency">Emergency</option>
                  <option value="IPD">IPD (Admission)</option>
                  <option value="Follow-up">Follow-up Visit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Would you recommend this hospital?</h3>
            <div style={styles.recommendContainer}>
              <button
                type="button"
                style={{
                  ...styles.recommendButton,
                  ...(formData.recommend === true ? styles.recommendYes : {})
                }}
                onClick={() => setFormData(prev => ({ ...prev, recommend: true }))}
              >
                <span style={styles.recommendIcon}>👍</span> Yes
              </button>
              <button
                type="button"
                style={{
                  ...styles.recommendButton,
                  ...(formData.recommend === false ? styles.recommendNo : {})
                }}
                onClick={() => setFormData(prev => ({ ...prev, recommend: false }))}
              >
                <span style={styles.recommendIcon}>👎</span> No
              </button>
              <button
                type="button"
                style={{
                  ...styles.recommendButton,
                  ...(formData.recommend === null ? styles.recommendNeutral : {})
                }}
                onClick={() => setFormData(prev => ({ ...prev, recommend: null }))}
              >
                <span style={styles.recommendIcon}>🤷</span> Not Sure
              </button>
            </div>
          </div>

          {/* Comments */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Share Your Experience</h3>
            <p style={styles.sectionDescription}>
              Tell us about your visit. What went well? What could be improved?
            </p>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="Share details about your experience..."
              rows="6"
              style={styles.textarea}
              maxLength="1000"
            />
            <div style={styles.charCount}>
              {formData.comments.length}/1000 characters
            </div>
          </div>

          {/* Submit Button */}
          <div style={styles.submitContainer}>
            <button
              type="submit"
              disabled={submitting || formData.rating === 0}
              style={{
                ...styles.submitButton,
                opacity: submitting || formData.rating === 0 ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!submitting && formData.rating !== 0) {
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
              {submitting ? (
                <>
                  <span style={styles.submitSpinner}></span> Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
            
            {formData.rating === 0 && (
              <p style={styles.validationError}>
                ⚠️ Please provide an overall rating before submitting
              </p>
            )}
            
            <p style={styles.privacyNote}>
              Your feedback is anonymous and will be used to improve hospital services.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced blue-themed styles matching your Profile page
const styles = {
  container: {
    minHeight: 'calc(100vh - 50px)',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem 1rem',
  },
  card: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
    border: '1px solid #bfdbfe',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '4rem 2rem 3rem',
    textAlign: 'center',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    left: '2rem',
    top: '2rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: '700',
    margin: '0 0 1rem 0'
  },
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.95,
    marginBottom: '0.75rem'
  },
  userInfo: {
    fontSize: '1rem',
    opacity: 0.9
  },
  form: {
    padding: '3rem'
  },
  section: {
    marginBottom: '2.5rem',
    padding: '2rem',
    backgroundColor: '#f8fbff',
    borderRadius: '16px',
    border: '2px solid #bfdbfe',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.08)'
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '1rem'
  },
  sectionDescription: {
    fontSize: '1.05rem',
    color: '#64748b',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  required: {
    color: '#dc2626',
    marginLeft: '6px'
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  starsContainer: {
    display: 'flex',
    gap: '0.75rem'
  },
  starButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'all 0.3s ease'
  },
  star: {
    transition: 'all 0.3s ease'
  },
  ratingLabel: {
    fontSize: '1.1rem',
    color: '#475569',
    fontWeight: '600'
  },
  categoryRating: {
    marginBottom: '2rem'
  },
  categoryHeader: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  categoryLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e40af'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1e40af'
  },
  input: {
    padding: '1rem 1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '14px',
    fontSize: '1.05rem',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  recommendContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1.5rem',
    flexWrap: 'wrap'
  },
  recommendButton: {
    padding: '1rem 2rem',
    border: '2px solid #e2e8f0',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s ease'
  },
  recommendIcon: {
    fontSize: '1.5rem'
  },
  recommendYes: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
    color: '#16a34a'
  },
  recommendNo: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
    color: '#dc2626'
  },
  recommendNeutral: {
    backgroundColor: '#fffbeb',
    borderColor: '#fcd34d',
    color: '#d97706'
  },
  textarea: {
    padding: '1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '16px',
    fontSize: '1.05rem',
    backgroundColor: '#ffffff',
    resize: 'vertical',
    minHeight: '160px',
    width: '620px',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  charCount: {
    textAlign: 'right',
    marginTop: '0.75rem',
    fontSize: '0.9rem',
    color: '#64748b'
  },
  submitContainer: {
    textAlign: 'center'
  },
  submitButton: {
    padding: '1.1rem 3rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.15rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  submitSpinner: {
    width: '22px',
    height: '22px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  validationError: {
    color: '#dc2626',
    marginTop: '1rem',
    fontSize: '1rem'
  },
  privacyNote: {
    marginTop: '2rem',
    color: '#64748b',
    fontSize: '0.95rem',
    fontStyle: 'italic'
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
  },
  loadingSpinner: {
    width: '80px',
    height: '80px',
    border: '6px solid #e0e7ff',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 1.2s linear infinite',
    marginBottom: '2rem'
  }
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    input:focus, select:focus, textarea:focus {
      outline: none !important;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}

export default FeedbackForm;