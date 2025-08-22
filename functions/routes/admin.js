const express = require('express');
const router = express.Router();
const { db, auth } = require('../config/firebase');
const { requireAdmin } = require('../middleware/auth');
const Placement = require('../models/Placement');
const HigherEducation = require('../models/HigherEducation');

// POST /api/admin/login - Admin login (handled by Firebase Auth on client)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // This endpoint is mainly for validation
    // Actual authentication is handled by Firebase Auth on the client
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@placements.com';
    
    if (email !== adminEmail) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    res.json({ message: 'Admin login successful' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// PLACEMENT ROUTES

// POST /api/admin/placements - Create new placement
router.post('/placements', requireAdmin, async (req, res) => {
  try {
    console.log('Creating placement with data:', req.body);
    const placement = new Placement(req.body);
    console.log('Placement object created:', placement);

    const errors = placement.validate();
    console.log('Validation errors:', errors);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    console.log('Attempting to save to Firestore...');
    const docRef = await db.collection('placements').add(placement.toFirestore());
    console.log('Document saved with ID:', docRef.id);
    placement.id = docRef.id;

    res.status(201).json(placement);
  } catch (error) {
    console.error('Error creating placement:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to create placement', details: error.message });
  }
});

// PUT /api/admin/placements/:id - Update placement
router.put('/placements/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const placement = new Placement({ id, ...updateData });
    
    const errors = placement.validate();
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    await db.collection('placements').doc(id).update(placement.toFirestore());
    
    res.json(placement);
  } catch (error) {
    console.error('Error updating placement:', error);
    res.status(500).json({ error: 'Failed to update placement' });
  }
});

// DELETE /api/admin/placements/:id - Delete placement
router.delete('/placements/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('placements').doc(id).delete();
    
    res.json({ message: 'Placement deleted successfully' });
  } catch (error) {
    console.error('Error deleting placement:', error);
    res.status(500).json({ error: 'Failed to delete placement' });
  }
});

// HIGHER EDUCATION ROUTES

// POST /api/admin/higher-education - Create new higher education experience
router.post('/higher-education', requireAdmin, async (req, res) => {
  try {
    const experience = new HigherEducation(req.body);
    const errors = experience.validate();
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    const docRef = await db.collection('higherEducation').add(experience.toFirestore());
    experience.id = docRef.id;
    
    res.status(201).json(experience);
  } catch (error) {
    console.error('Error creating higher education experience:', error);
    res.status(500).json({ error: 'Failed to create higher education experience' });
  }
});

// PUT /api/admin/higher-education/:id - Update higher education experience
router.put('/higher-education/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const experience = new HigherEducation({ id, ...updateData });
    
    const errors = experience.validate();
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    await db.collection('higherEducation').doc(id).update(experience.toFirestore());
    
    res.json(experience);
  } catch (error) {
    console.error('Error updating higher education experience:', error);
    res.status(500).json({ error: 'Failed to update higher education experience' });
  }
});

// DELETE /api/admin/higher-education/:id - Delete higher education experience
router.delete('/higher-education/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('higherEducation').doc(id).delete();
    
    res.json({ message: 'Higher education experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting higher education experience:', error);
    res.status(500).json({ error: 'Failed to delete higher education experience' });
  }
});

module.exports = router;
