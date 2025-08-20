import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlacementsPage from './pages/PlacementsPage';
import PlacementDetailPage from './pages/PlacementDetailPage';
import HigherEducationPage from './pages/HigherEducationPage';
import HigherEducationDetailPage from './pages/HigherEducationDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddPlacement from './pages/AddPlacement';
import AddHigherEducation from './pages/AddHigherEducation';
import EditPlacement from './pages/EditPlacement';
import EditHigherEducation from './pages/EditHigherEducation';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/placements" element={<PlacementsPage />} />
              <Route path="/placements/:id" element={<PlacementDetailPage />} />
              <Route path="/higher-education" element={<HigherEducationPage />} />
              <Route path="/higher-education/:id" element={<HigherEducationDetailPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/placements/add" 
                element={
                  <ProtectedRoute>
                    <AddPlacement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/placements/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditPlacement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/higher-education/add" 
                element={
                  <ProtectedRoute>
                    <AddHigherEducation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/higher-education/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditHigherEducation />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
