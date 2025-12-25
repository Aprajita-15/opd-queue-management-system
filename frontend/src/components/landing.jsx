import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Import images from assets folder
import AnuImage from '../assets/Anu.jpeg';
import AprajitaImage from '../assets/AprajitaDeep.jpg';
import JyotikaImage from '../assets/Jyotika.jpg';
// Import video - make sure to place your video in the assets folder
import HeroVideo from '../assets/hero-video.mp4'; // Add your video file

const styles = {
  // Main container - Light Theme
  landingPage: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#ffffff',
    color: '#1e293b',
    minHeight: '100vh',
    lineHeight: 1.6,
    width: '100%',
    overflowX: 'hidden' // Keep this but ensure it doesn't block vertical scrolling
  },

  // Navigation Bar
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    backdropFilter: 'blur(20px)',
    zIndex: 1000,
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  },



  logo: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: '-0.025em',
     cursor: 'pointer',
  transition: 'transform 0.3s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  borderRadius: '8px',
  },
  logoHoverEffect: {
  transform: 'scale(1.1)',           // slightly enlarges the logo
  background: 'linear-gradient(45deg, #2563eb, #4b7be3)', // gradient effect
  WebkitBackgroundClip: 'text',      // applies gradient to text
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.4s ease',       // smooth animation
  cursor: 'pointer'
},

logoAnimation: {
  display: 'inline-block',
  transition: 'all 0.4s ease',
}
,

  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    
  },
  navLinkHoverBlue: {
  color: '#2563eb', // blue color on hover
  transition: 'color 0.3s ease'
}
,
  navLink: {
    position: 'relative',
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.2s ease',
      borderRadius: '6px',
    
  },
  navLinkHoverBox: {
  backgroundColor: '#2563eb', // blue box
  color: '#ffffff',           // white text
  padding: '0.4rem 0.8rem',   // adjust padding for box
  borderRadius: '8px',        // rounded corners
  transition: 'all 0.3s ease'
}
,
navLinkHover: {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  boxShadow: '0 6px 16px rgba(37,99,235,0.35)'
},
  getStartedButton: {
    background: '#4b7be3',
    color: '#ffffff',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
      boxShadow: '0 8px 20px rgba(37,99,235,0.3)'
  },
  getStartedButtonHover: {
    backgroundColor: '#4b7be3',
    transform: 'translateY(-1px)', 
    boxShadow: '0px 2px 4px black'
  },

  // Hero Section
  heroSection: {
    marginTop: '50px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '6rem 2rem 4rem',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)',
    zIndex: 0
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1
  },
  heroText: {
    animation: 'fadeInUp 0.8s ease-out'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1.5rem',
    fontFamily: "'Poppins', 'Nunito', 'Rubik', 'Inter', sans-serif",
    background: 'linear-gradient(135deg, #2158d8ff 0%, #365b96ff 50%, #020617 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },   
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#475569',
    marginBottom: '2rem',
    lineHeight: 1.7
  },
  heroVideoContainer: {
    position: 'relative',
    animation: 'float 6s ease-in-out infinite',
    perspective: '1000px'
  },
  videoWrapper: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    transform: 'rotateY(5deg) rotateX(2deg)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  videoWrapperHover: {
    transform: 'rotateY(0deg) rotateX(0deg) scale(1.02)'
  },
  heroVideo: {
    width: '700px',
    height: 'auto',
    display: 'block',
    borderRadius: '16px',
    filter: 'brightness(1.05) contrast(1.1)',
    transition: 'filter 0.3s ease',
    objectFit: 'cover'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.1), transparent 30%)',
    pointerEvents: 'none',
    borderRadius: '16px'
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(255,255,255, 0.0)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
    zIndex: 2
  },
  playButtonHover: {
    background: '#ffffff',
    transform: 'translate(-50%, -50%) scale(1.1)',
    boxShadow: '0 6px 30px rgba(37, 99, 235, 0.4)'
  },
  playIcon: {
    fontSize: '0px',
    color: 'white',
    marginLeft: '3px'
  },

  // Features Section
  featuresSection: {
    padding: '5rem 2rem',
    background: '#ffffff'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#4b7be3',
     position: 'relative',
  letterSpacing: '0.5px',
  textTransform: 'capitalize',
  textShadow: '0 4px 12px rgba(7, 53, 153, 0.25)'

  },
 
  sectionSubtitle: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '3rem',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    lineHeight: 1.6
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
     cursor: 'pointer'
  },
  featureCardHover: {
    backgroundColor: '#2563eb', 
    transform: 'translateY(-4px)',
    borderColor: '#cbd5e1',
    // boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
     boxShadow: '0 25px 45px rgba(37,99,235,0.45)'
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#2563eb',
    transition: 'transform 0.4s ease'
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#0f172a',
     transition: 'color 0.4s ease'
  },
  featureDescription: {
    color: '#64748b',
    lineHeight: 1.6,
    fontSize: '1rem',
     transition: 'color 0.4s ease'
  },
  featureIconHover: {
    transform: 'scale(1.2)'
  },
