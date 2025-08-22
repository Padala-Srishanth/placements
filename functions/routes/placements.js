const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const Placement = require('../models/Placement');

// GET /api/placements - Get all placements with optional filters
router.get('/', async (req, res) => {
  try {
    const { company, role, difficulty, year, limit = 50, offset = 0 } = req.query;
    
    let query = db.collection('placements');
    
    // Apply filters
    if (company) {
      query = query.where('companyName', '>=', company)
                   .where('companyName', '<=', company + '\uf8ff');
    }
    
    if (role) {
      query = query.where('role', '>=', role)
                   .where('role', '<=', role + '\uf8ff');
    }
    
    if (difficulty) {
      query = query.where('difficulty', '==', difficulty);
    }
    
    if (year) {
      query = query.where('batchYear', '==', parseInt(year));
    }
    
    // Order by creation date (newest first)
    query = query.orderBy('createdAt', 'desc');
    
    // Apply pagination
    query = query.limit(parseInt(limit)).offset(parseInt(offset));
    
    const snapshot = await query.get();
    const placements = [];
    
    snapshot.forEach(doc => {
      placements.push(Placement.fromFirestore(doc));
    });
    
    res.json({
      placements,
      total: placements.length,
      hasMore: placements.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({ error: 'Failed to fetch placements' });
  }
});

// GET /api/placements/:id - Get specific placement
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('placements').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Placement not found' });
    }
    
    const placement = Placement.fromFirestore(doc);
    res.json(placement);
  } catch (error) {
    console.error('Error fetching placement:', error);
    res.status(500).json({ error: 'Failed to fetch placement' });
  }
});

// GET /api/placements/filters/options - Get filter options
router.get('/filters/options', async (req, res) => {
  try {
    const snapshot = await db.collection('placements').get();
    
    const companies = new Set();
    const roles = new Set();
    const difficulties = new Set();
    const years = new Set();
    
    snapshot.forEach(doc => {
      const data = doc.data();
      companies.add(data.companyName);
      roles.add(data.role);
      difficulties.add(data.difficulty);
      years.add(data.batchYear);
    });
    
    res.json({
      companies: Array.from(companies).sort(),
      roles: Array.from(roles).sort(),
      difficulties: Array.from(difficulties).sort(),
      years: Array.from(years).sort((a, b) => b - a)
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

module.exports = router;
