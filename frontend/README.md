# Journey Jar Frontend

React application for Journey Jar trip recommendation system.

## Features

- User authentication (login/register)
- Preference input form
- Destination recommendations display
- Save and manage favorite trips
- Fully responsive design with Tailwind CSS

## Quick Start

```bash
npm install
cp .env.example .env
# Configure .env file
npm start
```

Application runs on `http://localhost:3000`

## Project Structure

```
src/
├── api/           # API client and service functions
├── components/    # Reusable React components
├── pages/         # Page components (routes)
├── App.js         # Main application component
└── index.js       # Entry point
```

## Pages

- `/login` - User login
- `/register` - User registration
- `/preferences` - Travel preference input
- `/results` - Recommendation results
- `/saved-trips` - Saved trips management

## Components

- `Navbar` - Navigation bar with auth state
- `DestinationCard` - Destination display card

## API Integration

All API calls go through `src/api/axios.js` which:
- Sets base URL
- Adds JWT token to requests
- Handles authentication

## Styling

Uses Tailwind CSS for styling. Configuration in `tailwind.config.js`.

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.
