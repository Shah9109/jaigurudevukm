import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 5001;

// Initialize Database and Server
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Attach 404 & Global Error Handler at the very end
  app.use(notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    console.log(`[Jaigurudev Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[Jaigurudev Server] Health check available at: http://localhost:${PORT}/api/health`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error('[Unhandled Rejection Error]:', err.message);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('[Uncaught Exception Error]:', err.message);
  });
};

startServer();
