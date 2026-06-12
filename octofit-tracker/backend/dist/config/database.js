"use strict";
/**
 * Database Configuration
 * Mongoose connection setup for octofit_db
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Connect to MongoDB using mongoose
 * Database: octofit_db
 * Port: 27017
 */
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');
        console.log(`📦 Database: octofit_db`);
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
/**
 * Disconnect from MongoDB
 */
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('✅ Disconnected from MongoDB');
    }
    catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
exports.default = { connectDatabase: exports.connectDatabase, disconnectDatabase: exports.disconnectDatabase };
//# sourceMappingURL=database.js.map