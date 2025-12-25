// // components/ContactForm.jsx
// import React, { useState, useEffect } from 'react';

// const ContactForm = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//     queryType: 'general'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({
//     type: '', // 'success' or 'error'
//     message: ''
//   });

//   // Pre-fill form with user data if available
//   useEffect(() => {
//     if (user) {
//       // Use displayName first, then name, then username
//       const name = user.displayName || user.name || user.username || '';
      
//       setFormData(prev => ({
//         ...prev,
//         name: name,
//         email: user.email || ''
//       }));
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus({ type: '', message: '' });

//     try {
//       // Validate form
//       if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
//         throw new Error('Please fill in all required fields');
//       }

//       // Email validation
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         throw new Error('Please enter a valid email address');
//       }

//       // Submit form data to Formspree
//       const response = await fetch('https://formspree.io/f/myzjgqor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           message: formData.message,
//           queryType: formData.queryType,
//           _subject: `New Query from ${formData.name} - ${formData.queryType}`,
//           _replyto: formData.email
//         })
//       });

//       if (response.ok) {
//         setSubmitStatus({
//           type: 'success',
//           message: 'Your message has been sent successfully! We\'ll get back to you soon.'
//         });
        
//         // Reset form after successful submission
//         setFormData({
//           name: user?.displayName || user?.name || user?.username || '',
//           email: user?.email || '',
//           message: '',
//           queryType: 'general'
//         });
        
//         // Clear success message after 5 seconds
//         setTimeout(() => {
//           setSubmitStatus({ type: '', message: '' });
//         }, 5000);
//       } else {
//         throw new Error('Failed to send message. Please try again.');
//       }
//     } catch (error) {
//       setSubmitStatus({
//         type: 'error',
//         message: error.message || 'An error occurred. Please try again.'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
          
//           <h1 style={styles.title}>Connect With Us</h1>
//           <p style={styles.subtitle}>
//             Have questions, feedback, or need assistance? We're here to help!
//           </p>
//         </div>

//         {submitStatus.message && (
//           <div style={{
//             ...styles.alert,
//             backgroundColor: submitStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
//             borderColor: submitStatus.type === 'success' ? '#a7f3d0' : '#fecaca',
//             color: submitStatus.type === 'success' ? '#065f46' : '#991b1b'
//           }}>
//             {submitStatus.message}
//           </div>
//         )}

//         <div style={styles.contactGrid}>
//           {/* Contact Information */}
//           <div style={styles.infoSection}>
//             <h2 style={styles.infoTitle}>Contact Information</h2>
//             <div style={styles.infoCard}>
//               <div style={styles.infoItem}>
//                 <div style={styles.infoIcon}>📧</div>
//                 <div>
//                   <h3 style={styles.infoLabel}>Email</h3>
//                   <p style={styles.infoValue}>support@carehub.com</p>
//                 </div>
//               </div>
              
//               <div style={styles.infoItem}>
//                 <div style={styles.infoIcon}>📞</div>
//                 <div>
//                   <h3 style={styles.infoLabel}>Phone</h3>
//                   <p style={styles.infoValue}>+1 (555) 123-4567</p>
//                 </div>
//               </div>
              
//               <div style={styles.infoItem}>
//                 <div style={styles.infoIcon}>⏰</div>
//                 <div>
//                   <h3 style={styles.infoLabel}>Response Time</h3>
//                   <p style={styles.infoValue}>24-48 hours</p>
//                 </div>
//               </div>
              
//               <div style={styles.infoItem}>
//                 <div style={styles.infoIcon}>💡</div>
//                 <div>
//                   <h3 style={styles.infoLabel}>Common Queries</h3>
//                   <ul style={styles.queryList}>
//                     <li>Hospital registration issues</li>
//                     <li>Doctor profile management</li>
//                     <li>Technical support</li>
//                     <li>Feedback and suggestions</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div style={styles.formSection}>
//             <h2 style={styles.formTitle}>Send us a Message</h2>
//             <form 
//               onSubmit={handleSubmit} 
//               style={styles.form}
//               id="contactForm"
//             >
//               <div style={styles.formGroup}>
//                 <label htmlFor="name" style={styles.label}>
//                   Your Name <span style={styles.required}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                   placeholder="Enter your name"
//                   required
//                   aria-required="true"
//                   aria-label="Your name"
//                 />
//               </div>

//               <div style={styles.formGroup}>
//                 <label htmlFor="email" style={styles.label}>
//                   Your Email <span style={styles.required}>*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   required
//                   aria-required="true"
//                   aria-label="Your email"
//                 />
//               </div>

