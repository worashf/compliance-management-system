const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./configs/db-connection');

// Load environment variables
dotenv.config({ path: 'backend/configs/config.env' });

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  console.log('Continuing to run the server despite the uncaught exception');
  // Optionally, you can add logic to notify developers about the error.
});

connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  console.error(err.stack);
  console.log('Continuing to run the server despite the unhandled promise rejection');
  // Optionally, you can add logic to notify developers about the error.
});

// Graceful shutdown for other termination signals
const gracefulShutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });

  // Force shutdown if not closed within 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
