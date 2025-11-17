# Journey Jar API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response (201):
```json
{
  "_id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/auth/login`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "_id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here"
}
```

### Get Current User
**GET** `/auth/me`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "_id": "user_id",
  "email": "user@example.com",
  "name": "John Doe"
}
```

## Recommendation Endpoints

### Get Recommendations
**POST** `/recommendations`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "season": "summer",
  "mood": "relax",
  "riskTolerance": "low",
  "budgetLevel": "high"
}
```

Response (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "destinationId": "dest_001",
      "name": "Maldives Resort",
      "summary": "Luxury beach paradise...",
      "itinerary": "Day 1-2: Arrival...",
      "costLevel": "high",
      "imageUrl": "/images/maldives.jpg",
      "score": 100
    }
  ]
}
```

## Saved Trips Endpoints

### Save a Trip
**POST** `/saved-trips`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "destinationId": "dest_001",
  "preferences": {
    "season": "summer",
    "mood": "relax",
    "riskTolerance": "low",
    "budgetLevel": "high"
  }
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "_id": "trip_id",
    "userId": "user_id",
    "destinationId": "dest_001",
    "destinationName": "Maldives Resort",
    "preferences": {...},
    "savedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Saved Trips
**GET** `/saved-trips`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### Delete Saved Trip
**DELETE** `/saved-trips/:id`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "message": "Trip deleted successfully"
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "message": "Error description"
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 404: Not Found
- 500: Internal Server Error

## Validation Rules

### Preferences
- `season`: Must be one of: summer, winter, spring, fall
- `mood`: Must be one of: relax, adventure, cultural
- `riskTolerance`: Must be one of: low, medium, high
- `budgetLevel`: Must be one of: low, medium, high

### Authentication
- `email`: Must be valid email format
- `password`: Minimum 6 characters
