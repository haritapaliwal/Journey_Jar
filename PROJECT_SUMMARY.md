# Journey Jar - Project Summary

## Overview

Journey Jar is a full-stack personalized trip planner that recommends destinations based on user preferences using a rule-based recommendation engine.

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (bcrypt password hashing)
- **Architecture**: Modular with separate recommendation service

## Core Features Implemented

### ✅ 1. User Authentication
- Secure registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes

### ✅ 2. Preference Input Module
Users input 4 main preferences:
- Season of Travel (summer/winter/spring/fall)
- Mood of Travelling (relax/adventure/cultural)
- Risk Tolerance (low/medium/high)
- Budget Level (low/medium/high)

### ✅ 3. Recommendation Engine
- Rule-based scoring system
- Modular service in `backend/services/recommendationEngine.js`
- Implements 6 decision rules matching requirements
- Scores destinations based on preference alignment
- Returns top 5 ranked matches

### ✅ 4. Output Display UI
- Clean card-based design
- Shows destination name, summary, itinerary, cost level
- Displays match score
- Mobile responsive
- Save trip functionality

### ✅ 5. Saved Trips
- Save recommended trips
- View all saved trips
- Delete saved trips
- Stores user preferences with each saved trip

## System Modeling

All diagrams created in Mermaid format in `/backend/docs/diagrams.md`:

1. **Level 0 DFD** - Context diagram showing system boundaries
2. **Level 1 DFD** - Detailed process flow with modules
3. **Use Case Diagram** - User interactions
4. **Sequence Diagrams** - Get recommendations & save trip flows
5. **Class Diagram** - Data models and relationships
6. **Architecture Diagram** - System components

## Project Structure

```
journeyjar/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── recommendationController.js
│   │   └── savedTripController.js
│   ├── data/
│   │   └── destinations.json        # Destination corpus (6 destinations)
│   ├── docs/
│   │   ├── api.md                   # API documentation
│   │   └── diagrams.md              # System diagrams (Mermaid)
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   └── validation.js            # Input validation
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Destination.js           # Destination schema
│   │   └── SavedTrip.js             # SavedTrip schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── savedTripRoutes.js
│   ├── services/
│   │   └── recommendationEngine.js  # Rule-based engine
│   ├── tests/
│   │   └── recommendation.test.js   # Test file
│   ├── utils/
│   │   ├── logger.js                # Logging utility
│   │   ├── generateToken.js         # JWT generation
│   │   └── seedDestinations.js      # Database seeding
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                    # Entry point
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js             # API client
│   │   │   ├── auth.js              # Auth API calls
│   │   │   ├── recommendations.js
│   │   │   └── savedTrips.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── DestinationCard.jsx  # Destination card
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Preferences.jsx      # Preference form
│   │   │   ├── Results.jsx          # Recommendations display
│   │   │   └── SavedTrips.jsx       # Saved trips page
│   │   ├── App.js                   # Main app with routing
│   │   ├── index.js                 # Entry point
│   │   └── index.css                # Tailwind imports
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── README.md
├── .gitignore
├── README.md                        # Main readme
├── SETUP.md                         # Setup instructions
└── PROJECT_SUMMARY.md               # This file
```

## Recommendation Engine Logic

### Decision Rules (6 Rules as Required)

| Rule | Season | Mood | Risk | Budget | Output Category |
|------|--------|------|------|--------|----------------|
| 1 | Sum/Spr | Relax | Low | High | Luxury Beach |
| 2 | Sum/Fall | Adventure | High | Medium | Trekking |
| 3 | Spr/Fall | Cultural | Medium | Low | Budget City |
| 4 | Winter | Relax | Low | High | Cozy |
| 5 | Winter | Adventure | High | Medium | Extreme |
| 6 | Winter | Cultural | Medium | Low | Local Culture |

### Sample Destinations (6 Destinations)

1. **Maldives Resort** - Luxury Beach (Rule 1)
2. **Nepal Trekking** - Trekking (Rule 2)
3. **Kyoto Cultural Tour** - Budget City (Rule 3)
4. **Swiss Alps Retreat** - Cozy (Rule 4)
5. **Iceland Adventure** - Extreme (Rule 5)
6. **Morocco Cultural Journey** - Local Culture (Rule 6)

## Non-Functional Requirements Met

### ⚡ Performance
- Recommendation response < 5 seconds
- Efficient MongoDB queries with indexing
- Optimized scoring algorithm

### 🔐 Security
- Passwords encrypted with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes
- Input validation on all endpoints
- Secure MongoDB schema design

### 📱 Usability
- Fully responsive design (mobile, tablet, desktop)
- Clean, intuitive UI
- Card-based layout
- Clear navigation
- Error messages and loading states

### 📈 Scalability
- Modular architecture
- Separate recommendation engine service
- Easy to extend with ML models
- RESTful API design
- Environment-based configuration

### 🔧 Maintainability
- Clear folder structure
- Separated concerns (MVC pattern)
- Reusable components
- Comprehensive documentation
- Code comments
- Logging system

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Recommendations
- `POST /api/recommendations` - Get recommendations (protected)

### Saved Trips
- `GET /api/saved-trips` - Get all saved trips (protected)
- `POST /api/saved-trips` - Save a trip (protected)
- `DELETE /api/saved-trips/:id` - Delete saved trip (protected)

## Database Collections

### Users
- email, password (hashed), name, createdAt

### Destinations
- destinationId, name, summary, itinerary, costLevel, imageUrl, tags

### SavedTrips
- userId, destinationId, destinationName, preferences, summary, itinerary, costLevel, imageUrl, savedAt

## Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB URI and JWT secret
node utils/seedDestinations.js
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Testing the Application

1. Start MongoDB
2. Start backend server (port 5000)
3. Start frontend app (port 3000)
4. Register a new user
5. Input travel preferences
6. View recommendations
7. Save favorite trips
8. Manage saved trips

## Future Enhancements

- Machine Learning recommendation model
- Image upload for destinations
- User reviews and ratings
- Social sharing features
- Trip itinerary builder
- Budget calculator
- Weather integration
- Map integration
- Multi-language support

## Documentation

- **API Docs**: `/backend/docs/api.md`
- **System Diagrams**: `/backend/docs/diagrams.md`
- **Setup Guide**: `/SETUP.md`
- **Backend README**: `/backend/README.md`
- **Frontend README**: `/frontend/README.md`

## Key Technologies & Libraries

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- express-validator - Input validation
- cors - CORS middleware
- dotenv - Environment variables

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - CSS framework

## Compliance with Requirements

✅ All core functionalities implemented
✅ All non-functional requirements met
✅ All system diagrams created (Mermaid format)
✅ Complete project structure as specified
✅ API documentation provided
✅ Dummy dataset included
✅ Setup instructions documented
✅ Modular recommendation engine
✅ JWT authentication
✅ MongoDB with Mongoose
✅ React + Tailwind frontend
✅ Responsive UI
✅ Environment-based configuration

## Project Status

**COMPLETE** - All requirements have been implemented and documented.
