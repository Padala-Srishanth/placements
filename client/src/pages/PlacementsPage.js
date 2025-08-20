import React, { useState, useEffect, useCallback } from 'react';
import { placementsAPI } from '../services/api';
import PlacementCard from '../components/PlacementCard';
import FilterPanel from '../components/FilterPanel';
import '../styles/PlacementsPage.css';

const PlacementsPage = () => {
  const [placements, setPlacements] = useState([]);
  const [filteredPlacements, setFilteredPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    difficulty: '',
    year: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    companies: [],
    roles: [],
    difficulties: ['Easy', 'Medium', 'Hard'],
    years: []
  });

  useEffect(() => {
    fetchPlacements();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [placements, filters]);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const response = await placementsAPI.getAll();
      setPlacements(response.data.placements);
      setError(null);
    } catch (err) {
      setError('Failed to fetch placements');
      console.error('Error fetching placements:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await placementsAPI.getFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = placements;

    if (filters.company) {
      filtered = filtered.filter(p => 
        p.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.role) {
      filtered = filtered.filter(p => 
        p.role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty);
    }

    if (filters.year) {
      filtered = filtered.filter(p => p.batchYear.toString() === filters.year);
    }

    setFilteredPlacements(filtered);
  }, [placements, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      company: '',
      role: '',
      difficulty: '',
      year: ''
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading placements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchPlacements}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="placements-page">
      <div className="page-header">
        <h1>Placement Experiences</h1>
        <p>Discover real placement experiences from students across various companies</p>
      </div>

      <FilterPanel
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        type="placements"
      />

      <div className="results-info">
        <p>Showing {filteredPlacements.length} of {placements.length} experiences</p>
      </div>

      <div className="placements-grid">
        {filteredPlacements.length > 0 ? (
          filteredPlacements.map(placement => (
            <PlacementCard key={placement.id} placement={placement} />
          ))
        ) : (
          <div className="no-results">
            <p>No placements found matching your criteria.</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementsPage;
