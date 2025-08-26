import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PlacementCard.css';

const PlacementCard = ({ placement }) => {

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
          {placement.location && (
            <div className="detail-item">
              <span className="label">Location:</span>
              <span className="value">{placement.location}</span>
            </div>
          )}

          
        </div>
        
        <div className="interview-rounds">
          <span className="rounds-count">
            {placement.interviewRounds?.length || 0} Interview Rounds
          </span>
        </div>

        {(placement.linkedinProfile || placement.email) && (
          <div className="contact-icons">
            {placement.linkedinProfile && (
              <button
                className="contact-icon linkedin-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(placement.linkedinProfile, '_blank', 'noopener,noreferrer');
                }}
                title="LinkedIn Profile"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            )}
            {placement.email && (
              <button
                className="contact-icon email-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `mailto:${placement.email}`;
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

      <div className="card-footer">
        <span className="read-more">Read Full Experience →</span>
      </div>
    </Link>
  );
};

export default PlacementCard;
