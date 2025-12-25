// // components/FAQ.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const FAQ = () => {
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const faqs = [
//     {
//       question: "How quickly will I get a response to my queries?",
//       answer: "We typically respond within 24-48 hours during business days. For urgent matters, please call our support line at +1 (555) 123-4567."
//     },
//     {
//       question: "Can I add multiple hospitals to my account?",
//       answer: "Yes, you can add multiple hospitals. Each hospital will have its own profile, departments, and doctors. You can manage all your hospitals from your dashboard."
//     },
//     {
//       question: "Is my hospital and patient information secure?",
//       answer: "Absolutely. We use industry-standard 256-bit encryption, regular security audits, and comply with healthcare data protection regulations. Your data is never shared with third parties without your consent."
//     },
//     {
//       question: "How do I add doctors to a hospital?",
//       answer: "First, add your hospital from the dashboard. Then, navigate to the hospital details page and click 'Add Doctor'. Fill in the doctor's details and save."
//     },
//     {
//       question: "Can I update hospital information after adding it?",
//       answer: "Yes, you can edit hospital information at any time. Go to the hospital list, click on the hospital, and use the edit option to update details."
//     },
//     {
//       question: "What types of queries can I ask through the contact form?",
//       answer: "You can ask about technical support, feature requests, billing questions, hospital registration issues, doctor profile management, or any other concerns related to CareHub."
//     },
//     {
//       question: "Is there a limit to how many doctors I can add?",
//       answer: "No, there's no limit to the number of doctors you can add. You can add as many doctors as needed for each hospital department."
//     },
//     {
//       question: "How do I delete a hospital or doctor?",
//       answer: "Go to the hospital or doctor details page and click the delete option. Note: This action is permanent and cannot be undone."
//     },
//     {
//       question: "Can multiple users manage the same hospital?",
//       answer: "Currently, each hospital is managed by a single account owner. We're working on multi-user management features for future releases."
//     },
//     {
//       question: "What happens if I forget my password?",
//       answer: "Click on 'Forgot Password' on the login page. We'll send a password reset link to your registered email address."
//     },
//     {
//       question: "Is CareHub available on mobile devices?",
//       answer: "Yes, CareHub is fully responsive and works on all devices including smartphones and tablets. We're also developing native mobile apps for iOS and Android."
//     },
//     {
//       question: "How can I provide feedback or suggestions?",
//       answer: "You can use the 'Feedback / Ratings' option in the menu or the contact form. We value your feedback and use it to improve CareHub."
//     }
//   ];

//   // Filter FAQs based on search query
//   const filteredFAQs = searchQuery.trim() === '' 
//     ? faqs 
//     : faqs.filter(faq => 
//         faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
          
//           <h1 style={styles.title}>Frequently Asked Questions</h1>
//           <p style={styles.subtitle}>
//             Find answers to common questions about CareHub
//           </p>
//         </div>

//         <div style={styles.searchSection}>
//           <input
//             type="text"
//             placeholder="Search FAQs..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             style={styles.searchInput}
//             aria-label="Search FAQs"
//           />
//           <button style={styles.searchButton}>
//             🔍
//           </button>
//         </div>

//         <div style={styles.faqContainer}>
//           {filteredFAQs.length > 0 ? (
//             filteredFAQs.map((faq, index) => (
//               <div key={index} style={styles.faqItem}>
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   style={styles.faqQuestion}
//                   aria-expanded={activeIndex === index}
//                   aria-controls={`faq-answer-${index}`}
//                 >
//                   <span style={styles.questionText}>{faq.question}</span>
//                   <span style={styles.arrowIcon}>
//                     {activeIndex === index ? '▲' : '▼'}
//                   </span>
//                 </button>
                
//                 {activeIndex === index && (
//                   <div 
//                     id={`faq-answer-${index}`}
//                     style={styles.faqAnswer}
//                     role="region"
//                     aria-labelledby={`faq-question-${index}`}
//                   >
//                     <p style={styles.answerText}>{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div style={styles.noResults}>
//               <p style={styles.noResultsText}>No FAQs found matching "{searchQuery}"</p>
//               <button 
//                 onClick={() => setSearchQuery('')}
//                 style={styles.clearSearchButton}
//               >
//                 Clear Search
//               </button>
//             </div>
//           )}
//         </div>

//         <div style={styles.contactPrompt}>
//           <h3 style={styles.contactTitle}>Still have questions?</h3>
//           <p style={styles.contactText}>
//             Can't find what you're looking for? Our support team is here to help.
//           </p>
//           <button 
//             onClick={() => navigate('/ask-query')}
//             style={styles.contactButton}
//             aria-label="Contact support"
//           >
//             Contact Support
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles for FAQ component
// const styles = {
//   container: {
//     minHeight: 'calc(100vh - 80px)',
//     backgroundColor: '#f8fafc',
//     padding: '2rem 1rem',
//   },
//   card: {
//     maxWidth: '800px',
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
//     '&:hover': {
//       backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     },
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
//   searchSection: {
//     padding: '1.5rem 2rem',
//     borderBottom: '1px solid #e5e7eb',
//     display: 'flex',
//     gap: '0.5rem',
//   },
//   searchInput: {
//     flex: 1,
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
//   },
//   searchButton: {
//     padding: '0.75rem 1.5rem',
//     backgroundColor: '#2563eb',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#1d4ed8',
//     },
//   },
//   faqContainer: {
//     padding: '1rem 2rem 2rem',
//   },
//   faqItem: {
//     marginBottom: '0.5rem',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     overflow: 'hidden',
//   },
//   faqQuestion: {
//     width: '100%',
//     padding: '1.25rem 1.5rem',
//     backgroundColor: '#f9fafb',
//     border: 'none',
//     textAlign: 'left',
//     fontSize: '1rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     cursor: 'pointer',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#f3f4f6',
//     },
//   },
//   questionText: {
//     flex: 1,
//     paddingRight: '1rem',
//   },
//   arrowIcon: {
//     fontSize: '0.875rem',
//     color: '#6b7280',
//   },
//   faqAnswer: {
//     padding: '1.5rem',
//     backgroundColor: 'white',
//     borderTop: '1px solid #e5e7eb',
//     animation: 'fadeIn 0.3s ease',
//   },
//   answerText: {
//     margin: 0,
//     color: '#4b5563',
//     lineHeight: '1.6',
//     fontSize: '0.95rem',
//   },
//   noResults: {
//     textAlign: 'center',
//     padding: '3rem 2rem',
//   },
//   noResultsText: {
//     fontSize: '1.125rem',
//     color: '#6b7280',
//     marginBottom: '1.5rem',
//   },
//   clearSearchButton: {
//     padding: '0.75rem 1.5rem',
//     backgroundColor: '#f3f4f6',
//     color: '#4b5563',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '0.95rem',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#e5e7eb',
//     },
//   },
//   contactPrompt: {
//     padding: '2rem',
//     backgroundColor: '#f0f9ff',
//     borderTop: '1px solid #bae6fd',
//     textAlign: 'center',
//   },
//   contactTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     color: '#0369a1',
//     margin: '0 0 0.75rem 0',
//   },
//   contactText: {
//     color: '#0c4a6e',
//     margin: '0 0 1.5rem 0',
//     fontSize: '1rem',
//   },
//   contactButton: {
//     padding: '0.75rem 2rem',
//     backgroundColor: '#0284c7',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#0369a1',
//     },
//   },
// };

// // Add CSS animations
// const styleSheet = document.styleSheets[0];
// if (styleSheet) {
//   styleSheet.insertRule(`
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(-10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//   `, styleSheet.cssRules.length);
// }

// export default FAQ;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const faqs = [
    {
      question: "How quickly will I get a response to my queries?",
      answer: "We typically respond within 24-48 hours during business days. For urgent matters, please call our support line at +1 (555) 123-4567."
    },
    {
      question: "Can I add multiple hospitals to my account?",
      answer: "Yes, you can add multiple hospitals. Each hospital will have its own profile, departments, and doctors. You can manage all your hospitals from your dashboard."
    },
    {
      question: "Is my hospital and patient information secure?",
      answer: "Absolutely. We use industry-standard 256-bit encryption, regular security audits, and comply with healthcare data protection regulations. Your data is never shared with third parties without your consent."
    },
    {
      question: "How do I add doctors to a hospital?",
      answer: "First, add your hospital from the dashboard. Then, navigate to the hospital details page and click 'Add Doctor'. Fill in the doctor's details and save."
    },
    {
      question: "Can I update hospital information after adding it?",
      answer: "Yes, you can edit hospital information at any time. Go to the hospital list, click on the hospital, and use the edit option to update details."
    },
    {
      question: "What types of queries can I ask through the contact form?",
      answer: "You can ask about technical support, feature requests, billing questions, hospital registration issues, doctor profile management, or any other concerns related to CareHub."
    },
    {
      question: "Is there a limit to how many doctors I can add?",
      answer: "No, there's no limit to the number of doctors you can add. You can add as many doctors as needed for each hospital department."
    },
    {
      question: "How do I delete a hospital or doctor?",
      answer: "Go to the hospital or doctor details page and click the delete option. Note: This action is permanent and cannot be undone."
    },
    {
      question: "Can multiple users manage the same hospital?",
      answer: "Currently, each hospital is managed by a single account owner. We're working on multi-user management features for future releases."
    },
    {
      question: "What happens if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page. We'll send a password reset link to your registered email address."
    },
    {
      question: "Is CareHub available on mobile devices?",
      answer: "Yes, CareHub is fully responsive and works on all devices including smartphones and tablets. We're also developing native mobile apps for iOS and Android."
    },
    {
      question: "How can I provide feedback or suggestions?",
      answer: "You can use the 'Feedback / Ratings' option in the menu or the contact form. We value your feedback and use it to improve CareHub."
    }
  ];

  const filteredFAQs = searchQuery.trim() === '' 
    ? faqs 
    : faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Frequently Asked Questions</h1>
          <p style={styles.subtitle}>
            Find answers to common questions about CareHub
          </p>
        </div>

        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
            aria-label="Search FAQs"
          />
          <button 
            style={styles.searchButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 10px rgba(37, 99, 235, 0.2)';
            }}
          >
            🔍
          </button>
        </div>

        <div style={styles.faqContainer}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                style={styles.faqItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={styles.faqQuestion}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span style={styles.questionText}>{faq.question}</span>
                  <span style={styles.arrowIcon}>
                    {activeIndex === index ? '▲' : '▼'}
                  </span>
                </button>
                
                {activeIndex === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    style={styles.faqAnswer}
                  >
                    <p style={styles.answerText}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              <p style={styles.noResultsText}>No FAQs found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                style={styles.clearSearchButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div style={styles.contactPrompt}>
          <h3 style={styles.contactTitle}>Still have questions?</h3>
          <p style={styles.contactText}>
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button 
            onClick={() => navigate('/ask-query')}
            style={styles.contactButton}
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
            Contact Support
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
    maxWidth: '900px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
    border: '1px solid #bfdbfe',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '3rem 2rem 2.5rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 1rem 0'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.95,
    maxWidth: '600px',
    margin: '0 auto'
  },
  searchSection: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    gap: '0.75rem',
    backgroundColor: '#f8fbff'
  },
  searchInput: {
    flex: 1,
    padding: '1rem 1.25rem',
    border: '2px solid #bfdbfe',
    borderRadius: '14px',
    fontSize: '1.05rem',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  searchButton: {
    padding: '1rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)'
  },
  faqContainer: {
    padding: '2rem'
  },
  faqItem: {
    marginBottom: '1rem',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#f8fbff',
    border: '2px solid #bfdbfe',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.05)',
    transition: 'all 0.3s ease'
  },
  faqQuestion: {
    width: '100%',
    padding: '1.5rem 2rem',
    backgroundColor: '#f8fbff',
    border: 'none',
    textAlign: 'left',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e40af',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  },
  questionText: {
    flex: 1,
    paddingRight: '1rem'
  },
  arrowIcon: {
    fontSize: '1.2rem',
    color: '#475569',
    transition: 'transform 0.3s ease'
  },
  faqAnswer: {
    padding: '1.5rem 2rem',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #bfdbfe',
    animation: 'fadeIn 0.3s ease'
  },
  answerText: {
    margin: 0,
    color: '#475569',
    lineHeight: '1.7',
    fontSize: '1rem'
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem 2rem'
  },
  noResultsText: {
    fontSize: '1.2rem',
    color: '#64748b',
    marginBottom: '1.5rem'
  },
  clearSearchButton: {
    padding: '0.85rem 2rem',
    backgroundColor: '#f3f4f6',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  contactPrompt: {
    padding: '3rem 2rem',
    backgroundColor: '#f8fbff',
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0'
  },
  contactTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '1rem'
  },
  contactText: {
    color: '#64748b',
    fontSize: '1.05rem',
    marginBottom: '1.5rem'
  },
  contactButton: {
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
  }
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export default FAQ;