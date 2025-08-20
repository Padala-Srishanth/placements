import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placementsAPI } from '../services/api';
import PlacementForm from '../components/PlacementForm';
import '../styles/AdminForms.css';

const AddPlacement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialData = {
    companyName: '',
    companyLogo: '',
    role: '',
    location: '',
    batchYear: new Date().getFullYear(),
    difficulty: 'Medium',
    interviewRounds: [{ name: '', details: '' }],
    commonlyAskedQuestions: [''],
    tips: ''
  };

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

      await placementsAPI.create(cleanedData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating placement:', error);
      setError(error.response?.data?.errors?.join(', ') || 'Failed to create placement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>Add Placement Experience</h1>
        <p>Create a new placement experience entry</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <PlacementForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create Placement"
      />
    </div>
  );
};

export default AddPlacement;
