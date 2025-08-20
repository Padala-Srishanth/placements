import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { higherEducationAPI } from '../services/api';
import HigherEducationForm from '../components/HigherEducationForm';
import '../styles/AdminForms.css';

const AddHigherEducation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialData = {
    universityName: '',
    universityLogo: '',
    country: '',
    course: '',
    yearOfAdmission: new Date().getFullYear(),
    examScores: {
      GRE: '',
      IELTS: '',
      TOEFL: '',
      GMAT: ''
    },
    applicationProcess: '',
    visaProcess: '',
    tips: ''
  };

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

      await higherEducationAPI.create(cleanedData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating higher education experience:', error);
      setError(error.response?.data?.errors?.join(', ') || 'Failed to create experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>Add Higher Education Experience</h1>
        <p>Create a new higher education experience entry</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <HigherEducationForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create Experience"
      />
    </div>
  );
};

export default AddHigherEducation;
