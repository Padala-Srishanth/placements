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
