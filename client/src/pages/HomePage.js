import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Welcome to Placements Portal</h1>
      </div>
      
      <div className="main-sections">
        <div className="section-container">
          <Link to="/placements" className="section-card placements-card">
            <div className="card-icon">📦</div>
            <h2>Placements</h2>
            <p>Explore real placement experiences, interview processes, and tips from students who got placed in top companies.</p>
            <div className="card-features">
              <span>• Company Experiences</span>
              <span>• Interview Rounds</span>
              <span>• Tips & Advice</span>
              <span>• Difficulty Levels</span>
            </div>
            <div className="card-cta">Browse Placements →</div>
          </Link>
          
          <Link to="/higher-education" className="section-card education-card">
            <div className="card-icon">🎓</div>
            <h2>Higher Education</h2>
            <p>Get insights into university applications, exam preparations, and visa processes from students who made it abroad.</p>
            <div className="card-features">
              <span>• University Experiences</span>
              <span>• Exam Scores & Tips</span>
              <span>• Application Process</span>
              <span>• Visa Guidance</span>
            </div>
            <div className="card-cta">Explore Education →</div>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
