import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { higherEducationAPI } from '../services/api';
import '../styles/DetailPage.css';

const HigherEducationDetailPage = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperience();
  }, [id]);

  const fetchExperience = useCallback(async () => {
    try {
      setLoading(true);
      const response = await higherEducationAPI.getById(id);
      setExperience(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch higher education details');
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading experience details...</p>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="error-container">
        <p>{error || 'Experience not found'}</p>
        <Link to="/higher-education">← Back to Higher Education</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <Link to="/higher-education">← Back to Higher Education</Link>
      </div>
      
      <div className="detail-header">
        <div className="university-header">
          {experience.universityLogo && (
            <img 
              src={experience.universityLogo} 
              alt={`${experience.universityName} logo`}
              className="university-logo-large"
            />
          )}
          <div className="university-details">
            <h1>{experience.universityName}</h1>
            <h2>{experience.course}</h2>
            <div className="meta-info">
              <span className="country-info">
                <span className="country-flag">{getCountryFlag(experience.country)}</span>
                {experience.country}
              </span>
              <span className="admission-year">Year: {experience.yearOfAdmission}</span>
            </div>

            {(experience.linkedinProfile || experience.email) && (
              <div className="contact-section">
                <h4>Contact Information</h4>
                <div className="contact-icons-detail">
                  {experience.linkedinProfile && (
                    <a
                      href={experience.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link linkedin-link"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {experience.email && (
                    <a
                      href={`mailto:${experience.email}`}
                      className="contact-link email-link"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span>Send Email</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="detail-content">
        {experience.examScores && Object.keys(experience.examScores).length > 0 && (
          <section className="exam-scores-section">
            <h3>Exam Scores</h3>
            <div className="exam-scores-grid">
              {Object.entries(experience.examScores).map(([exam, score]) => (
                <div key={exam} className="exam-score-item">
                  <h4>{exam.toUpperCase()}</h4>
                  <p>{score}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.applicationProcess && (
          <section className="application-process">
            <h3>Application Process</h3>
            <div className="process-content">
              <p>{experience.applicationProcess}</p>
            </div>
          </section>
        )}

        {experience.visaProcess && (
          <section className="visa-process">
            <h3>Visa Process Experience</h3>
            <div className="visa-content">
              <p>{experience.visaProcess}</p>
            </div>
          </section>
        )}

        {experience.tips && (
          <section className="tips-section">
            <h3>Tips & Advice</h3>
            <div className="tips-content">
              <p>{experience.tips}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HigherEducationDetailPage;
