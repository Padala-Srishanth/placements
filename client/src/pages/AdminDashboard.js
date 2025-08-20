import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementsAPI, higherEducationAPI } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPlacements: 0,
    totalHigherEducation: 0,
    recentPlacements: [],
    recentHigherEducation: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch placements and higher education data
      const [placementsResponse, higherEducationResponse] = await Promise.all([
        placementsAPI.getAll({ limit: 5 }),
        higherEducationAPI.getAll({ limit: 5 })
      ]);

      setStats({
        totalPlacements: placementsResponse.data.placements.length,
        totalHigherEducation: higherEducationResponse.data.experiences.length,
        recentPlacements: placementsResponse.data.placements.slice(0, 5),
        recentHigherEducation: higherEducationResponse.data.experiences.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      if (type === 'placement') {
        await placementsAPI.delete(id);
      } else {
        await higherEducationAPI.delete(id);
      }
      
      // Refresh dashboard data
      fetchDashboardData();
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage placement and higher education experiences</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.totalPlacements}</h3>
          <p>Total Placements</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalHigherEducation}</h3>
          <p>Higher Education Experiences</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/admin/placements/add" className="action-btn primary">
          ➕ Add Placement Experience
        </Link>
        <Link to="/admin/higher-education/add" className="action-btn primary">
          ➕ Add Higher Education Experience
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Recent Placements</h2>
          <div className="items-list">
            {stats.recentPlacements.length > 0 ? (
              stats.recentPlacements.map(placement => (
                <div key={placement.id} className="item-card">
                  <div className="item-info">
                    <h4>{placement.companyName}</h4>
                    <p>{placement.role} - {placement.batchYear}</p>
                  </div>
                  <div className="item-actions">
                    <Link 
                      to={`/admin/placements/edit/${placement.id}`}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete('placement', placement.id)}
                      className="delete-btn"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No placements found</p>
            )}
          </div>
        </div>

        <div className="content-section">
          <h2>Recent Higher Education</h2>
          <div className="items-list">
            {stats.recentHigherEducation.length > 0 ? (
              stats.recentHigherEducation.map(experience => (
                <div key={experience.id} className="item-card">
                  <div className="item-info">
                    <h4>{experience.universityName}</h4>
                    <p>{experience.course} - {experience.country}</p>
                  </div>
                  <div className="item-actions">
                    <Link 
                      to={`/admin/higher-education/edit/${experience.id}`}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete('higher-education', experience.id)}
                      className="delete-btn"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No higher education experiences found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