//               <div style={styles.formGroup}>
//                 <label htmlFor="queryType" style={styles.label}>
//                   Query Type
//                 </label>
//                 <select
//                   id="queryType"
//                   name="queryType"
//                   value={formData.queryType}
//                   onChange={handleInputChange}
//                   style={styles.select}
//                   aria-label="Query type"
//                 >
//                   <option value="general">General Inquiry</option>
//                   <option value="technical">Technical Support</option>
//                   <option value="feedback">Feedback</option>
//                   <option value="hospital">Hospital Related</option>
//                   <option value="doctor">Doctor Related</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div style={styles.formGroup}>
//                 <label htmlFor="message" style={styles.label}>
//                   Your Message <span style={styles.required}>*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   style={styles.textarea}
//                   placeholder="How can we help you?"
//                   required
//                   aria-required="true"
//                   rows="6"
//                   aria-label="Your message"
//                 />
//               </div>

//               <input 
//                 type="hidden" 
//                 name="_subject" 
//                 value="New Contact Form Submission from CareHub" 
//               />

//               <button
//                 type="submit"
//                 style={styles.submitButton}
//                 disabled={isSubmitting}
//                 aria-label="Send message"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span style={styles.spinner}></span>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <span style={styles.icon}>✉️</span>
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles for ContactForm component
// const styles = {
//   container: {
//     minHeight: 'calc(100vh - 80px)',
//     backgroundColor: '#f8fafc',
//     padding: '2rem 1rem',
//   },
//   card: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//   },
//   header: {
//     backgroundColor: '#2563eb',
//     color: 'white',
//     padding: '2.5rem 2rem',
//     position: 'relative',
//   },
//   backButton: {
//     position: 'absolute',
//     top: '1.5rem',
//     left: '2rem',
//     backgroundColor: 'transparent',
//     color: 'white',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//     borderRadius: '6px',
//     padding: '0.5rem 1rem',
//     cursor: 'pointer',
//     fontSize: '0.875rem',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//   },
//   title: {
//     fontSize: '2.25rem',
//     fontWeight: '700',
//     margin: '0 0 0.5rem 0',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: '1.125rem',
//     opacity: 0.9,
//     textAlign: 'center',
//     maxWidth: '600px',
//     margin: '0 auto',
//   },
//   alert: {
//     padding: '1rem',
//     margin: '2rem',
//     borderRadius: '8px',
//     border: '1px solid',
//     fontSize: '0.875rem',
//     textAlign: 'center',
//   },
//   contactGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1.5fr',
//     gap: '2rem',
//     padding: '2rem',
//     '@media (max-width: 768px)': {
//       gridTemplateColumns: '1fr',
//     },
//   },
//   infoSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem',
//   },
//   infoTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: 0,
//   },
//   infoCard: {
//     backgroundColor: '#f8fafc',
//     borderRadius: '8px',
//     padding: '1.5rem',
//     border: '1px solid #e5e7eb',
//   },
//   infoItem: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: '1rem',
//     marginBottom: '1.5rem',
//     '&:last-child': {
//       marginBottom: 0,
//     },
//   },
//   infoIcon: {
//     fontSize: '1.5rem',
//     width: '40px',
//     height: '40px',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//   },
//   infoLabel: {
//     fontSize: '1rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 0.25rem 0',
//   },
//   infoValue: {
//     fontSize: '0.875rem',
//     color: '#6b7280',
//     margin: 0,
//   },
//   queryList: {
//     margin: '0.5rem 0 0 0',
//     paddingLeft: '1rem',
//     fontSize: '0.875rem',
//     color: '#6b7280',
//   },
//   formSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem',
//   },
//   formTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: 0,
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.5rem',
//   },
//   label: {
//     fontSize: '0.875rem',
//     fontWeight: '500',
//     color: '#374151',
//   },
//   required: {
//     color: '#dc2626',
//   },
//   input: {
//     padding: '0.75rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease',
//     '&:focus': {
//       outline: 'none',
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
//     },
//     '&:disabled': {
//       backgroundColor: '#f3f4f6',
//       cursor: 'not-allowed',
//     },
//   },
//   select: {
//     padding: '0.75rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     backgroundColor: 'white',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     '&:focus': {
//       outline: 'none',
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
//     },
//   },
//   textarea: {
//     padding: '0.75rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     fontFamily: 'inherit',
//     resize: 'vertical',
//     minHeight: '120px',
//     transition: 'all 0.2s ease',
//     '&:focus': {
//       outline: 'none',
//       borderColor: '#2563eb',
//       boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
//     },
//   },
//   submitButton: {
//     padding: '1rem 2rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.75rem',
//     transition: 'all 0.2s ease',
//     '&:hover:not(:disabled)': {
//       backgroundColor: '#1d4ed8',
//     },
//     '&:disabled': {
//       opacity: 0.7,
//       cursor: 'not-allowed',
//     },
//   },
//   icon: {
//     fontSize: '1.25rem',
//   },
//   spinner: {
//     width: '20px',
//     height: '20px',
//     border: '2px solid rgba(255, 255, 255, 0.3)',
//     borderTop: '2px solid white',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//   },
// };

