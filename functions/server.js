const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Favicon route to prevent 500 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

// Routes
app.use('/api/placements', require('./routes/placements'));
app.use('/api/higher-education', require('./routes/higherEducation'));
app.use('/api/admin', require('./routes/admin'));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test Firebase connection
    const { db } = require('./config/firebase');
    await db.collection('test').limit(1).get();

    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      firebase: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Firebase connection error:', error);
    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      firebase: 'Error: ' + error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
