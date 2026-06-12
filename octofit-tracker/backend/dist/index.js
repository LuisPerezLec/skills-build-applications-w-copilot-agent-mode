"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Determine API URL based on environment (Codespaces support)
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`;
    }
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.API_HOST || 'localhost';
    return `${protocol}://${host}:${PORT}`;
};
const API_URL = getApiUrl();
// CORS Configuration with Codespaces support
const getCorsOrigins = () => {
    const origins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ];
    if (process.env.CODESPACE_NAME) {
        origins.push(`https://${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`);
    }
    return origins;
};
// Middleware
app.use((0, cors_1.default)({
    origin: getCorsOrigins(),
    credentials: true
}));
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default.connect(MONGODB_URI)
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
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'NOT_FOUND',
        message: `Route ${req.method} ${req.path} not found`
    });
});
// Error handler
app.use((err, req, res, next) => {
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
//# sourceMappingURL=index.js.map