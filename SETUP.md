# Journey Jar - Setup Instructions

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/journeyjar
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/journeyjar
```

### 3. Seed Database

Load initial destination data:

```bash
node utils/seedDestinations.js
```

### 4. Start Backend Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Content:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Application

```bash
npm start
```

Application will open at `http://localhost:3000`

## Testing the Application

### 1. Register a New User
- Navigate to `http://localhost:3000`
- Click "Sign Up"
- Enter email, password, and name
- Submit the form

### 2. Input Preferences
- After login, you'll be redirected to preferences page
- Select:
  - Season (summer/winter/spring/fall)
  - Mood (relax/adventure/cultural)
  - Risk Tolerance (low/medium/high)
  - Budget Level (low/medium/high)
- Click "Get Recommendations"

### 3. View Recommendations
- See personalized destination recommendations
- Each card shows:
  - Destination name
  - Summary
  - Itinerary
  - Cost level
  - Match score
- Click "Save Trip" to save favorites

### 4. Manage Saved Trips
- Click "Saved Trips" in navigation
- View all saved trips
- Delete trips you no longer want

## API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Recommendations
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"season":"summer","mood":"relax","riskTolerance":"low","budgetLevel":"high"}'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify MONGODB_URI in `.env` file
- Check firewall settings for MongoDB port (27017)

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

### CORS Errors
- Ensure backend is running
- Check REACT_APP_API_URL in frontend `.env`
- Verify cors is enabled in backend

### JWT Token Issues
- Ensure JWT_SECRET is set in backend `.env`
- Clear browser localStorage and re-login
- Check token expiration (default 7 days)

## Project Structure

```
journeyjar/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── data/           # Seed data
│   ├── docs/           # API docs & diagrams
│   ├── middleware/     # Auth & validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── services/       # Recommendation engine
│   ├── utils/          # Helper functions
│   └── server.js       # Entry point
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── api/        # API client
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── App.js      # Main app
│       └── index.js    # Entry point
└── README.md
```

## Next Steps

1. Add more destinations to `backend/data/destinations.json`
2. Customize recommendation rules in `backend/services/recommendationEngine.js`
3. Enhance UI styling in frontend components
4. Add image uploads for destinations
5. Implement ML-based recommendations (future enhancement)

## Support

For issues or questions, refer to:
- API Documentation: `backend/docs/api.md`
- System Diagrams: `backend/docs/diagrams.md`
