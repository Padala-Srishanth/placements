import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { higherEducationAPI } from '../services/api';
import HigherEducationForm from '../components/HigherEducationForm';
import '../styles/AdminForms.css';

const EditHigherEducation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  const fetchExperience = useCallback(async () => {
    try {
      setFetchLoading(true);
      const response = await higherEducationAPI.getById(id);
      const experience = response.data;

      // Ensure examScores object and contact fields exist
      setInitialData({
        ...experience,
        examScores: experience.examScores || {
          GRE: '',
          IELTS: '',
          TOEFL: '',
          GMAT: ''
        },
        linkedinProfile: experience.linkedinProfile || '',
        email: experience.email || ''
      });
    } catch (error) {
      console.error('Error fetching higher education experience:', error);
      setError('Failed to fetch experience details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const handleSubmit = async (formData) => {
    try {
      setError('');
      setLoading(true);

      // Filter out empty exam scores
      const cleanedExamScores = {};
      Object.entries(formData.examScores).forEach(([exam, score]) => {
        if (score && score.trim()) {
          cleanedExamScores[exam] = score.trim();
        }
      });

      const cleanedData = {
        ...formData,
        examScores: cleanedExamScores
      };

      await higherEducationAPI.update(id, cleanedData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating higher education experience:', error);
      setError(error.response?.data?.errors?.join(', ') || 'Failed to update experience');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading experience details...</p>
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchExperience}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>Edit Higher Education Experience</h1>
        <p>Update the higher education experience details</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {initialData && (
        <HigherEducationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Update Experience"
        />
      )}
    </div>
  );
};

export default EditHigherEducation;
