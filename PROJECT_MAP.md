# Journey Jar - Project Map

Visual guide to navigate the Journey Jar codebase.

## 📁 Project Root

```
journeyjar/
│
├── 📄 README.md              ← Start here! Project overview
├── 📄 QUICKSTART.md          ← Get running in 5 minutes
├── 📄 SETUP.md               ← Detailed setup instructions
├── 📄 PROJECT_SUMMARY.md     ← Complete project summary
├── 📄 CHECKLIST.md           ← Requirements verification
├── 📄 DEVELOPER_GUIDE.md     ← Developer documentation
├── 📄 install.md             ← Installation commands
├── 📄 .gitignore             ← Git ignore rules
│
├── 📂 backend/               ← Node.js + Express API
└── 📂 frontend/              ← React application
```

## 🔧 Backend Structure

```
backend/
│
├── 📄 server.js              ← Entry point - START HERE
├── 📄 package.json           ← Dependencies
├── 📄 .env.example           ← Environment template
├── 📄 README.md              ← Backend documentation
│
├── 📂 config/
│   └── db.js                 ← MongoDB connection
│
├── 📂 models/                ← Data schemas (Mongoose)
│   ├── User.js               ← User model (auth)
│   ├── Destination.js        ← Destination model
│   └── SavedTrip.js          ← Saved trip model
│
├── 📂 controllers/           ← Request handlers
│   ├── authController.js     ← Register, login, getMe
│   ├── recommendationController.js  ← Get recommendations
│   └── savedTripController.js       ← Save, get, delete trips
│
├── 📂 routes/                ← API route definitions
│   ├── authRoutes.js         ← /api/auth/*
│   ├── recommendationRoutes.js  ← /api/recommendations
│   └── savedTripRoutes.js    ← /api/saved-trips/*
│
├── 📂 services/              ← Business logic
│   └── recommendationEngine.js  ← ⭐ CORE: Rule-based engine
│
├── 📂 middleware/            ← Express middleware
│   ├── auth.js               ← JWT verification
│   └── validation.js         ← Input validation
│
├── 📂 utils/                 ← Helper functions
│   ├── logger.js             ← Logging utility
│   ├── generateToken.js      ← JWT generation
│   └── seedDestinations.js   ← Database seeding script
│
├── 📂 data/                  ← Seed data
│   └── destinations.json     ← 6 sample destinations
│
├── 📂 docs/                  ← Documentation
│   ├── api.md                ← API reference
│   └── diagrams.md           ← System diagrams (Mermaid)
│
└── 📂 tests/                 ← Test files
    └── recommendation.test.js
```

## 🎨 Frontend Structure

```
frontend/
│
├── 📄 package.json           ← Dependencies
├── 📄 .env.example           ← Environment template
├── 📄 tailwind.config.js     ← Tailwind configuration
├── 📄 postcss.config.js      ← PostCSS configuration
├── 📄 README.md              ← Frontend documentation
│
├── 📂 public/
│   └── index.html            ← HTML template
│
└── 📂 src/
    │
    ├── 📄 index.js           ← Entry point
    ├── 📄 App.js             ← Main app with routing
    ├── 📄 index.css          ← Tailwind imports
    │
    ├── 📂 api/               ← API client layer
    │   ├── axios.js          ← Axios instance (JWT interceptor)
    │   ├── auth.js           ← Auth API calls
    │   ├── recommendations.js  ← Recommendation API calls
    │   └── savedTrips.js     ← Saved trips API calls
    │
    ├── 📂 components/        ← Reusable components
    │   ├── Navbar.jsx        ← Navigation bar
    │   └── DestinationCard.jsx  ← Destination display card
    │
    └── 📂 pages/             ← Page components (routes)
        ├── Login.jsx         ← /login
        ├── Register.jsx      ← /register
        ├── Preferences.jsx   ← /preferences (input form)
        ├── Results.jsx       ← /results (recommendations)
        └── SavedTrips.jsx    ← /saved-trips (user's saved trips)
```

## 🗺️ User Journey Flow

