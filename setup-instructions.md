# Placements Portal Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named "placements-7138f" (or use existing)
3. Enable Firestore Database
4. Enable Authentication with Email/Password provider

### 2. Create Admin User
1. Go to Authentication > Users in Firebase Console
2. Add user with email: `admin@placements.com` and password: `admin123`
3. Note the UID for this user

### 3. Generate Service Account Key (for Server)
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the following values for your server `.env` file:
   - `project_id`
   - `private_key_id`
   - `private_key`
   - `client_email`
   - `client_id`

## Installation Steps

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
```

### 2. Configure Server Environment
Edit `server/.env` with your Firebase credentials:
```env
PORT=5000
NODE_ENV=development

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=placements-7138f
FIREBASE_PRIVATE_KEY_ID=your_private_key_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email_here
FIREBASE_CLIENT_ID=your_client_id_here
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# Admin Credentials
ADMIN_EMAIL=admin@placements.com
ADMIN_PASSWORD=admin123
```

### 3. Client Setup
```bash
cd client
npm install
```

### 4. Start the Applications

#### Start Server (Terminal 1)
```bash
cd server
npm run dev
```
Server will run on http://localhost:5000

#### Start Client (Terminal 2)
```bash
cd client
npm start
```
Client will run on http://localhost:3000

## Testing the Application

### 1. Access Public Pages
- Homepage: http://localhost:3000
- Placements: http://localhost:3000/placements
- Higher Education: http://localhost:3000/higher-education

### 2. Admin Access
- Admin Login: http://localhost:3000/admin/login
- Use credentials: `admin@placements.com` / `admin123`
- Admin Dashboard: http://localhost:3000/admin/dashboard

### 3. Test Admin Functions
1. Login as admin
2. Add sample placement experience
3. Add sample higher education experience
4. View them on public pages
5. Edit/delete from admin dashboard

## Firestore Collections Structure

The application will create these collections:

### `placements`
```json
{
  "companyName": "string",
  "companyLogo": "string",
  "role": "string",
  "location": "string",
  "interviewRounds": [
    {
      "name": "string",
      "details": "string"
    }
  ],
  "commonlyAskedQuestions": ["string"],
  "tips": "string",
  "linkedinProfile": "string",
  "email": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### `higherEducation`
```json
{
  "universityName": "string",
  "universityLogo": "string",
  "country": "string",
  "course": "string",
  "yearOfAdmission": "number",
  "examScores": {
    "GRE": "string",
    "IELTS": "string",
    "TOEFL": "string",
    "GMAT": "string"
  },
  "applicationProcess": "string",
  "visaProcess": "string",
  "tips": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check if Firebase credentials are correct in `.env`
   - Ensure Firestore is enabled in Firebase Console

2. **Admin Login Not Working**
   - Verify admin user exists in Firebase Authentication
   - Check if email matches `ADMIN_EMAIL` in `.env`

3. **CORS Errors**
   - Ensure server is running on port 5000
   - Check proxy setting in client `package.json`

4. **Build Errors**
   - Delete `node_modules` and run `npm install` again
   - Check Node.js version (should be v14+)

### Development Tips

1. **Adding Sample Data**
   - Use the admin panel to add sample placements and higher education experiences
   - This will help test the filtering and display functionality

2. **Customizing Styles**
   - All styles are in `client/src/styles/`
   - Modify colors, fonts, and layouts as needed

3. **Adding New Features**
   - Follow the existing pattern for new routes and components
   - Update both client and server code for new data fields

## Production Deployment

### Environment Variables
- Set `NODE_ENV=production` in server
- Update CORS origins in server for production domain
- Set `REACT_APP_API_URL` in client for production API URL

### Security Considerations
- Change default admin credentials
- Use environment variables for all sensitive data
- Enable Firebase Security Rules for Firestore
- Use HTTPS in production

## Support
If you encounter any issues, check:
1. Firebase Console for authentication and database status
2. Browser console for client-side errors
3. Server logs for backend errors
4. Network tab for API request/response issues
