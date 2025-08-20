import React from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, filterOptions, onFilterChange, onClearFilters, type }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const isPlacement = type === 'placements';

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={onClearFilters} className="clear-filters-btn">
          Clear All
        </button>
      </div>
      
      <div className="filter-grid">
        {isPlacement ? (
          <>
            <div className="filter-group">
              <label>Company</label>
              <select
                value={filters.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              >
                <option value="">All Companies</option>
                {filterOptions.companies?.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Role</label>
              <select
                value={filters.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                {filterOptions.roles?.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
              >
                <option value="">All Difficulties</option>
                {filterOptions.difficulties?.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="filter-group">
              <label>Country</label>
              <select
                value={filters.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                {filterOptions.countries?.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>University</label>
              <select
                value={filters.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
              >
                <option value="">All Universities</option>
                {filterOptions.universities?.map(university => (
                  <option key={university} value={university}>{university}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Course</label>
              <select
                value={filters.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
              >
                <option value="">All Courses</option>
                {filterOptions.courses?.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </>
        )}
        
        <div className="filter-group">
          <label>Year</label>
          <select
            value={filters.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
          >
            <option value="">All Years</option>
            {filterOptions.years?.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
