# Placements & Higher Education Platform

A comprehensive platform for students to access placement experiences and higher education guidance.

## Features

### Public Features
- **Homepage**: Navigate between Placements and Higher Education sections
- **Placements Section**: Browse placement experiences with filters
- **Higher Education Section**: Explore university experiences and guidance
- **Detailed Views**: Complete interview experiences and university application processes

### Admin Features
- **Admin Authentication**: Secure login for content management
- **Content Management**: Add, edit, and delete placement and education experiences
- **Dashboard**: Centralized control panel for all content

## Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Styling**: CSS3 with responsive design

## Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and Firebase services
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Placements
   ```

2. **Server Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your Firebase credentials
   npm run dev
   ```

3. **Client Setup**
   ```bash
   cd client
   npm install
   npm start
   ```

### Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Authentication with Email/Password
4. Generate a service account key for the server
5. Update the .env file with your credentials

### Default Admin Credentials
- Email: admin@placements.com
- Password: admin123

## API Endpoints

### Public Endpoints
- `GET /api/placements` - Get all placement experiences
- `GET /api/placements/:id` - Get specific placement experience
- `GET /api/higher-education` - Get all higher education experiences
- `GET /api/higher-education/:id` - Get specific higher education experience

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/placements` - Create placement experience
- `PUT /api/admin/placements/:id` - Update placement experience
- `DELETE /api/admin/placements/:id` - Delete placement experience
- `POST /api/admin/higher-education` - Create higher education experience
- `PUT /api/admin/higher-education/:id` - Update higher education experience
- `DELETE /api/admin/higher-education/:id` - Delete higher education experience

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
