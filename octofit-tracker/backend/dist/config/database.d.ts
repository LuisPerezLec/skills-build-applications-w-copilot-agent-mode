/**
 * Database Configuration
 * Mongoose connection setup for octofit_db
 */
/**
 * Connect to MongoDB using mongoose
 * Database: octofit_db
 * Port: 27017
 */
export declare const connectDatabase: () => Promise<void>;
/**
 * Disconnect from MongoDB
 */
export declare const disconnectDatabase: () => Promise<void>;
declare const _default: {
    connectDatabase: () => Promise<void>;
    disconnectDatabase: () => Promise<void>;
};
export default _default;
//# sourceMappingURL=database.d.ts.map