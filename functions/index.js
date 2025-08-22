const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const placementsRoutes = require('./routes/placements');
const higherEducationRoutes = require('./routes/higherEducation');
const adminRoutes = require('./routes/admin');

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://placements-portal.netlify.app', // Updated with actual Netlify URL
    /\.netlify\.app$/,
  ],
  credentials: true,
}));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Firebase Functions API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/placements', placementsRoutes);
app.use('/higher-education', higherEducationRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
