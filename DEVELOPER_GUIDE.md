# Journey Jar - Developer Guide

Complete guide for developers working on Journey Jar.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Development](#backend-development)
3. [Frontend Development](#frontend-development)
4. [Database Schema](#database-schema)
5. [API Reference](#api-reference)
6. [Recommendation Engine](#recommendation-engine)
7. [Adding Features](#adding-features)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Architecture Overview

Journey Jar follows a three-tier architecture:

```
┌─────────────────┐
│  React Frontend │ (Port 3000)
│  Tailwind CSS   │
└────────┬────────┘
         │ HTTP/REST
         │ JWT Auth
┌────────▼────────┐
│  Express API    │ (Port 5000)
│  Node.js        │
└────────┬────────┘
         │ Mongoose
         │ ODM
┌────────▼────────┐
│    MongoDB      │ (Port 27017)
│   Database      │
└─────────────────┘
```

### Key Design Patterns

- **MVC Pattern**: Controllers handle requests, Models define data, Views (React) render UI
- **Service Layer**: Business logic separated in services (recommendation engine)
- **Middleware Pattern**: Auth, validation, error handling
- **Repository Pattern**: Mongoose models abstract database operations

## Backend Development

### Project Structure

```
backend/
├── config/          # Configuration (DB connection)
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Helper functions
└── server.js        # Entry point
```

### Adding a New API Endpoint

1. **Create Model** (if needed):
```javascript
// models/NewModel.js
const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
  field: { type: String, required: true }
});

module.exports = mongoose.model('NewModel', newSchema);
```

2. **Create Controller**:
```javascript
// controllers/newController.js
const NewModel = require('../models/NewModel');

const getItems = async (req, res) => {
  try {
    const items = await NewModel.find();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

module.exports = { getItems };
```

3. **Create Route**:
```javascript
// routes/newRoutes.js
const express = require('express');
const { getItems } = require('../controllers/newController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.get('/', protect, getItems);

module.exports = router;
```

4. **Register Route in server.js**:
```javascript
app.use('/api/new-endpoint', require('./routes/newRoutes'));
```

### Authentication Flow

```javascript
// 1. User registers/logs in
POST /api/auth/login
{ email, password }

// 2. Server validates and returns JWT
{ token: "eyJhbGc..." }

// 3. Client stores token
localStorage.setItem('token', token);

// 4. Client sends token in requests
Authorization: Bearer eyJhbGc...

// 5. Middleware verifies token
const decoded = jwt.verify(token, JWT_SECRET);
req.user = await User.findById(decoded.id);
```

### Environment Variables

```env
PORT=5000                    # Server port
MONGODB_URI=mongodb://...    # Database connection
JWT_SECRET=secret_key        # JWT signing key
JWT_EXPIRE=7d               # Token expiration
NODE_ENV=development        # Environment
```

## Frontend Development

### Project Structure

```
frontend/src/
├── api/            # API client functions
├── components/     # Reusable components
├── pages/          # Page components (routes)
├── App.js          # Main app with routing
└── index.js        # Entry point
```

### Adding a New Page

1. **Create Page Component**:
```javascript
// pages/NewPage.jsx
import React from 'react';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">New Page</h1>
    </div>
  );
};

export default NewPage;
```

2. **Add Route in App.js**:
```javascript
import NewPage from './pages/NewPage';

<Route path="/new-page" element={
  <PrivateRoute>
    <NewPage />
  </PrivateRoute>
} />
```

3. **Add Navigation Link**:
```javascript
// components/Navbar.jsx
<Link to="/new-page" className="hover:underline">
  New Page
</Link>
```

### API Integration

```javascript
// api/newApi.js
import axios from './axios';

export const fetchData = async () => {
  const response = await axios.get('/endpoint');
  return response.data;
};

// Usage in component
import { fetchData } from '../api/newApi';

const [data, setData] = useState([]);

useEffect(() => {
  const loadData = async () => {
    const result = await fetchData();
    setData(result.data);
  };
  loadData();
}, []);
```

### Styling with Tailwind

Common patterns:

```javascript
// Container
<div className="max-w-6xl mx-auto px-4 py-8">

// Card
<div className="bg-white rounded-lg shadow-lg p-6">

// Button
<button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600">

// Form Input
<input className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String,
  createdAt: Date
}
```

### Destination Collection

```javascript
{
  _id: ObjectId,
  destinationId: String (unique, required),
  name: String (required),
  summary: String (required),
  itinerary: String (required),
  costLevel: String (enum: low/medium/high),
  imageUrl: String,
  tags: {
    season: [String],
    mood: [String],
    riskTolerance: [String],
    budgetLevel: [String],
    category: String
  }
}
```

### SavedTrip Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  destinationId: String (required),
  destinationName: String,
  preferences: {
    season: String,
    mood: String,
    riskTolerance: String,
    budgetLevel: String
  },
  summary: String,
  itinerary: String,
  costLevel: String,
  imageUrl: String,
  savedAt: Date
}
```

### Indexes

```javascript
// SavedTrip
{ userId: 1, savedAt: -1 }  // Fast user trip queries

// User
{ email: 1 }  // Unique constraint + fast lookup
```

## API Reference

See `/backend/docs/api.md` for complete API documentation.

### Quick Reference

```javascript
// Auth
POST   /api/auth/register    { email, password, name }
POST   /api/auth/login        { email, password }
GET    /api/auth/me           [Protected]

// Recommendations
POST   /api/recommendations   [Protected] { season, mood, riskTolerance, budgetLevel }

// Saved Trips
GET    /api/saved-trips       [Protected]
POST   /api/saved-trips       [Protected] { destinationId, preferences }
DELETE /api/saved-trips/:id   [Protected]
```

## Recommendation Engine

### Algorithm

Located in `/backend/services/recommendationEngine.js`

```javascript
Score Calculation:
- Season match: +25 points
- Mood match: +25 points
- Risk tolerance match: +25 points
- Budget level match: +25 points
- Rule category match: +10 points
Maximum: 110 points
```

### Decision Rules

```javascript
const RULES = [
  {
    conditions: { season: ['summer', 'spring'], mood: ['relax'], ... },
    category: 'luxury_beach',
    weight: 10
  },
  // ... 5 more rules
];
```

### Customizing Rules

1. **Add New Rule**:
```javascript
{
  id: 'rule_7',
  conditions: {
    season: ['spring'],
    mood: ['adventure'],
    riskTolerance: ['medium'],
    budgetLevel: ['medium']
  },
  category: 'hiking',
  weight: 10
}
```

2. **Add Matching Destination**:
```json
{
  "destinationId": "dest_007",
  "name": "Colorado Hiking",
  "tags": {
    "season": ["spring"],
    "mood": ["adventure"],
    "riskTolerance": ["medium"],
    "budgetLevel": ["medium"],
    "category": "hiking"
  }
}
```

3. **Reseed Database**:
```bash
node utils/seedDestinations.js
```

### Integrating ML Model (Future)

Replace rule-based logic:

```javascript
// services/mlRecommendationEngine.js
const tf = require('@tensorflow/tfjs-node');

const getMLRecommendations = async (preferences) => {
  // Load trained model
  const model = await tf.loadLayersModel('file://./models/recommender/model.json');
  
  // Prepare input
  const input = prepareInput(preferences);
  
  // Predict
  const predictions = model.predict(input);
  
  // Get top N
  return getTopN(predictions, 5);
};
```

## Adding Features

### Example: Add User Reviews

1. **Create Review Model**:
```javascript
// models/Review.js
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destinationId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
```

2. **Create Controller**:
```javascript
// controllers/reviewController.js
const createReview = async (req, res) => {
  const { destinationId, rating, comment } = req.body;
  const review = await Review.create({
    userId: req.user._id,
    destinationId,
    rating,
    comment
  });
  res.status(201).json({ success: true, data: review });
};
```

3. **Add Routes**:
```javascript
// routes/reviewRoutes.js
router.post('/', protect, createReview);
router.get('/destination/:id', getDestinationReviews);
```

4. **Frontend Component**:
```javascript
// components/ReviewForm.jsx
const ReviewForm = ({ destinationId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(destinationId, rating, comment);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Testing

### Backend Tests

```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  test('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: 'test123' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

Run tests:
```bash
cd backend
npm test
```

### Frontend Tests

```javascript
// components/DestinationCard.test.js
import { render, screen } from '@testing-library/react';
import DestinationCard from './DestinationCard';

test('renders destination name', () => {
  const destination = { name: 'Maldives' };
  render(<DestinationCard destination={destination} />);
  expect(screen.getByText('Maldives')).toBeInTheDocument();
});
```

## Deployment

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
heroku login
heroku create journeyjar-api

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main

# Seed database
heroku run node utils/seedDestinations.js
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variable
vercel env add REACT_APP_API_URL
```

### Environment Variables for Production

```env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://production-cluster...
JWT_SECRET=super_secure_random_key_here
PORT=5000

# Frontend
REACT_APP_API_URL=https://journeyjar-api.herokuapp.com/api
```

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```javascript
// Check connection string
console.log('Connecting to:', process.env.MONGODB_URI);

// Add error handling
mongoose.connect(uri).catch(err => {
  console.error('MongoDB connection error:', err);
});
```

**JWT Token Invalid**
```javascript
// Check token format
console.log('Token:', req.headers.authorization);

// Verify secret matches
console.log('Using secret:', process.env.JWT_SECRET);
```

**CORS Errors**
```javascript
// Add specific origin
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Build Errors**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Debug Mode

Enable detailed logging:

```javascript
// backend/utils/logger.js
const logger = {
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEBUG]', message, JSON.stringify(data, null, 2));
    }
  }
};
```

## Best Practices

1. **Always validate input** - Use express-validator
2. **Handle errors gracefully** - Try-catch blocks
3. **Log important events** - Use logger utility
4. **Keep secrets in .env** - Never commit .env files
5. **Write tests** - Test critical functionality
6. **Document code** - Add comments for complex logic
7. **Use TypeScript** - Consider migrating for type safety
8. **Optimize queries** - Add database indexes
9. **Cache responses** - Use Redis for frequent queries
10. **Monitor performance** - Use APM tools in production

## Resources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## Support

For questions or issues:
- Check documentation in `/backend/docs/`
- Review `SETUP.md` for setup issues
- See `QUICKSTART.md` for common problems