```
1. Landing
   └─→ Register.jsx (/register)
       └─→ Creates account
           └─→ Redirects to Preferences

2. Preferences
   └─→ Preferences.jsx (/preferences)
       └─→ User selects:
           ├─ Season (summer/winter/spring/fall)
           ├─ Mood (relax/adventure/cultural)
           ├─ Risk Tolerance (low/medium/high)
           └─ Budget Level (low/medium/high)
       └─→ Submits to API
           └─→ Redirects to Results

3. Results
   └─→ Results.jsx (/results)
       └─→ Displays 5 recommendations
       └─→ User clicks "Save Trip"
           └─→ Saves to database

4. Saved Trips
   └─→ SavedTrips.jsx (/saved-trips)
       └─→ Displays all saved trips
       └─→ User can delete trips
```

## 🔄 Data Flow

```
Frontend                Backend                 Database
────────                ───────                 ────────

User Input
   │
   ├─→ Login/Register ──→ authController ──→ User collection
   │                       ├─ Hash password
   │                       └─ Generate JWT
   │
   ├─→ Preferences ─────→ recommendationController
   │                       │
   │                       └─→ recommendationEngine
   │                           ├─ Fetch destinations ──→ Destination collection
   │                           ├─ Calculate scores
   │                           └─ Return top 5
   │
   └─→ Save Trip ───────→ savedTripController ──→ SavedTrip collection
                           ├─ Verify user (JWT)
                           └─ Store trip data
```

## 🎯 Key Files to Understand

### Backend Core
1. **server.js** - Application entry point
2. **services/recommendationEngine.js** - Recommendation algorithm
3. **middleware/auth.js** - JWT authentication
4. **models/User.js** - User schema with password hashing

### Frontend Core
1. **App.js** - Routing and protected routes
2. **api/axios.js** - API client with JWT interceptor
3. **pages/Preferences.jsx** - Main user input form
4. **pages/Results.jsx** - Recommendation display

## 📊 Database Collections

```
MongoDB: journeyjar
│
├── users
│   ├── _id
│   ├── email (unique)
│   ├── password (hashed)
│   └── name
│
├── destinations
│   ├── _id
│   ├── destinationId (unique)
│   ├── name
│   ├── summary
│   ├── itinerary
│   ├── costLevel
│   ├── imageUrl
│   └── tags { season, mood, riskTolerance, budgetLevel, category }
│
└── savedtrips
    ├── _id
    ├── userId (ref: users)
    ├── destinationId
    ├── destinationName
    ├── preferences { season, mood, riskTolerance, budgetLevel }
    ├── summary
    ├── itinerary
    ├── costLevel
    ├── imageUrl
    └── savedAt
```

## 🔐 Authentication Flow

```
1. User Registration
   POST /api/auth/register
   { email, password, name }
   │
   ├─→ Validate input
   ├─→ Hash password (bcrypt)
   ├─→ Save to database
   └─→ Return JWT token

2. User Login
   POST /api/auth/login
   { email, password }
   │
   ├─→ Find user by email
   ├─→ Compare password hash
   └─→ Return JWT token

3. Protected Request
   GET /api/saved-trips
   Header: Authorization: Bearer <token>
   │
   ├─→ Extract token
   ├─→ Verify JWT signature
   ├─→ Decode user ID
   ├─→ Fetch user from database
   └─→ Attach to req.user
```

## 🎨 UI Component Hierarchy

```
App
│
├── Navbar
│   ├── Logo (Link to /)
│   ├── Navigation Links
│   │   ├── Find Trips (/preferences)
│   │   └── Saved Trips (/saved-trips)
│   └── User Menu
│       ├── Email display
│       └── Logout button
│
└── Routes
    │
    ├── Login (/login)
    │   └── Login Form
    │
    ├── Register (/register)
    │   └── Registration Form
    │
    ├── Preferences (/preferences) [Protected]
    │   └── Preference Form
    │       ├── Season Select
    │       ├── Mood Select
    │       ├── Risk Tolerance Select
    │       ├── Budget Level Select
    │       └── Submit Button
    │
    ├── Results (/results) [Protected]
    │   ├── Recommendation Grid
    │   │   └── DestinationCard (×5)
    │   │       ├── Image/Icon
    │   │       ├── Name
    │   │       ├── Summary
    │   │       ├── Itinerary
    │   │       ├── Cost Level
    │   │       ├── Match Score
    │   │       └── Save Button
    │   └── Action Buttons
    │       ├── New Search
    │       └── View Saved Trips
    │
    └── SavedTrips (/saved-trips) [Protected]
        └── Saved Trips Grid
            └── DestinationCard (×N)
                ├── Trip Details
                └── Delete Button
```

