# Journey Jar – Personalized Trip Planner

A full-stack trip recommendation system that suggests destinations based on user preferences.

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT Authentication
- **Architecture**: Modular with separate Recommendation Engine

## Features

- 🔐 Secure user authentication (JWT)
- 🎯 Preference-based destination recommendations
- 💾 Save and manage trip recommendations
- 📱 Fully responsive UI
- ⚡ Rule-based recommendation engine

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI and JWT secret in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
journeyjar/
├── backend/          # Node.js + Express API
├── frontend/         # React application
├── docs/            # System diagrams and API docs
└── README.md
```

## Documentation

See `/backend/docs/` for:
- System diagrams (DFD, Use Case, Sequence, Class)
- API documentation

## License

MIT