// // Add CSS animation for spinner
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(`
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `, styleSheet.cssRules.length);

// export default ContactForm;

import React, { useState, useEffect } from 'react';

const ContactForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    queryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success' or 'error'
    message: ''
  });

  useEffect(() => {
    if (user) {
      const name = user.displayName || user.name || user.username || '';
      setFormData(prev => ({
        ...prev,
        name: name,
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch('https://formspree.io/f/myzjgqor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          queryType: formData.queryType,
          _subject: `New Query from ${formData.name} - ${formData.queryType}`,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been sent successfully! We\'ll get back to you soon.'
        });

        setFormData({
          name: user?.displayName || user?.name || user?.username || '',
          email: user?.email || '',
          message: '',
          queryType: 'general'
        });

        setTimeout(() => {
          setSubmitStatus({ type: '', message: '' });
        }, 5000);
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Connect With Us</h1>
          <p style={styles.subtitle}>
            Have questions, feedback, or need assistance? We're here to help!
          </p>
        </div>

        {/* Alert Message */}
        {submitStatus.message && (
          <div style={{
            ...styles.alert,
            backgroundColor: submitStatus.type === 'success' ? '#dbeafe' : '#fee2e2',
            borderLeftColor: submitStatus.type === 'success' ? '#2563eb' : '#dc2626'
          }}>
            <span style={{ fontSize: '1.4rem', marginRight: '0.75rem' }}>
              {submitStatus.type === 'success' ? '✓' : '⚠️'}
            </span>
            {submitStatus.message}
          </div>
        )}

        {/* Main Grid */}
        <div style={styles.grid}>
          {/* Contact Info Section */}
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Contact Information</h2>
            <div style={styles.infoCard}>
              <div style={styles.infoItem}>
                <div style={styles.iconCircle}>📧</div>
                <div>
                  <p style={styles.infoLabel}>Email</p>
                  <p style={styles.infoValue}>support@carehub.com</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconCircle}>📞</div>
                <div>
                  <p style={styles.infoLabel}>Phone</p>
                  <p style={styles.infoValue}>+1 (555) 123-4567</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconCircle}>⏰</div>
                <div>
                  <p style={styles.infoLabel}>Response Time</p>
                  <p style={styles.infoValue}>Within 24-48 hours</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconCircle}>💡</div>
                <div>
                  <p style={styles.infoLabel}>Common Queries</p>
                  <ul style={styles.queryList}>
                    <li>Hospital registration issues</li>
                    <li>Doctor profile management</li>
                    <li>Technical support</li>
                    <li>Feedback and suggestions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  style={styles.input}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Email <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  style={styles.input}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Query Type</label>
                <select
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleInputChange}
                  style={styles.select}
                  disabled={isSubmitting}
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="hospital">Hospital Related</option>
                  <option value="doctor">Doctor Related</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Message <span style={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we assist you today?"
                  style={styles.textarea}
                  rows="6"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
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
                {isSubmitting ? (
                  <>
                    <div style={styles.spinner}></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.3rem' }}>✉️</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '1200px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
    overflow: 'hidden',
    border: '1px solid #bfdbfe'
  },
  header: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '4rem 2rem 3rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    color: 'white'
  },
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.95,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  alert: {
    margin: '2rem 3rem',
    padding: '1.25rem 1.5rem',
    borderRadius: '14px',
    borderLeft: '5px solid',
    fontSize: '1.05rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.6fr',
    gap: '3rem',
    padding: '3rem',
    '@media (max-width: 992px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem'
    }
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 1rem 0'
  },
  infoCard: {
    backgroundColor: '#f8fbff',
    borderRadius: '16px',
    padding: '2rem',
    border: '2px solid #bfdbfe',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.08)'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.25rem',
    marginBottom: '1.75rem'
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
    flexShrink: 0,
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  infoLabel: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#1e40af',
    margin: '0 0 0.25rem 0'
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#475569',
    margin: 0
  },
  queryList: {
    margin: '0.75rem 0 0 0',
    paddingLeft: '1.25rem',
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: '1.7'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem'
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
  required: {
    color: '#dc2626',
    marginLeft: '4px'
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
  select: {
    padding: '1rem 1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '14px',
    fontSize: '1.05rem',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  textarea: {
    padding: '1rem 1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '14px',
    fontSize: '1.05rem',
    backgroundColor: '#ffffff',
    resize: 'vertical',
    minHeight: '140px',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  submitButton: {
    padding: '1.1rem 2.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  spinner: {
    width: '22px',
    height: '22px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Add focus styles and spinner animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    input:focus, textarea:focus, select:focus {
      outline: none !important;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
}

export default ContactForm;