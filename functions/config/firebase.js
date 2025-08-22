const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
// Use environment variables for security
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com"
};

// Check if Firebase credentials are properly configured
const isFirebaseConfigured = () => {
  return process.env.FIREBASE_PROJECT_ID &&
         process.env.FIREBASE_PRIVATE_KEY &&
         process.env.FIREBASE_CLIENT_EMAIL &&
         process.env.FIREBASE_PRIVATE_KEY !== "-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n";
};

let db, auth;

if (!admin.apps.length) {
  if (isFirebaseConfigured()) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID
      });
      db = admin.firestore();
      auth = admin.auth();
      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error.message);
      console.log('🔧 Please check your Firebase configuration in .env file');
    }
  } else {
    console.log('⚠️  Firebase not configured. Please set up your Firebase credentials in .env file');
    console.log('📖 See FIREBASE_SETUP.md for detailed instructions');
  }
}

// Create mock objects if Firebase is not configured
if (!db) {
  db = {
    collection: () => ({
      add: () => Promise.reject(new Error('Firebase not configured')),
      get: () => Promise.reject(new Error('Firebase not configured')),
      doc: () => ({
        get: () => Promise.reject(new Error('Firebase not configured')),
        update: () => Promise.reject(new Error('Firebase not configured')),
        delete: () => Promise.reject(new Error('Firebase not configured'))
      })
    })
  };
}

if (!auth) {
  auth = {
    verifyIdToken: () => Promise.reject(new Error('Firebase not configured'))
  };
}

module.exports = { admin, db, auth, isFirebaseConfigured };
