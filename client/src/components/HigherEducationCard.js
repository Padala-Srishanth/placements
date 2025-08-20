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
        </div>
      </div>
      
      <div className="card-footer">
        <span className="read-more">Read Full Experience →</span>
      </div>
    </Link>
  );
};

export default HigherEducationCard;
