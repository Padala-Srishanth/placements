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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

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
              <span className="batch-year">Batch: {placement.batchYear}</span>
              {placement.location && <span className="location">📍 {placement.location}</span>}
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(placement.difficulty) }}
              >
                {placement.difficulty}
              </span>
            </div>
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
