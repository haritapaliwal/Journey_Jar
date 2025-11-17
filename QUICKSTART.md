# Journey Jar - Quick Start Guide

Get Journey Jar running in 5 minutes!

## Prerequisites

- Node.js installed (v16+)
- MongoDB running locally OR MongoDB Atlas account

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Backend

Create `.env` file:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/journeyjar
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

**Using MongoDB Atlas?** Replace MONGODB_URI with your connection string.

## Step 3: Seed Database

```bash
node utils/seedDestinations.js
```

You should see: "Destinations seeded successfully"

## Step 4: Start Backend

```bash
npm run dev
```

Backend running at `http://localhost:5000` ✅

## Step 5: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

## Step 6: Configure Frontend

Create `.env` file:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Content should be:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 7: Start Frontend

```bash
npm start
```

Browser opens at `http://localhost:3000` ✅

## Step 8: Test the Application

1. **Register**: Click "Sign Up" and create an account
2. **Login**: You'll be automatically logged in
3. **Set Preferences**: 
   - Season: Summer
   - Mood: Relax
   - Risk: Low
   - Budget: High
4. **View Results**: See "Maldives Resort" as top recommendation
5. **Save Trip**: Click "Save Trip" button
6. **View Saved**: Click "Saved Trips" in navigation

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service
- Windows: `net start MongoDB`
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `backend/.env` to 5001

### CORS Error in Browser
**Solution**: 
1. Ensure backend is running
2. Check `REACT_APP_API_URL` in `frontend/.env`
3. Restart frontend: `npm start`

### Cannot Find Module
**Solution**: Delete `node_modules` and reinstall
```bash
rm -rf node_modules
npm install
```

## Default Test Credentials

After registration, use your own credentials. No default users exist.

## API Health Check

Test if backend is running:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{"status":"OK","timestamp":"2024-01-01T00:00:00.000Z"}
```

## Next Steps

- Read full documentation in `SETUP.md`
- Check API docs in `backend/docs/api.md`
- View system diagrams in `backend/docs/diagrams.md`
- Explore code structure in `PROJECT_SUMMARY.md`

## Common Commands

### Backend
```bash
npm run dev      # Development with auto-reload
npm start        # Production mode
npm test         # Run tests
```

### Frontend
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

## Support

Having issues? Check:
1. MongoDB is running
2. Both .env files are configured
3. Dependencies are installed
4. Ports 3000 and 5000 are available

Enjoy using Journey Jar! 🌍✈️
