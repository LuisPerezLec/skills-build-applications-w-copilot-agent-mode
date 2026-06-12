# OctoFit Tracker - Modern Multi-tier Application

A full-stack fitness tracking application with React 19 frontend, Node.js/Express backend, and MongoDB database.

## Architecture

- **Frontend**: React 19 with Vite (port 5173)
- **Backend**: Node.js + Express + TypeScript (port 8000)
- **Database**: MongoDB (port 27017)

## Project Structure

```
octofit-tracker/
├── frontend/              # React 19 + Vite application
│   ├── src/
│   ├── public/
│   ├── vite.config.js     # Configured to run on port 5173
│   ├── package.json
│   └── index.html
├── backend/               # Express + TypeScript application
│   ├── src/
│   │   └── index.ts       # Main server file (runs on port 8000)
│   ├── dist/              # Compiled JavaScript output
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example       # Environment variables template
├── docker-compose.yml     # MongoDB container configuration
└── README.md
```

## Ports

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **MongoDB**: localhost:27017

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker and Docker Compose (for MongoDB)

### 1. Start MongoDB

```bash
cd octofit-tracker
docker-compose up -d
```

This starts MongoDB on port 27017.

### 2. Backend Setup

```bash
cd backend

# Create .env file from template
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev

# Or build and run production
npm run build
npm start
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "OK",
  "message": "OctoFit Tracker API is running"
}
```

## Development Commands

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Backend
```bash
npm run dev       # Start with ts-node
npm run build     # Compile TypeScript
npm run watch     # Watch mode compilation
npm start         # Run compiled code
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
FRONTEND_URL=http://localhost:5173
```

## Technologies

### Frontend
- React 19
- Vite
- JSX/JavaScript

### Backend
- Node.js
- Express
- TypeScript
- Mongoose (MongoDB ODM)
- CORS

### Database
- MongoDB

## Next Steps

1. Define MongoDB schemas using Mongoose
2. Create API routes and controllers
3. Build React components for the UI
4. Implement authentication
5. Add data validation
6. Set up error handling

## License

ISC