featureTitleHover: {
    color: '#ffffff'
  },
    featureDescriptionHover: {
    color: '#e0e7ff'
  },
  // Stats Section
  statsSection: {
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem',
    textAlign: 'center'
  },
  statItem: {
    animation: 'fadeIn 0.8s ease-out'
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    display: 'block',
    color: '#2563eb'
  },
  statLabel: {
    fontSize: '1rem',
    color: '#475569',
    fontWeight: '500'
  },

  // How It Works Section
  howItWorksSection: {
    padding: '5rem 2rem',
    background: '#ffffff'
  },
  stepsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  stepCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '12px',
    // border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
  },
  stepCardHover: {
    // borderColor: '#cbd5e1',
    transform: 'translateY(-2px)',
    backgroundColor: '#2563eb',        // Blue background
  boxShadow: '0 20px 40px rgba(37,99,235,0.35)'
  },
  stepNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2563eb',
    minWidth: '60px'
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#0f172a'
  },
  stepDescription: {
    fontSize: '1.05rem',
    color: '#475569',
    lineHeight: 1.6
  },
  stepNumberHover: {
  color: '#ffffff',
  transition: 'color 0.3s ease'
},
stepTitleHover: {
  color: '#ffffff',
  transition: 'color 0.3s ease'
},
stepDescriptionHover: {
  color: '#e0e7ff',
  transition: 'color 0.3s ease'
},

  // Testimonials Section
  testimonialsSection: {
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  },
  testimonialsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  testimonialCard: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  testimonialText: {
    fontSize: '1rem',
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 1.7,
    marginBottom: '1.5rem'
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  authorImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0'
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  authorName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#0f172a'
  },
  authorRole: {
    fontSize: '0.9rem',
    color: '#2563eb'
  },
  testimonialCardHover: {
  backgroundColor: '#2563eb',
  transform: 'translateY(-6px)',
  boxShadow: '0 20px 40px rgba(37,99,235,0.35)'
},
testimonialTextHover: {
  color: '#ffffff'
},
authorNameHover: {
  color: '#ffffff'
},
authorRoleHover: {
  color: '#e0e7ff'
},

  // About Us Section
  aboutSection: {
    padding: '5rem 2rem',
    background: '#ffffff'
  },
  aboutTitle: {
    textAlign: 'center',
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '3rem',
    color: '#4b7be3'
  },
  aboutSubtitle: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '3rem',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    lineHeight: 1.6
  },
  teamGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  teamCard: {
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    // border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    position: 'relative'
  },
  teamCardHover: {
    transform: 'translateY(-4px)',
    borderColor: '#cbd5e1',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
  },
  teamImageContainer: {
    height: '280px',
    overflow: 'hidden',
    position: 'relative'
  },
  teamImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease'
  },
  teamImageHover: {
  transform: 'scale(1.08)'
},
  teamContent: {
    padding: '1.5rem',
    transition: 'all 0.3s ease'
  },
  teamName: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#0f172a'
  },
  teamRole: {
    fontSize: '1rem',
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: '1rem'
  },
  teamBio: {
    color: '#64748b',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    fontSize: '0.95rem'
  },
  socialLinks: {
    display: 'flex',
    gap: '0.75rem'
  },
  socialButton: {
    width: '70%',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    background: '#f1f5f9',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  socialButtonHover: {
    background: '#2563eb',
    color: '#ffffff',
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 20px rgba(37,99,235,0.35)'
  },

  // CTA Section
  ctaSection: {
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    textAlign: 'center',
    color: '#ffffff'
  },
  ctaTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#ffffff'
  },
  ctaSubtitle: {
    fontSize: '1.1rem',
    color: '#dbeafe',
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.6
  },
  ctaButton: {
    background: '#ffffff',
    color: '#2563eb',
    border: 'none',
    marginTop: '15px',
    padding: '0.9rem 2.5rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  ctaButtonHover: {
    background: '#f8fafc',
    transform: 'translateY(-2px)'
  },

  // Footer
  footer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '4rem 2rem 2rem'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem'
  },
  footerColumn: {
    '& h3': {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#ffffff'
    },
    '& p': {
      color: '#cbd5e1',
      lineHeight: 1.6,
      marginBottom: '1rem',
      fontSize: '0.9rem'
    }
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    '& li': {
      marginBottom: '0'
    },
    '& a': {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      display: 'inline-block'
    }
  },
  footerLinkHover: {
    color: '#60a5fa',
    transform: 'translateX(3px)'
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '1rem'
  }
};

