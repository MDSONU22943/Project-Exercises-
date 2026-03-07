import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Authentication App</h1>
          <p>
            A modern multi-page application built with React Router that demonstrates 
            user authentication, form validation, and secure navigation.
          </p>
          
          {isAuthenticated ? (
            <div className="authenticated-content">
              <div className="welcome-card">
                <h2>Welcome back, {user.name}! 👋</h2>
                <p>You are successfully logged in to your account.</p>
                <div className="user-info">
                  <div className="info-item">
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div className="info-item">
                    <strong>Name:</strong> {user.name}
                  </div>
                </div>
                <div className="features-list">
                  <h3>Available Features:</h3>
                  <ul>
                    <li>✅ Secure Authentication</li>
                    <li>✅ Profile Management</li>
                    <li>✅ Protected Routes</li>
                    <li>✅ Local Storage Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="unauthenticated-content">
              <div className="cta-buttons">
                <button 
                  onClick={handleGetStarted} 
                  className="cta-btn primary"
                >
                  Get Started
                </button>
                <button 
                  onClick={handleLogin} 
                  className="cta-btn secondary"
                >
                  Login
                </button>
              </div>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🔐</div>
                  <h3>Secure Authentication</h3>
                  <p>Safe and secure login system with form validation and local storage integration.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🚀</div>
                  <h3>React Router</h3>
                  <p>Seamless navigation between pages with modern routing and programmatic navigation.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">✨</div>
                  <h3>Modern UI</h3>
                  <p>Clean and responsive design with smooth transitions and user-friendly interface.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">📱</div>
                  <h3>Responsive Design</h3>
                  <p>Fully responsive layout that works perfectly on all devices and screen sizes.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="info-section">
        <div className="info-content">
          <h2>About This Project</h2>
          <p>
            This is a comprehensive authentication application built with React that demonstrates 
            key concepts in modern web development including routing, state management, form validation, 
            and local storage integration.
          </p>
          
          <div className="tech-stack">
            <h3>Technologies Used:</h3>
            <div className="tech-list">
              <span className="tech-item">React</span>
              <span className="tech-item">React Router</span>
              <span className="tech-item">Local Storage</span>
              <span className="tech-item">CSS3</span>
              <span className="tech-item">JavaScript ES6+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
