# 🚀 Deployment Guide - Placements Portal

## 📋 Overview
- **Frontend (React)**: Deploy to Netlify
- **Backend (Node.js/Express)**: Deploy to Firebase Functions
- **Database**: Firebase Firestore (already configured)

## 🔥 Step 1: Deploy Backend to Firebase Functions

### Prerequisites
- Firebase CLI installed ✅
- Logged into Firebase ✅
- Project configured ✅

### Deploy Commands
```bash
# From project root directory
cd functions
npm install
cd ..
firebase deploy --only functions
```

### After Deployment
Your API will be available at:
```
https://us-central1-placements-7138f.cloudfunctions.net/api
```

## 🌐 Step 2: Deploy Frontend to Netlify

### Option A: Drag & Drop (Easiest)
1. Go to [Netlify](https://app.netlify.com/)
2. Drag the `client/build` folder to Netlify
3. Your site will be deployed instantly!

### Option B: Git Integration (Recommended)
1. Push your code to GitHub (already done ✅)
2. Connect Netlify to your GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Base directory**: `client`

### Environment Variables for Netlify
Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
REACT_APP_API_URL=https://us-central1-placements-7138f.cloudfunctions.net/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=placements-7138f.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=placements-7138f
REACT_APP_FIREBASE_STORAGE_BUCKET=placements-7138f.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 🔧 Step 3: Update CORS Configuration

After getting your Netlify URL, update the CORS configuration in `functions/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-actual-netlify-url.netlify.app', // Update this
    /\.netlify\.app$/
  ],
  credentials: true
}));
```

Then redeploy functions:
```bash
firebase deploy --only functions
```

## ✅ Verification Steps

1. **Backend Health Check**:
   ```
   GET https://us-central1-placements-7138f.cloudfunctions.net/api/health
   ```

2. **Frontend Access**:
   - Visit your Netlify URL
   - Test admin login
   - Verify data loading

## 🎯 Quick Deploy Commands

```bash
# Deploy backend
firebase deploy --only functions

# Build frontend (already done)
cd client && npm run build

# Deploy frontend to Netlify (drag & drop build folder)
```

## 🔒 Security Notes

- Environment variables are properly configured
- CORS is restricted to your domains
- Firestore rules allow public read, authenticated write
- Firebase Admin SDK handles server-side authentication

## 📞 Support

If you encounter issues:
1. Check Firebase Functions logs: `firebase functions:log`
2. Check Netlify deploy logs in dashboard
3. Verify environment variables are set correctly
