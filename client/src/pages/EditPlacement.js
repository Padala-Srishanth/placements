import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { placementsAPI } from '../services/api';
import PlacementForm from '../components/PlacementForm';
import '../styles/AdminForms.css';

const EditPlacement = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  const fetchPlacement = useCallback(async () => {
    try {
      setFetchLoading(true);
      const response = await placementsAPI.getById(id);
      const placement = response.data;

      // Ensure arrays and contact fields exist
      setInitialData({
        ...placement,
        interviewRounds: placement.interviewRounds || [{ name: '', details: '' }],
        commonlyAskedQuestions: placement.commonlyAskedQuestions || [''],
        linkedinProfile: placement.linkedinProfile || '',
        email: placement.email || ''
      });
    } catch (error) {
      console.error('Error fetching placement:', error);
      setError('Failed to fetch placement details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlacement();
  }, [fetchPlacement]);

  const handleSubmit = async (formData) => {
    try {
      setError('');
      setLoading(true);

      // Filter out empty interview rounds and questions
      const cleanedData = {
        ...formData,
        interviewRounds: formData.interviewRounds.filter(round => 
          round.name.trim() || round.details.trim()
        ),
        commonlyAskedQuestions: formData.commonlyAskedQuestions.filter(q => 
          q.trim()
        )
      };

      await placementsAPI.update(id, cleanedData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating placement:', error);
      setError(error.response?.data?.errors?.join(', ') || 'Failed to update placement');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading placement details...</p>
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchPlacement}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>Edit Placement Experience</h1>
        <p>Update the placement experience details</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {initialData && (
        <PlacementForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Update Placement"
        />
      )}
    </div>
  );
};

export default EditPlacement;