// Add global styles for animations
const globalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoverStates, setHoverStates] = useState({
    videoWrapper: false,
    
    playButton: false,
    featureCards: {},
    stepCards: {},
    teamCards: {},
    socialButtons: {},
    navLinks: {},
    footerLinks: {},
    statsNumbers: {} ,
     testimonials: {} 
  });

  const handleCardHover = (cardType, index, isHovering) => {
  setHoverStates(prev => ({
    ...prev,
    [cardType]: {
      ...prev[cardType],
      [index]: isHovering
    }
  }));
};
  
  const videoRef = useRef(null);

  useEffect(() => {
    // Add global styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleHover = (element, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [element]: isHovering
    }));
  };

  // const handleCardHover = (cardType, index, isHovering) => {
  //   setHoverStates(prev => ({
  //     ...prev,
  //     [cardType]: {
  //       ...prev[cardType],
  //       [index]: isHovering
  //     }
  //   }));
  // };

  const teamMembers = [
    {
      name: 'Anu Gill',
      role: 'Backend Developer',
      bio: 'Computer Science student specializing in database management and server-side development. Built the core queuing algorithms and API infrastructure.',
      image: AnuImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      github: 'https://github.com/Anu2024-coder',
      linkedin: 'https://www.linkedin.com/in/anugill03/'
    },
    {
      name: 'Aprajita Deep',
      role: 'Full Stack Developer',
      bio: 'Software Engineering student focusing on MERN stack development. Responsible for integrating frontend with backend services and implementing real-time features.',
      image: AprajitaImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      github: 'https://github.com/Aprajita-15',
      linkedin: 'https://www.linkedin.com/in/aprajita123/'
    },
    {
      name: 'Jyotika',
      role: 'Frontend Designer & Developer',
      bio: 'UI/UX Design student passionate about creating intuitive healthcare interfaces. Designed the user experience and implemented responsive frontend components.',
      image: JyotikaImage || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      github: 'https://github.com/JYOTIKA04',
      linkedin: 'https://www.linkedin.com/in/jyotika-sinha-03b979220/'
    }
  ];

  const testimonials = [
    {
      text: "The new queue system made my hospital visit stress-free. I could track my turn in real time and didn’t have to stand in long lines. It saved my time and reduced anxiety during my check-up.",
      name: "Priya",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6nhTPn2KsCEA5oCd19uqp5dHJnB159XXVw&s"
    },
    {
      text: "Waiting areas used to be crowded, but with this system I barely waited. I received updates on my phone about my turn and doctor availability. The entire process felt smooth and well-organized.",
      name: "Rohan",
      image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      text: "As a senior citizen, long waiting hours are difficult for me. This queue management system minimized waiting time and helped me reach the doctor faster. The staff also worked more efficiently with less confusion.",
      name: "Meera",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4k7iYBfV-tB0fAfVyG8B68tdxNXmVCOBwLw&s"
    }
  ];

  return (
    <div style={styles.landingPage}>
     

<nav
  style={{
    ...styles.navbar,
    ...(hoverStates.navbar ? styles.navbarHover : {})
  }}
  onMouseEnter={() => handleHover('navbar', true)}
  onMouseLeave={() => handleHover('navbar', false)}
>
 <div
  style={{
    ...styles.logo,
    ...styles.logoAnimation,
    ...(hoverStates.logo ? styles.logoHoverEffect : {})
  }}
  onMouseEnter={() => handleHover('logo', true)}
  onMouseLeave={() => handleHover('logo', false)}
>
  CareHub
</div>


  {/* <-- REPLACE THIS ENTIRE BLOCK WITH THE NEW CODE */}
  <div style={styles.navLinks}>
  {['Features', 'How It Works', 'Testimonials', 'Team'].map((text, index) => (
  <a
    key={index}
    href={`#${text.toLowerCase().replace(/ /g, '-')}`}
    style={{
      ...styles.navLink,
      ...(hoverStates.navLinks?.[index] ? styles.navLinkHoverBox : {})
    }}
    onMouseEnter={() => handleCardHover('navLinks', index, true)}
    onMouseLeave={() => handleCardHover('navLinks', index, false)}
  >
    {text}
  </a>
))}


  <button
    onClick={handleGetStarted}
    style={{
      ...styles.getStartedButton,
      ...(hoverStates.getStartedButton ? styles.getStartedButtonHover : {})
    }}
    onMouseEnter={() => handleHover('getStartedButton', true)}
    onMouseLeave={() => handleHover('getStartedButton', false)}
  >
    Get Started
  </button>
</div>

</nav>


      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBackground}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Smart OPD Queue Management
            </h1>
            <p style={styles.heroSubtitle}>
              A project focused on optimizing patient flow in hospital outpatient departments.
              Using intelligent algorithms to reduce waiting times and improve patient experience through digital queue management.
            </p>
            <button onClick={handleGetStarted} style={{
              ...styles.getStartedButton,
              padding: '0.9rem 2.5rem',
              fontSize: '1rem'
            }}
            onMouseEnter={() => handleHover('heroButton', true)}
            onMouseLeave={() => handleHover('heroButton', false)}>
              Get started
            </button>
          </div>
          <div style={styles.heroVideoContainer}>
            <div style={{
              ...styles.videoWrapper,
              ...(hoverStates.videoWrapper ? styles.videoWrapperHover : {})
            }}
            onMouseEnter={() => handleHover('videoWrapper', true)}
            onMouseLeave={() => handleHover('videoWrapper', false)}>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={styles.heroVideo}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={HeroVideo} type="video/mp4" />
                {/* Fallback if video doesn't load */}
                <source src="https://assets.mixkit.co/videos/preview/mixkit-hospital-corridor-7194-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={styles.videoOverlay}></div>
              <button 
                style={{
                  ...styles.playButton,
                  ...(hoverStates.playButton ? styles.playButtonHover : {})
                }}
                onClick={togglePlay}
                onMouseEnter={() => handleHover('playButton', true)}
                onMouseLeave={() => handleHover('playButton', false)}
              >
                <span style={styles.playIcon}>
                  {isPlaying ? '❚❚' : '▶'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Project Features</h2>
        
        <p style={styles.sectionSubtitle}>
          Key functionalities implemented in our Smart OPD Queue Management System
        </p>
        <div style={styles.featuresGrid}>
          {[
            {
              icon: '📊',
              title: 'Real-time Dashboard',
              description: 'Live visualization of queue status, patient wait times, and department workload using React.'
            },
            {
              icon: '🎯',
              title: 'Priority-based Queuing',
              description: 'Intelligent algorithm that prioritizes patients based on urgency, appointment time, and special needs.'
            },
            {
              icon: '📱',
              title: 'Multi-platform Access',
              description: 'Responsive design allowing access from hospital kiosks, staff tablets, and patient mobile devices.'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              style={{
                ...styles.featureCard,
                ...(hoverStates.featureCards?.[index] ? styles.featureCardHover : {})
              }}
              onMouseEnter={() => handleCardHover('featureCards', index, true)}
              onMouseLeave={() => handleCardHover('featureCards', index, false)}
            >
              {/* <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p> */}
               <div
    style={{
      ...styles.featureIcon,
      ...(hoverStates.featureCards?.[index] ? styles.featureIconHover : {})
    }}
  >
    {feature.icon}
  </div>

  <h3
    style={{
      ...styles.featureTitle,
      ...(hoverStates.featureCards?.[index] ? styles.featureTitleHover : {})
    }}
  >
    {feature.title}
  </h3>

  <p
    style={{
      ...styles.featureDescription,
      ...(hoverStates.featureCards?.[index] ? styles.featureDescriptionHover : {})
    }}
  >
    {feature.description}
  </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      {/* <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          
          <div style={styles.statItem}>
            <span style={styles.statNumber}>70%</span>
            <span style={styles.statLabel}>Average Wait Time Reduction</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>10+</span>
            <span style={styles.statLabel}>Department Support</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>99%</span>
            <span style={styles.statLabel}>System Uptime</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>100+</span>
            <span style={styles.statLabel}>Concurrent Patients</span>
          </div>
        </div>
      </section> */}
<section style={styles.statsSection}>
  <div style={styles.statsContainer}>
    {['70%', '10+', '99%', '100+'].map((num, index) => (
      <div
        key={index}
        style={{
          ...styles.statItem,
          backgroundColor: hoverStates.statsNumbers?.[index] ? '#e9edf1ff' : 'transparent',
          borderRadius: '12px',
          padding: '1.5rem 1rem',
          transition: 'all 0.3s ease',
          transform: hoverStates.statsNumbers?.[index] ? 'scale(1.1)' : 'scale(1)',
          cursor: 'pointer'
        }}
        onMouseEnter={() => handleCardHover('statsNumbers', index, true)}
        onMouseLeave={() => handleCardHover('statsNumbers', index, false)}
      >
        <span style={styles.statNumber}>{num}</span>
        <span style={styles.statLabel}>
          {['Average Wait Time Reduction', 'Department Support', 'System Uptime', 'Concurrent Patients'][index]}
        </span>
      </div>
    ))}
  </div>
</section>



      {/* How It Works Section */}
      {/* <section id="how-it-works" style={styles.howItWorksSection}>
        <h2 style={styles.sectionTitle}>System Architecture</h2>
        <p style={styles.sectionSubtitle}>
          How our MERN stack application processes and manages OPD queues
        </p>
        <div style={styles.stepsContainer}>
          {[
            {
              number: '01',
              title: 'Patient Registration',
              description: 'Patients register at kiosk or through mobile app. System assigns unique token and calculates estimated wait time based on real-time queue data.'
            },
            {
              number: '02',
              title: 'Queue Processing',
              description: 'Backend algorithm processes queue with priority rules. Doctors receive notifications when patients are ready, minimizing idle time.'
            },
            {
              number: '03',
              title: 'Real-time Updates',
              description: 'WebSocket connections provide live updates to all devices. Patients receive SMS notifications 15 minutes before their turn.'
            }
          ].map((step, index) => (
            <div 
              key={index}
              style={{
                ...styles.stepCard,
                ...(hoverStates.stepCards?.[index] ? styles.stepCardHover : {})
              }}
              onMouseEnter={() => handleCardHover('stepCards', index, true)}
              onMouseLeave={() => handleCardHover('stepCards', index, false)}
            >
              <div style={styles.stepNumber}>{step.number}</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <section id="how-it-works" style={styles.howItWorksSection}>
  <h2 style={styles.sectionTitle}>System Architecture</h2>
  <p style={styles.sectionSubtitle}>
    How our MERN stack application processes and manages OPD queues
  </p>

  <div style={styles.stepsContainer}>
    {[
      {
        number: '01',
        title: 'Patient Registration',
        description:
          'Patients register at kiosk or through mobile app. System assigns unique token and calculates estimated wait time based on real-time queue data.'
      },
      {
        number: '02',
        title: 'Queue Processing',
        description:
          'Backend algorithm processes queue with priority rules. Doctors receive notifications when patients are ready, minimizing idle time.'
      },
      {
        number: '03',
        title: 'Real-time Updates',
        description:
          'WebSocket connections provide live updates to all devices. Patients receive SMS notifications 15 minutes before their turn.'
      }
    ].map((step, index) => (
      <div
        key={index}
        style={{
          ...styles.stepCard,
          ...(hoverStates.stepCards?.[index] ? styles.stepCardHover : {})
        }}
        onMouseEnter={() => handleCardHover('stepCards', index, true)}
        onMouseLeave={() => handleCardHover('stepCards', index, false)}
      >
        <div
          style={{
            ...styles.stepNumber,
            ...(hoverStates.stepCards?.[index] ? styles.stepNumberHover : {})
          }}
        >
          {step.number}
        </div>

        <div style={styles.stepContent}>
          <h3
            style={{
              ...styles.stepTitle,
              ...(hoverStates.stepCards?.[index] ? styles.stepTitleHover : {})
            }}
          >
            {step.title}
          </h3>

          <p
            style={{
              ...styles.stepDescription,
              ...(hoverStates.stepCards?.[index]
                ? styles.stepDescriptionHover
                : {})
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Testimonials Section */}
      {/* <section id="testimonials" style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>Patient Feedback</h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <p style={styles.testimonialText}>"{testimonial.text}"</p>
              <div style={styles.testimonialAuthor}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  style={styles.authorImage}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>{testimonial.name}</div>
                  <div style={styles.authorRole}>Patient</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <section id="testimonials" style={styles.testimonialsSection}>
  <h2 style={styles.sectionTitle}>Patient Feedback</h2>

  <div style={styles.testimonialsGrid}>
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        style={{
          ...styles.testimonialCard,
          ...(hoverStates.testimonials?.[index]
            ? styles.testimonialCardHover
            : {})
        }}
        onMouseEnter={() => handleCardHover('testimonials', index, true)}
        onMouseLeave={() => handleCardHover('testimonials', index, false)}
      >
        <p
          style={{
            ...styles.testimonialText,
            ...(hoverStates.testimonials?.[index]
              ? styles.testimonialTextHover
              : {})
          }}
        >
          "{testimonial.text}"
        </p>

        <div style={styles.testimonialAuthor}>
          <img
            src={testimonial.image}
            alt={testimonial.name}
            style={styles.authorImage}
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde';
            }}
          />

          <div style={styles.authorInfo}>
            <div
              style={{
                ...styles.authorName,
                ...(hoverStates.testimonials?.[index]
                  ? styles.authorNameHover
                  : {})
              }}
            >
              {testimonial.name}
            </div>

            <div
              style={{
                ...styles.authorRole,
                ...(hoverStates.testimonials?.[index]
                  ? styles.authorRoleHover
                  : {})
              }}
            >
              Patient
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Team Section */}
      <section id="team" style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>Development Team</h2>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              style={{
                ...styles.teamCard,
                ...(hoverStates.teamCards?.[index] ? styles.teamCardHover : {})
              }}
              onMouseEnter={() => handleCardHover('teamCards', index, true)}
              onMouseLeave={() => handleCardHover('teamCards', index, false)}
            >
              <div style={styles.teamImageContainer}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={styles.teamImage}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <div style={styles.teamContent}>
                <h3 style={styles.teamName}>{member.name}</h3>
                <p style={styles.teamRole}>{member.role}</p>
                <p style={styles.teamBio}>{member.bio}</p>
                <div style={styles.socialLinks}>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...styles.socialButton,
                      ...(hoverStates.socialButtons?.[`${index}-github`] ? styles.socialButtonHover : {})
                    }}
                    onMouseEnter={() => handleCardHover('socialButtons', `${index}-github`, true)}
                    onMouseLeave={() => handleCardHover('socialButtons', `${index}-github`, false)}
                  >
                    GitHub
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...styles.socialButton,
                      ...(hoverStates.socialButtons?.[`${index}-linkedin`] ? styles.socialButtonHover : {})
                    }}
                    onMouseEnter={() => handleCardHover('socialButtons', `${index}-linkedin`, true)}
                    onMouseLeave={() => handleCardHover('socialButtons', `${index}-linkedin`, false)}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Explore Our Project</h2>
        <p style={styles.ctaSubtitle}>
          Experience how our Smart OPD Queue Management System can revolutionize patient flow in hospitals.
          Try the interactive demo to see all features in action.
        </p>
        <button onClick={handleGetStarted} style={{
          ...styles.ctaButton,
          ...(hoverStates.ctaButton ? styles.ctaButtonHover : {})
        }}
        onMouseEnter={() => handleHover('ctaButton', true)}
        onMouseLeave={() => handleHover('ctaButton', false)}>
          Launch Demo
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" style={styles.footer}>
        <div style={styles.footerBottom}>
          <p>© {new Date().getFullYear()} CareHub</p>
          <p>Built with React, Node.js, Express, and MongoDB</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;