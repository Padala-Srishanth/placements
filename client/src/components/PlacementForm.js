import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Forms.css';

const PlacementForm = ({ initialData, onSubmit, loading, submitText }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterviewRoundChange = (index, field, value) => {
    const updatedRounds = [...formData.interviewRounds];
    updatedRounds[index] = {
      ...updatedRounds[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      interviewRounds: updatedRounds
    }));
  };

  const addInterviewRound = () => {
    setFormData(prev => ({
      ...prev,
      interviewRounds: [...prev.interviewRounds, { name: '', details: '' }]
    }));
  };

  const removeInterviewRound = (index) => {
    setFormData(prev => ({
      ...prev,
      interviewRounds: prev.interviewRounds.filter((_, i) => i !== index)
    }));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.commonlyAskedQuestions];
    updatedQuestions[index] = value;
    setFormData(prev => ({
      ...prev,
      commonlyAskedQuestions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      commonlyAskedQuestions: [...prev.commonlyAskedQuestions, '']
    }));
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      commonlyAskedQuestions: prev.commonlyAskedQuestions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="placement-form">
      <div className="form-section">
        <h3>Basic Information</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="e.g., Software Developer, Data Analyst"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="companyLogo">Company Logo URL</label>
            <input
              type="url"
              id="companyLogo"
              value={formData.companyLogo}
              onChange={(e) => handleInputChange('companyLogo', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Bangalore, Remote"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="batchYear">Batch Year *</label>
            <input
              type="number"
              id="batchYear"
              value={formData.batchYear}
              onChange={(e) => handleInputChange('batchYear', parseInt(e.target.value))}
              min="2000"
              max={new Date().getFullYear() + 5}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty *</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Interview Rounds</h3>
        {formData.interviewRounds.map((round, index) => (
          <div key={index} className="interview-round">
            <div className="round-header">
              <h4>Round {index + 1}</h4>
              {formData.interviewRounds.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInterviewRound(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="form-group">
              <label>Round Name</label>
              <input
                type="text"
                value={round.name}
                onChange={(e) => handleInterviewRoundChange(index, 'name', e.target.value)}
                placeholder="e.g., Technical Round, HR Round"
              />
            </div>
            
            <div className="form-group">
              <label>Details</label>
              <textarea
                value={round.details}
                onChange={(e) => handleInterviewRoundChange(index, 'details', e.target.value)}
                placeholder="Describe the interview round, questions asked, duration, etc."
                rows="4"
              />
            </div>
          </div>
        ))}
        
        <button type="button" onClick={addInterviewRound} className="add-btn">
          Add Interview Round
        </button>
      </div>

      <div className="form-section">
        <h3>Commonly Asked Questions</h3>
        {formData.commonlyAskedQuestions.map((question, index) => (
          <div key={index} className="question-item">
            <div className="form-group">
              <label>Question {index + 1}</label>
              <div className="input-with-remove">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder="Enter a commonly asked question"
                />
                {formData.commonlyAskedQuestions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="remove-btn small"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <button type="button" onClick={addQuestion} className="add-btn">
          Add Question
        </button>
      </div>

      <div className="form-section">
        <h3>Tips & Advice</h3>
        <div className="form-group">
          <label htmlFor="tips">Tips & Advice</label>
          <textarea
            id="tips"
            value={formData.tips}
            onChange={(e) => handleInputChange('tips', e.target.value)}
            placeholder="Share tips and advice for future candidates"
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

export default PlacementForm;
