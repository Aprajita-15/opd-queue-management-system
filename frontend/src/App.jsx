

// App.jsx - Updated with Hospitals button and hover effects
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import HospitalList from "./components/HospitalList";
import AddHospital from './components/AddHospital';
import AddDept from "./components/AddDept";
import AddDoctor from './components/AddDoctor';
import LandingPage from "./components/landing";
import Profile from './components/Profile';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import FeedbackLanding from './components/FeedbackLanding';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogin = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar Component
  const Navbar = () => {
    const navigate = useNavigate();

    const handleHome = () => {
      navigate('/landing');
      setMenuOpen(false);
    };

    const handleHospitals = () => {
      navigate('/hospitals');
      setMenuOpen(false);
    };

    const handleProfile = () => {
      navigate('/profile');
      setMenuOpen(false);
    };

    const handleAddHospital = () => {
      navigate('/add-hospital');
      setMenuOpen(false);
    };

    const handleAskQuery = () => {
      navigate('/ask-query');
      setMenuOpen(false);
    };

    const handleFAQ = () => {
      navigate('/faq');
      setMenuOpen(false);
    };

    const handleFeedback = () => {
      navigate('/feedback');
      setMenuOpen(false);
    };

    const getUserDisplayName = () => {
      if (!user) return "Profile";
      if (user.name && user.name.trim() !== "") return user.name;
      if (user.displayName && user.displayName.trim() !== "") return user.displayName;
      if (user.username && user.username.trim() !== "") return user.username;
      if (user.email) return user.email.split('@')[0];
      return "Profile";
    };

    const getUserInitial = () => {
      const displayName = getUserDisplayName();
      return displayName.charAt(0).toUpperCase();
    };

    return (
      <>
        {/* NAVBAR */}
        <nav
          style={{
            ...styles.navbar,
            padding: scrolled ? "0.75rem 2rem" : "1rem 2rem",
            backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "#ffffff",
            boxShadow: scrolled ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "none",
            backdropFilter: scrolled ? "blur(10px)" : "none",
          }}
        >
          {/* LEFT SECTION: Hamburger + Logo */}
          <div style={styles.leftSection}>
            {token && (
              <div
                style={styles.hamburger}
                onClick={toggleMenu}
                onKeyPress={(e) => e.key === 'Enter' && toggleMenu()}
                tabIndex="0"
                aria-label="Toggle menu"
                role="button"
              >
                <div style={styles.bar}></div>
                <div style={styles.bar}></div>
                <div style={styles.bar}></div>
              </div>
            )}

            <div style={styles.logoContainer}>
              <div
                style={styles.logo}
                onClick={handleHome}
                className="clickable"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && handleHome()}
                role="button"
                aria-label="Go to home"
              >
                <span style={styles.logoPrimary}>Care</span>
                <span style={styles.logoSecondary}>Hub</span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Navigation Links */}
          <div style={styles.rightSection}>
            <div style={styles.navLinks}>
              {token ? (
                <>
                  <button
                    onClick={handleProfile}
                    style={styles.userButton}
                    aria-label="Go to profile"
                  >
                    <div style={styles.userInitial}>{getUserInitial()}</div>
                    <span style={styles.userName}>{getUserDisplayName()}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    style={styles.authButton}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    style={{ ...styles.authButton, ...styles.primaryButton }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* SIDE MENU */}
        {menuOpen && token && (
          <div style={styles.sideMenu}>
            <div style={styles.sideMenuHeader}>
              <div style={styles.sideMenuUser}>
                <div style={styles.sideMenuUserInitial}>
                  {getUserInitial()}
                </div>
                <div>
                  <div style={styles.sideMenuUserName}>
                    {getUserDisplayName()}
                  </div>
                  <div style={styles.sideMenuUserEmail}>
                    {user?.email || ""}
                  </div>
                </div>
              </div>
              <div
                style={styles.closeBtn}
                onClick={() => setMenuOpen(false)}
                tabIndex="0"
                role="button"
                aria-label="Close menu"
              >
                ✕
              </div>
            </div>

            <div style={styles.menuDivider}></div>

            <button style={styles.menuItem} onClick={handleProfile}>
              <span style={styles.menuIcon}>👤</span> My Profile
            </button>
            <button style={styles.menuItem} onClick={handleHospitals}>
              <span style={styles.menuIcon}>🏥</span> Hospitals
            </button>
            <button style={styles.menuItem} onClick={handleAddHospital}>
              <span style={styles.menuIcon}>➕</span> Add Hospital
            </button>
            <button style={styles.menuItem} onClick={handleAskQuery}>
              <span style={styles.menuIcon}>💬</span> Connect / Ask Query
            </button>
            <button style={styles.menuItem} onClick={handleFeedback}>
              <span style={styles.menuIcon}>⭐</span> Feedback
            </button>
            <button style={styles.menuItem} onClick={handleFAQ}>
              <span style={styles.menuIcon}>❓</span> Help & FAQs
            </button>

            <div style={styles.menuDivider}></div>

            <button style={styles.menuItem} onClick={handleLogout}>
              <span style={styles.menuIcon}>🚪</span> Logout
            </button>
          </div>
        )}

        {/* Overlay */}
        {menuOpen && (
          <div
            style={styles.overlay}
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="app">
        <Navbar />

        <div style={{ marginTop: '90px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/landing"
              element={token ? <Home token={token} user={user} /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route
              path="/profile"
              element={
                token ? (
                  <Profile user={user} onUpdateProfile={updateUserProfile} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/ask-query"
              element={token ? <ContactForm user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/faq"
              element={token ? <FAQ /> : <Navigate to="/login" />}
            />
            <Route
              path="/hospitals"
              element={token ? <HospitalList /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-hospital"
              element={token ? <AddHospital /> : <Navigate to="/login" />}
            />
            <Route path="/add-department/:id" element={<AddDept />} />
            <Route path="/add-doctor/:id" element={<AddDoctor />} />
            <Route
              path="/feedback"
              element={
                token ? <FeedbackLanding user={user} token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/feedback/:hospitalId"
              element={
                token ? <FeedbackForm user={user} token={token} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Updated styles with hover effects
const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "9%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.4s ease",
    zIndex: 1000,
    borderBottom: "1px solid #e5e7eb",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },

  logo: {
    fontSize: "1.75rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  logoPrimary: { color: "#2563eb" },
  logoSecondary: { color: "#1e40af" },

  hamburger: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "24px",
    height: "20px",
    padding: "4px 0",
    marginRight: "1.5rem",
  },

  bar: {
    width: "100%",
    height: "3px",
    backgroundColor: "#2563eb",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },

  navButton: {
    background: "transparent",
    border: "none",
    color: "#4b5563",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },

  authButton: {
    padding: "0.6rem 1.6rem",
    backgroundColor: "transparent",
    color: "#4b5563",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
  },

  userButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.8rem",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },

  userInitial: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "1rem",
  },

  userName: {
    color: "#1f2937",
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  sideMenu: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "320px",
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
    zIndex: 2000,
    display: "flex",
    flexDirection: "column",
  },

  sideMenuHeader: {
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #f3f4f6",
  },

  sideMenuUser: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  sideMenuUserInitial: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "1.25rem",
  },

  sideMenuUserName: {
    fontWeight: "600",
    color: "#1f2937",
    fontSize: "1.1rem",
  },

  sideMenuUserEmail: {
    color: "#6b7280",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },

  closeBtn: {
    cursor: "pointer",
    color: "#6b7280",
    fontSize: "1.5rem",
    padding: "0.25rem",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },

  menuDivider: {
    height: "1px",
    backgroundColor: "#f3f4f6",
    margin: "0.5rem 1.5rem",
  },

  menuItem: {
    background: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: "1rem",
    color: "#374151",
    cursor: "pointer",
    padding: "0.975rem 1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    transition: "all 0.3s ease",
    width: "100%",
  },

  menuIcon: {
    fontSize: "1.25rem",
    width: "24px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1999,
    backdropFilter: "blur(4px)",
  },
};

// Add hover styles via injected CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .navButton:hover, 
  .authButton:hover, 
  .userButton:hover, 
  .menuItem:hover {
    background-color: #f0f7ff !important;
    color: #2563eb !important;
    transform: translateY(-1px);
  }
  .primaryButton:hover {
    background-color: #1d4ed8 !important;
  }
  .menuItem:hover {
    background-color: #f8fafc !important;
  }
  .closeBtn:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;
document.head.appendChild(styleSheet);

export default App;