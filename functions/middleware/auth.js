const { auth } = require('../config/firebase');

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check if user email matches admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@placements.com';
    
    if (req.user.email !== adminEmail) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (error) {
    console.error('Admin verification error:', error);
    return res.status(500).json({ error: 'Error verifying admin status' });
  }
};

// Combined middleware for admin routes
const requireAdmin = [verifyToken, verifyAdmin];

module.exports = {
  verifyToken,
  verifyAdmin,
  requireAdmin
};
