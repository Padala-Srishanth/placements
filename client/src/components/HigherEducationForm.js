import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Forms.css';

const HigherEducationForm = ({ initialData, onSubmit, loading, submitText }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExamScoreChange = (exam, score) => {
    setFormData(prev => ({
      ...prev,
      examScores: {
        ...prev.examScores,
        [exam]: score
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="higher-education-form">
      <div className="form-section">
        <h3>Basic Information</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="universityName">University Name *</label>
            <input
              type="text"
              id="universityName"
              value={formData.universityName}
              onChange={(e) => handleInputChange('universityName', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="e.g., USA, Canada, UK"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              type="text"
              id="course"
              value={formData.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              placeholder="e.g., MS in Computer Science, MBA"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="yearOfAdmission">Year of Admission *</label>
            <input
              type="number"
              id="yearOfAdmission"
              value={formData.yearOfAdmission}
              onChange={(e) => handleInputChange('yearOfAdmission', parseInt(e.target.value))}
              min="2000"
              max={new Date().getFullYear() + 5}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="universityLogo">University Logo URL</label>
          <input
            type="url"
            id="universityLogo"
            value={formData.universityLogo}
            onChange={(e) => handleInputChange('universityLogo', e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Exam Scores</h3>
        <p className="section-description">Enter your standardized test scores (leave blank if not applicable)</p>
        
        <div className="exam-scores-grid">
          <div className="form-group">
            <label htmlFor="gre">GRE Score</label>
            <input
              type="text"
              id="gre"
              value={formData.examScores.GRE}
              onChange={(e) => handleExamScoreChange('GRE', e.target.value)}
              placeholder="e.g., 320/340"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="ielts">IELTS Score</label>
            <input
              type="text"
              id="ielts"
              value={formData.examScores.IELTS}
              onChange={(e) => handleExamScoreChange('IELTS', e.target.value)}
              placeholder="e.g., 7.5/9"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="toefl">TOEFL Score</label>
            <input
              type="text"
              id="toefl"
              value={formData.examScores.TOEFL}
              onChange={(e) => handleExamScoreChange('TOEFL', e.target.value)}
              placeholder="e.g., 105/120"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gmat">GMAT Score</label>
            <input
              type="text"
              id="gmat"
              value={formData.examScores.GMAT}
              onChange={(e) => handleExamScoreChange('GMAT', e.target.value)}
              placeholder="e.g., 720/800"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Application Process</h3>
        <div className="form-group">
          <label htmlFor="applicationProcess">Application Process Experience</label>
          <textarea
            id="applicationProcess"
            value={formData.applicationProcess}
            onChange={(e) => handleInputChange('applicationProcess', e.target.value)}
            placeholder="Describe your application process, SOP writing, LOR collection, deadlines, portal experience, etc."
            rows="6"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Visa Process</h3>
        <div className="form-group">
          <label htmlFor="visaProcess">Visa Process Experience</label>
          <textarea
            id="visaProcess"
            value={formData.visaProcess}
            onChange={(e) => handleInputChange('visaProcess', e.target.value)}
            placeholder="Share your visa application experience, interview process, documents required, timeline, etc."
            rows="6"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Tips & Advice</h3>
        <div className="form-group">
          <label htmlFor="tips">Tips & Advice</label>
          <textarea
            id="tips"
            value={formData.tips}
            onChange={(e) => handleInputChange('tips', e.target.value)}
            placeholder="Share tips and advice for future applicants"
            rows="6"
          />
        </div>
      </div>

      <div className="form-actions">
        <Link to="/admin/dashboard" className="cancel-btn">
          Cancel
        </Link>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default HigherEducationForm;
