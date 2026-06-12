import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Determine API URL based on environment (Codespaces support)
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`;
  }
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.API_HOST || 'localhost';
  return `${protocol}://${host}:${PORT}`;
};

const API_URL = getApiUrl();

// CORS Configuration with Codespaces support
const getCorsOrigins = (): string[] => {
  const origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  if (process.env.CODESPACE_NAME) {
    origins.push(
      `https://${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`
    );
  }

  return origins;
};

// Middleware
app.use(cors({
  origin: getCorsOrigins(),
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    apiUrl: API_URL,
    timestamp: new Date().toISOString()
  });
});

// Configuration endpoint for frontend to get API URL
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: API_URL,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'ERROR',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend running on ${API_URL}`);
  console.log(`CORS origins: ${getCorsOrigins().join(', ')}`);
});
