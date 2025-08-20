import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PlacementCard.css';

const PlacementCard = ({ placement }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <Link to={`/placements/${placement.id}`} className="placement-card">
      <div className="card-header">
        {placement.companyLogo && (
          <img 
            src={placement.companyLogo} 
            alt={`${placement.companyName} logo`}
            className="company-logo"
          />
        )}
        <div className="company-info">
          <h3>{placement.companyName}</h3>
          <p className="role">{placement.role}</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="placement-details">
          <div className="detail-item">
            <span className="label">Batch Year:</span>
            <span className="value">{placement.batchYear}</span>
          </div>
          
          {placement.location && (
            <div className="detail-item">
              <span className="label">Location:</span>
              <span className="value">{placement.location}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="label">Difficulty:</span>
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(placement.difficulty) }}
            >
              {placement.difficulty}
            </span>
          </div>
        </div>
        
        <div className="interview-rounds">
          <span className="rounds-count">
            {placement.interviewRounds?.length || 0} Interview Rounds
          </span>
        </div>
      </div>
      
      <div className="card-footer">
        <span className="read-more">Read Full Experience →</span>
      </div>
    </Link>
  );
};

export default PlacementCard;
