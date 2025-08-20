const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const HigherEducation = require('../models/HigherEducation');

// GET /api/higher-education - Get all higher education experiences with optional filters
router.get('/', async (req, res) => {
  try {
    const { country, university, course, year, limit = 50, offset = 0 } = req.query;
    
    let query = db.collection('higherEducation');
    
    // Apply filters
    if (country) {
      query = query.where('country', '>=', country)
                   .where('country', '<=', country + '\uf8ff');
    }
    
    if (university) {
      query = query.where('universityName', '>=', university)
                   .where('universityName', '<=', university + '\uf8ff');
    }
    
    if (course) {
      query = query.where('course', '>=', course)
                   .where('course', '<=', course + '\uf8ff');
    }
    
    if (year) {
      query = query.where('yearOfAdmission', '==', parseInt(year));
    }
    
    // Order by creation date (newest first)
    query = query.orderBy('createdAt', 'desc');
    
    // Apply pagination
    query = query.limit(parseInt(limit)).offset(parseInt(offset));
    
    const snapshot = await query.get();
    const experiences = [];
    
    snapshot.forEach(doc => {
      experiences.push(HigherEducation.fromFirestore(doc));
    });
    
    res.json({
      experiences,
      total: experiences.length,
      hasMore: experiences.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching higher education experiences:', error);
    res.status(500).json({ error: 'Failed to fetch higher education experiences' });
  }
});

// GET /api/higher-education/:id - Get specific higher education experience
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('higherEducation').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Higher education experience not found' });
    }
    
    const experience = HigherEducation.fromFirestore(doc);
    res.json(experience);
  } catch (error) {
    console.error('Error fetching higher education experience:', error);
    res.status(500).json({ error: 'Failed to fetch higher education experience' });
  }
});

// GET /api/higher-education/filters/options - Get filter options
router.get('/filters/options', async (req, res) => {
  try {
    const snapshot = await db.collection('higherEducation').get();
    
    const countries = new Set();
    const universities = new Set();
    const courses = new Set();
    const years = new Set();
    
    snapshot.forEach(doc => {
      const data = doc.data();
      countries.add(data.country);
      universities.add(data.universityName);
      courses.add(data.course);
      years.add(data.yearOfAdmission);
    });
    
    res.json({
      countries: Array.from(countries).sort(),
      universities: Array.from(universities).sort(),
      courses: Array.from(courses).sort(),
      years: Array.from(years).sort((a, b) => b - a)
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

module.exports = router;
