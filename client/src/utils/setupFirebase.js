import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

/**
 * Setup script to create the admin user
 * Run this once to create the admin user in Firebase Authentication
 */
export const createAdminUser = async () => {
  try {
    const adminEmail = 'admin@placements.com';
    const adminPassword = 'admin123';
    
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log('Admin user created successfully:', userCredential.user.email);
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }
};

/**
 * Instructions for manual setup:
 * 
 * 1. Go to Firebase Console: https://console.firebase.google.com/
 * 2. Select your project: placements-7138f
 * 3. Navigate to Authentication > Sign-in method
 * 4. Enable Email/Password authentication
 * 5. Go to Authentication > Users
 * 6. Click "Add user" and create:
 *    - Email: admin@placements.com
 *    - Password: admin123
 * 
 * Or run this function in the browser console:
 * import { createAdminUser } from './utils/setupFirebase';
 * createAdminUser();
 */
