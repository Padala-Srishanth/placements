import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HigherEducationCard.css';

const HigherEducationCard = ({ experience }) => {
  const getCountryFlag = (country) => {
    const flags = {
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'UK': '🇬🇧',
      'Germany': '🇩🇪',
      'Australia': '🇦🇺',
      'Netherlands': '🇳🇱',
      'France': '🇫🇷',
      'Singapore': '🇸🇬',
      'Sweden': '🇸🇪',
      'Switzerland': '🇨🇭'
    };
    return flags[country] || '🌍';
  };

  const getExamBadges = (examScores) => {
    if (!examScores || typeof examScores !== 'object') return [];
    
    return Object.keys(examScores).map(exam => ({
      name: exam.toUpperCase(),
      score: examScores[exam]
    }));
  };

  return (
    <Link to={`/higher-education/${experience.id}`} className="higher-education-card">
      <div className="card-header">
        {experience.universityLogo && (
          <img 
            src={experience.universityLogo} 
            alt={`${experience.universityName} logo`}
            className="university-logo"
          />
        )}
        <div className="university-info">
          <h3>{experience.universityName}</h3>
          <p className="course">{experience.course}</p>
          <div className="country-info">
            <span className="country-flag">{getCountryFlag(experience.country)}</span>
            <span className="country-name">{experience.country}</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="experience-details">
          <div className="detail-item">
            <span className="label">Year of Admission:</span>
            <span className="value">{experience.yearOfAdmission}</span>
          </div>
          
          {getExamBadges(experience.examScores).length > 0 && (
            <div className="exam-scores">
              <span className="label">Exam Scores:</span>
              <div className="exam-badges">
                {getExamBadges(experience.examScores).map((exam, index) => (
                  <span key={index} className="exam-badge">
                    {exam.name}: {exam.score}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(experience.linkedinProfile || experience.email) && (
            <div className="contact-icons">
              {experience.linkedinProfile && (
                <button
                  className="contact-icon linkedin-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(experience.linkedinProfile, '_blank', 'noopener,noreferrer');
                  }}
                  title="LinkedIn Profile"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              )}
              {experience.email && (
                <button
                  className="contact-icon email-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `mailto:${experience.email}`;
                  }}
                  title="Send Email"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <span className="read-more">Read Full Experience →</span>
      </div>
    </Link>
  );
};

export default HigherEducationCard;
