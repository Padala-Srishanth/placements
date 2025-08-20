# 🔧 Firebase Authentication Setup Guide

## The Problem
You're getting the error: `Firebase: Error (auth/configuration-not-found)` because Firebase Authentication is not properly configured.

## Quick Fix Steps

### 1. Enable Firebase Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **placements-7138f**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Email/Password**
5. Enable it and click **Save**

### 2. Create Admin User
1. In Firebase Console, go to **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - **Email**: `admin@placements.com`
   - **Password**: `admin123`
4. Click **Add user**

### 3. Verify Setup
1. Restart your React development server
2. Go to `/admin/login`
3. Use the credentials:
   - Email: `admin@placements.com`
   - Password: `admin123`

## Alternative: Programmatic Setup
If you prefer to create the user programmatically, you can run this in your browser console after enabling Email/Password authentication:

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/config/firebase';

createUserWithEmailAndPassword(auth, 'admin@placements.com', 'admin123')
  .then((userCredential) => {
    console.log('Admin user created:', userCredential.user.email);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Security Note
After setup, consider:
1. Changing the default password
2. Setting up proper Firebase Security Rules
3. Enabling additional security features like email verification

## Files Modified
- ✅ Added `manifest.json` to fix manifest error
- ✅ Updated React Router with future flags to fix warnings
- ✅ Enhanced error handling in AuthContext
- ✅ Added setup instructions in AdminLogin
- ✅ Added styling for setup instructions
