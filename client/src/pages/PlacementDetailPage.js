import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { placementsAPI } from '../services/api';
import '../styles/DetailPage.css';

const PlacementDetailPage = () => {
  const { id } = useParams();
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlacement();
  }, [id]);

  const fetchPlacement = useCallback(async () => {
    try {
      setLoading(true);
      const response = await placementsAPI.getById(id);
      setPlacement(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch placement details');
      console.error('Error fetching placement:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);



  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading placement details...</p>
      </div>
    );
  }

  if (error || !placement) {
    return (
      <div className="error-container">
        <p>{error || 'Placement not found'}</p>
        <Link to="/placements">← Back to Placements</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <Link to="/placements">← Back to Placements</Link>
      </div>
      
      <div className="detail-header">
        <div className="company-header">
          {placement.companyLogo && (
            <img 
              src={placement.companyLogo} 
              alt={`${placement.companyName} logo`}
              className="company-logo-large"
            />
          )}
          <div className="company-details">
            <h1>{placement.companyName}</h1>
            <h2>{placement.role}</h2>
            <div className="meta-info">
              {placement.location && <span className="location">📍 {placement.location}</span>}
            </div>

            {(placement.linkedinProfile || placement.email) && (
              <div className="contact-section">
                <h4>Contact Information</h4>
                <div className="contact-icons-detail">
                  {placement.linkedinProfile && (
                    <a
                      href={placement.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link linkedin-link"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {placement.email && (
                    <a
                      href={`mailto:${placement.email}`}
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
        {placement.interviewRounds && placement.interviewRounds.length > 0 && (
          <section className="interview-rounds">
            <h3>Interview Rounds</h3>
            <div className="rounds-list">
              {placement.interviewRounds.map((round, index) => (
                <div key={index} className="round-item">
                  <h4>Round {index + 1}: {round.name || `Round ${index + 1}`}</h4>
                  <p>{round.details || round.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {placement.commonlyAskedQuestions && placement.commonlyAskedQuestions.length > 0 && (
          <section className="common-questions">
            <h3>Commonly Asked Questions</h3>
            <ul className="questions-list">
              {placement.commonlyAskedQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </section>
        )}

        {placement.tips && (
          <section className="tips-section">
            <h3>Tips & Advice</h3>
            <div className="tips-content">
              <p>{placement.tips}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PlacementDetailPage;
