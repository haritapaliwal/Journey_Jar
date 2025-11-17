# Journey Jar - Installation Commands

Copy and paste these commands to set up Journey Jar quickly.

## Windows Installation

### Backend Setup
```cmd
cd backend
npm install
copy .env.example .env
echo Configure backend\.env file with your MongoDB URI and JWT secret
pause
node utils\seedDestinations.js
npm run dev
```

### Frontend Setup (New Terminal)
```cmd
cd frontend
npm install
copy .env.example .env
npm start
```

## Mac/Linux Installation

### Backend Setup
```bash
cd backend && \
npm install && \
cp .env.example .env && \
echo "Configure backend/.env file with your MongoDB URI and JWT secret" && \
read -p "Press enter when ready..." && \
node utils/seedDestinations.js && \
npm run dev
```

### Frontend Setup (New Terminal)
```bash
cd frontend && \
npm install && \
cp .env.example .env && \
npm start
```

## Environment Configuration

### Backend .env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/journeyjar
JWT_SECRET=change_this_to_a_random_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend .env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## MongoDB Setup

### Local MongoDB

**Windows:**
```cmd
net start MongoDB
```

**Mac (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Replace MONGODB_URI in backend/.env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/journeyjar
```

## Verify Installation

### Check Backend
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","timestamp":"..."}
```

### Check Frontend
Open browser: http://localhost:3000

## Complete Installation Script (Mac/Linux)

Save as `install.sh`:

```bash
#!/bin/bash

echo "🌍 Installing Journey Jar..."

# Backend
echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "⚙️ Configuring backend..."
cp .env.example .env

echo "📝 Please edit backend/.env with your MongoDB URI and JWT secret"
echo "Press enter when ready..."
read

echo "🌱 Seeding database..."
node utils/seedDestinations.js

echo "🚀 Starting backend..."
npm run dev &
BACKEND_PID=$!

cd ..

# Frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "⚙️ Configuring frontend..."
cp .env.example .env

echo "🚀 Starting frontend..."
npm start &
FRONTEND_PID=$!

echo "✅ Journey Jar is running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo ""
echo "To stop: kill $BACKEND_PID $FRONTEND_PID"
```

Make executable and run:
```bash
chmod +x install.sh
./install.sh
```

## Docker Installation (Optional)

If you prefer Docker, create these files:

### backend/Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```

### frontend/Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml (root directory)
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/journeyjar
      - JWT_SECRET=your_secret_key
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run with Docker:
```bash
docker-compose up
```

## Troubleshooting Installation

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete package-lock.json and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Permission denied (Mac/Linux)
```bash
sudo chown -R $USER:$USER .
```

### MongoDB not found
```bash
# Mac
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### Node version issues
```bash
# Check version
node --version

# Should be v16 or higher
# Install nvm to manage versions
# Mac/Linux: https://github.com/nvm-sh/nvm
# Windows: https://github.com/coreybutler/nvm-windows
```

## Post-Installation

1. Register a user account
2. Test all features
3. Check logs for errors
4. Read documentation in `/backend/docs/`

## Uninstall

```bash
# Stop servers (Ctrl+C in terminals)

# Remove dependencies
rm -rf backend/node_modules frontend/node_modules

# Remove database (optional)
# Local MongoDB:
mongo journeyjar --eval "db.dropDatabase()"

# Remove project
cd ..
rm -rf journeyjar
```

## Getting Help

- Check `QUICKSTART.md` for common issues
- Read `SETUP.md` for detailed instructions
- Review `PROJECT_SUMMARY.md` for architecture
- See `backend/docs/api.md` for API reference