## 🚀 Quick Navigation Guide

### I want to...

**Understand the recommendation algorithm**
→ `backend/services/recommendationEngine.js`

**Add a new API endpoint**
→ Create controller in `backend/controllers/`
→ Create route in `backend/routes/`
→ Register in `backend/server.js`

**Add a new page**
→ Create component in `frontend/src/pages/`
→ Add route in `frontend/src/App.js`

**Modify the UI styling**
→ Edit Tailwind classes in components
→ Update `frontend/tailwind.config.js` for theme

**Add new destinations**
→ Edit `backend/data/destinations.json`
→ Run `node backend/utils/seedDestinations.js`

**Change authentication logic**
→ `backend/middleware/auth.js`
→ `backend/controllers/authController.js`

**Update database schema**
→ Edit models in `backend/models/`
→ Restart server (Mongoose auto-updates)

**View API documentation**
→ `backend/docs/api.md`

**View system diagrams**
→ `backend/docs/diagrams.md`

**Setup the project**
→ `QUICKSTART.md` (fast)
→ `SETUP.md` (detailed)

**Deploy to production**
→ `DEVELOPER_GUIDE.md` (Deployment section)

## 📚 Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| README.md | Project overview | Everyone |
| QUICKSTART.md | Fast setup | New developers |
| SETUP.md | Detailed setup | Developers |
| PROJECT_SUMMARY.md | Complete summary | Project managers |
| CHECKLIST.md | Requirements check | QA/Stakeholders |
| DEVELOPER_GUIDE.md | Development guide | Developers |
| install.md | Installation commands | DevOps |
| PROJECT_MAP.md | This file | Everyone |
| backend/docs/api.md | API reference | Frontend devs |
| backend/docs/diagrams.md | System diagrams | Architects |

## 🎓 Learning Path

### For New Developers

1. **Start**: Read `README.md`
2. **Setup**: Follow `QUICKSTART.md`
3. **Explore**: Review `PROJECT_MAP.md` (this file)
4. **Understand**: Read `PROJECT_SUMMARY.md`
5. **Code**: Study `backend/server.js` and `frontend/src/App.js`
6. **Deep Dive**: Read `DEVELOPER_GUIDE.md`
7. **Extend**: Add features using guide examples

### For Frontend Developers

1. `frontend/src/App.js` - Routing
2. `frontend/src/pages/` - Page components
3. `frontend/src/components/` - Reusable components
4. `frontend/src/api/` - API integration
5. `backend/docs/api.md` - API reference

### For Backend Developers

1. `backend/server.js` - Entry point
2. `backend/routes/` - API routes
3. `backend/controllers/` - Business logic
4. `backend/services/recommendationEngine.js` - Core algorithm
5. `backend/models/` - Data schemas

### For DevOps

1. `install.md` - Installation commands
2. `SETUP.md` - Environment setup
3. `DEVELOPER_GUIDE.md` - Deployment section
4. `.env.example` files - Configuration

## 🔍 Code Search Tips

**Find all API endpoints:**
```bash
grep -r "router\." backend/routes/
```

**Find all React components:**
```bash
find frontend/src -name "*.jsx"
```

**Find where a function is used:**
```bash
grep -r "functionName" .
```

**Find all TODO comments:**
```bash
grep -r "TODO" backend/ frontend/
```

## 🎯 Project Highlights

- ✅ **45+ files** created
- ✅ **Full-stack** implementation
- ✅ **6 decision rules** implemented
- ✅ **6 sample destinations** included
- ✅ **5 frontend pages** built
- ✅ **8 API endpoints** created
- ✅ **3 database collections** designed
- ✅ **7 system diagrams** documented
- ✅ **Comprehensive documentation** provided

## 🎉 You're Ready!

You now have a complete map of the Journey Jar project. Start exploring and building amazing features!

**Happy Coding! 🚀**
