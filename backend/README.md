# Journey Jar Backend

Node.js + Express API for Journey Jar trip recommendation system.

## Features

- JWT-based authentication
- Rule-based recommendation engine
- RESTful API design
- MongoDB with Mongoose ODM
- Input validation
- Error handling and logging

## Quick Start

```bash
npm install
cp .env.example .env
# Configure .env file
node utils/seedDestinations.js
npm run dev
```

## API Endpoints

See `/docs/api.md` for complete API documentation.

## Recommendation Engine

The recommendation engine (`services/recommendationEngine.js`) uses a rule-based approach:

1. Loads all destinations from database
2. Scores each destination based on preference matching
3. Applies rule-based category bonuses
4. Returns top N ranked destinations

### Scoring Algorithm

- Season match: +25 points
- Mood match: +25 points
- Risk tolerance match: +25 points
- Budget level match: +25 points
- Rule category match: +10 points

Maximum score: 110 points

## Adding New Destinations

Edit `data/destinations.json` and run:

```bash
node utils/seedDestinations.js
```

## Testing

```bash
npm test
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Token expiration time (default: 7d)
- `NODE_ENV`: Environment (development/production)
