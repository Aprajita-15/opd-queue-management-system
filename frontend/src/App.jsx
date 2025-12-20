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

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [scrolled, setScrolled] = useState(false);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // handle scroll for navbar style
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

    const handleAddHospital = () => navigate('/add-hospital');
    const handleHome = () => navigate('/');
    const handleLanding = () => navigate('/landing');

    return (
      <nav
        style={{
          ...styles.navbar,
          padding: scrolled ? "0.75rem 2rem" : "1rem 2rem",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
        }}
      >
        {/* Logo */}
        <div
          style={styles.logo}
          onClick={handleLanding}
          className="clickable"
        >
          CareHub
        </div>

        {/* Horizontal Links */}
        <div style={styles.navLinks}>
          {/* <a href="#features" style={styles.navLink}>Features</a>
          <a href="#how-it-works" style={styles.navLink}>How It Works</a>
          <a href="#testimonials" style={styles.navLink}>Testimonials</a>
          <a href="#team" style={styles.navLink}>Team</a> */}

          {/* If user logged in */}
          {token && (
            <>
              <button style={styles.navButton} onClick={handleHome}>
                Home
              </button>

              <button style={styles.navButton} onClick={handleAddHospital}>
                Add Hospital
              </button>
            </>
          )}

          {/* Auth Buttons */}
          {!token ? (
            <>
              <button
                onClick={() => navigate('/login')}
                style={styles.getStartedButton}
              >
                Login
              </button>

              <button
                onClick={() => navigate('/signup')}
                style={styles.getStartedButton}
              >
                Signup
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={styles.getStartedButton}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    );
  };

  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/landing"
            element={token ? <Home token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup onLogin={handleLogin} />}
          />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/add-hospital" element={<AddHospital />} />
          <Route path="/add-department/:id" element={<AddDept />} />
          <Route path="/add-doctor/:id" element={<AddDoctor />} />
        </Routes>
      </div>
    </Router>
  );
}

// Styles
const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
    zIndex: 1000,
    borderBottom: "1px solid #e5e7eb",
  },

  logo: {
    fontSize: "1.9rem",
    fontWeight: "700",
    color: "#2563eb",
    cursor: "pointer",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },

  navLink: {
    color: "#475569",
    textDecoration: "none",
    fontWeight: "500",
  },

  navButton: {
    background: "transparent",
    border: "none",
    color: "#475569",
    fontSize: "1rem",
    cursor: "pointer",
  },

  getStartedButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
