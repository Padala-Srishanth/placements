import React, { useState, useEffect, useCallback } from 'react';
import { higherEducationAPI } from '../services/api';
import HigherEducationCard from '../components/HigherEducationCard';
import FilterPanel from '../components/FilterPanel';
import '../styles/HigherEducationPage.css';

const HigherEducationPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    country: '',
    university: '',
    course: '',
    year: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    universities: [],
    courses: [],
    years: []
  });

  useEffect(() => {
    fetchExperiences();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [experiences, filters]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await higherEducationAPI.getAll();
      setExperiences(response.data.experiences);
      setError(null);
    } catch (err) {
      setError('Failed to fetch higher education experiences');
      console.error('Error fetching experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await higherEducationAPI.getFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = experiences;

    if (filters.country) {
      filtered = filtered.filter(e => 
        e.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    if (filters.university) {
      filtered = filtered.filter(e => 
        e.universityName.toLowerCase().includes(filters.university.toLowerCase())
      );
    }

    if (filters.course) {
      filtered = filtered.filter(e => 
        e.course.toLowerCase().includes(filters.course.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(e => e.yearOfAdmission.toString() === filters.year);
    }

    setFilteredExperiences(filtered);
  }, [experiences, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      university: '',
      course: '',
      year: ''
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading higher education experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchExperiences}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="higher-education-page">
      <div className="page-header">
        <h1>Higher Education Experiences</h1>
        <p>Discover university application processes and study abroad experiences</p>
      </div>

      <FilterPanel
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        type="higher-education"
      />

      <div className="results-info">
        <p>Showing {filteredExperiences.length} of {experiences.length} experiences</p>
      </div>

      <div className="experiences-grid">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map(experience => (
            <HigherEducationCard key={experience.id} experience={experience} />
          ))
        ) : (
          <div className="no-results">
            <p>No experiences found matching your criteria.</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HigherEducationPage;
